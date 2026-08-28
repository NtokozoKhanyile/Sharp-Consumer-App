import { Link } from 'react-router-dom'
import { ArrowRight, Award, Check, Clock3, Gift, Phone, Plus, ShieldCheck, UserPlus, UserRound, Users, Zap } from 'lucide-react'
import { useSharp } from '../context/SharpContext'
import { brands } from '../data/mockData'

function ProfilePage() {
  const { user, brandProgress, sharpConsumerBadgeEarned, pointBatches, redemptions } = useSharp()
  const sortedRedemptions = [...redemptions].sort((first, second) => new Date(second.redeemedAt) - new Date(first.redeemedAt))
  const friends = [
    { name: 'Lerato Mokoena', detail: 'Sharp friend', initials: 'LM' },
    { name: 'Thabo Dlamini', detail: 'Connected friend', initials: 'TD' },
  ]
  const emergencyContacts = [
    { name: 'Nomsa Khanyile', detail: 'Sister', number: '+27 82 555 0148' },
    { name: 'Safe Ride Support', detail: 'Emergency transport', number: '+27 80 012 3456' },
  ]

  return (
    <div className="profile-page">
      <header className="profile-header">
        <div className="profile-header__avatar" aria-hidden="true"><UserRound size={28} /></div>
        <div>
          <p className="eyebrow">Your account</p>
          <h1>{user.firstName} {user.lastName}</h1>
          <p>{user.email}</p>
        </div>
      </header>

      <section className="profile-section profile-connections" aria-labelledby="connections-heading">
        <div className="initiative-section-heading"><div><p className="eyebrow">Look out for each other</p><h2 id="connections-heading">Friends & emergency contacts</h2></div><span><Users size={15} aria-hidden="true" /> Your safety circle</span></div>
        <p className="profile-section__intro">Connect with friends and keep trusted numbers close when you are making plans.</p>
        <div className="profile-connections__grid">
          <div className="connection-group">
            <div className="connection-group__heading"><span className="connection-group__icon connection-group__icon--friends" aria-hidden="true"><UserPlus size={17} /></span><div><strong>Sharp friends</strong><small>Plan better together</small></div></div>
            <div className="connection-list">
              {friends.map((friend) => <div className="connection-item" key={friend.name}><span className="connection-item__avatar" aria-hidden="true">{friend.initials}</span><span><strong>{friend.name}</strong><small>{friend.detail}</small></span><Link className="connection-item__action" to="/coming-soon">Connect</Link></div>)}
            </div>
            <Link className="connection-add" to="/coming-soon"><Plus size={15} aria-hidden="true" /> Add a friend</Link>
          </div>
          <div className="connection-group">
            <div className="connection-group__heading"><span className="connection-group__icon connection-group__icon--emergency" aria-hidden="true"><Phone size={17} /></span><div><strong>Emergency contacts</strong><small>People you can count on</small></div></div>
            <div className="connection-list">
              {emergencyContacts.map((contact) => <div className="connection-item" key={contact.name}><span className="connection-item__avatar connection-item__avatar--emergency" aria-hidden="true"><Phone size={14} /></span><span><strong>{contact.name}</strong><small>{contact.detail} · {contact.number}</small></span><Link className="connection-item__action" to="/coming-soon" aria-label={`Call ${contact.name}`}>Call</Link></div>)}
            </div>
            <Link className="connection-add" to="/coming-soon"><Plus size={15} aria-hidden="true" /> Add a contact</Link>
          </div>
        </div>
      </section>

      <section className="profile-section" aria-labelledby="badges-heading">
        <div className="initiative-section-heading"><div><p className="eyebrow">Recognition</p><h2 id="badges-heading">Your badges</h2></div><span>{brands.length + 1} badge tracks</span></div>
        <div className="badge-grid">
          {brands.every((brand) => !(brandProgress[brand.id]?.points) && !sharpConsumerBadgeEarned) && <div className="empty-state card"><ShieldCheck size={22} aria-hidden="true" /><span>Complete an initiative to earn your first badge.</span></div>}
          <article className={`badge-card card ${sharpConsumerBadgeEarned ? 'is-earned' : 'is-locked'}`}>
            <span className="badge-card__icon" aria-hidden="true"><ShieldCheck size={20} /></span>
            <div><strong>Sharp Consumer</strong><span>{sharpConsumerBadgeEarned ? 'Earned' : 'Locked'}</span></div>
          </article>
          {brands.map((brand) => {
            const points = brandProgress[brand.id]?.points || 0
            return brand.badgeLevels.map((level) => {
              const isEarned = points >= level.pointsRequired
              return <article className={`badge-card card ${isEarned ? 'is-earned' : 'is-locked'}`} key={level.id}>
                <span className="badge-card__icon" aria-hidden="true"><Award size={20} /></span>
                <div><strong>{brand.name} {level.name}</strong><span>{isEarned ? 'Earned' : `${level.pointsRequired - points} pts to unlock`}</span></div>
              </article>
            })
          })}
        </div>
      </section>

      <section className="profile-section" aria-labelledby="balances-heading">
        <div className="initiative-section-heading"><div><p className="eyebrow">Available now</p><h2 id="balances-heading">Balances</h2></div></div>
        <div className="profile-balances">
          <div className="profile-balance profile-balance--pool"><span>Sharp Consumer Points</span><strong>{user.sharpConsumerPoints}</strong><small>points available for any brand reward</small></div>
        </div>
        <p className="profile-balance-note">Sharp Consumer Points can be redeemed across all brand catalogs below.</p>
        <div className="point-batches">
          <div className="initiative-section-heading"><div><p className="eyebrow">Point batches</p><h3>What makes up your pool</h3></div></div>
          {pointBatches.length === 0 ? <p className="profile-empty">Earn points from an article, quiz, scan or planner to see each batch here.</p> : <div className="point-batch-grid">{pointBatches.map((batch) => <article className="point-batch card" key={batch.id}><span className="point-batch__icon" aria-hidden="true"><Zap size={16} /></span><div className="point-batch__details"><strong>{batch.source === 'qr-scan' ? 'QR scan' : batch.source === 'planner' ? 'Sharp planning' : 'Content completion'}</strong><small>{brands.find((brand) => brand.id === batch.brandId)?.name || 'Sharp Consumer'} · {new Date(batch.earnedDate).toLocaleDateString()}</small></div><b>+{batch.amount} <small>pts</small></b><em><Clock3 size={12} aria-hidden="true" /> Expires {new Date(batch.expiryDate).toLocaleDateString()}</em></article>)}</div>}
        </div>
      </section>

      <section className="profile-section" aria-labelledby="history-heading">
        <div className="initiative-section-heading"><div><p className="eyebrow">Your rewards</p><h2 id="history-heading">Claimed rewards</h2></div><Link className="text-link" to="/rewards/brand-carling">Browse rewards <ArrowRight size={14} aria-hidden="true" /></Link></div>
        {sortedRedemptions.length === 0 ? <p className="profile-empty card">Your claimed rewards will appear here.</p> : <div className="redemption-list">{sortedRedemptions.map((redemption) => { const reward = brands.flatMap((brand) => brand.rewards).find((item) => item.id === redemption.rewardId); return <article className="redemption-item card" key={redemption.voucher}><span className="redemption-item__icon" aria-hidden="true"><Gift size={18} /></span><div><span className="redemption-item__status"><Check size={12} aria-hidden="true" /> Claimed</span><strong>{reward?.name || 'Reward'}</strong><span>{new Date(redemption.redeemedAt).toLocaleDateString()} · Sharp Consumer Points</span></div><b>{redemption.voucher}</b></article> })}</div>}
      </section>
    </div>
  )
}

export default ProfilePage
