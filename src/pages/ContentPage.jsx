import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Sparkles, X } from 'lucide-react'
import { useSharp } from '../context/SharpContext'
import { brands } from '../data/mockData'

function findContent(contentId) {
  for (const brand of brands) {
    const content = brand.contentItems.find((item) => item.id === contentId)
    if (content) return { brand, content }
  }
  return null
}

function ContentPage() {
  const { contentId } = useParams()
  const match = findContent(contentId)
  const { brandProgress, completeContent } = useSharp()
  const [answers, setAnswers] = useState({})
  const [hasStartedQuiz, setHasStartedQuiz] = useState(false)
  const [result, setResult] = useState(null)

  if (!match) {
    return (
      <section className="not-found-page">
        <p className="eyebrow">Sharp Consumer</p>
        <h1>Content not found.</h1>
        <p>We could not find that content item.</p>
        <Link className="button button--primary" to="/home">Back to home <ArrowRight size={15} aria-hidden="true" /></Link>
      </section>
    )
  }

  const { brand, content } = match
  const questions = content.quiz?.questions || []
  const isQuiz = questions.length > 0

  function finishContent(score = null) {
    const previousBadge = brandProgress[brand.id]?.badge
    const completion = completeContent(content.id)
    const leveledUp = Boolean(completion.badge && completion.badge.id !== previousBadge?.id)
    setResult({ score, completion, leveledUp })
  }

  function handleQuizSubmit(event) {
    event.preventDefault()
    const score = questions.reduce((total, question, index) => (
      total + (answers[index] === question.correctIndex ? 1 : 0)
    ), 0)
    finishContent(score)
  }

  if (result) {
    const isRetake = result.completion.alreadyCompleted
    return (
      <div className="content-page">
        <Link className="initiative-page__back" to={`/initiative/${brand.id}`}><ArrowLeft size={15} aria-hidden="true" /> Back to {brand.name}</Link>
        <section className="content-result card">
          <p className="eyebrow">{isQuiz ? 'Quiz results' : 'Content complete'}</p>
          <h1>{isQuiz ? `${result.score} / ${questions.length}` : 'You made it count.'}</h1>
          {isQuiz && <p className="content-result__score">{result.score === questions.length ? 'Perfect score.' : 'Thanks for taking the time to learn something new.'}</p>}
          <div className="content-result__confirmation" role="status">
            <strong>{isRetake ? 'Already completed' : `+${content.pointsValue} points awarded`}</strong>
            <span>{isRetake ? 'Your points were awarded on your first completion.' : 'Your progress has been updated.'}</span>
          </div>
          {result.leveledUp && <div className="content-result__level-up"><Sparkles size={18} aria-hidden="true" /><strong>{result.completion.badge.name} badge unlocked</strong><span>Keep going to reach the next level.</span></div>}
          {isQuiz && (
            <div className="quiz-review">
              {questions.map((question, index) => {
                const isCorrect = answers[index] === question.correctIndex
                return <div className={`quiz-review__item ${isCorrect ? 'is-correct' : 'is-incorrect'}`} key={question.id}>{isCorrect ? <Check size={16} aria-hidden="true" /> : <X size={16} aria-hidden="true" />}<strong>Question {index + 1}</strong><span>{isCorrect ? 'Correct' : `Incorrect - correct answer: ${question.options[question.correctIndex]}`}</span></div>
              })}
            </div>
          )}
          <Link className="button button--primary" to={`/initiative/${brand.id}`}>Back to initiative <ArrowRight size={15} aria-hidden="true" /></Link>
        </section>
      </div>
    )
  }

  return (
    <div className="content-page">
      <Link className="initiative-page__back" to={`/initiative/${brand.id}`}><ArrowLeft size={15} aria-hidden="true" /> Back to {brand.name}</Link>
      <article className="content-article">
        <p className="eyebrow">{brand.name} / {isQuiz ? 'Article + quiz' : 'Article'}</p>
        <h1>{content.title}</h1>
        <p className="content-article__summary">{content.summary}</p>
        <div className="content-article__body">
          <p>Every meaningful moment starts with a choice. The habits we build and the actions we take shape the stories we tell about ourselves.</p>
          <p>{content.summary} Take a moment to reflect on what this means in your own day, then carry that idea into your next challenge.</p>
        </div>
        {!isQuiz ? (
          <button className="button button--primary" type="button" onClick={() => finishContent()}>Mark as complete <ArrowRight size={15} aria-hidden="true" /></button>
        ) : (
          <button className="button button--primary" type="button" onClick={() => setHasStartedQuiz(true)}>Take the quiz <ArrowRight size={15} aria-hidden="true" /></button>
        )}
      </article>

      {hasStartedQuiz && <form className="quiz-form card" onSubmit={handleQuizSubmit}>
        <div className="initiative-section-heading"><div><p className="eyebrow">Final step</p><h2>Test your knowledge</h2></div><span className="home-section__count">{questions.length} questions</span></div>
        {questions.map((question, index) => <fieldset className="quiz-question" key={question.id}>
          <legend><span>0{index + 1}</span>{question.text}</legend>
          <div className="quiz-options">
            {question.options.map((option, optionIndex) => <label className={answers[index] === optionIndex ? 'is-selected' : ''} key={option}><input type="radio" name={`question-${index}`} value={optionIndex} checked={answers[index] === optionIndex} onChange={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))} required />{option}</label>)}
          </div>
        </fieldset>)}
        <button className="button button--primary" type="submit">See my results <ArrowRight size={15} aria-hidden="true" /></button>
      </form>}
    </div>
  )
}

export default ContentPage