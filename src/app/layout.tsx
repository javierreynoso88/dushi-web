import type { Metadata } from 'next'
import { Bebas_Neue, Barlow_Condensed } from 'next/font/google'
import './globals.css'

const barlow = Barlow_Condensed({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const bebas = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: '400',
})

export const metadata: Metadata = {
  title: 'Dushi · Comida Japonesa — Veracruz y Monterrey',
  description:
    'Dushi — comida japonesa. Ikigai 生き甲斐, nuestra razón de ser. Pide a domicilio por WhatsApp en Veracruz y Monterrey.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es-MX" className={`${barlow.variable} ${bebas.variable}`}>
      <body>{children}</body>
    </html>
  )
}
