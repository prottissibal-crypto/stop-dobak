import React, {useContext, useState} from 'react'
import { AppContext } from '../App'
import Roulette from './Roulette'

export default function CasinoPage(){
  const {chips, setRoute, resetSession} = useContext(AppContext)
  const [view, setView] = useState('roulette')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold">가상 카지노 체험 (교육용)</h3>
          <p className="text-sm text-gray-300">가상 칩으로만 플레이하세요. 실제 금전 거래 불가.</p>
        </div>
        <div className="text-right">
          <div className="text-sm">보유 칩</div>
          <div className="text-2xl font-bold text-emerald-300">{chips.toLocaleString()} 💠</div>
        </div>
      </div>

      <div className="flex gap-3">
        <button className={`px-3 py-1 rounded ${view==='roulette'?'bg-indigo-600':'bg-gray-700'}`} onClick={()=>setView('roulette')}>룰렛</button>
        <button className="px-3 py-1 rounded bg-red-600" onClick={()=>{setRoute('report')}}>체험 종료 및 리포트</button>
        <button className="px-3 py-1 rounded bg-gray-800" onClick={resetSession}>세션 초기화</button>
      </div>

      <div className="bg-gray-800/40 p-4 rounded">
        {view==='roulette' && <Roulette />}
      </div>
    </div>
  )
}
