'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef, useState, useEffect } from 'react'
import { akumasnomi, slugify, desacentuar } from '../../lib/data'
import { GitHubIcon, DarkModeIcon } from './Icons'

export default function Header({ darkMode, setDarkMode }) {
    const [searchResult2, setSearchResult2] = useState([]);
    const pathname = usePathname();
    const isHome = pathname === '/'

    const busca2 = (name) => {
        if (!name.trim()) {
            setSearchResult2([]);
            return;
        }
        const termo = akumasnomi.filter(fruit => {
            const fruitName = desacentuar(fruit.name)
            const engName = desacentuar(fruit.engName.replace(/\-/g, ' '))
            const owner = desacentuar(Array.isArray(fruit.owner) ? fruit.owner.join(' ') : fruit.owner)
            return fruitName.includes(name.toLowerCase()) || engName.includes(name.toLowerCase()) || owner.includes(name.toLowerCase())
        })
        setSearchResult2(termo)
    }

    return (
        <header className='w-svw h-20 backdrop-blur-xl fixed top-0 left-0 shadow-xl shadow-(--shadow-color) px-12 z-10 flex items-center justify-between gap-4 bg-(--header-bg)'>
            <Link href="/">
                <img src="/h-logo.webp" alt="Devil Fruit Encyclopedia" className='w-50 object-contain' />
            </Link>

            {!isHome &&
                <div className='relative w-[70%]'>
                    <input type="text" placeholder="Search"
                        popoverTargetAction='show'
                        popoverTarget='search-results'
                        onClick={() => document.querySelector('#search-result').showPopover()}
                        onInput={(e) => busca2(e.target.value)}
                        className='scroll-mt-24 w-full px-7 py-2 backdrop-blur-lg rounded-lg border-(--primary) border [anchor-name:--search] outline-0 bg-transparent text-(--text-primary) placeholder:text-(--text-muted)/50'
                    />

                    <div {...{ popover: '' }} id='search-result'
                        className='[&:popover-open]:flex flex-col gap-3 bg-(--header-bg) justify-start [&_button]:w-fit absolute shadow-xl  
                                [position-anchor:--search] 
                                sm:w-[anchor-size(width)]
                                w-[95%] 
                                top-[calc(anchor(top)+3rem)] 
                                sm:left-[anchor(left)] 
                                left-4
                                z-40 backdrop-blur-sm rounded-b-2xl max-h-100 overflow-y-scroll [&_a:nth-child(1)]:pt-6
                                [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-(--primary) [&::-webkit-scrollbar-thumb]:rounded-full'
                    >
                        {searchResult2.map(fruit => (
                            <Link key={fruit.id} href={`/fruit/${slugify(fruit.name)}`}
                                className='px-6 py-2 hover:text-(--primary) hover:bg-(--primary)/5 cursor-pointer transition-colors flex flex-col cl:flex-row gap-3 cl:items-center items-start relative text-(--text-primary)'>

                                <div className='flex gap-2 items-center'>
                                    <img src={`/images/fruits/${fruit.localImg}`} className='w-6 h-6 object-contain -translate-y-1' />
                                    <span className='flex flex-col text-sm' style={{ anchorName: `--${fruit.id}` }}>
                                        <sup className='opacity-60 w-fit'>{fruit.engName}  •</sup>
                                        {fruit.name}
                                    </span> <span className='hidden cl:block opacity-70'>• {fruit.jpName}</span>
                                </div>
                                <span className='text-white text-[.7rem] w-fit bg-(--primary) rounded-full px-2 hidden ssm:block fixed cl:relative left-[calc(anchor(right)+1rem)] top-[calc(anchor(top))]' style={{ positionAnchor: `--${fruit.id}` }}>{fruit.type}</span>
                            </Link>
                        ))}
                    </div>

                </div>}
            <div className='flex items-center gap-2'>
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    onMouseEnter={() => document.querySelector('#theme-tooltip').showPopover()}
                    className='relative flex items-center justify-center'
                >
                    <DarkModeIcon with={35} height={35} className={`transition-all duration-300 [&_path]:fill-(--primary)/60 hover:[&_path]:fill-(--primary) [anchor-name:--theme] ${darkMode ? 'rotate-180' : 'rotate-0'}`} />
                    <span {...{ popover: '' }} id="theme-tooltip"
                        className='text-xs text-nowrap text-white px-1.5 py-1 fixed rounded-sm leading-none bg-(--primary) 
                                    [position-anchor:--theme] top-[calc(anchor(bottom)+1.4rem)] left-[calc(anchor(left)-1.5rem)]'>
                        {darkMode ? 'light mode' : 'dark mode'}
                    </span>
                </button>
            </div>
        </header>
    )
}