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

    if (showed) {
        return null;
    }

    return (
        <main className='[--theme:var(--primary)] pointer-events-none h-dvh w-svw place-content-center backdrop-blur-[10rem] z-50 absolute inset-0 animate-[logo_1s_linear_forwards] [animation-delay:2s]
                after:content-[""] after:absolute after:inset-0 after:bg-[url(/pattern.avif)] after:bg-size-[20%] after:bg-repeat after:opacity-[.03]'>
            <img src="/full-logo.webp" alt="Akuma no Mi Encyclopedia" className='w-200 mx-auto h-full object-contain animate-[pulse_1s_ease-in-out_infinite]' />
        </main>
    )
}