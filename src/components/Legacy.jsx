import { titles } from '../data/titles'
import TitleCard from './TitleCard'

export default function Legacy() {
  const featured = titles.find((t) => t.featured)
  const rest = titles.filter((t) => !t.featured)

  return (
    <section
      id="legacy"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#0a0a0a] py-24"
    >
      {/* Faint neutral photo texture — pushed far back */}
      <img
        src="/hero.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-105 object-cover opacity-20 blur-sm grayscale"
      />
      <div className="absolute inset-0 bg-black/60" />
      {/* Dark vignette: darker toward the edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)]" />
      {/* Soft gold glow behind the champion card */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(212,175,55,0.14)_0%,transparent_55%)]" />
      {/* Top fade: pure charcoal at the very top so the seam with the hero is invisible */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#0a0a0a] to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
        {/* Heading — kept minimal */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/50">
            The Legacy
          </p>
          <h2 className="mt-3 text-6xl font-extrabold uppercase tracking-tight text-white md:text-8xl">
            13 Titles
          </h2>
        </div>

        {/* Featured title */}
        <div className="mt-14 flex justify-center">
          <div className="w-full max-w-xs">
            <TitleCard
              season={featured.season}
              year={featured.year}
              featured
            />
          </div>
        </div>

        {/* Previous titles */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {rest.map((title) => (
            <TitleCard
              key={title.season}
              season={title.season}
              year={title.year}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
