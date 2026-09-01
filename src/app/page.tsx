import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { MenuSection } from '@/components/MenuSection'
import { IkigaiSection } from '@/components/IkigaiSection'
import { DeliverySection } from '@/components/DeliverySection'
import { LocationsSection } from '@/components/LocationsSection'
import { Footer } from '@/components/Footer'
import { LocationPicker } from '@/components/LocationPicker'
import { CartDrawer } from '@/components/CartDrawer'
import { KanjiField } from '@/components/KanjiField'

export default function Home() {
  return (
    <>
      <KanjiField />
      <Header />
      <main>
        <Hero />
        <MenuSection />
        <IkigaiSection />
        <DeliverySection />
        <LocationsSection />
      </main>
      <Footer />
      <LocationPicker />
      <CartDrawer />
    </>
  )
}
