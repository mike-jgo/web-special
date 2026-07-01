import NavBar from './NavBar'
import Headline from './Headline'
import ScrollCue from './ScrollCue'
import Button from './Button'
import { StarIcon, PlayCardIcon } from './icons'

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-dls-green-deep">
      {/* Background photo — drop your image at public/hero.jpg */}
      <img
        src="/hero.jpg"
        alt="DLSU Lady Spikers reacting on court after their UAAP 88 victory"
        className="absolute inset-0 h-full w-full object-cover grayscale"
      />

      {/* Uniform green duotone tint across the whole image */}
      <div className="absolute inset-0 bg-dls-green/70 mix-blend-multiply" />
      {/* Radial light-to-dark: bright (clear) at bottom-right, fading to black outward */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,transparent_0%,rgba(0,0,0,0.55)_70%,rgba(0,0,0,0.9)_100%)]" />
      {/* Bottom fade into the charcoal of the next section — blends the seam */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#0a0a0a]" />

      <NavBar />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pb-28 pt-28 md:px-10">
        <Headline />

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/90 md:text-2xl">
          After falling short in UAAP 87, the Lady Spikers returned with resolve,
          a rebuilt identity, and a perfect 16–0 season that brought them back to
          the top.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button
            as="a"
            href="#story"
            variant="solid"
            icon={<StarIcon className="h-4 w-4 text-dls-green" />}
          >
            Start the Story
          </Button>
          <Button
            as="a"
            href="#matches"
            variant="ghost"
            icon={<PlayCardIcon className="h-4 w-4" />}
          >
            View the matches
          </Button>
        </div>
      </div>

      <ScrollCue />
    </section>
  )
}
