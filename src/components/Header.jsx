import { Link, useLocation } from 'react-router-dom'
import hLogo from '../assets/h-logo.webp'
import { useRef, useState, useEffect } from 'react'
import akumasnomi from '../assets/akumanomi2.json'

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

export default function Header() {
    const sRef = useRef(null);
    const [searchResult2, setSearchResult2] = useState([]);
    const location = useLocation();
    const isHome = location.pathname === '/'
    const desacentuar = (busca) => busca.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    const busca = (name) => {
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
        <header className='w-svw h-20 bg-white/80 backdrop-blur-xl fixed top-0 left-0 shadow-xl shadow-[#976f47]/10 px-12 z-10 flex items-center justify-between'>
            <Link to="/">
                <img src={hLogo} alt="" className='w-50 object-contain' />
            </Link>

            {!isHome &&
                <div className='relative w-[70%]'>
                    <input ref={sRef} type="text" placeholder="Search"
                        popoverTargetAction='show'
                        popoverTarget='search-results'
                        onFocus={() => sRef.current?.scrollIntoView({ behavior: 'smooth' })}
                        onClick={() => document.querySelector('#search-result').showPopover()}
                        onInput={(e) => busca(e.target.value)}
                        className='scroll-mt-24 w-full px-7 py-4 backdrop-blur-lg rounded-2xl border-[#976f47] border [anchor-name:--search] outline-0'
                    />

                    <div {...{ popover: '' }} id='search-result'
                        className='[&:popover-open]:flex flex-col gap-3 justify-start [&_button]:w-fit absolute shadow-xl
                                [position-anchor:--search] 
                                w-[anchor-size(width)] 
                                top-[calc(anchor(top)+3.7rem)] 
                                left-[anchor(left)] 
                                z-40 backdrop-blur-xl rounded-b-2xl max-h-100 overflow-y-scroll [&_a:nth-child(1)]:pt-6
                                [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[#976f47] [&::-webkit-scrollbar-thumb]:rounded-full'
                    >
                        {searchResult2.map(fruit => (
                            <Link key={fruit.id} to={`/fruta/${slugify(fruit.name)}`}
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
        </header>
    )
}