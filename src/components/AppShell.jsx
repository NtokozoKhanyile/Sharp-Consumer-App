import { useMemo, useState } from 'react'
import { Navigate, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { ArrowRight, Bell, CalendarDays, Gift, Home, QrCode, Search, SlidersHorizontal, Trophy, UserRound } from 'lucide-react'
import { useSharp } from '../context/SharpContext'
import { brands } from '../data/mockData'
import ContentPage from '../pages/ContentPage'
import HomePage from '../pages/HomePage'
import InitiativePage from '../pages/InitiativePage'
import ProfilePage from '../pages/ProfilePage'
import PlannerPage from '../pages/PlannerPage'
import PageCommingSoon from '../pages/PageCommingSoon'
import RewardsPage from '../pages/RewardsPage'
import ScanPage from '../pages/ScanPage'

const tabs = [
  { label: 'Home', icon: Home, to: '/home' },
  { label: 'Scan', icon: QrCode, to: '/scan' },
  { label: 'Planner', icon: CalendarDays, to: '/planner' },
  { label: 'Rewards', icon: Gift, to: '/rewards/brand-carling' },
  { label: 'Profile', icon: UserRound, to: '/profile' },
]

function LoginPage() {
  const navigate = useNavigate()
  const { login, sharpConsumerBadgeEarned } = useSharp()
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [ageEligibility, setAgeEligibility] = useState('')
  const [validationMessage, setValidationMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (ageEligibility === 'under-18') {
      setValidationMessage('You are below the legal drinking age and cannot access the app. Be #Sharp! Come back when you are 18.')
      return
    }
    if (ageEligibility !== '18-or-over') {
      setValidationMessage('Please confirm whether you are 18 or older to continue.')
      return
    }
    if (!email.trim() || !password.trim()) {
      setValidationMessage('Enter your email and password to continue.')
      return
    }

    login(email.trim())
    navigate(sharpConsumerBadgeEarned ? '/home' : '/onboarding')
  }

  return (
    <section className="auth-page">
      <form className="auth-form card" onSubmit={handleSubmit} noValidate>
        <div className="auth-form__heading">
          <p className="eyebrow">{isSignUp ? 'Create account' : 'Sign in'}</p>
          <h1>{isSignUp ? 'Start your Sharp journey.' : 'Welcome back.'}</h1>
        </div>
        <label htmlFor="auth-email">Email address</label>
        <input
          id="auth-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          placeholder="you@example.com"
        />
        <label htmlFor="auth-password">Password</label>
        <input
          id="auth-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete={isSignUp ? 'new-password' : 'current-password'}
          placeholder="Enter your password"
        />
        <fieldset className="auth-form__age-gate">
          <legend>Are you 18 or older?</legend>
          <label className="auth-form__radio-option">
            <input
              type="radio"
              name="age-eligibility"
              value="18-or-over"
              checked={ageEligibility === '18-or-over'}
              onChange={(event) => {
                setAgeEligibility(event.target.value)
                setValidationMessage('')
              }}
            />
            Yes, I am 18 or older
          </label>
          <label className="auth-form__radio-option">
            <input
              type="radio"
              name="age-eligibility"
              value="under-18"
              checked={ageEligibility === 'under-18'}
              onChange={(event) => {
                setAgeEligibility(event.target.value)
                setValidationMessage('You are below the legal drinking age and cannot access the app. Be #Sharp! Come back when you are 18.')
              }}
            />
            No, I am under 18
          </label>
        </fieldset>
        {validationMessage && <p className="auth-form__error" role="alert">{validationMessage}</p>}
        <button className="auth-form__submit" type="submit" disabled={ageEligibility === 'under-18'}>
          {isSignUp ? 'Create account' : 'Log in'} <ArrowRight size={15} aria-hidden="true" />
        </button>
        <p className="auth-form__switch">
          {isSignUp ? 'Already have an account?' : 'New to Sharp Consumer?'}{' '}
          <button type="button" onClick={() => {
            setIsSignUp((current) => !current)
            setValidationMessage('')
          }}>
            {isSignUp ? 'Log in' : 'Sign up'}
          </button>
        </p>
      </form>
    </section>
  )
}



function OnboardingPage() {
  const navigate = useNavigate()
  const { earnSharpConsumerBadge } = useSharp()
  const [stage, setStage] = useState('intro')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [score, setScore] = useState(0)

  const currentQuestion = onboardingQuestions[questionIndex]

  function startQuiz() {
    setStage('quiz')
    setQuestionIndex(0)
    setAnswers([])
    setScore(0)
  }

  function selectAnswer(answerIndex) {
    const nextAnswers = [...answers, answerIndex]
    const nextScore = nextAnswers.reduce((total, answer, index) => (
      total + (answer === onboardingQuestions[index].correctIndex ? 1 : 0)
    ), 0)

    setAnswers(nextAnswers)
    if (questionIndex === onboardingQuestions.length - 1) {
      setScore(nextScore)
      setStage('results')
      return
    }
    setQuestionIndex((current) => current + 1)
  }

  function finishOnboarding() {
    if (score < 2) return
    earnSharpConsumerBadge()
    navigate('/home', { replace: true })
  }


}

function AuthenticatedRoute({ children, requiresBadge = false, onboardingOnly = false }) {
  const { isAuthenticated, sharpConsumerBadgeEarned } = useSharp()
  const location = useLocation()

  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />
  if (onboardingOnly && sharpConsumerBadgeEarned) return <Navigate to="/home" replace />
  if (requiresBadge && !sharpConsumerBadgeEarned) return <Navigate to="/onboarding" replace state={{ from: location }} />
  return children
}

function TopBar() {
  const navigate = useNavigate()
  const { user } = useSharp()
  const [searchQuery, setSearchQuery] = useState('')

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return []

    const results = brands.flatMap((brand) => {
      const initiativeMatches = `${brand.name} ${brand.tagline || ''} ${brand.description || ''}`
        .toLowerCase()
        .includes(query)
        ? [{ id: brand.id, title: brand.name, type: 'Initiative', path: `/initiative/${brand.id}` }]
        : []

      const contentMatches = brand.contentItems
        .filter((content) => `${content.title} ${content.summary || ''}`.toLowerCase().includes(query))
        .map((content) => ({
          id: content.id,
          title: content.title,
          type: brand.name,
          path: `/content/${content.id}`,
        }))

      return [...initiativeMatches, ...contentMatches]
    })

    return results.filter((result, index) => results.findIndex((item) => item.path === result.path) === index).slice(0, 8)
  }, [searchQuery])

  function openSearchResult(path) {
    setSearchQuery('')
    navigate(path)
  }

  return (
    <header className="top-bar">
      <div className="top-bar__row">
          <span>Hi, {user.firstName}</span>

        <div className="top-bar__actions" aria-label="Account tools">
          <button type="button" aria-label="Notifications"><Bell size={19} aria-hidden="true" /></button>
          <button type="button" aria-label="View badges" onClick={() => navigate('/coming-soon')}><Trophy size={19} aria-hidden="true" /></button>
        </div>
      </div>
      <div className="search-wrapper">
        <div className="search-bar" role="search">
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            placeholder="Search initiatives or content."
            aria-label="Search initiatives or content"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          <button type="button" aria-label="Filter search"><SlidersHorizontal size={18} aria-hidden="true" /></button>
        </div>
        {searchQuery.trim() && (
          <div className="search-results" role="listbox" aria-label="Search results">
            {searchResults.length > 0 ? searchResults.map((result) => (
              <button
                className="search-results__item"
                key={`${result.type}-${result.id}`}
                type="button"
                onClick={() => openSearchResult(result.path)}
              >
                <span>
                  <strong>{result.title}</strong>
                  <small>{result.type}</small>
                </span>
                <ArrowRight size={15} aria-hidden="true" />
              </button>
            )) : <p className="search-results__empty">No initiatives or content found.</p>}
          </div>
        )}
      </div>
    </header>
  )
}

