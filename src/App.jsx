import './App.css'
import { Routes, Route } from 'react-router-dom'
import ANMList from './components/ANMList'
import Intro from './components/Intro'
import Header from './components/Header'
import FruitPage from './components/FruitPage'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<><Intro /><ANMList /></>} />
        <Route path="/fruta/:id" element={<FruitPage />} />
      </Routes>
    </>
  )
}

export default App
