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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "url": "https://devilfruitencyclopedia.vercel.app/fruit/gomu-gomu-no-mi"
      }
    ],
    "name": "Akuma no Mi Encyclopedia",
    "url": "https://devilfruitencyclopedia.vercel.app",
    "description": "Complete database of Devil Fruits from One Piece, including abilities, users and types.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://devilfruitencyclopedia.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
  return (
    <html lang="en" className={outfit.className}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
      </head>
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
