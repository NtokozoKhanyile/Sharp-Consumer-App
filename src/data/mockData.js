export const user = {
  id: 'user-001',
  firstName: 'Ntokozo',
  lastName: 'Khanyile',
  email: 'ntokozo.khanyile@example.com',
  pointsBalance: 0,
  cashBalance: 0,
  rewardBalance: 0,
}

export const brands = [
  {
    id: 'brand-carling',
    name: 'Carling Black Label',
    logo: 'https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.carlingblacklabel.co.za/&size=128',
    tagline: '#NoExcuse',
    description: 'Champion the moments that demand confidence, focus and follow-through.',
    badge: 'Champion Men',
    contentItems: [
      {
        id: 'carling-story-001',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=900&q=80',
        type: 'article',
        title: 'Make the moment count',
        summary: 'Small decisions add up to the stories you are proud to tell.',
        pointsValue: 25,
      },
      {
        id: 'carling-quiz-001',
        image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=900&q=80',
        type: 'article+quiz',
        title: 'The champion mindset',
        summary: 'Test your knowledge of the habits behind a winning mindset.',
        pointsValue: 50,
        quiz: {
          questions: [
            { id: 'carling-q1', text: 'What turns a goal into progress?', options: ['A plan and action', 'Waiting for luck', 'Avoiding feedback'], correctIndex: 0 },
            { id: 'carling-q2', text: 'What is the best response to a setback?', options: ['Learn and adjust', 'Give up immediately', 'Ignore it'], correctIndex: 0 },
            { id: 'carling-q3', text: 'Which quality helps a team perform?', options: ['Consistency', 'Silence', 'Blame'], correctIndex: 0 },
          ],
        },
      },
      {
        id: 'carling-story-002',
        image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
        type: 'article',
        title: 'Built for the big day',
        summary: 'Meet the people bringing determination to every challenge.',
        pointsValue: 25,
      },
    ],
    badgeLevels: [
      { id: 'carling-bronze', name: 'Bronze', pointsRequired: 100 },
      { id: 'carling-silver', name: 'Silver', pointsRequired: 300 },
      { id: 'carling-gold', name: 'Gold', pointsRequired: 600 },
    ],
    rewards: [
      { id: 'carling-reward-001', name: 'Carling branded cap', description: 'A classic cap for your next big moment.', cost: 250, costSource: 'points' },
      { id: 'carling-reward-002', name: 'R100 instant voucher', description: 'A little something to spend your way.', cost: 100, costSource: 'cash' },
      { id: 'carling-reward-003', name: 'Limited edition cooler', description: 'Keep the good times cool.', cost: 750, costSource: 'points' },
      { id: 'carling-reward-004', name: 'Match-day experience', description: 'Split the cost across your brand balance and shared pool.', cost: 300, costSource: 'either' },
    ],
  },
  {
    id: 'brand-carling',
    name: 'Carling Black Label',
    logo: 'https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.carlingblacklabel.co.za/&size=128',
    tagline: '#NoExcuse',
    description: 'Champion the moments that demand confidence, focus and follow-through.',
    badge: 'Champion Men',
    contentItems: [
      {
        id: 'carling-story-001',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=900&q=80',
        type: 'article',
        title: 'Make the moment count',
        summary: 'Small decisions add up to the stories you are proud to tell.',
        pointsValue: 25,
      },
      {
        id: 'carling-quiz-001',
        image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=900&q=80',
        type: 'article+quiz',
        title: 'The champion mindset',
        summary: 'Test your knowledge of the habits behind a winning mindset.',
        pointsValue: 50,
        quiz: {
          questions: [
            { id: 'carling-q1', text: 'What turns a goal into progress?', options: ['A plan and action', 'Waiting for luck', 'Avoiding feedback'], correctIndex: 0 },
            { id: 'carling-q2', text: 'What is the best response to a setback?', options: ['Learn and adjust', 'Give up immediately', 'Ignore it'], correctIndex: 0 },
            { id: 'carling-q3', text: 'Which quality helps a team perform?', options: ['Consistency', 'Silence', 'Blame'], correctIndex: 0 },
          ],
        },
      },
      {
        id: 'carling-story-002',
        image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
        type: 'article',
        title: 'Built for the big day',
        summary: 'Meet the people bringing determination to every challenge.',
        pointsValue: 25,
      },
    ],
    badgeLevels: [
      { id: 'carling-bronze', name: 'Bronze', pointsRequired: 100 },
      { id: 'carling-silver', name: 'Silver', pointsRequired: 300 },
      { id: 'carling-gold', name: 'Gold', pointsRequired: 600 },
    ],
    rewards: [
      { id: 'carling-reward-001', name: 'Carling branded cap', description: 'A classic cap for your next big moment.', cost: 250, costSource: 'points' },
      { id: 'carling-reward-002', name: 'R100 instant voucher', description: 'A little something to spend your way.', cost: 100, costSource: 'cash' },
      { id: 'carling-reward-003', name: 'Limited edition cooler', description: 'Keep the good times cool.', cost: 750, costSource: 'points' },
      { id: 'carling-reward-004', name: 'Match-day experience', description: 'Split the cost across your brand balance and shared pool.', cost: 300, costSource: 'either' },
    ],
  },
  {
    id: 'brand-castle',
    name: 'Castle Lager',
    logo: 'https://www.google.com/s2/favicons?domain=castlelager.co.za&sz=128',
    tagline: 'Proudly South African',
    description: 'Celebrate the people, places and traditions that make home special.',
    badge: 'Proudly South African',
    contentItems: [
      {
        id: 'castle-story-001',
        image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=900&q=80',
        type: 'article',
        title: 'A taste of home',
        summary: 'The local stories and shared rituals that bring us together.',
        pointsValue: 25,
      },
      {
        id: 'castle-quiz-001',
        image: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=900&q=80',
        type: 'article+quiz',
        title: 'South African icons',
        summary: 'See how well you know the landmarks and traditions of home.',
        pointsValue: 50,
        quiz: {
          questions: [
            { id: 'castle-q1', text: 'Which city is known as the Mother City?', options: ['Cape Town', 'Durban', 'Polokwane'], correctIndex: 0 },
            { id: 'castle-q2', text: 'What does ubuntu emphasise?', options: ['Shared humanity', 'Winning alone', 'Keeping apart'], correctIndex: 0 },
            { id: 'castle-q3', text: 'What makes a gathering memorable?', options: ['Good company', 'An empty table', 'No stories'], correctIndex: 0 },
          ],
        },
      },
      {
        id: 'castle-story-002',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
        type: 'article',
        title: 'Raise a glass to local legends',
        summary: 'Discover the makers and communities behind familiar favourites.',
        pointsValue: 25,
      },
      {
        id: 'castle-story-003',
        image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80',
        type: 'article',
        title: 'The long weekend guide',
        summary: 'Ideas for making more of your next escape close to home.',
        pointsValue: 25,
      },
    ],
    badgeLevels: [
      { id: 'castle-bronze', name: 'Bronze', pointsRequired: 75 },
      { id: 'castle-silver', name: 'Silver', pointsRequired: 250 },
      { id: 'castle-gold', name: 'Gold', pointsRequired: 500 },
    ],
    rewards: [
      { id: 'castle-reward-001', name: 'Castle picnic blanket', description: 'Take a little home comfort outdoors.', cost: 300, costSource: 'points' },
      { id: 'castle-reward-002', name: 'R150 grocery voucher', description: 'Put it towards your next shared feast.', cost: 150, costSource: 'cash' },
    ],
  },
  {
    id: 'brand-partner-network',
    name: 'SABSharp Partner Network',
    logo: 'https://www.google.com/s2/favicons?domain=ab-inbev.com&sz=128',
    tagline: 'Partner rewards',
    description: 'One place for useful rewards and fresh opportunities from our partners.',
    badge: 'Sharp Partner',
    contentItems: [
      {
        id: 'partner-story-001',
        image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80',
        type: 'article',
        title: 'Your partner perks, unlocked',
        summary: 'Get more value from the brands and services in your network.',
        pointsValue: 20,
      },
      {
        id: 'partner-quiz-001',
        image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80',
        type: 'article+quiz',
        title: 'Sharp choices',
        summary: 'Answer three quick questions and sharpen your rewards know-how.',
        pointsValue: 40,
        quiz: {
          questions: [
            { id: 'partner-q1', text: 'What is the first step to smart rewards?', options: ['Know your options', 'Spend without checking', 'Forget the terms'], correctIndex: 0 },
            { id: 'partner-q2', text: 'When should you check an offer expiry?', options: ['Before redeeming', 'After it expires', 'Never'], correctIndex: 0 },
            { id: 'partner-q3', text: 'What is a good way to track points?', options: ['Check your balance', 'Guess', 'Ignore statements'], correctIndex: 0 },
          ],
        },
      },
      {
        id: 'partner-story-002',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80',
        type: 'article',
        title: 'Meet the network',
        summary: 'Explore the partners helping you get more from every day.',
        pointsValue: 20,
      },
    ],
    badgeLevels: [
      { id: 'partner-bronze', name: 'Bronze', pointsRequired: 50 },
      { id: 'partner-silver', name: 'Silver', pointsRequired: 200 },
      { id: 'partner-gold', name: 'Gold', pointsRequired: 450 },
    ],
    rewards: [
      { id: 'partner-reward-001', name: 'Partner coffee voucher', description: 'A warm start from one of our network partners.', cost: 120, costSource: 'points' },
      { id: 'partner-reward-002', name: 'R200 retail voucher', description: 'More choice at participating retailers.', cost: 200, costSource: 'cash' },
      { id: 'partner-reward-003', name: 'Partner experience pass', description: 'Make your next day out a little sharper.', cost: 350, costSource: 'points' },
    ],
  },
]

export const qrCodes = [
  { id: 'qr-001', code: 'SHARP-CARLING-7K4P', brandId: 'brand-carling', pointsValue: 50 },
  { id: 'qr-002', code: 'SHARP-CARLING-9M2Q', brandId: 'brand-carling', pointsValue: 100 },
  { id: 'qr-003', code: 'SHARP-CASTLE-3R8T', brandId: 'brand-castle', pointsValue: 50 },
  { id: 'qr-004', code: 'SHARP-CASTLE-6V1X', brandId: 'brand-castle', pointsValue: 150 },
  { id: 'qr-005', code: 'SHARP-PARTNER-5B9N', brandId: 'brand-partner-network', pointsValue: 75 },
  { id: 'qr-006', code: 'SHARP-PARTNER-8D3L', brandId: 'brand-partner-network', pointsValue: 200 },
]

export const User = user
export const Brand = brands
export const QRCode = qrCodes
export const mockUser = user
export const mockBrands = brands
export const mockQRCodes = qrCodes