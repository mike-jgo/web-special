import { useEffect, useRef, useState } from 'react'
import { titles } from '../data/titles'

// Vertical scroll steps through the titles one at a time. Each node gets
// STEP_VH worth of viewport height of scroll before the next becomes active.
const STEP_VH = 0.7
// Width (px) of each node cell in the bottom scrubber.
const CELL = 150

function handleImgError(e) {
  const el = e.currentTarget
  if (!el.dataset.fallback) {
    el.dataset.fallback = '1'
    el.src = '/hero.jpg'
  }
}

// Interactive Legacy timeline: the section pins, vertical scroll advances the
// active championship node-by-node, its photo crossfades into the stage, and
// the scrubber below re-centers on the lit node.
export default function LegacyTimeline() {
  const wrapperRef = useRef(null)
  const activeRef = useRef(0)
  const [active, setActive] = useState(0)
  const [height, setHeight] = useState('100vh')
  const n = titles.length

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    let raf = 0

    const measure = () => {
      setHeight(window.innerHeight * (1 + (n - 1) * STEP_VH))
      onScroll()
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const scrollable = wrapper.offsetHeight - window.innerHeight
        const top = wrapper.getBoundingClientRect().top
        const progress =
          scrollable > 0 ? Math.min(Math.max(-top / scrollable, 0), 1) : 0
        const idx = Math.round(progress * (n - 1))
        if (idx !== activeRef.current) {
          activeRef.current = idx
          setActive(idx)
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
  }, [n])

  // Clicking a node scrolls the page so that node becomes active.
  const scrollToIndex = (i) => {
    const wrapper = wrapperRef.current
    if (!wrapper || n < 2) return
    const scrollable = wrapper.offsetHeight - window.innerHeight
    window.scrollTo({
      top: wrapper.offsetTop + (i / (n - 1)) * scrollable,
      behavior: 'smooth',
    })
  }

  const activeTitle = titles[active]

  return (
    <section
      ref={wrapperRef}
      id="legacy-timeline"
      className="relative bg-[#0a0a0a]"
      style={{ height }}
    >
      {/* Pinned frame */}
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Faint neutral photo texture — pushed far back */}
        <img
          src="/hero.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-105 object-cover opacity-15 blur-sm grayscale"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)]" />
        {/* Seam fades — blend with the sections above and below */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0a0a0a] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

        <div className="relative z-10 flex h-full flex-col">
          {/* Heading */}
          <div className="px-6 pt-14 text-center md:px-10">
            <h2 className="mt-2 text-4xl font-extrabold uppercase tracking-tight text-white md:text-6xl">
              The Legacy
            </h2>
          </div>

          {/* Image stage — crossfades to the active title's photo */}
          <div className="flex flex-1 items-center justify-center px-6 md:px-10">
            <div
              className={`relative aspect-video w-full max-w-3xl overflow-hidden rounded-2xl border-2 transition-colors duration-500 ${
                activeTitle.featured
                  ? 'animate-glow border-gold'
                  : 'border-white/15'
              }`}
            >
              {titles.map((t, i) => (
                <img
                  key={t.season}
                  src={t.image}
                  onError={handleImgError}
                  alt=""
                  aria-hidden="true"
                  className={`absolute inset-0 h-full w-full object-cover grayscale transition-opacity duration-500 ${
                    i === active ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
              {/* Legibility gradient + label */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-left md:p-8">
                <p
                  className={`text-xs font-semibold uppercase tracking-[0.25em] ${
                    activeTitle.featured ? 'text-gold/80' : 'text-white/60'
                  }`}
                >
                  {activeTitle.featured ? 'Reigning Champions' : 'Champions'}
                </p>
                <p
                  className={`mt-1 text-4xl font-extrabold uppercase leading-none tracking-tight md:text-6xl ${
                    activeTitle.featured ? 'text-gold' : 'text-white'
                  }`}
                >
                  UAAP {activeTitle.season}
                </p>
                <p className="mt-1 text-lg font-medium text-white/70 md:text-xl">
                  {activeTitle.year}
                </p>
              </div>
            </div>
          </div>

          {/* Scrubber — re-centers on the active node (pinned frame clips sideways) */}
          <div className="relative h-28 pb-14">
            {/* Static axis line */}
            <div className="absolute inset-x-0 top-[15px] h-px bg-white/15" />
            <div
              className="absolute left-1/2 top-2 flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(calc(-${active} * ${CELL}px - ${CELL / 2}px))`,
              }}
            >
              {titles.map((t, i) => {
                const isActive = i === active
                const passed = i <= active
                return (
                  <button
                    key={t.season}
                    type="button"
                    onClick={() => scrollToIndex(i)}
                    style={{ width: `${CELL}px` }}
                    className="flex cursor-pointer flex-col items-center focus:outline-none"
                    aria-label={`UAAP ${t.season}, ${t.year}`}
                  >
                    <span
                      className={`rounded-full transition-all duration-300 ${
                        isActive
                          ? 'h-4 w-4 bg-gold shadow-[0_0_14px_3px_rgba(212,175,55,0.9)]'
                          : passed
                            ? 'h-3 w-3 bg-gold/70'
                            : 'h-3 w-3 border-2 border-white/40 bg-[#0a0a0a]'
                      }`}
                    />
                    <span
                      className={`mt-3 text-sm font-bold uppercase tracking-tight transition-colors duration-300 ${
                        isActive
                          ? 'scale-110 text-gold'
                          : passed
                            ? 'text-white/70'
                            : 'text-white/40'
                      }`}
                    >
                      {t.year}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
