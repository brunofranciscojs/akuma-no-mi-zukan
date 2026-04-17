import { ImageResponse } from 'next/og'
import { getFruitBySlug } from '../../../lib/data'

export const runtime = 'edge'

export const alt = 'Akuma no Mi Details'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image({ params }) {
  const { id } = await params
  const fruta = getFruitBySlug(id)

  if (!fruta) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 128,
            background: 'white',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Not Found
        </div>
      ),
      { ...size }
    )
  }

  // Note: For local images in ImageResponse, we need absolute URLs or base64.
  // We'll use a placeholder for now or assume the user has a host.
  // For the sake of this task, I'll build the layout.
  
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
          backgroundColor: '#fdf9ee',
          backgroundImage: 'radial-gradient(circle, #fffd 0%, #fdf9ee 100%)',
          padding: '40px',
          border: `20px solid ${fruta.color || '#976f47'}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
             {/* We can't easily fetch local images in Edge without a full URL, 
                 but we can put a nice stylized text for the fruit name as fallback */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 24, textTransform: 'uppercase', color: '#976f47', marginBottom: '10px' }}>
              {fruta.type} Devil Fruit
            </div>
            <div style={{ fontSize: 80, fontWeight: 'bold', color: '#976f47', lineHeight: 1 }}>
              {fruta.name}
            </div>
            <div style={{ fontSize: 40, color: '#976f47', opacity: 0.6 }}>
              {fruta.jpName}
            </div>
            <div style={{ fontSize: 24, marginTop: '20px', color: '#333', maxWidth: '600px' }}>
              {fruta.excerpt}
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: 32, color: '#976f47', opacity: 0.8 }}>
          Akuma no Mi Zukan
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
