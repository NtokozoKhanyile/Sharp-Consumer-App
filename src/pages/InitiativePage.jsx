import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, CirclePlus } from 'lucide-react'
import { useSharp } from '../context/SharpContext'
import { brands } from '../data/mockData'

function getProgress(brand, points) {
  const levels = brand.badgeLevels
  const goldThreshold = levels[levels.length - 1].pointsRequired

  if (points >= goldThreshold) {
    return { percentage: 100, currentBadge: levels[levels.length - 1], nextBadge: null, pointsToNext: 0 }
  }

  const nextIndex = levels.findIndex((level) => points < level.pointsRequired)
  const nextBadge = levels[nextIndex]
  const previousThreshold = nextIndex === 0 ? 0 : levels[nextIndex - 1].pointsRequired
  const tierPoints = nextBadge.pointsRequired - previousThreshold
  const percentage = Math.round(((points - previousThreshold) / tierPoints) * 100)

  return {
    percentage: Math.max(0, Math.min(100, percentage)),
    currentBadge: nextIndex === 0 ? null : levels[nextIndex - 1],
    nextBadge,
    pointsToNext: nextBadge.pointsRequired - points,
  }
}

function InitiativePage() {
  const { brandId } = useParams()
  const { brandProgress, completedContentIds } = useSharp()
  const brand = brands.find((item) => item.id === brandId)

  if (!brand) {
    return (
      <section className="not-found-page">
        <p className="eyebrow">Sharp Consumer</p>
        <h1>Initiative not found.</h1>
        <p>We could not find that brand initiative.</p>
        <Link className="button button--primary" to="/home">Back to home <ArrowRight size={15} aria-hidden="true" /></Link>
      </section>
    )
  }
  const points = brandProgress[brand.id]?.points || 0
  const progress = getProgress(brand, points)

  return (
    <div className={`initiative-page initiative-page--${brand.id.replace('brand-', '')}`}>
      <Link className="initiative-page__back" to="/home"><ArrowLeft size={15} aria-hidden="true" /> All initiatives</Link>
      <header className="initiative-page__header">
        <div className="initiative-page__mark" aria-hidden="true">{brand.name.charAt(0)}</div>
        <div>
          <p className="eyebrow">{brand.tagline}</p>
          <h1>{brand.name}</h1>
          <p>{brand.description}</p>
        </div>
      </header>

      <section className="initiative-progress card" aria-label={`${brand.name} progress`}>
        <div className="initiative-section-heading">
          <div>
            <p className="eyebrow">Your progress</p>
            <h2>{progress.currentBadge?.name || 'Ready to start'}</h2>
          </div>
          <strong>{points} <small>pts</small></strong>
        </div>
        <div className="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress.percentage}>
          <span style={{ width: `${progress.percentage}%` }} />
        </div>
        <div className="initiative-progress__meta">
          <span>{progress.nextBadge ? `${progress.pointsToNext} pts to ${progress.nextBadge.name}` : 'Gold badge unlocked'}</span>
          <span>{progress.percentage}%</span>
        </div>
      </section>

      <section className="initiative-section">
        <div className="initiative-section-heading">
          <div><p className="eyebrow">Learn and earn</p><h2>Content for you</h2></div>
          <span className="home-section__count">{brand.contentItems.length} items</span>
        </div>
        {brand.contentItems.length === 0 ? <div className="empty-state card">New learning experiences are on the way.</div> : <div className="initiative-content-list">
          {brand.contentItems.map((content) => {
            const isComplete = completedContentIds.includes(content.id)
            return (
              <Link className={`initiative-content-item card ${isComplete ? 'is-complete' : ''}`} key={content.id} to={`/content/${content.id}`}>
                <span className="initiative-content-item__status" aria-hidden="true">{isComplete ? <Check size={16} /> : <CirclePlus size={16} />}</span>
                <span className="initiative-content-item__body">
                  <span className="content-card__type">{content.type === 'article+quiz' ? 'Article + quiz' : 'Article'}</span>
                  <strong>{content.title}</strong>
                  <span>{content.summary}</span>
                </span>
                <span className="initiative-content-item__points">{isComplete ? 'Completed' : `+${content.pointsValue} pts`}</span>
              </Link>
            )
          })}
        </div>}
      </section>

      <section className="initiative-section initiative-rewards">
        <div className="initiative-section-heading">
          <div><p className="eyebrow">Reward catalog</p><h2>Worth the journey</h2></div>
          <Link className="text-link" to={`/rewards/${brand.id}`}>View all <ArrowRight size={14} aria-hidden="true" /></Link>
        </div>
        {brand.rewards.length === 0 ? <div className="empty-state card">Rewards for this initiative are coming soon.</div> : <div className="reward-preview-list">
          {brand.rewards.slice(0, 2).map((reward) => (
            <article className="reward-preview card" key={reward.id}>
              <span className="reward-preview__source">Sharp Consumer Points</span>
              <h3>{reward.name}</h3>
              <p>{reward.description}</p>
              <strong>{reward.cost} <small>points</small></strong>
            </article>
          ))}
        </div>}
      </section>
    </div>
  )
}

export default InitiativePage