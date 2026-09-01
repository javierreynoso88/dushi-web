import { Sparkles } from 'lucide-react'

export function PromoBanner() {
  return (
    <div className="border-b border-salmon/30 bg-salmon text-white">
      <div className="container-site flex items-center justify-center gap-2 py-2.5 text-center text-sm">
        <Sparkles className="h-4 w-4" />
        <span>
          <span className="font-semibold">Martes 2×1</span> en rolls clásicos ·
          Envío gratis en pedidos +$350
        </span>
      </div>
    </div>
  )
}
