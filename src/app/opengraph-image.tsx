import { ImageResponse } from 'next/og'

export const alt = 'Pixelate — Event Production & AVL in Dubai'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '72px', background: 'linear-gradient(130deg, #0f1419, #2b353c)', color: '#fff' }}>
      <div style={{ display: 'flex', fontSize: 34, letterSpacing: 8 }}>PIXELATE</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', fontSize: 76, lineHeight: 1.1, maxWidth: 1000 }}>Ideas into experiences.</div>
        <div style={{ display: 'flex', fontSize: 32, color: '#c4d5df' }}>Event Production · Audio Visual · Creative Design</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, color: '#c4d5df' }}>
        <span>Dubai, United Arab Emirates</span><span>pixelateuae.com</span>
      </div>
    </div>, size,
  )
}
