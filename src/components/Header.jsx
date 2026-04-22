'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { akumasnomi, slugify, desacentuar } from '../../lib/data'
import { DarkModeIcon } from './Icons'

export default function Header({ darkMode, setDarkMode }) {
    const [searchResult2, setSearchResult2] = useState([]);
    const pathname = usePathname();
    const isHome = pathname === '/' || pathname === '/what-are-devil-fruits'

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
        <header className='w-svw h-20 backdrop-blur-xl fixed top-0 left-0 shadow-xl shadow-(--shadow-color) px-4 xxs:px-8  z-10 flex items-center justify-between gap-4 bg-(--header-bg)'>
            <Link href="/" className='flex gap-4 items-center'>
                <h6 className='text-3xl font-black text-(--primary) uppercase tracking-wide leading-0 [zoom:.8] xxs:[zoom:1]'>Devil Fruit <br />
                    <sup className='text-base tracking-[.39rem] leading-[1.5rem] block'>
                        Encycl<b className='text-transparent [anchor-name:--fruit] 
                                            after:content-[""] 
                                            after:bg-[url(/fruit.webp)] 
                                            after:bg-no-repeat 
                                            after:bg-center 
                                            after:bg-contain 
                                            after:w-5 
                                            after:h-5 
                                            after:absolute 
                                            after:[position-anchor:--fruit] 
                                            after:left-[calc(anchor(left)-0.5px)]
                                            after:top-[calc(anchor(top)-4px)]'>o</b>pedia
                    </sup>
                </h6>
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
                <Link href="/what-are-devil-fruits" className='text-sm text-(--primary) hover:text-(--primary) duration-200 cursor-pointer text-right'>What are Devil Fruits?</Link>
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