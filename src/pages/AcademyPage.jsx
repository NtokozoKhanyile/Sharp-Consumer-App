import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Lightbulb, MessageCircleMore } from 'lucide-react'
import { Link } from 'react-router-dom'

const moduleStages = [
  {
    title: 'Learn',
    progress: 10,
    points: 100,
    icon: BookOpen,
    items: ['Myths vs facts', 'Statistics', 'Why it matters'],
  },
  {
    title: 'Interact',
    progress: 20,
    points: 250,
    icon: MessageCircleMore,
    items: ['Real-life scenarios', 'Peer quizzes', 'Social challenges', 'Learn from others'],
  },
  {
    title: 'Apply',
    progress: 70,
    points: 500,
    icon: Lightbulb,
    items: ['Responsible choices', 'Plan transport', 'Complete challenges', 'Real social occasion'],
  },
]

function AcademyPage() {
  return (
    <div className="academy-page">
      <Link className="academy-page__back" to="/home"><ArrowLeft size={16} aria-hidden="true" /> Back to home</Link>

      <header className="academy-page__header">
        <p className="eyebrow">SABSharp Academy</p>
        <h1>Module 1: #EatWithIt: Responsible Drinking Practices</h1>
        <p>Build safe, responsible drinking habits — learn, engage, and apply.</p>
      </header>

      <section className="academy-stages" aria-label="Module activities">
        {moduleStages.map(({ title, progress, points, icon: Icon, items }) => (
          <Link className="academy-stage card" key={title} to="/coming-soon">
            <div className="academy-stage__progress" aria-label={`${progress}% complete`}>
              <svg viewBox="0 0 42 42" aria-hidden="true">
                <circle className="academy-stage__progress-track" cx="21" cy="21" r="18" />
                <circle className="academy-stage__progress-value" cx="21" cy="21" r="18" pathLength="100" style={{ strokeDasharray: `${progress} 100` }} />
              </svg>
              <strong>{progress}%</strong>
            </div>
            <div className="academy-stage__content">
              <div className="academy-stage__title"><Icon size={17} aria-hidden="true" /><h2>{title}</h2></div>
              <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <span className="academy-stage__points">+{points} pts <ArrowRight size={14} aria-hidden="true" /></span>
          </Link>
        ))}
      </section>

      <Link className="academy-rewards" to="/coming-soon">
        <CheckCircle2 size={18} aria-hidden="true" /> Rewards unlocked <ArrowRight size={17} aria-hidden="true" />
      </Link>
    </div>
  )
}

export default AcademyPage
