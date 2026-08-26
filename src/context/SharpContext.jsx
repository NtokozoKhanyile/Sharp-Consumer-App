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

export function SharpProvider({ children }) {
  const [state, setState] = useState({
    user: { ...initialUser },
    pointBatches: [],
    isAuthenticated: true,
    completedContentIds: [],
    redeemedQrCodes: [],
    redemptions: [],
    vouchers: [],
    plannerPlans: [],
    brandProgress: {},
    sharpConsumerBadgeEarned: true,
  })

  const login = (email) => {
    setState((current) => ({
      ...current,
      isAuthenticated: true,
      user: { ...current.user, email },
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
        user: { ...current.user, pointsBalance: current.user.pointsBalance + content.pointsValue },
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
        user: { ...current.user, pointsBalance: current.user.pointsBalance + qr.pointsValue },
        pointBatches: [...current.pointBatches, createPointBatch('qr-scan', qr.pointsValue, qr.brandId)],
        redeemedQrCodes: [...current.redeemedQrCodes, qr.id],
      }
    })
    return result
  }

  const redeemReward = (rewardId, source, splitAmounts = {}) => {
    const reward = brands.flatMap((brand) => brand.rewards).find((item) => item.id === rewardId)
    if (!reward) return { success: false, error: 'Reward not found' }
    if (!['brand', 'shared', 'split'].includes(source)) return { success: false, error: 'Choose a valid redemption source.' }
    const requestedBrand = typeof splitAmounts === 'number' ? splitAmounts : Number(splitAmounts.brand || 0)
    const brandAmount = source === 'brand' ? reward.cost : source === 'shared' ? 0 : requestedBrand
    const sharedAmount = source === 'shared' ? reward.cost : source === 'brand' ? 0 : Number(splitAmounts.shared ?? reward.cost - brandAmount)
    if (brandAmount < 0 || sharedAmount < 0 || brandAmount + sharedAmount !== reward.cost) return { success: false, error: `Split amounts must total ${reward.cost}.` }
    let result = { success: false, error: 'Not enough balance for this redemption.' }
    setState((current) => {
      if (current.user.rewardBalance < brandAmount) {
        result = { success: false, error: `Brand balance needs ${brandAmount} credits, but only ${current.user.rewardBalance} are available.` }
        return current
      }
      if (current.user.pointsBalance < sharedAmount) {
        result = { success: false, error: `Shared pool needs ${sharedAmount} points, but only ${current.user.pointsBalance} are available.` }
        return current
      }
      const voucher = createVoucher(new Set(current.vouchers.map(({ code }) => code)))
      result = { success: true, voucher }
      return {
        ...current,
        user: { ...current.user, rewardBalance: current.user.rewardBalance - brandAmount, pointsBalance: current.user.pointsBalance - sharedAmount },
        vouchers: [...current.vouchers, { code: voucher, rewardId, source }],
        redemptions: [...current.redemptions, { rewardId, source, cost: reward.cost, brandAmount, sharedAmount, voucher, redeemedAt: new Date().toISOString() }],
      }
    })
    return result
  }

  const earnSharpConsumerBadge = () => {
    let result = { success: true, alreadyEarned: false }
    setState((current) => {
      if (current.sharpConsumerBadgeEarned) {
        result = { success: true, alreadyEarned: true }
        return current
      }
      return { ...current, sharpConsumerBadgeEarned: true }
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
      user: { ...current.user, pointsBalance: current.user.pointsBalance + pointsAwarded },
      pointBatches: pointsAwarded > 0 ? [...current.pointBatches, createPointBatch('planner', pointsAwarded)] : current.pointBatches,
      plannerPlans: [...current.plannerPlans, createdPlan],
    }))
    return { success: true, pointsAwarded, plan: createdPlan }
  }

  return (
    <SharpContext.Provider value={{ ...state, login, logout, completeContent, earnQrPoints, redeemReward, earnSharpConsumerBadge, addPlannerPlan }}>
      {children}
    </SharpContext.Provider>
  )
}

export function useSharp() {
  const context = useContext(SharpContext)
  if (!context) throw new Error('useSharp must be used within SharpProvider')
  return context
}