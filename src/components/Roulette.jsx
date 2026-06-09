import React, {useContext, useState, useRef, useEffect} from 'react'
import { AppContext } from '../App'

const psychMessages = [
  '이번에는 될 것 같은데?',
  '방금 아까웠습니다.',
  '한 번만 더 해볼까요?',
  '조금만 더 하면 본전을 찾을 수 있을지도 모릅니다.'
]

// Only red and black sectors (alternating) for clear visual
const SECTOR_COUNT = 12
const sectors = Array.from({length: SECTOR_COUNT}).map((_,i)=>({
  color: i % 2 === 0 ? 'red' : 'black',
  label: i % 2 === 0 ? 'Red' : 'Black'
}))

export default function Roulette(){
  const {chips,setChips,history,setHistory,setRoute} = useContext(AppContext)
  const [bet, setBet] = useState(10000) // default bet 10,000
  const [choice, setChoice] = useState('red')
  const [message, setMessage] = useState('')
  const [spinning, setSpinning] = useState(false)
  const wheelRef = useRef(null)
  const spinTimeoutRef = useRef(null)
  const finalAngleRef = useRef(0)

  useEffect(()=>{
    if(chips <= 0){
      // auto end when chips depleted
      setRoute('report')
    }
  },[chips,setRoute])

  function getWinProbability(){
    const plays = history.length || 0
    // early slight advantage, then drift negative; if chips large, lower win prob
    let base = 0.48
    if(plays < 4) base = 0.48
    else if(plays < 12) base = 0.34
    else base = 0.28
    if(chips >= 250000) base -= 0.06 // when chips high, make it harder
    return Math.max(0.05, base)
  }

  const spin = ()=>{
    if(spinning) return
    if(bet<=0 || bet>chips) return
    setSpinning(true)
    const p = getWinProbability()

    // Determine outcome color (red/black) using win probability
    const rnd = Math.random()
    const win = rnd < p
    let outcomeColor
    if(win) outcomeColor = choice // if win, outcome matches player's choice
    else outcomeColor = choice === 'red' ? 'black' : 'red'

    // compute payout: match -> +bet, else -bet
    const payout = outcomeColor === choice ? bet : -bet
    const newChips = chips + payout
    const entry = {game:'roulette',bet,choice,payout,newChips,time:Date.now(),win: payout>0, outcome: outcomeColor}
    setHistory([...history, entry])
    setChips(newChips)

    // animate wheel: choose a random sector index having the outcomeColor
    const indices = sectors.map((s,i)=> s.color === outcomeColor ? i : -1).filter(i=>i>=0)
    const chosenIndex = indices[Math.floor(Math.random()*indices.length)]
    const sectorAngle = 360 / sectors.length
    // spin several turns plus land at chosen sector center
    const targetAngle = (chosenIndex + 0.5) * sectorAngle
    const randomSpin = 720 + targetAngle + (Math.random()* (sectorAngle*0.6) - (sectorAngle*0.3))

    const finishSpin = (chosenIndex, randomSpin, payout, win) => {
      finalAngleRef.current = randomSpin % 360
      // schedule cleanup
      spinTimeoutRef.current = setTimeout(()=>{
        if(wheelRef.current){
          wheelRef.current.style.transition = 'none'
          const normalized = finalAngleRef.current
          wheelRef.current.style.transform = `rotate(${normalized}deg)`
        }
        setSpinning(false)
      }, 3200)
      // append history
      const newChips = chips - bet + (win ? bet*2 : 0)
      const entry = {game:'roulette',bet,choice,payout,newChips,time:Date.now(),win, outcome: (win? choice : (choice==='red'?'black':'red'))}
      setHistory([...history, entry])
      // update chips atomically
      setChips(prev => (prev - bet + (win ? bet*2 : 0)))
    }

    const skipSpin = ()=>{
      if(!spinning) return
      if(spinTimeoutRef.current) clearTimeout(spinTimeoutRef.current)
      // fast-forward wheel to final angle
      if(wheelRef.current){
        wheelRef.current.style.transition = 'transform 0.5s ease-out'
        wheelRef.current.style.transform = `rotate(${finalAngleRef.current}deg)`
      }
      // cleanup immediately
      setTimeout(()=>{
        if(wheelRef.current){
          wheelRef.current.style.transition = 'none'
        }
        setSpinning(false)
      }, 600)
    }

    const spin = ()=>{
      // if already spinning, treat as skip
      if(spinning){ skipSpin(); return }
      if(bet<=0 || bet>chips) return
      setSpinning(true)
      const p = getWinProbability()

      const rnd = Math.random()
      const win = rnd < p
      const outcomeColor = win ? choice : (choice==='red'?'black':'red')

      // compute payout net (player perspective): win -> +bet, lose -> -bet
      const payout = win ? bet : -bet

      // choose a random sector index for the outcome
      const indices = sectors.map((s,i)=> s.color === outcomeColor ? i : -1).filter(i=>i>=0)
      const chosenIndex = indices[Math.floor(Math.random()*indices.length)]
      const sectorAngle = 360 / sectors.length
      const targetAngle = (chosenIndex + 0.5) * sectorAngle
      const randomSpin = 720 + targetAngle + (Math.random()* (sectorAngle*0.6) - (sectorAngle*0.3))

      // animate
      if(wheelRef.current){
        wheelRef.current.style.transition = 'transform 3s cubic-bezier(.17,.67,.22,1)'
        wheelRef.current.style.transform = `rotate(${randomSpin}deg)`
      }

      // psychological message sometimes
      if(Math.random() < 0.5){
        setMessage(psychMessages[Math.floor(Math.random()*psychMessages.length)])
        setTimeout(()=>setMessage(''), 3000)
      }

      finishSpin(chosenIndex, randomSpin, payout, win)
    }
        </div>
      </div>
    </div>
  )
}
