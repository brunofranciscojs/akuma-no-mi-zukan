import { akumasnomi, slugify, getFruitBySlug } from '../../../lib/data'
import Link from 'next/link'
import { Fragment } from 'react'
import { CopyIcon } from '../../../src/components/Icons'
import Script from 'next/script'


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

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebPage',
                '@id': `https://devilfruitencyclopedia.vercel.app/fruit/${fruta.id}`,
                'name': `${fruta.name} | Devil Fruit Encyclopedia`,
                'description': fruta.excerpt || fruta.desc,
                'mainEntity': {
                    '@type': 'Thing',
                    'name': fruta.name,
                    'alternateName': [fruta.engName, fruta.jpName],
                    'description': fruta.desc,
                    'image': `https://devilfruitencyclopedia.vercel.app/fruit/${fruta.id}/opengraph-image`,
                    'disambiguatingDescription': fruta.type
                }
            },
            {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                    {
                        '@type': 'ListItem',
                        'position': 1,
                        'name': 'Home',
                        'item': 'https://devilfruitencyclopedia.vercel.app/'
                    },
                    {
                        '@type': 'ListItem',
                        'position': 2,
                        'name': 'Devil Fruits',
                        'item': 'https://devilfruitencyclopedia.vercel.app/'
                    },
                    {
                        '@type': 'ListItem',
                        'position': 3,
                        'name': fruta.name,
                        'item': `https://devilfruitencyclopedia.vercel.app/fruit/${fruta.id}`
                    }
                ]
            },
            {
                '@type': 'FAQPage',
                'mainEntity': [
                    {
                        '@type': 'Question',
                        'name': `What powers does the ${fruta.name} grant?`,
                        'acceptedAnswer': {
                            '@type': 'Answer',
                            'text': fruta.desc
                        }
                    },
                    {
                        '@type': 'Question',
                        'name': `Who is the user of ${fruta.name}?`,
                        'acceptedAnswer': {
                            '@type': 'Answer',
                            'text': `The ${fruta.name} (${fruta.engName}) is used by ${Array.isArray(fruta.owner) ? fruta.owner.join(' and ') : (fruta.owner || 'an unknown person')}.`
                        }
                    }
                ]
            }
        ]
    };

    return (
        <section className='min-h-dvh w-svw px-8 animate-[fruitEnter_1s_ease-out] place-content-center pt-44 pb-28 [&:has(dialog:popover-open)]:grayscale transition-all
                            relative after:content-[""] after:absolute after:inset-0 after:w-full after:h-full after:bg-[url(/pattern.avif)] 
                            after:bg-size-[10%] after:bg-repeat after:opacity-5 after:-z-1 after:pointer-events-none'>
            <Script id={`json-ld-${fruta.id}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <article className='max-w-360 mx-auto'>
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

                                    <button id="copy-btn" className="cursor-pointer fixed [position-anchor:--copy] left-[anchor(right)] top-[calc(anchor(center)-.6rem)]" title="Copy Japanese name" popoverTarget="copy">
                                        <CopyIcon width={20} height={20} className="[&_path]:stroke-[#976f47] w-fit" />
                                    </button>
                                </ruby>

                                <span {...{ popover: "" }} id="copy"
                                    className="fixed [position-anchor:--copy] left-[calc(anchor(right)+1.5rem)] py-0.5 px-1.5 rounded-sm top-[calc(anchor(center)-.6rem)] bg-[#976f47] text-white text-xs outline-0 [&:popover-open]:block">
                                    copied!
                                </span>
                            </h1>

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
                        <div className="flex gap-4 flex-wrap">
                            {Object.values(images).filter((image) => image && !image.includes('unknown')).map((image, index) => (
                                <Fragment key={index}>
                                    <button popoverTarget={`fruit-img-${index}`} className="bg-transparent border-0 p-0 cursor-pointer">
                                        <img src={image} alt={fruta.name}
                                            className="w-30 h-20 object-contain rounded-lg bg-[#976f47]/20" />
                                    </button>
                                    <div popover="" id={`fruit-img-${index}`}
                                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent outline-0 [&:popover-open]:block backdrop:bg-[#976f47]/40">
                                        <img src={image} alt={fruta.name} className="w-full h-full object-contain rounded-2xl" />
                                    </div>
                                </Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </article>
            <Script id={`copy-script-${fruta.id}`} dangerouslySetInnerHTML={{
                __html: `
                document.querySelector('button[title]')?.addEventListener('click', () => {
                    navigator.clipboard.writeText('${fruta.jpName} | DFE');
                    setTimeout(() => {
                        document.querySelector('#copy')?.hidePopover();
                    }, 2000);
                });
            `}} />
        </section>
    )
}
