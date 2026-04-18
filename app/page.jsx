import Intro from '../src/components/Intro'
import ANMList from '../src/components/ANMList'
import { Suspense } from 'react'
import H1Seo from '../src/components/H1Seo'

export default function Home() {
  return (
    <>
      <div className='w-full max-w-360 pb-12 flex flex-col gap-2 absolute [position-anchor:--section] top-[calc(anchor(bottom)+15rem)] left-[calc(anchor(left)-2rem)] z-50 px-12'>
        <h1 className="text-3xl font-bold text-[#976f47] -mb-5 [anchor-name:--book]">
          Devil Fruit Encyclopedia | 悪魔の実図鑑, Akuma no Mi Zukan
        </h1>

        <p className="mt-4 text-xl text-[#976f47] max-w-2xl">
          Explore all Devil Fruits from One Piece, including Paramecia, Logia, and Zoan types,
          their powers, users, and appearances.
        </p>
        <span className='text-sm text-gray-700 w-full block'>
          Developed by <a href="https://github.com/brunofranciscojs/" target='_blank' className='underline font-semibold'>brunofranciscojs</a>&nbsp;
          using Next.js and Tailwind CSS, most of the info are from <a href="https://onepiece.fandom.com/wiki/One_Piece_Wiki" target='_blank' className='underline'>One Piece Wiki</a>.&nbsp; <br />
          The list is incomplete, as the manga is still ongoing, if you find any missing fruit, please let me know.
        </span>

        <img src="/images/anmz.webp" alt="" className='[position-try:flip-block,flip-inline,flip-start] w-50 object-contain h-auto absolute [position-anchor:--book] top-[calc(anchor(top)-10rem)] lg:top-[calc(anchor(top)-2rem)] right-[calc(anchor(right)-2rem)] animate-[fruitFloat_10s_ease-in-out_infinite]' />
      </div>
      <Intro />
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading Encyclopedia...</div>}>
        <ANMList />
      </Suspense>
    </>
  )
}
