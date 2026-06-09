import React, {useContext, useState} from 'react'
import { AppContext } from '../App'

// 간단한 슬롯머신: 플레이 횟수에 따라 승률이 감소하도록 설계
export default function SlotMachine(){
  const {chips,setChips,history,setHistory} = useContext(AppContext)
  const [bet, setBet] = useState(1000)
  const [message, setMessage] = useState('')

  const psychMessages = [
    '이번에는 될 것 같은데?',
    '방금 아까웠습니다.',
    '한 번만 더 해볼까요?',
    '조금만 더 하면 본전을 찾을 수 있을지도 모릅니다.'
  ]

  function getWinProbability(){
    const plays = history.length || 0
    // 처음 몇 번은 약간 유리하게, 이후는 하우스 우위 증가
    if(plays < 3) return 0.5
    if(plays < 10) return 0.35
    return Math.max(0.1, 0.25 - plays*0.005)
  }

  const play = ()=>{
    if(bet<=0 || bet>chips) return
    const p = getWinProbability()
    const rnd = Math.random()
    const win = rnd < p
    const payout = win ? Math.round(bet * (1 + Math.random()*2)) : -bet
    const newChips = chips + payout
    setChips(newChips)
    const entry = {game:'slot',bet,payout,newChips,time:Date.now(),win}
    setHistory([...history, entry])
    // Show a random psychological message sometimes
    if(Math.random() < 0.4){
      setMessage(psychMessages[Math.floor(Math.random()*psychMessages.length)])
      setTimeout(()=>setMessage(''), 3500)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        <input type="number" value={bet} onChange={(e)=>setBet(Number(e.target.value))} className="bg-gray-900 px-3 py-2 rounded w-32" />
        <button onClick={play} className="px-4 py-2 bg-emerald-600 rounded">플레이</button>
      </div>
      <div className="mt-3 text-yellow-200">{message}</div>
      <div className="mt-4 text-sm text-gray-300">규칙: 초기 보상은 높지만, 플레이가 누적될수록 기대값이 감소합니다.</div>
    </div>
  )
}
