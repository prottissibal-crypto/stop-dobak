import React, { useState, useEffect } from 'react'
import MainPage from './components/MainPage'
import CasinoPage from './components/CasinoPage'
import AnalysisPage from './components/AnalysisPage'
import EducationPage from './components/EducationPage'
import ReportPage from './components/ReportPage'
import Header from './components/Header'
import Footer from './components/Footer'

export const AppContext = React.createContext(null)

export default function App(){
  const [chips, setChips] = useState(() => {
    const saved = localStorage.getItem('stopdobak_chips')
    return saved ? Number(saved) : 100000
  })
  const [history, setHistory] = useState(() => {
    const s = localStorage.getItem('stopdobak_history')
    return s ? JSON.parse(s) : []
  })
  const [route, setRoute] = useState('main')

  useEffect(()=>{
    localStorage.setItem('stopdobak_chips', String(chips))
    localStorage.setItem('stopdobak_history', JSON.stringify(history))
  },[chips, history])

  const resetSession = ()=>{
    setChips(100000)
    setHistory([])
    setRoute('main')
  }

  return (
    <AppContext.Provider value={{chips,setChips,history,setHistory,route,setRoute,resetSession}}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-6">
          {route==='main' && <MainPage />}
          {route==='casino' && <CasinoPage />}
          {route==='analysis' && <AnalysisPage />}
          {route==='education' && <EducationPage />}
          {route==='report' && <ReportPage />}
        </main>
        <Footer />
      </div>
    </AppContext.Provider>
  )
}
