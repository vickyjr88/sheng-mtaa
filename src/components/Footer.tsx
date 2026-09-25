import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

function FooterAd() {
  const insRef = useRef<HTMLModElement>(null)
  const pushed = useRef(false)

  useEffect(() => {
    if (pushed.current) return
    pushed.current = true
    try {
      window.adsbygoogle = window.adsbygoogle || []
      window.adsbygoogle.push({})
    } catch {
      // AdSense script may not be loaded yet (blocked, offline) - fail quietly.
    }
  }, [])

  return (
    <ins
      ref={insRef}
      className="adsbygoogle block"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-7584137573418930"
      data-ad-slot="6760469728"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-6 space-y-4 rounded-2xl border border-line bg-white p-4 text-sm text-tan">
      <FooterAd />
      <a
        href="https://play.google.com/store/apps/details?id=net.vitaldigitalmedia.shengmchongoano"
        target="_blank"
        rel="noreferrer"
        className="block rounded-full bg-ink px-4 py-2 text-center font-semibold text-cream transition-colors hover:bg-ink-soft"
      >
        Download the app
      </a>
      <a
        href="https://twitter.com/shengmtaa"
        target="_blank"
        rel="noreferrer"
        className="block text-center font-semibold text-brand-600 hover:text-brand-700"
      >
        Follow @shengmtaa
      </a>
      <p className="text-center">&copy;{year} Vital Digital Media.</p>
    </footer>
  )
}
