import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const alt = 'SIRP: Autonomous SOC Platform'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  // Inter via jsDelivr — known-compatible TTF subset for satori
  const interData = await fetch(
    'https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.8/files/inter-latin-400-normal.woff'
  ).then((r) => r.arrayBuffer())

  const interBoldData = await fetch(
    'https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.8/files/inter-latin-700-normal.woff'
  ).then((r) => r.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          background: '#080810',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'Inter',
        }}
      >
        {/* ── Purple radial glow — top center ───────────────────── */}
        <div
          style={{
            position: 'absolute',
            top: '-260px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '900px',
            height: '900px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(142,45,255,0.40) 0%, rgba(142,45,255,0.10) 40%, transparent 70%)',
          }}
        />

        {/* ── Subtle grid overlay ────────────────────────────────── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* ── Top-left corner accent ─────────────────────────────── */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '3px',
            height: '80px',
            background: '#8e2dff',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '80px',
            height: '3px',
            background: '#8e2dff',
          }}
        />

        {/* ── Bottom-right corner accent ─────────────────────────── */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '3px',
            height: '80px',
            background: '#8e2dff',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '80px',
            height: '3px',
            background: '#8e2dff',
          }}
        />

        {/* ── Main content ───────────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            gap: '28px',
            padding: '60px 80px 40px',
            position: 'relative',
          }}
        >
          {/* Badge pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'rgba(142,45,255,0.12)',
              border: '1px solid rgba(142,45,255,0.45)',
              borderRadius: '100px',
              padding: '8px 22px',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#8e2dff',
              }}
            />
            <span
              style={{
                color: '#a855f7',
                fontSize: '16px',
                fontWeight: 600,
                letterSpacing: '0.12em',
              }}
            >
              AUTONOMOUS SOC PLATFORM
            </span>
          </div>

          {/* SIRP wordmark */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <span
              style={{
                fontSize: '112px',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '-0.04em',
                lineHeight: 1,
              }}
            >
              SIRP
            </span>
            <span
              style={{
                fontSize: '26px',
                color: 'rgba(255,255,255,0.55)',
                fontWeight: 400,
                letterSpacing: '0.01em',
              }}
            >
              OmniSense™: Detect. Respond. Evolve.
            </span>
          </div>

          {/* Stat row */}
          <div
            style={{
              display: 'flex',
              gap: '60px',
              marginTop: '8px',
            }}
          >
            {[
              { value: '80%', label: 'Faster MTTD' },
              { value: '70%', label: 'Faster MTTR' },
              { value: '90%', label: 'Autonomous actions' },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span
                  style={{
                    fontSize: '32px',
                    fontWeight: 700,
                    color: '#8e2dff',
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.40)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ─────────────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '18px 48px',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            position: 'relative',
          }}
        >
          <span
            style={{
              color: 'rgba(255,255,255,0.25)',
              fontSize: '15px',
              letterSpacing: '0.05em',
            }}
          >
            sirp.io
          </span>
          <span
            style={{
              color: 'rgba(255,255,255,0.15)',
              fontSize: '13px',
              letterSpacing: '0.08em',
            }}
          >
            AI-NATIVE SECURITY OPERATIONS
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: interData,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Inter',
          data: interBoldData,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  )
}
