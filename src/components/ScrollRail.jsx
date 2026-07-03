import { useEffect, useState } from 'react'

const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi)

// Page-wide scroll stops. `top` is the page start; the rest reference section
// ids and are positioned by where the section actually falls in the scroll.
// Missing ids are skipped, so new story beats can be added here as they ship.
const STOPS = [
  { id: 'top', label: 'Opening' },
  { id: 'story', label: "Season's End" },
  { id: 'legacy-timeline', label: 'The Legacy' },
]

// A fixed vertical progress rail on the right edge: a track, a fill and thumb
// that follow page scroll, and clickable stops at each section.
export default function ScrollRail() {
  const [marks, setMarks] = useState([])
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState(0)

  useEffect(() => {
    let raf = 0

    const compute = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight
      const denom = docH > 0 ? docH : 1
      const m = STOPS.map((s) => {
        if (s.id === 'top') return 0
        const el = document.getElementById(s.id)
        if (!el) return null
        const abs = el.getBoundingClientRect().top + window.scrollY
        return clamp(abs / denom, 0, 1)
      })
      const p = clamp(window.scrollY / denom, 0, 1)
      let a = 0
      m.forEach((frac, i) => {
        if (frac != null && p >= frac - 0.002) a = i
      })
      setMarks(m)
      setProgress(p)
      setActive(a)
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(compute)
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', compute)
    // The pinned sections set their heights after mount and images load late;
    // re-measure whenever the document height changes.
    const ro = new ResizeObserver(compute)
    ro.observe(document.body)
    window.addEventListener('load', compute)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', compute)
      window.removeEventListener('load', compute)
      ro.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  const go = (i) => {
    const docH = document.documentElement.scrollHeight - window.innerHeight
    const frac = marks[i] ?? 0
    window.scrollTo({ top: frac * docH, behavior: 'smooth' })
  }

  return (
    <nav
      aria-label="Story progress"
      className="pointer-events-none fixed right-4 top-1/2 z-40 h-[62vh] -translate-y-1/2 sm:right-6"
    >
      <div className="relative h-full w-6">
        {/* Track */}
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/15" />
        {/* Progress fill */}
        <span
          className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-white/60"
          style={{ height: `${progress * 100}%` }}
        />

        {/* Stops */}
        {STOPS.map((s, i) => {
          const frac = marks[i]
          if (frac == null) return null
          const passed = progress >= frac - 0.002
          const isActive = i === active
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => go(i)}
              aria-label={s.label}
              aria-current={isActive ? 'true' : undefined}
              className="group pointer-events-auto absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center py-2 focus:outline-none"
              style={{ top: `${frac * 100}%` }}
            >
              <span
                className={`absolute right-full mr-3 hidden whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.2em] transition-opacity duration-300 md:block ${
                  isActive
                    ? 'text-white opacity-100'
                    : 'text-white/70 opacity-0 group-hover:opacity-100'
                }`}
              >
                {s.label}
              </span>
              <span
                className={`block h-px transition-all duration-300 ${
                  isActive
                    ? 'w-5 bg-white'
                    : passed
                      ? 'w-4 bg-white/70'
                      : 'w-2.5 bg-white/35'
                }`}
              />
            </button>
          )
        })}

        {/* Thumb — current scroll position */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white ring-2 ring-white/25"
          style={{ top: `${progress * 100}%` }}
        />
      </div>
    </nav>
  )
}
