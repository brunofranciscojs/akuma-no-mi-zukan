import { ImageResponse } from 'next/og'
import { getFruitBySlug } from '../../../lib/data'

export const runtime = 'nodejs'

export const alt = 'Akuma no Mi Details'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

async function loadImageAsBase64(url) {
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    const buffer = await res.arrayBuffer()
    const base64 = Buffer.from(buffer).toString('base64')
    const mime = res.headers.get('content-type') || 'image/png'
    return `data:${mime};base64,${base64}`
  } catch {
    return null
  }
}

export default async function Image({ params }) {
  const { id } = await params
  const fruta = getFruitBySlug(id)

  if (!fruta) {
    return new ImageResponse(
      <div style={{ fontSize: 60, background: 'white', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Not Found: {id}
      </div>,
      { ...size }
    )
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

  let fruitImgName = fruta.localImg
  if (fruitImgName.endsWith('.webp')) {
    fruitImgName = fruitImgName.replace('.webp', '.png')
  }

  const [fruitImgData, patternImgData] = await Promise.all([
    loadImageAsBase64(`${baseUrl}/images/fruits/${fruitImgName}`),
    loadImageAsBase64(`${baseUrl}/pattern.png`),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(circle, #fffd 0%, #fdf9ee 100%)',
          position: 'relative',
          color: '#976f47',
        }}
      >
        <div style={{ position: 'absolute', top: 30, opacity: 0.8, fontWeight: 'bold', fontSize: 16 }}>
          AKUMA NO MI ENCYCLOPEDIA
        </div>

        {patternImgData && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexWrap: 'wrap',
              width: '100%',
              height: '100%',
              opacity: 0.05,
            }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <img
                key={i}
                src={patternImgData}
                style={{ width: '300px', height: '300px', objectFit: 'cover' }}
              />
            ))}
          </div>
        )}

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {fruitImgData && (
            <img
              src={fruitImgData}
              style={{
                width: '400px',
                height: '400px',
                objectFit: 'contain',
                marginBottom: '24px',
              }}
            />
          )}

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              lineHeight: 1,
            }}
          >
            <div
              style={{
                fontSize: '72px',
                fontWeight: '900',
                color: '#976f47',
                marginBottom: '8px',
              }}
            >
              {fruta.jpName}
            </div>
            <div
              style={{
                fontSize: '42px',
                fontWeight: 'bold',
                color: '#976f47',
                opacity: 0.8,
                display: 'flex',
                textTransform: 'uppercase',
                letterSpacing: '4px',
                fontFamily: 'serif',
              }}
            >
              {fruta.name}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}