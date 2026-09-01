/* eslint-disable @next/next/no-img-element */

// Logo oficial Dushi. variant 'dark' = wordmark verde (para fondos claros),
// variant 'light' = wordmark blanco (para fondos oscuros). El ícono va naranja en ambos.
export function Logo({
  variant = 'dark',
  className = '',
}: {
  variant?: 'dark' | 'light'
  className?: string
}) {
  return (
    <img
      src={variant === 'light' ? '/dushi-logo-light.svg' : '/dushi-logo-dark.svg'}
      alt="Dushi · Comida Japonesa"
      className={className}
    />
  )
}
