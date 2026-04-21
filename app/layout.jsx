import { Outfit } from 'next/font/google'
import '../src/index.css'
import { JsonLd } from '../src/components/JsonLd'

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
})

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Devil Fruit Encyclopedia",
  "url": "https://devilfruitencyclopedia.vercel.app",
  "description": "Complete database of Devil Fruits from One Piece.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://devilfruitencyclopedia.vercel.app/?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
export const metadata = {
  metadataBase: new URL('https://devilfruitencyclopedia.vercel.app'),
alternates: {
    canonical: '/',
  },
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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/favicon.svg',
  },
}

import ClientLayout from './ClientLayout'

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.className}>
      <script
        dangerouslySetInnerHTML={{
          __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
        }}
      />
      <body>
        <JsonLd data={jsonLd} />
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
