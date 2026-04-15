import './App.css'
import { Routes, Route } from 'react-router-dom'
import ANMList from './components/ANMList'
import Intro from './components/Intro'
import Header from './components/Header'
import FruitPage from './components/FruitPage'
import { HelmetProvider } from 'react-helmet-async'
import { useState, useEffect } from 'react'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route path="/" element={<><Intro /><ANMList /></>} />
        <Route path="/fruta/:id" element={<HelmetProvider><FruitPage /></HelmetProvider>} />
      </Routes>
    </div>
  )
}

export default App
