import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Gift, X } from 'lucide-react'
import { useSharp } from '../context/SharpContext'
import { brands } from '../data/mockData'

function RewardsPage() {
  const { brandId } = useParams()
  const { user, redeemReward } = useSharp()
  const brand = brands.find((item) => item.id === brandId)
  const [selectedReward, setSelectedReward] = useState(null)
  const [result, setResult] = useState(null)

  if (!brand) return <section className="not-found-page"><p className="eyebrow">Sharp Consumer</p><h1>Rewards not found.</h1><p>We could not find that reward catalog.</p><Link className="button button--primary" to="/home">Back to home <ArrowRight size={15} aria-hidden="true" /></Link></section>

  function openReward(reward) {
    setSelectedReward(reward)
    setResult(null)
  }

  function handleRedeem(event) {
    event.preventDefault()
    const redemption = redeemReward(selectedReward.id)
    setResult(redemption)
    if (redemption.success) setSelectedReward(null)
  }

  return (
    <div className="rewards-page">
      <Link className="initiative-page__back" to={`/initiative/${brand.id}`}><ArrowLeft size={15} aria-hidden="true" /> Back to {brand.name}</Link>
      <header className="rewards-page__header"><div><p className="eyebrow">{brand.name} rewards</p><h1>Pick something<br />worth celebrating.</h1><p>Use your points to claim rewards made for your next good moment.</p></div><span className="rewards-page__header-mark" aria-hidden="true"><Gift size={34} /></span></header>
      <section className="rewards-balances" aria-label="Your Sharp Consumer Points">
        <div><span>Sharp Consumer Points</span><strong>{user.sharpConsumerPoints}</strong><small>available to redeem</small></div>
      </section>
      <section className="rewards-catalog"><div className="initiative-section-heading"><div><p className="eyebrow">Shop the collection</p><h2>Choose your reward</h2></div><span>{brand.rewards.length} rewards</span></div>
        {brand.rewards.length === 0 ? <div className="empty-state card">There are no rewards available for this initiative yet.</div> : <div className="reward-grid">{brand.rewards.map((reward) => <article className="reward-card card" key={reward.id}><div className="reward-card__visual"><img src={brand.logo} alt="" /><span aria-hidden="true"><Gift size={23} /></span></div><div className="reward-card__body"><span className="reward-card__source">Sharp Consumer Points</span><h3>{reward.name}</h3><p>{reward.description}</p><div className="reward-card__footer"><strong>{reward.cost} <small>points</small></strong><button className="button button--primary" type="button" onClick={() => openReward(reward)}>Claim <ArrowRight size={15} aria-hidden="true" /></button></div></div></article>)}</div>}
      </section>
      {result?.success && <section className="voucher-confirmation card" role="status"><span className="voucher-confirmation__icon" aria-hidden="true"><Check size={22} /></span><p className="eyebrow">Reward claimed</p><h2>Your reward is ready.</h2><strong>{result.voucher}</strong><p>Your balance has been updated and this reward is now in your claimed rewards.</p></section>}
      {selectedReward && <div className="reward-dialog-backdrop"><form className="reward-dialog card" onSubmit={handleRedeem}><button className="reward-dialog__close" type="button" aria-label="Close reward selection" onClick={() => setSelectedReward(null)}><X size={18} aria-hidden="true" /></button><p className="eyebrow">Ready to claim?</p><h2>{selectedReward.name}</h2><p className="reward-dialog__cost">{selectedReward.cost} Sharp Consumer Points will be deducted.</p>{result?.error && <p className="reward-error" role="alert">{result.error}</p>}<button className="button button--primary" type="submit">Confirm and claim <Check size={15} aria-hidden="true" /></button></form></div>}
    </div>
  )
}

export default RewardsPage