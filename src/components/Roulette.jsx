import React, {useContext, useState} from 'react'
import { AppContext } from '../App'

const psychMessages = [
  '이번에는 될 것 같은데?',
  '방금 아까웠습니다.',
  '한 번만 더 해볼까요?',
  '조금만 더 하면 본전을 찾을 수 있을지도 모릅니다.'
]

export default function Roulette(){
  const {chips,setChips,history,setHistory} = useContext(AppContext)
  const [bet, setBet] = useState(500)
  const [choice, setChoice] = useState('red')
  const [message, setMessage] = useState('')

  function getWinProbability(){
    const plays = history.length || 0
    if(plays < 4) return 0.48
    if(plays < 12) return 0.33
    return Math.max(0.1, 0.28 - plays*0.004)
  }

  const spin = ()=>{
    if(bet<=0 || bet>chips) return
    const p = getWinProbability()
    const rnd = Math.random()
    const win = rnd < p
    const payout = win ? Math.round(bet * 2) : -bet
    const newChips = chips + payout
    setChips(newChips)
    const entry = {game:'roulette',bet,choice,payout,newChips,time:Date.now(),win}
    setHistory([...history, entry])
    if(Math.random() < 0.45){
      setMessage(psychMessages[Math.floor(Math.random()*psychMessages.length)])
      setTimeout(()=>setMessage(''), 3200)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <input type="number" value={bet} onChange={(e)=>setBet(Number(e.target.value))} className="bg-gray-900 px-3 py-2 rounded w-28" />
        <select value={choice} onChange={(e)=>setChoice(e.target.value)} className="bg-gray-900 px-3 py-2 rounded">
          <option value="red">Red</option>
          <option value="black">Black</option>
          <option value="green">Green (low odds)</option>
        </select>
        <button onClick={spin} className="px-4 py-2 bg-rose-600 rounded">스핀</button>
      </div>
      <div className="mt-3 text-yellow-200">{message}</div>
      <div className="mt-4 text-sm text-gray-300">룰렛은 장기적으로 하우스 우위가 작동합니다. 이 체험은 교육 목적입니다.</div>
    </div>
  )
}
