import React, {useContext} from 'react'
import { AppContext } from '../App'

export default function Header(){
  const {setRoute} = useContext(AppContext)
  return (
    <header className="bg-gradient-to-r from-purple-900 via-indigo-900 to-black py-4 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold neon">Stop Dobak</h1>
        <nav className="space-x-3">
          <button className="px-3 py-1 rounded bg-gray-800/60" onClick={()=>setRoute('main')}>메인</button>
          <button className="px-3 py-1 rounded bg-gray-800/60" onClick={()=>setRoute('casino')}>체험 시작</button>
          <button className="px-3 py-1 rounded bg-gray-800/60" onClick={()=>setRoute('analysis')}>분석</button>
          <button className="px-3 py-1 rounded bg-gray-800/60" onClick={()=>setRoute('education')}>교육</button>
        </nav>
      </div>
    </header>
  )
}
