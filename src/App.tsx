import YandexMetrika from './components/YandexMetrika'
import Header from './components/Header'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Trial from './components/Trial'
import Features from './components/Features'
import Servers from './components/Servers'
import Pricing from './components/Pricing'
import Footer from './components/Footer'
import config from './data/config.json'

export default function App() {
  return (
    <div className="min-h-screen bg-bg-base text-slate-100">
      <YandexMetrika id={config.analytics.yandexMetrikaId} />
      <Header brand={config.brand} hero={config.hero} />
      <main>
        <Hero hero={config.hero} cabinetUrl={config.brand.cabinetUrl} telegramChannel={config.brand.telegramChannel} telegramBot={config.brand.telegramBot} serversCount={config.servers.length} />
        <Marquee items={config.marquee} />
        <Trial trial={config.trial} cabinetUrl={config.brand.cabinetUrl} />
        <Features features={config.features} serversCount={config.servers.length} />
        <Servers servers={config.servers} />
        <Pricing pricing={config.pricing} cabinetUrl={config.brand.cabinetUrl} serversCount={config.servers.length} />
      </main>
      <Footer brand={config.brand} />
    </div>
  )
}
