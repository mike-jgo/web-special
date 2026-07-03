import { useEffect, useRef, useState } from 'react'
import { matches } from '../../data/matches'

function handleImgError(e) {
  const el = e.currentTarget
  if (!el.dataset.fallback) {
    el.dataset.fallback = '1'
    el.src = '/hero.jpg'
  }
}

const SET_NAMES = ['Set One', 'Set Two', 'Set Three']
// Ordered reveal steps: eyebrow, headline, ledger header, three set rows,
// scoreline, caption. Scroll advances one step at a time.
const STEPS = 8
// Viewport-heights of scroll per step; the pinned section is this much taller.
const STEP_VH = 0.25

const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi)

// Story · Beat 1 — the UAAP 87 Finals Game 2 loss. The coldest scene in the
// film: slate grade, a left-anchored column, the sets read like a memorial
// ledger. The scene pins and scroll steps the reveal one line at a time (as in
// the Legacy timeline). Loss-rose marks the scoreline and appears nowhere else.
export default function Game2() {
  const match = matches.find((m) => m.id === 'uaap87-finals-g2')
  const wrapperRef = useRef(null)
  const stepRef = useRef(0)
  const [step, setStep] = useState(0)
  const [height, setHeight] = useState('100vh')

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    let raf = 0

    const measure = () => {
      setHeight(window.innerHeight * (1 + (STEPS - 1) * STEP_VH))
      onScroll()
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const scrollable = wrapper.offsetHeight - window.innerHeight
        const top = wrapper.getBoundingClientRect().top
        const progress =
          scrollable > 0 ? clamp(-top / scrollable, 0, 1) : 1
        const idx = Math.round(progress * (STEPS - 1))
        if (idx !== stepRef.current) {
          stepRef.current = idx
          setStep(idx)
        }
      })
    }

    measure()
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  // An element is fully shown once scroll has reached its step; the discrete
  // change is eased by a CSS transition. Transform + opacity only.
  const on = (i) => step >= i
  const stepClass =
    'transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform]'
  const stepStyle = (i, shift = 24) => ({
    opacity: on(i) ? 1 : 0,
    transform: on(i) ? 'translateY(0)' : `translateY(${shift}px)`,
  })

  return (
    <section ref={wrapperRef} className="relative bg-[#0a0a0a]" style={{ height }}>
      {/* Pinned frame — holds still while scroll steps the reveal */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Cold, desaturated photo backdrop — scale drifts as steps advance */}
        <img
          src={match.image}
          onError={handleImgError}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-25 blur-[2px] grayscale transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `scale(${1.06 + (step / (STEPS - 1)) * 0.06})` }}
        />
        {/* Cold slate cast + heavy darkening */}
        <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)]" />
        {/* Seam fades — blend with the hero above and the timeline below */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0a0a0a] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
          <div className="max-w-3xl">
            {/* Eyebrow — stacked, no dot separators */}
            <div className={stepClass} style={stepStyle(0)}>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
                UAAP {match.season} {match.stage}
              </p>
              <p className="mt-2 text-sm font-medium text-slate-500">
                {match.game}, {match.date}
              </p>
            </div>

            {/* Somber headline */}
            <h2
              className={`mt-5 -ml-[0.06em] text-[clamp(3.5rem,11vw,8rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-slate-200 ${stepClass}`}
              style={stepStyle(1, 32)}
            >
              Season&rsquo;s End
            </h2>

            {/* Set ledger — a memorial inscription, not a box score */}
            <div className="mt-12 max-w-md">
              <div
                className={`flex items-baseline justify-end gap-8 border-b border-white/10 pb-2 ${stepClass}`}
                style={stepStyle(2)}
              >
                <span className="w-14 text-right text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  DLSU
                </span>
                <span className="w-14 text-right text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                  {match.opponent}
                </span>
              </div>
              {match.sets.map(([dlsu, opp], i) => (
                <div
                  key={i}
                  className={`flex items-baseline justify-between border-b border-white/5 py-3.5 tabular-nums ${stepClass}`}
                  style={stepStyle(3 + i)}
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {SET_NAMES[i] ?? `Set ${i + 1}`}
                  </span>
                  <span className="flex items-baseline gap-8">
                    <span className="w-14 text-right text-xl font-semibold text-slate-500">
                      {dlsu}
                    </span>
                    <span className="w-14 text-right text-2xl font-bold text-slate-100">
                      {opp}
                    </span>
                  </span>
                </div>
              ))}
              <p
                className={`mt-5 text-sm font-semibold uppercase tracking-[0.15em] text-rose-400/80 ${stepClass}`}
                style={stepStyle(6)}
              >
                {match.opponent} defeat DLSU, 0&ndash;3
              </p>
            </div>

            {/* Caption */}
            <p
              className={`mt-10 max-w-xl text-lg leading-relaxed text-slate-400 md:text-xl ${stepClass}`}
              style={stepStyle(7)}
            >
              {match.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
