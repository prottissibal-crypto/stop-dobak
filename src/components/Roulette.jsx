import React, {useContext, useState, useRef, useEffect} from 'react'
import { AppContext } from '../App'

const psychMessages = [
  '이번에는 될 것 같은데?',
  '방금 아까웠습니다.',
  '한 번만 더 해볼까요?',
  '조금만 더 하면 본전을 찾을 수 있을지도 모릅니다.'
]

const sectors = [
  {color:'red', label:'Red'},
  {color:'black', label:'Black'},
  {color:'red', label:'Red'},
  {color:'black', label:'Black'},
  {color:'red', label:'Red'},
  {color:'black', label:'Black'},
  {color:'green', label:'Green'} // green low odds
]

export default function Roulette(){
  const {chips,setChips,history,setHistory,setRoute} = useContext(AppContext)
  const [bet, setBet] = useState(10000) // default bet 10,000
  const [choice, setChoice] = useState('red')
  const [message, setMessage] = useState('')
  const [spinning, setSpinning] = useState(false)
  const wheelRef = useRef(null)

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

    // Determine outcome by weighted random: green lower chance
    const rnd = Math.random()
    const win = rnd < p
    // For color outcome, choose sector index accordingly
    let outcomeColor = 'black'
    if(win){
      // if win, pick the chosen color most likely; if choice green, pick green
      if(choice==='green') outcomeColor = (Math.random()<0.25? 'green': (Math.random()<0.5?'red':'black'))
      else outcomeColor = choice
    } else {
      // lose: pick other color or green
      if(choice==='green') outcomeColor = (Math.random()<0.6? 'red':'black')
      else outcomeColor = (choice==='red'? 'black':'red')
      // small chance of green
      if(Math.random() < 0.05) outcomeColor = 'green'
    }

    // compute payout
    const payout = (outcomeColor==='green') ? Math.round(bet * 14) : (outcomeColor===choice ? bet : -bet)
    const newChips = chips + payout
    const entry = {game:'roulette',bet,choice,payout,newChips,time:Date.now(),win: payout>0, outcome: outcomeColor}
    setHistory([...history, entry])
    setChips(newChips)

    // animate wheel: find sector index for outcomeColor
    const indices = sectors.map((s,i)=> s.color === outcomeColor ? i : -1).filter(i=>i>=0)
    const chosenIndex = indices[Math.floor(Math.random()*indices.length)]
    const sectorAngle = 360 / sectors.length
    const randomSpin = 720 + (chosenIndex * sectorAngle) + (sectorAngle/2) + (Math.random()*sectorAngle - sectorAngle/2)

    if(wheelRef.current){
      wheelRef.current.style.transition = 'transform 3s cubic-bezier(.17,.67,.22,1)'
      wheelRef.current.style.transform = `rotate(${randomSpin}deg)`
    }

    // psychological message sometimes
    if(Math.random() < 0.5){
      setMessage(psychMessages[Math.floor(Math.random()*psychMessages.length)])
      setTimeout(()=>setMessage(''), 3000)
    }

    // after animation end, reset rotation and state
    setTimeout(()=>{
      if(wheelRef.current){
        // normalize rotation
        wheelRef.current.style.transition = 'none'
        const normalized = randomSpin % 360
        wheelRef.current.style.transform = `rotate(${normalized}deg)`
      }
      setSpinning(false)
      // If chips depleted, auto route handled by effect
    }, 3200)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input type="number" value={bet} onChange={(e)=>setBet(Number(e.target.value))} className="bg-gray-900 px-3 py-2 rounded w-32" />
        <select value={choice} onChange={(e)=>setChoice(e.target.value)} className="bg-gray-900 px-3 py-2 rounded">
          <option value="red">Red</option>
          <option value="black">Black</option>
          <option value="green">Green (low odds)</option>
        </select>
        <button onClick={spin} disabled={spinning} className="px-4 py-2 bg-rose-600 rounded disabled:opacity-50">{spinning? '스핀 중...' : '스핀'}</button>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-64 h-64 relative">
          <div ref={wheelRef} className="w-full h-full rounded-full overflow-hidden border-4 border-gray-700" style={{transform:'rotate(0deg)'}}>
            {sectors.map((s,i)=>{
              const angle = 360 / sectors.length
              const rotate = i * angle
              return (
                <div key={i} style={{position:'absolute',width:'50%',height:'50%',top:'25%',left:'50%',transformOrigin:'0% 100%',transform:`rotate(${rotate}deg) skewY(${90-angle}deg)`}}>
                  <div style={{width:'200%',height:'200%',background:s.color==='green'? '#16a34a' : s.color==='red'? '#ef4444' : '#111827', transform:'skewY(0deg) rotate(0deg)', display:'flex', alignItems:'center', justifyContent:'flex-start', paddingLeft:8}}>
                    <span className="text-sm font-bold text-white">{s.label}</span>
                  </div>
                </div>
              )
            })}
          </div>
          <div style={{position:'absolute',left:'50%',top:'50%',transform:'translate(-50%,-50%)'}} className="pointer-events-none">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>

        <div className="flex-1">
          <div className="p-3 bg-gray-800/30 rounded">현재 베팅: <b>{bet.toLocaleString()}</b></div>
          <div className="mt-2 text-yellow-200">{message}</div>
          <div className="mt-4 text-sm text-gray-300">룰렛은 장기적으로 하우스 우위가 작동합니다. 칩이 0이 되면 체험이 자동 종료됩니다.</div>
        </div>
      </div>
    </div>
  )
}
