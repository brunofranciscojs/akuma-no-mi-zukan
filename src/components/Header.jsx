import { Link } from 'react-router-dom'
import hLogo from '../assets/h-logo.webp'

export default function Header() {
    return (
        <header className='w-svw h-20 bg-white/80 backdrop-blur-xl fixed top-0 left-0 shadow-xl shadow-[#976f47]/10 px-12 z-10 flex items-center'>
            <Link to="/">
                <img src={hLogo} alt="" className='w-50 object-contain' />
            </Link>
        </header>
    )
}