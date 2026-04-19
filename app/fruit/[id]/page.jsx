import { akumasnomi, slugify, getFruitBySlug } from '../../../lib/data'
import Link from 'next/link'
import { Fragment } from 'react'
import { CopyIcon } from '../../../src/components/Icons'
import Script from 'next/script'
import Image from 'next/image'
import { JsonLd } from '../../../src/components/JsonLd'

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
        icons: {
            icon: `/images/fruits/${fruta.localImg}`,
        },
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
            <h3 className='text-xl font-semibold text-(--primary) mb-4'>Similar Fruits</h3>
            <div className="flex flex-wrap gap-x-8 gap-y-4 max-h-50 overflow-y-auto [&:has(a:hover)_a:hover]:opacity-100 [&:has(a:hover)_a]:opacity-50 
                    [&::-webkit-scrollbar]:w-[2px] [&::-webkit-scrollbar-thumb]:bg-(--primary)/30 [&::-webkit-scrollbar-thumb]:rounded-full py-4">
                {fruits.map((fruit) => (
                    <Link href={`/fruit/${slugify(fruit.name)}`} key={fruit.id} className="flex items-center gap-1 w-fit transition-all">
                        <Image width={100} height={100} src={`/images/fruits/${fruit.localImg}`} alt={fruit.name} className='w-3 h-4 object-contain' />
                        <p className='w-2/3 leading-none text-nowrap text-md'>{fruit.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

const randomSVG = [1, 101, 103, 104, 105, 109, 11, 111, 114, 115, 117, 119, 12, 120, 122, 124, 125, 126, 127, 129, 132, 133, 134, 135, 137, 138, 140, 141, 144, 147, 148, 149, 150, 154, 156, 157, 159, 160, 164, 169, 170, 172, 173, 175, 176, 177, 179, 183, 184, 187, 188, 189, 19, 191, 192, 193, 194, 195, 198, 2, 20, 200, 201, 202, 204, 208, 21, 211, 213, 214, 215, 216, 217, 222, 23, 24, 25, 26, 27, 31, 33, 36, 38, 39, 4, 43, 45, 46, 52, 53, 56, 58, 59, 61, 64, 66, 68, 69, 7, 71, 79, 80, 82, 83, 85, 86, 88, 92, 93, 94, 95, 96, 97, 98]

export default async function Page({ params }) {
    const { id } = await params
    const fruta = getFruitBySlug(id)

    if (!fruta) {
        return (
            <section className='min-h-dvh w-svw flex flex-col items-center justify-center gap-6 pt-20'>
                <p className='text-4xl text-(--primary) leading-0'>not found</p>
                <h4 className='z-0 text-[clamp(5rem,35vw,35rem)] w-fit pointer-events-none text-black font-black opacity-40 leading-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>4<b className='text-transparent opacity-0'>0</b>4</h4>
                <Image width={1000} height={1000}
                    src={`/images/fruits/ANM${randomSVG[Math.floor(Math.random() * randomSVG.length)]}.svg`}
                    draggable={false} alt="Unknown"
                    className='z-10 opacity-50 select-none w-[clamp(4rem,20vw,15rem)] object-contain'
                />
                <Link href="/" className='px-6 py-3 bg-(--primary) text-white rounded-full hover:bg-(--primary-light) transition-colors my-12'>
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
        '@type': 'DefinedTerm',
        'name': fruta.name,
        'alternateName': [fruta.engName, fruta.jpName],
        'description': fruta.desc,
        'url': `https://devilfruitencyclopedia.vercel.app/fruit/${fruta.id}`,
        'identifier': fruta.id,
        'inDefinedTermSet': {
            '@type': 'DefinedTermSet',
            'name': 'Akuma no Mi'
        },
        'about': {
            '@type': 'CreativeWork',
            'name': 'One Piece'
        },
        'sameAs': Array.isArray(fruta.relatedFruits) ? fruta.relatedFruits.map(name =>
            `https://devilfruitencyclopedia.vercel.app/fruit/${slugify(name)}`
        ) : [],
        'additionalProperty': [
            {
                '@type': 'PropertyValue',
                'name': 'Type',
                'value': fruta.type
            },
            {
                '@type': 'PropertyValue',
                'name': '   Manga debut',
                'value': isNumber(fruta.mangaDebut) ? `CH.: ${fruta.mangaDebut}` : fruta.mangaDebut
            },
            {
                '@type': 'PropertyValue',
                'name': 'Anime debut',
                'value': isNumber(fruta.animeDebut) ? `EP.: ${fruta.animeDebut}` : fruta.animeDebut
            },
            {
                '@type': 'Person',
                'name': fruta.owner || 'Unknown',
                'url': Array.isArray(fruta.owner) ? fruta.owner.map(name => `https://onepiece.fandom.com/wiki/${name}`) : `https://onepiece.fandom.com/wiki/${fruta.owner}`
            }
        ]
    }


    return (
        <section className='min-h-dvh w-svw px-8 animate-[fruitEnter_1s_ease-out] place-content-center pt-44 pb-28 [&:has(dialog:popover-open)]:grayscale transition-all
                            relative after:content-[""] after:absolute after:inset-0 after:w-full after:h-full after:bg-[url(/pattern.avif)] 
                            after:bg-size-[10%] after:bg-repeat after:opacity-5 after:-z-1 after:pointer-events-none'>

            <JsonLd data={jsonLd} />

            <article className='max-w-360 mx-auto'>
                <Link href="/" className='inline-flex items-center gap-2 text-(--primary) hover:text-(--primary-light) transition-colors group text-sm font-medium -translate-y-12'>
                    <span className='group-hover:-translate-x-1 transition-transform'>←</span>
                    Return
                </Link>

                <div className='flex flex-col-reverse lg:flex-row gap-16 items-center'>
                    <div className='lg:w-2/5 w-full flex flex-col items-center justify-center lg:sticky lg:top-56 shrink-0'>
                        <div className='relative w-72 h-72 flex items-center justify-center'
                            style={{ anchorName: '--svg', '--mask': `url(/images/fruits/${fruta.localImg})`, "--color": fruta.localImg.includes('svg') ? 'var(--primary)' : fruta.color, "--mix": `color-mix(in srgb, var(--color), white 50%)` }}>
                            <Image width={1000} height={1000}
                                src={`/images/fruits/${fruta.localImg}`}
                                alt={fruta.name + " | Devil Fruit Encyclopedia"}
                                draggable='false'
                                className='relative w-full scale-100 lg:scale-150 h-full object-contain select-none drop-shadow-2xl animate-[fruitFloat_10s_ease-in-out_infinite]'
                                style={{ filter: `drop-shadow(0 0 60px ${fruta.color + '00' || '#fff'})` }}
                            />
                        </div>
                        <RelatedFruits fruta={fruta} />
                    </div>

                    <div className='lg:w-3/5 w-full flex flex-col gap-6'>
                        <span className='text-white text-xs uppercase tracking-wider bg-(--primary) rounded-full px-4 py-1 w-fit font-medium'>
                            {fruta.type}
                        </span>

                        <div>
                            <h1 className='font-extrabold text-5xl w-fit font-["Calibri"] text-(--primary) leading-none -mt-7 '>
                                <ruby className='ruby-base'>
                                    {fruta.name}
                                    <rt className='text-lg uppercase tracking-[0.2em] font-bold text-(--primary)/60 [anchor-name:--copy]'>「{fruta.jpName}」</rt>

                                    <button id="copy-btn" className="cursor-pointer fixed [position-anchor:--copy] left-[anchor(right)] top-[calc(anchor(center)-.6rem)]" title="Copy Japanese name" popoverTarget="copy">
                                        <CopyIcon width={20} height={20} className="[&_path]:stroke-(--primary) w-fit" />
                                    </button>
                                </ruby>

                                <span {...{ popover: "" }} id="copy"
                                    className="fixed [position-anchor:--copy] left-[calc(anchor(right)+1.5rem)] py-0.5 px-1.5 rounded-sm top-[calc(anchor(center)-.6rem)] bg-(--primary) text-white text-xs outline-0 [&:popover-open]:block">
                                    copied!
                                </span>
                            </h1>

                            <ul className='flex flex-col pl-1 mt-1'>
                                <li className='text-(--text-primary) text-sm'>
                                    <b className='text-(--primary)'>English name:</b> {fruta.engName}
                                </li>
                                <li className='text-(--text-primary) text-sm'>
                                    <b className='text-(--primary)'>Manga debut:</b> {isNumber(fruta.mangaDebut) ? `CH.: ${fruta.mangaDebut}` : fruta.mangaDebut}
                                </li>
                                <li className='text-(--text-primary) text-sm'>
                                    <b className='text-(--primary)'>Anime debut:</b> {isNumber(fruta.animeDebut) ? `EP.: ${fruta.animeDebut}` : fruta.animeDebut}
                                </li>
                                <li className='text-(--text-primary) text-sm'>
                                    <b className='text-(--primary)'>User(s): </b>
                                    <a href={`https://onepiece.fandom.com/wiki/${fruta.owner}`}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='inline-flex items-center gap-2 text-(--primary) transition-all duration-200 hover:text-(--primary-light)'>
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

                        <hr className='border-(--primary)/30' />

                        <div className="flex flex-col gap-3">
                            <h2 className='text-sm uppercase tracking-wider text-(--primary)/60 font-semibold'>Description</h2>
                            <p className='text-(--text-primary) text-lg leading-relaxed'>{fruta.desc}</p>
                        </div>
                        <hr className='border-(--primary)/30' />
                        <div className="flex gap-4 flex-wrap">
                            {Object.values(images).filter((image) => image && !image.includes('unknown')).map((image, index) => (
                                <Fragment key={index}>
                                    <button popoverTarget={`fruit-img-${index}`} className="bg-transparent border-0 p-0 cursor-pointer">
                                        <Image width={100} height={100} src={image} alt={fruta.name + " | Devil Fruit Encyclopedia"}
                                            className="w-30 h-20 object-contain rounded-lg bg-(--primary)/20" />
                                    </button>
                                    <div popover="" id={`fruit-img-${index}`}
                                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent outline-0 [&:popover-open]:block backdrop:bg-(--bg-primary)/80">
                                        <Image width={1000} height={1000} src={image} alt={fruta.name + " | Devil Fruit Encyclopedia"} className="w-full h-full object-contain rounded-2xl" />
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
                    navigator.clipboard.writeText('${fruta.jpName} | devilfruitencyclopedia.vercel.app');
                    setTimeout(() => {
                        document.querySelector('#copy')?.hidePopover();
                    }, 2000);
                });
            `}} />
        </section>
    )
}
