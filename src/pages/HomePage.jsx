import { Link } from 'react-router-dom'
import { ArrowRight, Clock3, HelpCircle, Plus, ShieldCheck, Sparkles, Target, TrendingUp, Verified, Zap } from 'lucide-react'
import { useSharp } from '../context/SharpContext'
import { brands } from '../data/mockData'

function getCurrentBadge(progress) {
  return progress?.badge || { name: 'Not started' }
}

function HomePage() {
  const { brandProgress, completedContentIds } = useSharp()
  const recommendedContent = brands
    .flatMap((brand) => brand.contentItems.map((content) => ({ ...content, brand })))
    .filter(({ id }) => !completedContentIds.includes(id))

  return (
    <div className="home-page">
      <section className="home-hero card">
        <div className="home-hero__copy">
          <p className="eyebrow">Sharp Online</p>
          <h1>Rewarding Sharp Consumers</h1>
          <div className="home-hero__trust">
            <span><Zap size={15} aria-hidden="true" /> Convertable Points</span>
            <span><ShieldCheck size={15} aria-hidden="true" /> Verified content</span>
          </div>
          <div className="home-hero__actions">
            <Link className="button button--primary" to="/coming-soon">Start Earning <ArrowRight size={15} aria-hidden="true" /></Link>
            <Link className="button button--light" to="/coming-soon"><HelpCircle size={15} aria-hidden="true" /> How it works</Link>
          </div>
        </div>
        <div className="home-hero__art" aria-hidden="true"><span>CHEERS</span><strong>SHARP</strong></div>
      </section>

      <section className="home-section home-section--initiatives" id="initiatives">
        <div className="home-section__heading">
          <h2>Explore Initiatives</h2>
          <Link className="section-link" to="/coming-soon">See all <ArrowRight size={14} aria-hidden="true" /></Link>
        </div>
        {brands.length === 0 ? <div className="empty-state card">No brand initiatives are available right now.</div> : <div className="initiative-grid">
          {brands.map((brand) => {
            const badge = getCurrentBadge(brandProgress[brand.id])
            return (
              <Link className={`initiative-tile initiative-tile--${brand.id.replace('brand-', '')} card`} key={brand.id} to={`/coming-soon`}>
                <span className="initiative-tile__mark">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    onError={(event) => {
                      event.currentTarget.style.display = 'none'
                      event.currentTarget.nextElementSibling.style.display = 'block'
                    }}
                  />
                  <span aria-hidden="true">{brand.name.charAt(0)}</span>
                </span>
                <span className="initiative-tile__body">
                  <strong>{brand.name}</strong>
                  <span className="initiative-tile__tagline">{brand.tagline}</span>
                  <span className="initiative-tile__badge"><Sparkles size={12} aria-hidden="true" /> {badge.name}</span>
                </span>
                <span className="initiative-tile__arrow" aria-hidden="true"><ArrowRight size={16} /></span>
              </Link>
            )
          })}
          {/*<a className="initiative-tile initiative-tile--more card" href="#recommended">
            <span className="initiative-tile__mark" aria-hidden="true"><Plus size={24} /></span>
            <span className="initiative-tile__body">
              <strong>More initiatives</strong>
              <span className="initiative-tile__badge">Discover what is next</span>
            </span>
          </a> */}
        </div>}
      </section>

      <section className="home-section home-section--recommended">
        <div className="home-section__heading">
          <h2>Recommended for you</h2>
          <Link className="section-link" to="/coming-soon">View all <ArrowRight size={14} aria-hidden="true" /></Link>
        </div>
        {recommendedContent.length > 0 ? (
          <div className="recommended-row" id="recommended">
            {recommendedContent.map(({ brand, ...content }) => (
              <Link className="content-card card" key={content.id} to={`/coming-soon`}>
                <span className="content-card__thumbnail"><img src={content.image} alt="" /></span>
                <span className="content-card__details">
                  <span className="content-card__tag">{content.type === 'article+quiz' ? 'Popular' : 'New'}</span>
                  <span className="content-card__brand">{brand.name}</span>
                  <strong>{content.title}</strong>
                  <span className="content-card__meta">{/*<Target size={13} aria-hidden="true" />*/} {content.type === 'article+quiz' ? 'Quiz' : 'Article'} <span aria-hidden="true">·</span> <Clock3 size={13} aria-hidden="true" /> 5 min</span>
                  <span className="content-card__points"><small>Earn up to</small>+{content.pointsValue} pts</span>
                  <span className="content-card__start">Start <ArrowRight size={14} aria-hidden="true" /></span>
                </span>
              </Link>
            ))}
          </div>
        ) : <div className="home-empty card">You have completed every recommendation. Check back soon for more.</div>}
      </section>

      <section className="home-trust" id="trust" aria-label="Sharp Online benefits">
        {[
            [Verified, 'Verified Content'],
            [Zap, 'Instant Points'],
            [Sparkles, 'Redeem Anywhere'],
            [TrendingUp, 'Track Progress'],
          ].map(([Icon, label]) => <div className="home-trust__item" key={label}><span aria-hidden="true"><Icon size={16} /></span><strong>{label}</strong></div>)}
      </section>
    </div>
  )
}

export default HomePage