import { akumasnomi, slugify, getFruitBySlug } from '../../../lib/data'
import Link from 'next/link'
import { Fragment } from 'react'
import { CopyIcon } from '../../../src/components/Icons'


export async function generateStaticParams() {
    return akumasnomi.map((fruit) => ({
        id: slugify(fruit.name),
    }))
}

export async function generateMetadata({ params }) {
    const { id } = await params
    const fruta = getFruitBySlug(id)

    if (!fruta) return { title: 'Not Found' }

    return {
        title: `${fruta.name} | Akuma no Mi Encyclopedia`,
        description: fruta.desc,
        openGraph: {
            title: `${fruta.name} | Akuma no Mi Encyclopedia`,
            description: fruta.desc,
            images: [`/images/fruits/${fruta.localImg}`],
        },
    }
}

export async function generateViewport({ params }) {
    const { id } = await params
    const fruta = getFruitBySlug(id)
    return {
        themeColor: fruta?.color || '#976f47',
    }
}

const isNumber = (value) => !isNaN(value) && value !== null && value !== "";

const RelatedFruits = ({ fruta }) => {
    if (!fruta.relatedFruits || fruta.relatedFruits === "N/A") return null

    const relatedNames = Array.isArray(fruta.relatedFruits) ? fruta.relatedFruits : [fruta.relatedFruits]
    const fruits = akumasnomi.filter(f => relatedNames.includes(f.name))

    if (!fruits.length) return null

    return (
        <div className='mt-32 w-full'>
            <h3 className='text-xl font-semibold text-[#976f47] mb-4'>Similar Fruits</h3>
            <div className="flex flex-wrap gap-x-8 gap-y-4 max-h-50 overflow-y-auto [&:has(a:hover)_a:hover]:opacity-100 [&:has(a:hover)_a]:opacity-50 
                    [&::-webkit-scrollbar]:w-[2px] [&::-webkit-scrollbar-thumb]:bg-[#976f4755] [&::-webkit-scrollbar-thumb]:rounded-full py-4">
                {fruits.map((fruit) => (
                    <Link href={`/fruit/${slugify(fruit.name)}`} key={fruit.id} className="flex items-center gap-1 w-fit transition-all">
                        <img src={`/images/fruits/${fruit.localImg}`} alt={fruit.name} className='w-3 h-4 object-contain' />
                        <p className='w-2/3 leading-none text-nowrap text-md'>{fruit.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default async function Page({ params }) {
    const { id } = await params
    const fruta = getFruitBySlug(id)

    if (!fruta) {
        return (
            <section className='min-h-dvh w-svw flex flex-col items-center justify-center gap-6 pt-20'>
                <h1 className='text-4xl text-[#976f47]'>
                    <ruby className='flex justify-center text-center'>
                        Akuma no Mi
                        <rt>悪魔の実</rt>
                    </ruby>
                </h1>
                <p className='text-4xl text-[#976f47] leading-0'>not found</p>
                <Link href="/" className='px-6 py-3 bg-[#976f47] text-white rounded-full hover:bg-[#7a5a3a] transition-colors my-12'>
                    ← Back to Home
                </Link>
            </section>
        )
    }

    const images = {
        localImg: `/images/fruits/${fruta.localImg}`,
        characterImg: fruta.characterImg || null,
        fruitboxImg: fruta.fruitboxImg || null,
        infoImg: fruta.infoImg || null,
    }

    return (
        <section className='min-h-dvh w-svw px-8 animate-[fruitEnter_1s_ease-out] place-content-center pt-44 pb-28 [&:has(dialog:popover-open)]:grayscale transition-all
                            relative after:content-[""] after:absolute after:inset-0 after:w-full after:h-full after:bg-[url(/pattern.avif)] 
                            after:bg-size-[10%] after:bg-repeat after:opacity-5 after:-z-1 after:pointer-events-none'>

            <div className='max-w-360 mx-auto'>
                <Link href="/" className='inline-flex items-center gap-2 text-[#976f47] hover:text-[#7a5a3a] transition-colors group text-sm font-medium -translate-y-12'>
                    <span className='group-hover:-translate-x-1 transition-transform'>←</span>
                    Return
                </Link>

                <div className='flex flex-col-reverse lg:flex-row gap-16 items-center'>
                    <div className='lg:w-2/5 w-full flex flex-col items-center justify-center lg:sticky lg:top-56 shrink-0'>
                        <div className='relative w-72 h-72 flex items-center justify-center'>
                            <div className='absolute inset-0 rounded-full blur-3xl opacity-30 saturate-200'
                                style={{ backgroundColor: fruta.color + 'aa' || '#976f47' }} />
                            <img
                                src={`/images/fruits/${fruta.localImg}`}
                                alt={fruta.name}
                                draggable='false'
                                className='relative w-full scale-100 lg:scale-150 h-full object-contain select-none drop-shadow-2xl animate-[fruitFloat_10s_ease-in-out_infinite]'
                                style={{ filter: `drop-shadow(0 0 60px ${fruta.color + '00' || '#fff'})` }}
                            />
                        </div>
                        <RelatedFruits fruta={fruta} />
                    </div>

                    <div className='lg:w-3/5 w-full flex flex-col gap-6'>
                        <span className='text-white text-xs uppercase tracking-wider bg-[#976f47] rounded-full px-4 py-1 w-fit font-medium'>
                            {fruta.type}
                        </span>

                        <div>
                            <h1 className='font-extrabold text-5xl w-fit font-["Calibri"] text-[#976f47] leading-none -mt-7 '>
                                <ruby className='ruby-base'>
                                    {fruta.name}
                                    <rt className='text-lg uppercase tracking-[0.2em] font-bold text-[#976f47]/60 [anchor-name:--copy]'>「{fruta.jpName}」</rt>
                                </ruby>
                            </h1>
                            {/* Note: In a real app, Client interactions like Copy should be separate components */}
                            <ul className='flex flex-col pl-1 mt-1'>
                                <li className='text-[#976f47] text-sm'>
                                    <b>English name:</b> {fruta.engName}
                                </li>
                                <li className='text-[#976f47] text-sm'>
                                    <b>Manga debut:</b> {isNumber(fruta.mangaDebut) ? `CH.: ${fruta.mangaDebut}` : fruta.mangaDebut}
                                </li>
                                <li className='text-[#976f47] text-sm'>
                                    <b>Anime debut:</b> {isNumber(fruta.animeDebut) ? `EP.: ${fruta.animeDebut}` : fruta.animeDebut}
                                </li>
                                <li className='text-[#976f47] text-sm'>
                                    <b>User(s): </b>
                                    <a href={`https://onepiece.fandom.com/wiki/${fruta.owner}`}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='inline-flex items-center gap-2 text-[#976f47] transition-all duration-200'>
                                        {Array.isArray(fruta.owner) ? fruta.owner.join(', ') : (fruta.owner || 'Unknown')}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                            <polyline points="15 3 21 3 21 9" />
                                            <line x1="10" y1="14" x2="21" y2="3" />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <hr className='border-[#976f47]/30' />
                        <div>
                            <h2 className='text-sm uppercase tracking-wider text-[#976f47]/60 font-semibold mb-3'>Description</h2>
                            <p className='text-black text-lg leading-relaxed'>{fruta.desc}</p>
                        </div>
                        <hr className='border-[#976f47]/30' />
                    </div>
                </div>
            </div>
        </section>
    )
}
