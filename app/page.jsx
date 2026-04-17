import Intro from '../src/components/Intro'
import ANMList from '../src/components/ANMList'
import { Suspense } from 'react'

export default function Home() {
  return (
    <>
      <Intro />
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading Encyclopedia...</div>}>
        <ANMList />
      </Suspense>
    </>
  )
}
