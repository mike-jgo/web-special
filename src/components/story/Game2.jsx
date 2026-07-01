import { matches } from '../../data/matches'

function handleImgError(e) {
  const el = e.currentTarget
  if (!el.dataset.fallback) {
    el.dataset.fallback = '1'
    el.src = '/hero.jpg'
  }
}

// Story · Beat 1 — the UAAP 87 Finals Game 2 loss. Deliberately dark, cold and
// desaturated (a slate cast, not the hero green) to sell the heartbreak.
export default function Game2() {
  const match = matches.find((m) => m.id === 'uaap87-finals-g2')

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#0a0a0a] py-24">
      {/* Cold, desaturated photo backdrop */}
      <img
        src={match.image}
        onError={handleImgError}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-105 object-cover opacity-25 blur-[2px] grayscale"
      />
      {/* Cold slate cast + heavy darkening */}
      <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply" />
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)]" />
      {/* Seam fades — blend with the hero above and the timeline below */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0a0a0a] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 md:px-10">
        {/* Eyebrow — stacked, no dot separators */}
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
          UAAP {match.season} {match.stage}
        </p>
        <p className="mt-2 text-sm font-medium text-slate-500">
          {match.game}, {match.date}
        </p>

        {/* Somber headline */}
        <h2 className="mt-4 text-6xl font-extrabold uppercase leading-[0.9] tracking-tight text-slate-200 md:text-8xl">
          Season&rsquo;s End
        </h2>

        {/* Scoreline */}
        <div className="mt-10 max-w-md">
          <div className="flex items-center justify-between border-b border-white/10 pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            <span>Set</span>
            <span className="flex gap-6">
              <span className="w-10 text-center text-slate-300">DLSU</span>
              <span className="w-10 text-center text-white">NU</span>
            </span>
          </div>
          {match.sets.map(([dlsu, opp], i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b border-white/5 py-2.5 text-lg tabular-nums"
            >
              <span className="text-sm font-medium text-slate-500">
                {i + 1}
              </span>
              <span className="flex gap-6">
                <span className="w-10 text-center font-semibold text-slate-400">
                  {dlsu}
                </span>
                <span className="w-10 text-center font-bold text-white">
                  {opp}
                </span>
              </span>
            </div>
          ))}
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.15em] text-rose-400/80">
            {match.opponent} def. DLSU, sweep
          </p>
        </div>

        {/* Caption */}
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-slate-400 md:text-xl">
          {match.note} The road ends in silence. The rebuild begins.
        </p>
      </div>
    </section>
  )
}
