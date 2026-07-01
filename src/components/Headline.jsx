// Stacked hero headline. The middle line is rendered hollow (Archivo Black +
// white stroke); the outer lines are solid Inter extrabold.
const lines = [
  { text: 'FROM', outline: false },
  { text: 'HEARTBREAK', outline: true },
  { text: 'TO HISTORY', outline: false },
]

export default function Headline() {
  return (
    <h1 className="font-sans text-[15vw] font-extrabold uppercase leading-[0.88] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl">
      {lines.map((line) => (
        <span
          key={line.text}
          className={
            line.outline
              ? "block font-['Archivo_Black'] font-normal tracking-[0.01em] text-[0.9em] text-outline"
              : 'block'
          }
        >
          {line.text}
        </span>
      ))}
    </h1>
  )
}
