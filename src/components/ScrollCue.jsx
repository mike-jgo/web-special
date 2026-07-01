import { ChevronDownIcon } from './icons'

export default function ScrollCue() {
  return (
    <a
      href="#story"
      className="absolute inset-x-0 bottom-6 z-20 mx-auto flex w-fit items-center gap-2 text-sm font-semibold text-white/90 transition-colors hover:text-white"
    >
      Scroll
      <ChevronDownIcon className="h-4 w-4" />
    </a>
  )
}
