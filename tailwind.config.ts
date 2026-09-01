import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Dushi — extraída del menú físico (verde bosque + mostaza)
        night: '#141B12', // verde bosque principal (fondo)
        abyss: '#0E120D', // negro verdoso (footer / zonas más oscuras)
        card: '#1B2419', // verde bosque secundario (superficies)
        lift: '#202A1E', // verde elevado (tarjetas destacadas)
        edge: '#2A3527', // bordes sutiles
        caramel: '#EABB1C', // amarillo Dushi — acento principal (precios, CTAs)
        ember: '#F2C735', // amarillo hover
        deepgold: '#C99A12', // amarillo oscuro
        cream: '#F2EFE6', // blanco cálido (texto principal)
        cream2: '#D8D7CF', // blanco secundario
        smoke: '#92988E', // gris verdoso (texto secundario)
        salmon: '#F05A28', // naranja salmón — contenido (logo, promos)
        redsalmon: '#C9342F', // rojo salmón profundo (alertas)
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'sans-serif'],
      },
      maxWidth: {
        site: '1200px',
      },
      borderRadius: {
        // editorial: poco redondeo (0–8px)
        DEFAULT: '4px',
        md: '6px',
        lg: '8px',
        xl: '8px',
        '2xl': '8px',
        '3xl': '8px',
        '4xl': '10px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
      },
    },
  },
  plugins: [],
}

export default config
