'use client'

import { useEffect, useState } from 'react'

export default function Intro() {
    const [showed, setShowed] = useState(true);

    useEffect(() => {
        const isShowed = sessionStorage.getItem('showed');
        setShowed(!!isShowed);
        if (!isShowed) {
            sessionStorage.setItem('showed', 'true');
        }
    }, [])

    if (showed) return null;

    return (
        <main className='[--theme:var(--primary)] pointer-events-none h-dvh w-svw place-content-center backdrop-blur-[10rem] z-50 absolute inset-0 animate-[logo_1s_linear_forwards] [animation-delay:2s]
                after:content-[""] after:absolute after:inset-0 after:bg-[url(/pattern.avif)] after:bg-size-[20%] after:bg-repeat after:opacity-[.03] place-items-center'>
            <h3 className='text-3xl font-black text-(--primary) uppercase tracking-wide leading-0 animate-[pulse_1s_ease-in-out_infinite] scale-[4]'>Devil Fruit <br />
                <sup className='text-base tracking-[.39rem] leading-[1.5rem] block'>
                    Encycl<b className='text-transparent [anchor-name:--fruit2] 
                                            after:content-[""] 
                                            after:bg-[url(/fruit.webp)] 
                                            after:bg-no-repeat 
                                            after:bg-center 
                                            after:bg-contain 
                                            after:w-5 
                                            after:h-5 
                                            after:absolute 
                                            after:[position-anchor:--fruit2] 
                                            after:left-[calc(anchor(left)-0.5px)]
                                            after:top-[calc(anchor(top)-4px)]'>o</b>pedia
                </sup>
            </h3>
        </main>
    )
}