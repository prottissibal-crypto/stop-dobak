import React, {useContext} from 'react'
import { AppContext } from '../App'

export default function ReportPage(){
  const {history, resetSession, setRoute} = useContext(AppContext)
  const start = 100000
  const end = history.length ? history[history.length-1].newChips : start
  const profit = end - start

  // Identify psychological cues experienced
  const cues = history.length>0 ? ['유인 문구(예: "한 번만 더 해볼까요?")와 같은 심리적 유도 메시지 표시 경험'] : ['플레이 없음']

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">최종 리포트</h2>
      <div className="p-4 bg-gray-800/40 rounded">
        <p>시작 자산: <b>{start.toLocaleString()}</b></p>
        <p>종료 자산: <b>{end.toLocaleString()}</b></p>
        <p>총 수익/손실: <b>{profit.toLocaleString()}</b></p>
        <p>플레이 통계: 총 {history.length}회</p>
      </div>

      <div className="p-4 bg-gray-800/30 rounded">
        <h3 className="font-semibold">경험한 심리적 유도 요소</h3>
        <ul className="list-disc ml-5">
          {cues.map((c,i)=>(<li key={i}>{c}</li>))}
        </ul>
        <p className="mt-2 text-sm text-gray-300">체험 중 보였던 문구들은 실제 도박 서비스에서 사용자의 판단을 흐리게 하는 심리적 장치였습니다.</p>
      </div>

      <div className="flex gap-3">
        <button className="px-4 py-2 bg-indigo-600 rounded" onClick={()=>setRoute('analysis')}>상세 분석 보기</button>
        <button className="px-4 py-2 bg-gray-700 rounded" onClick={resetSession}>세션 초기화</button>
      </div>
    </div>
  )
}
