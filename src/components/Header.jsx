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
        <header className='w-svw h-20 backdrop-blur-xl fixed top-0 left-0 shadow-xl shadow-[#976f47]/10 px-12 z-10 flex items-center justify-between gap-4 bg-white/80'>
            <Link href="/">
                <h1 className='sr-only'>Devil Fruit Encyclopedia</h1>
                <img src="/h-logo.webp" alt="Devil Fruit Encyclopedia" className='w-50 object-contain' />
            </Link>

            {!isHome &&
                <div className='relative w-[70%]'>
                    <input type="text" placeholder="Search"
                        popoverTargetAction='show'
                        popoverTarget='search-results'
                        onClick={() => document.querySelector('#search-result').showPopover()}
                        onInput={(e) => busca2(e.target.value)}
                        className='scroll-mt-24 w-full px-7 py-2 backdrop-blur-lg rounded-lg border-[#976f47] border [anchor-name:--search] outline-0'
                    />

                    <div {...{ popover: '' }} id='search-result'
                        className='[&:popover-open]:flex flex-col gap-3 bg-white/90 justify-start [&_button]:w-fit absolute shadow-xl  
                                [position-anchor:--search] 
                                w-[anchor-size(width)] 
                                top-[calc(anchor(top)+3rem)] 
                                left-[anchor(left)] 
                                z-40 backdrop-blur-sm rounded-b-2xl max-h-100 overflow-y-scroll [&_a:nth-child(1)]:pt-6
                                [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[#976f47] [&::-webkit-scrollbar-thumb]:rounded-full'
                    >
                        {searchResult2.map(fruit => (
                            <Link key={fruit.id} href={`/fruit/${slugify(fruit.name)}`}
                                className='px-6 py-2 hover:text-[#976f47] hover:bg-[#976f47]/5 cursor-pointer transition-colors flex flex-col cl:flex-row gap-3 cl:items-center items-start relative'>

                                <div className='flex gap-2 items-center'>
                                    <img src={`/images/fruits/${fruit.localImg}`} className='w-6 h-6 object-contain -translate-y-1' />
                                    <span className='flex flex-col text-sm' style={{ anchorName: `--${fruit.id}` }}>
                                        <sup className='opacity-60 w-fit'>{fruit.engName}  •</sup>
                                        {fruit.name}
                                    </span> <span className='hidden cl:block'>• {fruit.jpName}</span>
                                </div>
                                <span className='text-white text-[.7rem] w-fit bg-[#976f47] rounded-full px-2 hidden ssm:block fixed cl:relative left-[calc(anchor(right)+1rem)] top-[calc(anchor(top))]' style={{ positionAnchor: `--${fruit.id}` }}>{fruit.type}</span>
                            </Link>
                        ))}
                    </div>

                </div>}
            <div className='flex items-center gap-2'>
                {/* <button onClick={() => setDarkMode(!darkMode)}>
                    <DarkModeIcon with={55} height={55} className="[&_path]:fill-[#976f47aa] hover:[&_path]:fill-[#976f47]" />
                </button> */}
                <Link href="https://github.com/brunofranciscojs/akuma-no-mi-zukan"
                    className='flex flex-col gap-2'
                    onMouseEnter={() => document.querySelector('#github').showPopover()}
                    target='_blank'>
                    <GitHubIcon with={35} height={35} className="[&_path]:fill-[#976f47aa] hover:[&_path]:fill-[#976f47] [anchor-name:--github]" />
                    <span {...{ popover: '' }} id="github"
                        className='text-xs text-nowrap  text-white px-1.5 py-1 fixed rounded-sm leading-none bg-[#976f47] 
                                    [position-anchor:--github] top-[calc(anchor(bottom)+1.4rem)] left-[calc(anchor(left)-2.8rem)]'>
                        see on github
                    </span>
                </Link>
            </div>
        </header>
    )
}