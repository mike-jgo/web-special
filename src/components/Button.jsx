const base =
  'inline-flex items-center gap-2 rounded-full font-medium transition-colors duration-150 cursor-pointer select-none'

const sizes = {
  md: 'px-5 py-2.5 text-sm',
  sm: 'px-4 py-2 text-xs',
}

const variants = {
  // Solid white pill with dark text (e.g. "Start the Story")
  solid: 'bg-white text-dls-green-deep hover:bg-white/90',
  // Translucent dark pill with white text + subtle border (e.g. "View the matches")
  ghost: 'bg-black/30 text-white border border-white/30 hover:bg-black/50',
  // Outlined pill used in the nav ("VIEW THE MATCHES")
  outline:
    'bg-transparent text-white/90 border border-white/40 hover:border-white hover:text-white',
}

export default function Button({
  children,
  variant = 'solid',
  size = 'md',
  icon = null,
  className = '',
  as = 'button',
  ...props
}) {
  const Tag = as
  return (
    <Tag
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </Tag>
  )
}
