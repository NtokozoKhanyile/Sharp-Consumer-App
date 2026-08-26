---
description: Make the Sharp Consumer App mobile-first and clean on mobile devices without changing content, data, routes, assets, or behavior.
---

# Mobile-First Responsive Implementation

Improve the Sharp Consumer App's responsive layout for mobile devices while preserving the app exactly as a product and experience. This is a layout and usability task, not a content, feature, or visual redesign task.

## Scope

Work across the existing React/Vite app, including:

- Authentication and onboarding
- Home
- Initiative detail
- Content detail and quiz
- Scan
- Rewards and redemption dialog
- Profile
- Shared shell, top bar, search, and bottom navigation

Start by inspecting the relevant page, `src/components/AppShell.jsx`, and `src/styles/global.css`. Prefer the existing CSS classes, variables, spacing, typography, card patterns, palette, Lucide icons, and accessibility conventions. Make CSS-first changes. Add or adjust only the smallest JSX wrapper or class hook when CSS cannot solve the layout problem.

## Mobile Requirements

- Design from approximately 320px wide upward, then enhance the layout at wider breakpoints.
- Keep the document within the viewport. Remove accidental horizontal page overflow while preserving intentional horizontal scrolling, such as recommendation carousels.
- Make headings, labels, buttons, inputs, cards, images, dialogs, and long values wrap or resize without clipping, overlap, or causing layout shifts.
- Keep interactive controls comfortable to tap and visually distinct.
- Adapt multi-column grids and dense rows into clear mobile layouts without hiding existing information.
- Keep forms and dialogs contained within the viewport, with usable spacing and keyboard-friendly focus behavior.
- Account for safe spacing around fixed top and bottom navigation so content and controls are never obscured.
- Preserve image aspect ratios and prevent media from overflowing its container.
- Check both portrait mobile widths and a desktop viewport after every meaningful change.

## Content and Behavior Invariants

Do not:

- Rewrite, shorten, truncate, reorder, remove, translate, or invent visible copy.
- Change content in `src/data/mockData.js` or alter data-backed labels and values.
- Change route paths, navigation destinations, assets, or image URLs.
- Change state transitions or interaction logic, including login, onboarding, quiz completion, scanning, points, rewards, and redemption.
- Remove accessibility labels, focus behavior, or meaningful semantic structure.
- Add features, dependencies, assets, or unrelated refactors.

Layout-only semantic wrappers and class names are allowed only when they do not change rendered content or behavior. Preserve all existing visual language and interaction outcomes. If a proposed fix would require changing content or behavior, stop and identify the conflict instead of silently changing it.

## Implementation Workflow

1. Inspect the current layout and identify the smallest local cause of the mobile issue.
2. Make the narrowest CSS-first change in the owning component or shared stylesheet.
3. Keep existing class names and design tokens where possible.
4. Validate the touched route and then check the shared shell and adjacent routes for regressions.
5. Do not broaden the change into content cleanup or a general redesign.

## Acceptance Checklist

Run `npm run build` after implementation. The repository does not currently define a test or lint script, so also perform browser validation at approximately 320px, 375px, and 390px widths plus a desktop width.

Check every route and shared surface for:

- No accidental horizontal overflow or clipped content
- No overlapping text, controls, cards, media, or fixed navigation
- Correct wrapping of long headings, labels, values, and buttons
- Usable tap targets and form controls
- Dialogs and inputs contained within the viewport
- Correct top and bottom navigation clearance
- Preserved intentional carousel scrolling
- Preserved navigation, forms, quiz, scan, reward, and redemption interactions
- No new browser console errors

Confirm that visible copy, data, routes, assets, accessibility labels, and interaction outcomes are unchanged. Report any pre-existing issue separately rather than modifying unrelated behavior.
