import fullLogo from '../assets/full-logo.webp'
import { useEffect } from 'react'

export default function Intro() {
    const showed = sessionStorage.getItem('showed');
    useEffect(() => {
        sessionStorage.setItem('showed', true);
    }, [])
    if (showed) {
        return null;
    }
    return (
        <main className='[--theme:#976f47] pointer-events-none h-dvh w-svw place-content-center backdrop-blur-[10rem] z-20 absolute inset-0 animate-[logo_1s_linear_forwards] [animation-delay:2s]
                after:content-[""] after:absolute after:inset-0 after:bg-[url(./assets/pattern.avif)] after:bg-size-[20%] after:bg-repeat after:opacity-[.03]'>
            <img src={fullLogo} alt="" className='w-200 mx-auto h-full object-contain animate-[pulse_1s_ease-in-out_infinite]' />
        </main>
    )
}