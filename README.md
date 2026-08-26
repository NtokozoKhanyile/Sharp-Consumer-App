# Sharp Consumer

Sharp Consumer is a React app that helps people discover brand initiatives, earn points, plan safer outings, and claim rewards.

## What You Can Do

- Explore brand initiatives and recommended content.
- Search for an initiative or content item.
- Scan a sample QR code to earn points.
- Use Planner to create an outing and earn points for responsible choices.
- Browse rewards and confirm a reward conversion.
- View balances, earned badges, point activity, and claimed rewards in Profile.
- See sample friends and emergency contacts.

## Run the App

You need Node.js and npm installed.

1. Install the project dependencies:

	```bash
	npm install
	```

2. Start the development server:

	```bash
	npm run dev
	```

3. Open the local URL shown in the terminal. It is usually:

	```text
	http://localhost:5173
	```

The demo starts with a ready-to-use user session, so the Home page opens immediately.

## Useful Commands

```bash
npm run dev       # Start the development server
npm run build     # Create a production build
npm run preview   # Preview the production build locally
```

## Main Pages

| Page | Route | Purpose |
| --- | --- | --- |
| Home | `/home` | Discover initiatives and content |
| Scan | `/scan` | Redeem a sample QR code |
| Planner | `/planner` | Plan an outing responsibly |
| Rewards | `/rewards/brand-carling` | Browse and claim rewards |
| Profile | `/profile` | View badges, balances, activity, and claimed rewards |

## Project Structure

```text
src/
  components/   Shared app layout and navigation
  context/      Shared user, points, planner, and rewards state
  data/         Mock users, brands, content, rewards, and QR codes
  pages/        Individual application pages
  styles/       Global styling and responsive layouts
  main.jsx      Application entry point
```

## Notes

- This is a front-end prototype. Data is stored in React state and resets when the page is refreshed.
- Brand logos and content images use external URLs, so an internet connection may be needed to display them.
- The friends and emergency contacts section uses hard-coded sample data to demonstrate the planned future feature.
- The `/coming-soon` page is used for landing-page features that are not implemented yet.