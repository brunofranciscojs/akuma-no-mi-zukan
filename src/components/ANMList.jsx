import akumasnomi from '../assets/akumanomi.json'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ANMList() {
    const [pagina, setPagina] = useState(1);
    const [fruitsPerPage, setFruitsPerPage] = useState(12);
    const [type, setType] = useState('all');
    const [searchResult, setSearchResult] = useState([]);

    const filteredFruits = akumasnomi.filter(fruit => type === 'all' || fruit.type === type);
    const totalPages = Math.ceil(filteredFruits.length / fruitsPerPage);
    const paginas = [];

    for (let i = 1; i <= totalPages; i++) {
        paginas.push(i);
    }

    const lastFruitIndex = pagina * fruitsPerPage;
    const firstFruitIndex = lastFruitIndex - fruitsPerPage;
    const currentFruits = filteredFruits.slice(firstFruitIndex, lastFruitIndex);

    const handleTypeChange = (newType) => {
        setType(newType);
        setPagina(1);
    }

    let uniqueTypes = [...new Set(akumasnomi.map(p => p.type.split(' ').length > 1 ? p.type.split(' ')[1] : p.type).filter(Boolean))];

    const desacentuar = (busca) => busca.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    const busca = (name) => {
        if (!name.trim()) {
            setSearchResult([]);
            return;
        }
        const termo = akumasnomi.filter(fruit => {
            const fruitName = desacentuar(fruit.name)
            const engName = desacentuar(fruit.engName.replace(/\-/g, ' '))
            const owner = desacentuar(Array.isArray(fruit.owner) ? fruit.owner.join(' ') : fruit.owner)
            return fruitName.includes(name.toLowerCase()) || engName.includes(name.toLowerCase()) || owner.includes(name.toLowerCase())
        })
        setSearchResult(termo)
    }

    return (
        <section className='mx-auto py-44 relative px-8 xl:px-12 w-svw
                            after:content-[""] after:absolute after:inset-0 after:w-full after:h-full after:bg-[url(./assets/pattern.avif)] 
                            after:bg-size-[10%] after:bg-repeat after:opacity-5 after:-z-1 after:pointer-events-none'>

            <div className='grid xl:[grid-template-areas:"types_pagination""search_search"] [grid-template-areas:"types_types""pagination_pagination""search_search"] gap-4 flex-wrap justify-between mb-12 max-w-360 mx-auto'>

                <div className='flex flex-row gap-2 [grid-area:types] [anchor-name:--types] 
                    after:content-["Types:"] justify-center xl:justify-start
                    after:absolute after:[position-anchor:--types] after:top-[calc(anchor(top)-1.4rem)] 
                    after:left-[anchor(center)] xl:after:left-[anchor(left)] after:text-[#976f47] after:text-sm'>

                    <button className='hover:bg-[#976f47] rounded-full px-4 text-[#976f47] hover:text-white! duration-200! transition-all text-base cursor-pointer hover:opacity-100! outline-[#976f47] outline-1'
                        style={{ backgroundColor: type === 'all' ? '#976f47' : '', color: type === 'all' ? 'white' : '#976f47' }}
                        onClick={() => handleTypeChange('all')}>
                        All
                    </button>
                    {uniqueTypes.map((cat, i) => (
                        <button className='hover:bg-[#976f47] rounded-full px-4 text-[#976f47] hover:text-white! duration-200! transition-all text-base cursor-pointer hover:opacity-100! outline-[#976f47] outline-1'
                            key={i}
                            style={{ backgroundColor: type === cat ? '#976f47' : '', color: type === cat ? 'white' : '#976f47' }}
                            onClick={() => handleTypeChange(cat)}>
                            {cat}
                        </button>
                    ))}
                </div>

                <ol className='[grid-area:pagination] pagination [&::-webkit-scrollbar]:w-0 items-center justify-center xl:justify-end flex gap-2 overflow-y-scroll text-gray-700 [&:has(.active)_.active]:bg-[#976f47] [&:has(.active)_.active]:text-white scroll-smooth'>
                    {paginas.map(number => {
                        return (
                            <input type='button'
                                key={number}
                                value={number}
                                placeholder={number}
                                onClick={() => setPagina(number)}
                                className={pagina === number ? "active px-2 rounded-sm" : "px-2 rounded-sm text-[#976f47]"}
                            />
                        )
                    })}
                </ol>

                <div className='relative [grid-area:search]'>
                    <input type="text" placeholder="Search"
                        popoverTargetAction='show'
                        popoverTarget='search-results'
                        onClick={() => document.querySelector('#search-result').showPopover()}
                        onInput={(e) => busca(e.target.value)}
                        className='w-full px-7 py-4 backdrop-blur-lg rounded-2xl border-[#976f47] border [anchor-name:--search] focus-within:rounded-b-none focus-within:[border-bottom:none] outline-0'
                    />

                    <div {...{ popover: '' }} id='search-result'
                        className='[&:popover-open]:flex flex-col gap-3 justify-start [&_button]:w-fit bg-[#fdf9eeaa] absolute shadow-xl
                                    [position-anchor:--search] 
                                    w-[anchor-size(width)] 
                                    top-[calc(anchor(top)+3.7rem)] 
                                    left-[anchor(left)] 
                                    z-40 backdrop-blur-xl rounded-b-2xl max-h-100 overflow-y-scroll
                                    [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[#976f47] [&::-webkit-scrollbar-thumb]:rounded-full'>
                        {searchResult.map(fruit => (
                            <Link key={fruit.id} to={`/fruta/${fruit.id}`}
                                className='px-6 py-2 hover:text-[#976f47] hover:bg-[#976f47]/5 cursor-pointer transition-colors flex gap-3 items-center'>
                                <img src={`/src/assets/images/fruits/${fruit.localImg}`} className='w-6' /> {fruit.name} • {fruit.jpName}
                            </Link>
                        ))}
                    </div>

                </div>

            </div>


            <div className='flex flex-row gap-6 flex-wrap max-w-360 mx-auto'>

                {currentFruits.map((fruit, i) => (
                    <Link key={fruit.id} to={`/fruta/${fruit.id}`}
                        style={{ "--color": fruit.localImg.includes('svg') ? '#976f47' : fruit.color, "--mix": `color-mix(in srgb, var(--color), white 50%)` }}
                        className='xl:w-[31%] md:w-[47%] w-full border border-[#976f4755] hover:bg-white backdrop-blur-sm duration-300 p-5 grow rounded-xl relative transition-colors min-h-50 flex gap-4 items-center no-underline text-inherit group'>

                        <div className='w-1/3 h-24 shrink-0' style={{ anchorName: `--svg-${i}`, "--size": `--svg-${i}`, "--mask": `url(/src/assets/images/fruits/${fruit.localImg})` }}>
                            <img src={`/src/assets/images/fruits/${fruit.localImg}`}
                                draggable='false' alt={fruit.name} className='w-full h-full object-contain select-none filter-[drop-shadow(0_0_40px_var(--mix))]'
                            />
                        </div>

                        <div className='flex flex-col pr-2'>
                            <h3 className='font-extrabold text-xl font-["Calibri"] text-[#976f47] leading-none text-balance'>
                                <ruby className='ruby-base'>
                                    {fruit.name}
                                    <rt className='text-sm uppercase tracking-[0.2em] font-normal translate-y-1 -translate-x-2'>「{fruit.jpName}」</rt>
                                </ruby>
                            </h3>
                            <span className='text-xs leading-none text-[#976f47]'>EN: {fruit.engName}</span>
                            <p className='text-md text-gray-900 line-clamp-2 mt-2 leading-none'>{fruit.excerpt}</p>

                            <span className='text-[.6rem] mt-1 uppercase text-[#976f47] w-fit [&_span]:font-bold' style={{ anchorName: `--link-${i}`, "--extLnk": `--link-${i}` }}>
                                User(s): {Array.isArray(fruit.owner) ?
                                    fruit.owner.map((o, i) => (
                                        <React.Fragment key={i}>
                                            {i > 0 && ', '}
                                            <span>{o}</span>
                                        </React.Fragment>
                                    )) :
                                    <span>{fruit.owner || 'desconhecido'}</span>
                                }
                            </span>

                        </div>
                        <span className='text-white text-[.65rem] uppercase w-fit tracking-tighter bg-[#976f47] rounded-full px-2 absolute top-4 right-4'>{fruit.type}</span>
                    </Link>
                ))}
            </div>
            <ol className='pagination [&::-webkit-scrollbar]:w-0 items-center justify-center flex gap-2 overflow-y-scroll mt-12 text-gray-700 [&:has(.active)_.active]:bg-[#976f47] [&:has(.active)_.active]:text-white scroll-smooth'>
                {paginas.map(number => {
                    return (
                        <input type='button'
                            key={number}
                            value={number}
                            placeholder={number}
                            onClick={() => setPagina(number)}
                            className={pagina === number ? "active px-2 rounded-sm" : "px-2 rounded-sm"}
                        />
                    )
                })}
            </ol>
        </section>
    )
}
