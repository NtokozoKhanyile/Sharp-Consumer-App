import { useState } from 'react'
import { CalendarDays, CarFront, Check, Clock3, MapPin, Plus, ShieldCheck } from 'lucide-react'
import { useSharp } from '../context/SharpContext'

const initialForm = {
  date: '',
  time: '',
  location: '',
  transport: 'rideshare',
  safeRideHome: true,
  paceYourself: true,
  noDrinkDriving: true,
}

const transportOptions = [
  { value: 'rideshare', label: 'Rideshare or taxi' },
  { value: 'public-transport', label: 'Public transport' },
  { value: 'designated-driver', label: 'Designated driver' },
  { value: 'walk', label: 'Walk home' },
]

function formatPlanDate(date) {
  return new Intl.DateTimeFormat('en-ZA', { weekday: 'short', day: 'numeric', month: 'short' }).format(new Date(`${date}T00:00:00`))
}

function PlannerPage() {
  const { plannerPlans, addPlannerPlan } = useSharp()
  const [form, setForm] = useState(initialForm)
  const [message, setMessage] = useState(null)

  function updateField(event) {
    const { name, value, type, checked } = event.target
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
    setMessage(null)
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!form.date || !form.time || !form.location.trim()) {
      setMessage({ type: 'error', text: 'Add a date, time and location to save your plan.' })
      return
    }

    const result = addPlannerPlan({ ...form, location: form.location.trim() })
    setMessage({ type: 'success', text: `Plan saved. You earned ${result.pointsAwarded} points for making a Sharp plan.` })
    setForm(initialForm)
  }

  const sortedPlans = [...plannerPlans].sort((first, second) => `${first.date}T${first.time}`.localeCompare(`${second.date}T${second.time}`))

  return (
    <div className="planner-page">
      <section className="planner-hero">
        <div>
          <p className="eyebrow">Plan ahead</p>
          <h1>Make a plan.<br />Make it Sharp.</h1>
          <p>Set up your outing and make responsible choices before the good times begin.</p>
        </div>
        <span className="planner-hero__mark" aria-hidden="true"><CalendarDays size={42} /></span>
      </section>

      <div className="planner-layout">
        <section className="planner-form card" aria-labelledby="planner-form-heading">
          <div className="planner-section-heading">
            <div>
              <p className="eyebrow">New outing</p>
              <h2 id="planner-form-heading">Plan your next moment</h2>
            </div>
            <span className="planner-section-heading__icon" aria-hidden="true"><Plus size={18} /></span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="planner-form__row">
              <label>
                Date
                <input name="date" type="date" value={form.date} onChange={updateField} required />
              </label>
              <label>
                Time
                <input name="time" type="time" value={form.time} onChange={updateField} required />
              </label>
            </div>
            <label>
              Where are you going?
              <span className="planner-input"><MapPin size={16} aria-hidden="true" /><input name="location" type="text" value={form.location} onChange={updateField} placeholder="Add a venue or neighbourhood" required /></span>
            </label>
            <label>
              How will you get home?
              <span className="planner-input"><CarFront size={16} aria-hidden="true" /><select name="transport" value={form.transport} onChange={updateField}>{transportOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></span>
            </label>
            <fieldset className="planner-checks">
              <legend>My Sharp choices</legend>
              <label><input name="safeRideHome" type="checkbox" checked={form.safeRideHome} onChange={updateField} /> <span>I've planned a safe ride home</span></label>
              <label><input name="paceYourself" type="checkbox" checked={form.paceYourself} onChange={updateField} /> <span>I'll know my limits and pace myself</span></label>
              <label><input name="noDrinkDriving" type="checkbox" checked={form.noDrinkDriving} onChange={updateField} /> <span>I won't drink and drive</span></label>
            </fieldset>
            {message && <p className={`planner-message planner-message--${message.type}`} role={message.type === 'error' ? 'alert' : 'status'}>{message.text}</p>}
            <button className="button button--primary planner-form__submit" type="submit"><ShieldCheck size={16} aria-hidden="true" /> Save plan and earn points</button>
          </form>
        </section>

        <section className="planner-calendar" aria-labelledby="planner-calendar-heading">
          <div className="planner-section-heading">
            <div>
              <p className="eyebrow">Your calendar</p>
              <h2 id="planner-calendar-heading">Upcoming plans</h2>
            </div>
            <span className="planner-plan-count">{sortedPlans.length} {sortedPlans.length === 1 ? 'plan' : 'plans'}</span>
          </div>
          {sortedPlans.length > 0 ? (
            <div className="planner-plan-list">
              {sortedPlans.map((plan) => (
                <article className="planner-plan card" key={plan.id}>
                  <div className="planner-plan__date"><strong>{new Date(`${plan.date}T00:00:00`).getDate()}</strong><span>{new Intl.DateTimeFormat('en-ZA', { month: 'short' }).format(new Date(`${plan.date}T00:00:00`))}</span></div>
                  <div className="planner-plan__details"><strong>{plan.location}</strong><span><Clock3 size={13} aria-hidden="true" /> {formatPlanDate(plan.date)} at {plan.time}</span><span><CarFront size={13} aria-hidden="true" /> {transportOptions.find((option) => option.value === plan.transport)?.label}</span></div>
                  <span className="planner-plan__points"><Check size={14} aria-hidden="true" /> +{plan.pointsAwarded}</span>
                </article>
              ))}
            </div>
          ) : (
            <div className="planner-empty card"><CalendarDays size={25} aria-hidden="true" /><strong>Your calendar is clear.</strong><span>Add your next outing and earn points for planning responsibly.</span></div>
          )}
        </section>
      </div>
    </div>
  )
}

export default PlannerPage
