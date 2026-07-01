import Button from './Button'

const links = [
  { label: 'STORY', href: '#story' },
  { label: 'LEGACY', href: '#legacy-timeline' },
  { label: 'THE TEAM', href: '#team' },
]

export default function NavBar() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10">
        <a href="#" className="text-sm font-bold tracking-tight text-white md:text-base">
          A The Lasallian Web Special
        </a>

        <div className="flex items-center gap-6 md:gap-8">
          <ul className="hidden items-center gap-6 md:flex md:gap-8">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-xs font-semibold tracking-wide text-white/90 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <Button as="a" href="#matches" variant="outline" size="sm">
            VIEW THE MATCHES
          </Button>
        </div>
      </nav>
    </header>
  )
}
