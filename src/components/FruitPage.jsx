import { useParams, Link } from 'react-router-dom'
import React from 'react'
import akumasnomi from '../assets/akumanomi.json'

export default function FruitPage() {
    const { id } = useParams()
    const fruta = akumasnomi.find(f => f.id.toLowerCase() === id.toLowerCase())

    if (!fruta) {
        return (
            <section className='min-h-dvh w-svw flex flex-col items-center justify-center gap-6 pt-20'>
                <h1 className='text-4xl font-extrabold text-[#976f47]'>Fruta não encontrada</h1>
                <Link to="/" className='px-6 py-3 bg-[#976f47] text-white rounded-full hover:bg-[#7a5a3a] transition-colors'>
                    ← Voltar
                </Link>
            </section>
        )
    }

    return (
        <section className='min-h-dvh w-svw px-8 animate-[fruitEnter_0.5s_ease-out] place-content-center py-28 lg:py-0
                            relative after:content-[""] after:absolute after:inset-0 after:w-full after:h-full after:bg-[url(./assets/pattern.avif)] 
                            after:bg-size-[10%] after:bg-repeat after:opacity-5 after:-z-1 after:pointer-events-none'>

            <div className='max-w-360 mx-auto'>

                <Link to="/"
                    className='inline-flex items-center gap-2 text-[#976f47] hover:text-[#7a5a3a] transition-colors group text-sm font-medium'>
                    <span className='group-hover:-translate-x-1 transition-transform'>←</span>
                    Return
                </Link>

                <div className='flex flex-col lg:flex-row gap-16 items-center'>

                    {/* Imagem */}
                    <div className='lg:w-2/5 w-full flex justify-center lg:sticky lg:top-28 shrink-0'>
                        <div className='relative w-72 h-72 flex items-center justify-center'>
                            {/* Glow */}
                            <div className='absolute inset-0 rounded-full blur-3xl opacity-30 saturate-200'
                                style={{ backgroundColor: fruta.color + 'aa' || '#976f47' }} />
                            <img
                                src={`/src/assets/images/fruits/${fruta.localImg}`}
                                alt={fruta.name}
                                draggable='false'
                                className='relative w-full scale-100 lg:scale-150 h-full object-contain select-none drop-shadow-2xl animate-[fruitFloat_5s_ease-in-out_infinite]'
                                style={{ filter: `drop-shadow(0 0 60px ${fruta.color + '00' || '#fff'})` }}
                            />
                        </div>
                    </div>

                    {/* Info */}
                    <div className='lg:w-3/5 w-full flex flex-col gap-6'>

                        {/* Badge tipo */}
                        <span className='text-white text-xs uppercase tracking-wider bg-[#976f47] rounded-full px-4 py-1 w-fit font-medium'>
                            {fruta.type}
                        </span>

                        {/* Nome */}
                        <div>
                            <h1 className='font-extrabold text-5xl font-["Calibri"] text-[#976f47] leading-tight'>
                                <ruby className='ruby-base'>
                                    {fruta.name}
                                    <rt className='text-lg uppercase tracking-[0.2em] font-normal text-[#976f47]/60'>「{fruta.jpName}」</rt>
                                </ruby>
                            </h1>
                            <p className='text-[#976f47]/70 text-lg mt-1'>EN: {fruta.engName}</p>
                        </div>

                        {/* Divider */}
                        <hr className='border-[#976f47]/15' />

                        {/* Descrição */}
                        <div>
                            <h2 className='text-sm uppercase tracking-wider text-[#976f47]/60 font-semibold mb-3'>Description</h2>
                            <p className='text-gray-800 text-lg leading-relaxed'>{fruta.desc}</p>
                        </div>

                        {/* Divider */}
                        <hr className='border-[#976f47]/15' />

                        {/* Usuários */}
                        <div>
                            <h2 className='text-sm uppercase tracking-wider text-[#976f47]/60 font-semibold mb-3'>Users(s)</h2>
                            <div className='flex flex-wrap gap-3'>
                                {Array.isArray(fruta.owner) ?
                                    fruta.owner.map((o, i) => (
                                        <a key={i}
                                            href={`https://onepiece.fandom.com/wiki/${o}`}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='inline-flex items-center gap-2 px-4 py-2 bg-[#976f47]/8 border border-[#976f47]/20 rounded-lg text-[#976f47] font-semibold hover:bg-[#976f47] hover:text-white transition-all duration-200'>
                                            {o}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                <polyline points="15 3 21 3 21 9" />
                                                <line x1="10" y1="14" x2="21" y2="3" />
                                            </svg>
                                        </a>
                                    )) :
                                    <a href={`https://onepiece.fandom.com/wiki/${fruta.owner}`}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='inline-flex items-center gap-2 px-4 py-2 bg-[#976f47]/8 border border-[#976f47]/20 rounded-lg text-[#976f47] font-semibold hover:bg-[#976f47] hover:text-white transition-all duration-200'>
                                        {fruta.owner || 'Desconhecido'}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                            <polyline points="15 3 21 3 21 9" />
                                            <line x1="10" y1="14" x2="21" y2="3" />
                                        </svg>
                                    </a>
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}
