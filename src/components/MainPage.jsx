import React, {useContext} from 'react'
import { AppContext } from '../App'

export default function MainPage(){
  const {setRoute} = useContext(AppContext)
  return (
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-4xl font-extrabold neon mb-4">도박은 왜 위험한가?</h2>
      <p className="mb-6 text-lg">이 체험은 도박의 작동 원리와 심리적 유도 장치가 어떻게 작동하는지 보여줍니다. 실제 돈 거래는 없습니다.</p>
      <div className="space-x-3">
        <button onClick={()=>setRoute('casino')} className="px-6 py-3 bg-indigo-600 rounded-md shadow hover:bg-indigo-500">시작하기</button>
        <button onClick={()=>setRoute('education')} className="px-6 py-3 bg-gray-700 rounded-md shadow hover:bg-gray-600">교육 알아보기</button>
      </div>
    </div>
  )
}
