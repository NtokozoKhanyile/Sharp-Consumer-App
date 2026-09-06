import { ArrowLeft, ArrowUpRight, Handshake } from 'lucide-react'
import { Link } from 'react-router-dom'
import discoveryLogo from '../images/20220922_VIT-logo-RGB_primary-invert86-1024x569.jpg'
import uberLogo from '../images/uber-logo-1-1.png'

const partners = [
  {
    name: 'Uber',
    logo: uberLogo,
    description: 'Get where you need to go with a trusted ride partner.',
  },
  {
    name: 'Discovery',
    logo: discoveryLogo,
    description: 'Discover more ways to support your wellbeing and everyday goals.',
  },
]

function PartnersPage() {
  return (
    <div className="partners-page">
      <Link className="partners-page__back" to="/home"><ArrowLeft size={16} aria-hidden="true" /> Back to home</Link>

      <header className="partners-page__hero card">
        <div>
          <p className="eyebrow">SABSharp Partner Network</p>
          <h1>Our partners</h1>
          <p>Explore the brands that help make every day a little sharper.</p>
        </div>
        <span className="partners-page__hero-icon" aria-hidden="true"><Handshake size={28} /></span>
      </header>

      <section className="partners-section" aria-labelledby="partners-heading">
        <div className="partners-section__heading">
          <div>
            <p className="eyebrow">Partner benefits</p>
            <h2 id="partners-heading">Meet our partners</h2>
          </div>
          <span>{partners.length} partners</span>
        </div>

        <div className="partners-grid">
          {partners.map((partner) => (
            <article className="partner-card card" key={partner.name}>
              <div className={`partner-card__logo partner-card__logo--${partner.name.toLowerCase()}`}>
                <img src={partner.logo} alt={`${partner.name} logo`} />
              </div>
              <div className="partner-card__body">
                <h3>{partner.name}</h3>
                <p>{partner.description}</p>
                <span className="partner-card__link">Explore partner <ArrowUpRight size={16} aria-hidden="true" /></span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default PartnersPage
