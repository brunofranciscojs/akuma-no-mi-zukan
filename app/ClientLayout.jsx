'use client'

import { useState, useEffect } from 'react'
import Header from '../src/components/Header'

export default function ClientLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setDarkMode(true)
    } else if (savedTheme === 'light') {
      setDarkMode(false)
    }
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  return (
    <>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      {children}
    </>
  )
}
