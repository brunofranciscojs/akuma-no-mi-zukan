import { useParams, Link } from 'react-router-dom'
import akumasnomi from '../assets/akumanomi2.json'
import { Helmet, HelmetProvider } from "react-helmet-async"
import { Fragment } from 'react'
import { CopyIcon } from './Icons'

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

export default function FruitPage() {
    const { id } = useParams()
    const fruta = akumasnomi.find(f => f.id.toLowerCase() === id.toLowerCase() || slugify(f.name) === id.toLowerCase())

    const useRelatedFruits = (allFruits, names) => {
        if (!allFruits || !names) return []
        const set = new Set(names)
        return allFruits.filter(f => set.has(f.name))
    }

    const images = {
        localImg: `/images/fruits/${fruta.localImg}`,
        characterImg: fruta.characterImg ? fruta.characterImg : null,
        fruitboxImg: fruta.fruitboxImg ? fruta.fruitboxImg : null,
        infoImg: fruta.infoImg ? fruta.infoImg : null,
    }
    const RelatedFruits = ({ allFruits, relatedNames }) => {
        const fruits = useRelatedFruits(allFruits, relatedNames)

        if (!fruits.length) return null

        return (
            <div className='mt-32 w-full'>
                <h3 className='text-xl font-semibold text-[#976f47] mb-4'>Similar Fruits</h3>

                <div className="flex flex-wrap gap-x-8 gap-y-4 max-h-50 overflow-y-auto [&:has(a:hover)_a:hover]:opacity-100 [&:has(a:hover)_a]:opacity-50 
                        [&::-webkit-scrollbar]:w-[2px] [&::-webkit-scrollbar-thumb]:bg-[#976f4755] [&::-webkit-scrollbar-thumb]:rounded-full py-4">
                    {fruits.map((fruit, i) => (
                        <Link to={`/fruta/${slugify(fruit.name)}`} key={fruit.id} className="flex items-center gap-1 w-fit transition-all">
                            <img src={`/images/fruits/${fruit.localImg}`} alt={fruit.name} className='w-3 h-4 object-contain' />
                            <p className='w-2/3 leading-none text-nowrap text-md'>{fruit.name}</p>
                        </Link>
                    ))}
                </div>
            </div>
        )
    }

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
                <Link to="/" className='px-6 py-3 bg-[#976f47] text-white rounded-full hover:bg-[#7a5a3a] transition-colors my-12'>
                    ← Voltar
                </Link>
            </section>
        )
    }
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": fruta.name,
        "headline": fruta.name,
        "description": fruta.desc,
        "genre": "Anime / Fiction",
        "keywords": [
            "Devil Fruit",
            fruta.type,
            "One Piece",
            fruta.name
        ],

        "url": `https://devilfruitencyclopedia.vercel.app/fruit/${fruta.id}`,
        "image": `https://devilfruitencyclopedia.vercel.app${fruta.localImg}`,

        "isPartOf": {
            "@type": "CreativeWork",
            "name": "Akuma no Mi Encyclopedia"
        },

        "about": {
            "@type": "Thing",
            "name": fruta.name,
            "description": fruta.desc
        },

        "additionalProperty": [
            {
                "@type": "PropertyValue",
                "name": "Type",
                "value": fruta.type
            },
            {
                "@type": "PropertyValue",
                "name": "Anime Debut",
                "value": fruta.animeDebut
            },
            {
                "@type": "PropertyValue",
                "name": "Manga Debut",
                "value": fruta.mangaDebut
            }
        ]
    }

    const isNumber = (value) => !isNaN(value) && value !== null && value !== "";

    return (
        <>
            <Helmet>
                <title>{fruta.name} | Akuma no Mi Zukan</title>
                <meta name="theme-color" content={fruta.color} />
                <meta name="description" content={fruta.desc} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={`${fruta.name} | Akuma no Mi Zukan`} />
                <meta property="og:description" content={fruta.desc} />
                <meta property="og:image" content={`${window.location.origin}/images/fruits/${fruta.localImg}`} />
                <meta property="og:url" content={window.location.href} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${fruta.name} | Akuma no Mi Zukan`} />
                <meta name="twitter:description" content={fruta.desc} />
                <meta name="twitter:image" content={`${window.location.origin}/images/fruits/${fruta.localImg}`} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            </Helmet>

            <section className='min-h-dvh w-svw px-8 animate-[fruitEnter_1s_ease-out] place-content-center pt-44 pb-28 [&:has(dialog:popover-open)]:grayscale transition-all
                                relative after:content-[""] after:absolute after:inset-0 after:w-full after:h-full after:bg-[url(./assets/pattern.avif)] 
                                after:bg-size-[10%] after:bg-repeat after:opacity-5 after:-z-1 after:pointer-events-none'>

                <div className='max-w-360 mx-auto'>

                    <Link to="/"
                        className='inline-flex items-center gap-2 text-[#976f47] hover:text-[#7a5a3a] transition-colors group text-sm font-medium -translate-y-12'>
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
                            <RelatedFruits
                                allFruits={akumasnomi}
                                relatedNames={fruta.relatedFruits}
                            />

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
                                <button popoverTarget="copied" className='[position-anchor:--copy] left-[anchor(right)] top-[calc(anchor(top)-3px)] fixed cursor-pointer'
                                    onClick={() => navigator.clipboard.writeText(fruta.jpName)}>
                                    <CopyIcon width={20} height={20} className='[&_path]:stroke-[#976f47]' />
                                    <span {...{ popover: "" }} id="copied" className='[&:popover-open]:flex fixed [position-anchor:--copy] top-[calc(anchor(top)-5px)] left-[calc(anchor(center)+7rem)] bg-[#976f47] text-white px-2 py-1 rounded-md text-xs'>Copied!</span>
                                </button>
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
                                            style={{ "--img": `url(${fruta.characterImg})` }}
                                            rel='noopener noreferrer'
                                            className='inline-flex items-center gap-2 text-[#976f47] transition-all duration-200'>

                                            {fruta.owner || 'Unknown'}
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

                            <div className='flex gap-4 flex-wrap'>
                                {Object.values(images).filter(image => image && !image.includes('unknown')).map((image, index) =>
                                    <Fragment key={Math.floor(Math.random() * 100)}>
                                        <img src={image} alt={fruta.name} className='w-30 h-20 object-contain rounded-lg bg-[#976f47]/20' onClick={() => document.querySelector(`#image-${index}`).showPopover()} />
                                        <dialog {...{ popover: '' }} id={`image-${index}`} className='[&:popover-open]:block fixed top-1/2 left-1/2 [translate:-50%_-50%] backdrop:bg-[#976f47]/30 bg-transparent outline-0 h-[90dvh] w-[90dvw]'>
                                            <img src={image} alt={fruta.name} className='w-full h-full object-contain rounded-2xl' />
                                        </dialog>
                                    </Fragment>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
