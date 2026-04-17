'use client'

import React, { useState, useEffect, useRef, useTransition } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { akumasnomi, slugify, desacentuar } from '../../lib/data'

export default function ANMList() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const pagina = parseInt(searchParams.get('page') || '1', 10);
    const type = searchParams.get('type') || 'all';

    const [fruitsPerPage, setFruitsPerPage] = useState(12);
    const [searchResult, setSearchResult] = useState([]);
    const sRef = useRef(null);

    const updateParams = (newParams) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(newParams).forEach(([key, value]) => {
            if (value === null) {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        });

        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        });
    };

    const setPagina = (num) => updateParams({ page: num });
    const setType = (newType) => updateParams({ type: newType, page: 1 });

    const filteredFruits = akumasnomi.filter(fruit => type === 'all' || fruit.type === type);
    const totalPages = Math.ceil(filteredFruits.length / fruitsPerPage);
    const paginas = [];

    for (let i = 1; i <= totalPages; i++) {
        paginas.push(i);
    }

    const lastFruitIndex = pagina * fruitsPerPage;
    const firstFruitIndex = lastFruitIndex - fruitsPerPage;
    const currentFruits = filteredFruits.slice(firstFruitIndex, lastFruitIndex);

    let uniqueTypes = [...new Set(akumasnomi.map(p => p.type.split(' ').length > 1 ? p.type.split(' ')[1] : p.type).filter(Boolean))];

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
                            after:content-[""] after:absolute after:inset-0 after:w-full after:h-full after:bg-[url(/pattern.avif)] 
                            after:bg-size-[10%] after:bg-repeat after:opacity-5 after:-z-1 after:pointer-events-none'>

            <div className='grid xl:[grid-template-areas:"types_pagination""search_search"] [grid-template-areas:"types_types""pagination_pagination""search_search"] gap-4 justify-between mb-6 max-w-360 mx-auto'>

                <div className='flex flex-row gap-2 [grid-area:types] [anchor-name:--types] h-6
                    after:content-["Types:"] justify-center xl:justify-start
                    after:absolute after:[position-anchor:--types] after:top-[calc(anchor(top)-1.4rem)] 
                    after:left-[anchor(center)] xl:after:left-[anchor(left)] after:text-[#976f47] after:text-sm'>

                    <button className='hover:bg-[#976f47] rounded-full px-4 text-[#976f47] hover:text-white! duration-200! transition-all leading-0! cursor-pointer hover:opacity-100! outline-[#976f47] outline-1'
                        style={{ backgroundColor: type === 'all' ? '#976f47' : '', color: type === 'all' ? 'white' : '#976f47' }}
                        onClick={() => updateParams({ type: 'all', page: 1 })}>
                        All
                    </button>
                    {uniqueTypes.map((cat, i) => (
                        <button className='hover:bg-[#976f47] rounded-full px-4 text-[#976f47] hover:text-white! duration-200! transition-all leading-0! cursor-pointer hover:opacity-100! outline-[#976f47] outline-1'
                            key={i}
                            style={{ backgroundColor: type === cat ? '#976f47' : '', color: type === cat ? 'white' : '#976f47' }}
                            onClick={() => updateParams({ type: cat, page: 1 })}>
                            {cat}
                        </button>
                    ))}
                </div>

                <ol className={`[grid-area:pagination] cl:w-fit w-full mx-auto pagination [&::-webkit-scrollbar]:w-0 items-center justify-start xl:justify-end flex gap-2 overflow-x-scroll text-gray-700 transition-opacity ${isPending ? 'opacity-50' : ''} [&:has(.active)_.active]:bg-[#976f47] [&:has(.active)_.active]:text-white scroll-smooth`}>
                    {paginas.map(number => {
                        return (
                            <button type='button'
                                key={number}
                                onClick={() => { setPagina(number); console.log(number) }}
                                className={pagina === number ? "active px-2 rounded-sm" : "px-2 rounded-sm text-[#976f47] hover:text-white! hover:bg-[#976f47] cursor-pointer"}
                            >
                                {number}
                            </button>
                        )
                    })}
                </ol>

                <div className='relative [grid-area:search]'>
                    <input ref={sRef} type="text" placeholder="Search"
                        popoverTargetAction='show'
                        popoverTarget='search-results'
                        onClick={() => { document.querySelector('#search-result').showPopover(); sRef.current?.scrollIntoView({ behavior: 'smooth' }) }}
                        onInput={(e) => busca(e.target.value)}
                        className='scroll-mt-24 w-full px-7 py-4 backdrop-blur-lg rounded-2xl border-[#976f47] border [anchor-name:--search] outline-0'
                    />

                    <div {...{ popover: '' }} id='search-result'
                        className='[&:popover-open]:flex flex-col gap-3 justify-start [&_button]:w-fit bg-[#fdf9eeaa] absolute shadow-xl
                                    [position-anchor:--search] 
                                    w-[anchor-size(width)] 
                                    top-[calc(anchor(top)+3.7rem)] 
                                    left-[anchor(left)] 
                                    z-40 backdrop-blur-xl rounded-b-2xl max-h-100 overflow-y-scroll [&_a:nth-child(1)]:pt-6
                                    [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[#976f47] [&::-webkit-scrollbar-thumb]:rounded-full'
                    >
                        {searchResult.map(fruit => (
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

                </div>

            </div>


            <div className='flex flex-row gap-6 flex-wrap max-w-360 mx-auto'>
                {type === 'Logia' &&
                    <div className='flex flex-col gap-2 text-[#976f47]'>
                        <h2 className="text-[#976f47] font-bold">
                            Logia •「自然系: ロギア」
                        </h2>
                        <span>
                            Is an Ancient Greek word originating from religious scholarship and roughly translates as "sayings, utterances, oracles"
                            Logia is the rarest of the 3 Devil Fruit types. Users are granted the power to transform their body's composition into a natural element, as well as create and control it.
                            If a Logia user transforms part of their body, any effect of the attack on the user's elemental form is superficial and the body can be reformed with no issue.
                            The most common way to bypass Logias is by using Busoshoku Haki. Haki does not prevent Logia users from transforming rather, once a Haki-imbued object makes contact with a transformed body, the body part that is struck reverts to its solid form.
                            The elements that Logia users transform into can also have a significant effect on their surrounding environment, from the land and water around them to even the climate.
                        </span>
                    </div>
                }
                {type === 'Paramecia' &&
                    <div className='flex flex-col gap-2 text-[#976f47]'>
                        <h2 className="text-[#976f47] font-bold">Paramecia • 超人系: パラミシア」</h2>
                        <span>
                            The kanji for "Paramecia" include the term chōjin (超人?), meaning "superhuman".
                            Paramecia being the most common and diverse of the 3. Fruits of this type allows the consumer to achieve one of a large variety of abilities.
                            Just about every Paramecia ability can be placed in 4 categories: altering the user's body(Buki Buki no mi) Transforming their body or certain parts, into organic and inorganic material,
                            manipulating the environment (Ope Ope no mi) Enables their users to achieve an unnatural effect on the area around them,
                            and generating a substance(Ito Ito no mi) Enables the user to create their substance and shape it as desired. However, users cannot transform their bodies into substances, and then powers that cant fit into the 3(Toki-Toki fruit).
                            In addition, there exists a special sub-class known as Special Paramecia, which grant abilities similar to logias(Mochi Mochi no mi).
                        </span>
                    </div>
                }
                {type === 'Zoan' &&
                    <div className='flex flex-col gap-2 text-[#976f47]'>
                        <h2 className="text-[#976f47] font-bold">Zoan •「動物系: ゾオン」</h2>
                        <span>
                            Comes from the Ancient Greek zôia, which means "animal".
                            Zoan Devil Fruits grant the ability to transform into a certain animal species.
                            Zoans are said to have "a will of their own," even before consumption.
                            Generally, a Zoan-type Devil Fruit provides the user with 3 basic forms that they can change between:
                            Human Form: The user's natural form prior to consuming the fruit.
                            Hybrid Form: Combination between there human form and beast form.
                            Beast Form: User is fully transformed into the fruit-bestowed species.
                            Ancient Zoan: Rarer type of Zoan. Allows the users to transform into ancient and extinct animals(Neko Neko no mi Model: Saber tiger).
                            Mythical Zoan: Exceptionally rare &amp; powerful. Allows users to transform into mythological creatures(Tori Tori no mi Model: Phoenix).
                        </span>
                    </div>
                }
                {currentFruits.map((fruit, i) => (
                    <Link key={fruit.id} href={`/fruit/${slugify(fruit.name)}`}
                        style={{ "--color": fruit.localImg.includes('svg') ? '#976f47' : fruit.color, "--mix": `color-mix(in srgb, var(--color), white 50%)` }}
                        className='xl:w-[31%] md:w-[47%] w-full border border-[#976f4755] hover:bg-white backdrop-blur-sm duration-300 p-5 grow rounded-xl relative transition-colors min-h-50 flex gap-4 items-center no-underline text-inherit group'>

                        <div className='w-1/3 h-24 shrink-0' style={{ anchorName: `--svg-${i}`, "--size": `--svg-${i}`, "--mask": `url(/images/fruits/${fruit.localImg})` }}>
                            <img src={`/images/fruits/${fruit.localImg}`}
                                draggable='false' alt={fruit.name} className='w-full h-full object-contain select-none filter-[drop-shadow(0_0_40px_var(--mix))]'
                            />
                        </div>

                        <div className='flex flex-col pr-3'>
                            <h3 className='font-extrabold text-xl font-["Calibri"] text-[#976f47] leading-none text-balance'>
                                <ruby className='ruby-base'>
                                    {fruit.name.split(",").map((part, i) => (
                                        <React.Fragment key={i}>
                                            {part}
                                            {i === 0 && <br />}
                                        </React.Fragment>
                                    ))}
                                    <rt className='text-sm uppercase font-normal translate-y-1 -translate-x-2'>
                                        「{fruit.jpName}」
                                    </rt>
                                </ruby>
                            </h3>
                            <span className='text-xs leading-none text-[#976f47]'>EN: {fruit.engName}</span>
                            <p className='text-md text-gray-900 text-balance mt-2 leading-none'>{fruit.excerpt}</p>

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
                        {type === 'all' && <span className='text-white text-[.7rem] w-fit bg-[#976f47] rounded-full px-2 absolute top-3 right-4'>{fruit.type}</span>}
                    </Link>
                ))}
            </div>
            <ol className={`pagination [&::-webkit-scrollbar]:w-0 items-center justify-start cl:w-fit w-full mx-auto flex gap-2 overflow-x-scroll mt-12 text-gray-700 transition-opacity ${isPending ? 'opacity-50' : ''} [&:has(.active)_.active]:bg-[#976f47] [&:has(.active)_.active]:text-white scroll-smooth`}>
                {paginas.map(number => {
                    return (
                        <button type='button'
                            key={number}
                            onClick={() => setPagina(number)}
                            className={pagina === number ? "active px-2 rounded-sm" : "px-2 rounded-sm"}
                        >
                            {number}
                        </button>
                    )
                })}
            </ol>
            <span className='text-center text-sm text-gray-500 absolute bottom-2 left-1/2 w-full px-12 -translate-x-1/2 block'>
                This list includes only fruits showed in the manga, anime and movies (including non-canon) <br />
                found something wrong, or want to contribute? <b><a href="https://github.com/brunofranciscojs/akuma-no-mi-zukan/issues/new" target='_blank'>click here</a></b>
            </span>
        </section>
    )
}
