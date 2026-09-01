export function IkigaiSection() {
  return (
    <section
      id="ikigai"
      className="relative overflow-hidden border-y border-edge bg-card py-20 lg:py-28"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-20 select-none font-display text-[20rem] font-black leading-none text-caramel/[0.05]"
      >
        斐
      </span>

      <div className="container-site grid items-center gap-12 lg:grid-cols-2">
        <div className="relative order-2 lg:order-1">
          <div className="aspect-square overflow-hidden rounded-4xl border border-edge">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/menu/d22.jpg"
              alt="Sushi roll de autor en Dushi"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -right-4 -top-4 rounded-3xl bg-caramel px-6 py-4 text-center text-night shadow-[0_0_30px_rgba(234,187,28,0.25)]">
            <p className="font-display text-3xl font-black">2021</p>
            <p className="text-xs uppercase tracking-widest text-night/70">
              desde
            </p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <span className="eyebrow">生き甲斐</span>
          <h2 className="mt-3 font-display text-4xl font-black leading-tight text-cream sm:text-5xl">
            IKIGAI: NUESTRA RAZÓN DE SER
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-smoke">
            En japonés, <em className="text-caramel">ikigai</em> es aquello que
            da sentido a tus días — la razón por la que vale la pena levantarse
            cada mañana. Para nosotros es simple: hacer el mejor sushi y verte
            volver.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-smoke">
            Cada roll se prepara al momento, con ingredientes seleccionados y la
            técnica que aprendimos a respetar. Tradición japonesa con el corazón
            mexicano de Veracruz y Monterrey.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6">
            {[
              { n: '3', l: 'sucursales' },
              { n: '+30', l: 'creaciones' },
              { n: '4.8★', l: 'calificación' },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-display text-3xl font-black text-caramel">
                  {s.n}
                </p>
                <p className="mt-1 text-sm text-smoke">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
