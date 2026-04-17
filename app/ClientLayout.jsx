'use client'

import { useState, useEffect } from 'react'
import Header from '../src/components/Header'

export default function ClientLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      {children}
    </>
  )
}
