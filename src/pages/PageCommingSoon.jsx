import { ArrowLeft, CalendarDays, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

function PageCommingSoon() {
  return (
    <section className="coming-soon-page" aria-labelledby="coming-soon-heading">
      <div className="coming-soon-page__confetti" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="coming-soon-page__icon" aria-hidden="true"><CalendarDays size={34} /></div>
      <p className="eyebrow">Something good is brewing</p>
      <h1 id="coming-soon-heading">Coming soon.</h1>
      <p className="coming-soon-page__message">We are putting the finishing touches on this Sharp experience. Check back soon for more ways to make every moment count.</p>
      <div className="coming-soon-page__sparkle" aria-hidden="true"><Sparkles size={18} /></div>
      <Link className="button button--primary" to="/home"><ArrowLeft size={15} aria-hidden="true" /> Back to home</Link>
    </section>
  )
}

export default PageCommingSoon
