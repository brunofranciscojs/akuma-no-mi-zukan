import { Outfit } from 'next/font/google'
import '../src/index.css'

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://devilfruitencyclopedia.vercel.app'),
  title: 'Devil Fruit Encyclopedia (Akuma no Mi Encyclopedia)',
  description: 'Explore all Devil Fruits from One Piece. Powers, users, and detailed information about each fruit.',
  openGraph: {
    title: 'Devil Fruit Encyclopedia (Akuma no Mi Encyclopedia)',
    description: 'Explore all Devil Fruits from One Piece.',
    url: 'https://devilfruitencyclopedia.vercel.app',
    siteName: 'Devil Fruit Encyclopedia (Akuma no Mi Encyclopedia)',
    locale: 'en_US',
    type: 'website',
  },
}

import ClientLayout from './ClientLayout'

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.className}>
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
