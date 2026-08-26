import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CircleAlert, CircleCheck, QrCode } from 'lucide-react'
import { useSharp } from '../context/SharpContext'
import { brands } from '../data/mockData'

function getBrandName(brandId) {
  return brands.find((brand) => brand.id === brandId)?.name || 'Sharp Consumer'
}

function ScanPage() {
  const { user, earnQrPoints } = useSharp()
  const [code, setCode] = useState('')
  const [result, setResult] = useState(null)

  function handleSubmit(event) {
    event.preventDefault()
    const normalizedCode = code.trim().toUpperCase()
    if (!normalizedCode) {
      setResult({ success: false, error: 'Enter a QR code to continue.' })
      return
    }

    setResult(earnQrPoints(normalizedCode))
    setCode('')
  }

  return (
    <div className="scan-page">
      <section className="scan-page__intro">
        <p className="eyebrow">Earn as you go</p>
        <h1>Scan. Earn.<br />Keep moving.</h1>
        <p>Enter the code from a participating Sharp Consumer product or experience to add points to your pool.</p>
      </section>

      <section className="scan-panel card" aria-labelledby="scan-heading">
        <div className="scan-panel__heading">
          <span className="scan-panel__mark" aria-hidden="true"><QrCode size={24} /></span>
          <div>
            <p className="eyebrow">QR code redemption</p>
            <h2 id="scan-heading">Add points to your pool</h2>
          </div>
        </div>
        <form className="scan-form" onSubmit={handleSubmit}>
          <label htmlFor="qr-code">Your code</label>
          <div className="scan-form__input-row">
            <input
              id="qr-code"
              type="text"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="SHARP-CARLING-7K4P"
              autoComplete="off"
              spellCheck="false"
              aria-describedby="qr-code-help"
            />
            <button className="button button--primary" type="submit">Redeem <ArrowRight size={15} aria-hidden="true" /></button>
          </div>
          <span className="scan-form__help" id="qr-code-help">Codes are single-use and can only be redeemed once.</span>
        </form>

        {result && result.success && (
          <div className="scan-result scan-result--success" role="status">
            <span className="scan-result__icon" aria-hidden="true"><CircleCheck size={20} /></span>
            <div>
              <strong>+{result.pointsAwarded} points added</strong>
              <span>{getBrandName(result.brandId)} code redeemed successfully.</span>
            </div>
            <b>{user.pointsBalance} <small>pool pts</small></b>
          </div>
        )}
        {result && !result.success && (
          <div className="scan-result scan-result--error" role="alert">
            <span className="scan-result__icon" aria-hidden="true"><CircleAlert size={20} /></span>
            <div>
              <strong>{result.error}</strong>
              <span>Check the code and try again.</span>
            </div>
          </div>
        )}
      </section>

      <div className="scan-page__balance">
        <span>Current pool balance</span>
        <strong>{user.pointsBalance} <small>points</small></strong>
      </div>
      <Link className="text-link" to="/home">Back to home <ArrowRight size={14} aria-hidden="true" /></Link>
    </div>
  )
}

export default ScanPage
