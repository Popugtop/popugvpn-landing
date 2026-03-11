import Header from './components/Header'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Features from './components/Features'
import Pricing from './components/Pricing'
import Footer from './components/Footer'
import config from './data/config.json'

export default function App() {
  return (
    <div className="min-h-screen bg-bg-base text-slate-100">
      <Header brand={config.brand} hero={config.hero} />
      <main>
        <Hero hero={config.hero} cabinetUrl={config.brand.cabinetUrl} />
        <Marquee items={config.marquee} />
        <Features features={config.features} />
        <Pricing pricing={config.pricing} cabinetUrl={config.brand.cabinetUrl} />
      </main>
      <Footer brand={config.brand} />
    </div>
  )
}
