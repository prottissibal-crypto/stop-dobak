import React, {useContext, useMemo} from 'react'
import { AppContext } from '../App'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend)

export default function AnalysisPage(){
  const {history} = useContext(AppContext)

  const startAssets = 100000
  const current = history.length ? history[history.length-1].newChips : startAssets
  const profit = current - startAssets
  const plays = history.length
  const wins = history.filter(h=>h.win).length
  const winRate = plays? Math.round((wins/plays)*100):0

  const chartData = useMemo(()=>{
    const labels = history.map((h,i)=> new Date(h.time).toLocaleTimeString())
    const data = history.map(h=>h.newChips)
    return { labels, datasets:[{label:'잔액',data, borderColor:'rgba(99,102,241,0.9)', backgroundColor:'rgba(99,102,241,0.2)'}] }
  },[history])

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">분석 결과</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-800/40 rounded">시작 자산: <b>{startAssets.toLocaleString()}</b></div>
        <div className="p-4 bg-gray-800/40 rounded">현재 자산: <b>{current.toLocaleString()}</b></div>
        <div className="p-4 bg-gray-800/40 rounded">총 수익/손실: <b>{profit.toLocaleString()}</b></div>
        <div className="p-4 bg-gray-800/40 rounded">플레이 횟수: <b>{plays}</b> / 승률: <b>{winRate}%</b></div>
      </div>
      <div className="bg-gray-800/30 p-4 rounded">
        <h3 className="mb-2">자산 변화 그래프</h3>
        <Line data={chartData} />
      </div>
    </div>
  )
}
