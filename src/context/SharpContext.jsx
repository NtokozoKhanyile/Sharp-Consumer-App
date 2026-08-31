import { createContext, useContext, useState } from 'react'
import { brands, qrCodes, user as initialUser } from '../data/mockData'

const SharpContext = createContext(null)

function getBrandForContent(contentId) {
  return brands.find((brand) => brand.contentItems.some((item) => item.id === contentId))
}

function getBadgeForPoints(brand, points) {
  return brand.badgeLevels.reduce((current, badge) => (
    points >= badge.pointsRequired ? badge : current
  ), null)
}

function createPointBatch(source, amount, brandId = null) {
  const earnedDate = new Date()
  const expiryDate = new Date(earnedDate)
  expiryDate.setDate(expiryDate.getDate() + 90)
  return { id: `${source}-${earnedDate.getTime()}-${Math.random().toString(36).slice(2, 8)}`, source, amount, brandId, earnedDate: earnedDate.toISOString(), expiryDate: expiryDate.toISOString() }
}

function createVoucher(existingCodes) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code
  do {
    const block = () => Array.from({ length: 4 }, () => characters[Math.floor(Math.random() * characters.length)]).join('')
    code = `SHARP-${block()}-${block()}`
  } while (existingCodes.has(code))
  return code
}

function getNameFromEmail(email) {
  const localPart = email.split('@')[0] || 'Sharp Consumer'
  const nameParts = localPart
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())

  return {
    firstName: nameParts[0] || 'Sharp',
    lastName: nameParts.slice(1).join(' '),
  }
}

export function SharpProvider({ children }) {
  const [state, setState] = useState({
    user: { ...initialUser },
    pointBatches: [],
    isAuthenticated: false,
    completedContentIds: [],
    redeemedQrCodes: [],
    redemptions: [],
    vouchers: [],
    plannerPlans: [],
    brandProgress: {},
    sharpConsumerBadgeEarned: true,
  })

  const login = (email) => {
    const name = getNameFromEmail(email)
    setState((current) => ({
      ...current,
      isAuthenticated: true,
      user: { ...current.user, email, ...name },
    }))
    return { success: true }
  }

  const logout = () => {
    setState((current) => ({ ...current, isAuthenticated: false }))
    return { success: true }
  }

  const completeContent = (contentId) => {
    let result = { success: false, error: 'Content not found' }
    setState((current) => {
      if (current.completedContentIds.includes(contentId)) {
        result = { success: true, alreadyCompleted: true }
        return current
      }

      const brand = getBrandForContent(contentId)
      const content = brand?.contentItems.find((item) => item.id === contentId)
      if (!brand || !content) return current

      const previousPoints = current.brandProgress[brand.id]?.points || 0
      const points = previousPoints + content.pointsValue
      result = { success: true, pointsAwarded: content.pointsValue, badge: getBadgeForPoints(brand, points) }
      return {
        ...current,
        user: { ...current.user, sharpConsumerPoints: current.user.sharpConsumerPoints + content.pointsValue },
        pointBatches: [...current.pointBatches, createPointBatch('content', content.pointsValue, brand.id)],
        completedContentIds: [...current.completedContentIds, contentId],
        brandProgress: {
          ...current.brandProgress,
          [brand.id]: { points, badge: getBadgeForPoints(brand, points) },
        },
      }
    })
    return result
  }

  const earnQrPoints = (code) => {
    const qr = qrCodes.find((item) => item.code === code)
    if (!qr) return { success: false, error: 'Invalid QR code' }

    let result = { success: false, error: 'QR code already redeemed' }
    setState((current) => {
      if (current.redeemedQrCodes.includes(qr.id)) return current
      result = { success: true, pointsAwarded: qr.pointsValue, brandId: qr.brandId }
      return {
        ...current,
        user: { ...current.user, sharpConsumerPoints: current.user.sharpConsumerPoints + qr.pointsValue },
        pointBatches: [...current.pointBatches, createPointBatch('qr-scan', qr.pointsValue, qr.brandId)],
        redeemedQrCodes: [...current.redeemedQrCodes, qr.id],
      }
    })
    return result
  }

  const redeemReward = (rewardId) => {
    const reward = brands.flatMap((brand) => brand.rewards).find((item) => item.id === rewardId)
    if (!reward) return { success: false, error: 'Reward not found' }
    let result = { success: false, error: 'Not enough balance for this redemption.' }
    setState((current) => {
      if (current.user.sharpConsumerPoints < reward.cost) {
        result = { success: false, error: `Sharp Consumer Points needs ${reward.cost} points, but only ${current.user.sharpConsumerPoints} are available.` }
        return current
      }
      const voucher = createVoucher(new Set(current.vouchers.map(({ code }) => code)))
      result = { success: true, voucher }
      return {
        ...current,
        user: { ...current.user, sharpConsumerPoints: current.user.sharpConsumerPoints - reward.cost },
        vouchers: [...current.vouchers, { code: voucher, rewardId }],
        redemptions: [...current.redemptions, { rewardId, cost: reward.cost, voucher, redeemedAt: new Date().toISOString() }],
      }
    })
    return result
  }

  const addPlannerPlan = (plan) => {
    const safeTransport = ['public-transport', 'rideshare', 'designated-driver', 'walk'].includes(plan.transport)
    const checks = [safeTransport, plan.safeRideHome, plan.paceYourself, plan.noDrinkDriving]
    const pointsAwarded = checks.filter(Boolean).length * 10
    const createdPlan = { ...plan, id: `plan-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, pointsAwarded, createdAt: new Date().toISOString() }

    setState((current) => ({
      ...current,
      user: { ...current.user, sharpConsumerPoints: current.user.sharpConsumerPoints + pointsAwarded },
      pointBatches: pointsAwarded > 0 ? [...current.pointBatches, createPointBatch('planner', pointsAwarded)] : current.pointBatches,
      plannerPlans: [...current.plannerPlans, createdPlan],
    }))
    return { success: true, pointsAwarded, plan: createdPlan }
  }

  return (
    <SharpContext.Provider value={{ ...state, login, logout, completeContent, earnQrPoints, redeemReward, addPlannerPlan }}>
      {children}
    </SharpContext.Provider>
  )
}

export function useSharp() {
  const context = useContext(SharpContext)
  if (!context) throw new Error('useSharp must be used within SharpProvider')
  return context
}
