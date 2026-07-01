// A single championship card. `featured` enlarges it, brightens the border,
// adds a trophy mark, and applies the pulsing green glow.
export default function TitleCard({ season, year, featured = false }) {
  if (featured) {
    return (
      <div className="animate-glow flex flex-col items-center justify-center rounded-2xl border-2 border-gold bg-dls-green-deep/60 px-10 py-10 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold/70">
          Reigning Champions
        </span>
        <span className="mt-3 text-3xl font-extrabold uppercase tracking-tight text-gold md:text-4xl">
          UAAP {season}
        </span>
        <span className="mt-1 text-lg font-medium text-gold/80 md:text-xl">
          {year}
        </span>
      </div>
    )
  }

  return (
    <div className="group flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-6 text-center transition-colors duration-200 hover:border-gold/50 hover:bg-gold/10">
      <span className="text-lg font-bold uppercase tracking-tight text-white transition-colors duration-200 group-hover:text-gold md:text-xl">
        UAAP {season}
      </span>
      <span className="mt-1 text-sm font-medium text-white/60 transition-colors duration-200 group-hover:text-gold/70">
        {year}
      </span>
    </div>
  )
}