function BottomTabs() {
  return (
    <nav className="bottom-tabs" aria-label="Primary navigation">
      {tabs.map((tab) => (
        <NavLink key={tab.to} to={tab.to} className={({ isActive }) => isActive ? 'bottom-tabs__link is-active' : 'bottom-tabs__link'}>
          <span className="bottom-tabs__icon"><tab.icon size={19} strokeWidth={2.2} aria-hidden="true" /></span>
          {tab.label}
        </NavLink>
      ))}
    </nav>
  )
}

function RoutedContent() {
  const { pathname } = useLocation()
  const isLogin = pathname === '/login'

  return (
    <>
      {!isLogin && <TopBar />}
      <main className={isLogin ? 'app-shell app-shell--login' : 'app-shell'}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/onboarding" element={<AuthenticatedRoute onboardingOnly><OnboardingPage /></AuthenticatedRoute>} />
          <Route path="/home" element={<AuthenticatedRoute requiresBadge><HomePage /></AuthenticatedRoute>} />
          <Route path="/initiative/:brandId" element={<AuthenticatedRoute requiresBadge><InitiativePage /></AuthenticatedRoute>} />
          <Route path="/content/:contentId" element={<AuthenticatedRoute requiresBadge><ContentPage /></AuthenticatedRoute>} />
          <Route path="/scan" element={<AuthenticatedRoute requiresBadge><ScanPage /></AuthenticatedRoute>} />
          <Route path="/planner" element={<AuthenticatedRoute requiresBadge><PlannerPage /></AuthenticatedRoute>} />
          <Route path="/coming-soon" element={<AuthenticatedRoute requiresBadge><PageCommingSoon /></AuthenticatedRoute>} />
          <Route path="/rewards/:brandId" element={<AuthenticatedRoute requiresBadge><RewardsPage /></AuthenticatedRoute>} />
          <Route path="/profile" element={<AuthenticatedRoute requiresBadge><ProfilePage /></AuthenticatedRoute>} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>
      {!isLogin && <BottomTabs />}
    </>
  )
}

function AppShell() {
  return <RoutedContent />
}

export default AppShell
