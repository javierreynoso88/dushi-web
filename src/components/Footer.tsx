import { Instagram, Facebook, FileText, Briefcase, Phone } from 'lucide-react'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer id="contacto" className="border-t border-edge text-cream">
      <div className="container-site py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo variant="light" className="h-12 w-auto" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-smoke">
              Sushi de autor con alma japonesa. Ikigai 生き甲斐 — nuestra razón
              de ser, desde 2021.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-edge transition-colors hover:border-caramel hover:text-caramel"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-edge transition-colors hover:border-caramel hover:text-caramel"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-smoke/60">
              Explora
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-smoke">
              <li>
                <a href="#menu" className="hover:text-caramel">
                  Menú
                </a>
              </li>
              <li>
                <a href="#ikigai" className="hover:text-caramel">
                  Ikigai · Nosotros
                </a>
              </li>
              <li>
                <a href="#sucursales" className="hover:text-caramel">
                  Sucursales
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-smoke/60">
              Atención
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-smoke">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 hover:text-caramel"
                >
                  <FileText className="h-4 w-4" /> Facturación
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 hover:text-caramel"
                >
                  <Briefcase className="h-4 w-4" /> Bolsa de trabajo
                </a>
              </li>
              <li>
                <a
                  href="tel:+522291234567"
                  className="flex items-center gap-2 hover:text-caramel"
                >
                  <Phone className="h-4 w-4" /> (229) 123 4567
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-smoke/60">
              Delivery
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-smoke">
              <li>
                <a href="#" className="hover:text-caramel">
                  Uber Eats
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-caramel">
                  Rappi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-caramel">
                  DiDi Food
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-edge pt-8 text-sm text-smoke/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Dushi. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-cream">
              Aviso de privacidad
            </a>
            <a href="#" className="hover:text-cream">
              Términos
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
