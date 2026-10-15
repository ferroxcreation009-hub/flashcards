# PRD: Spaced Repetition Flashcard App

By Ankush · Version 1.0

## 1. Overview
A browser-based flashcard app that schedules reviews using spaced repetition (SM-2 algorithm). Users create decks and cards, review the ones due today, and rate how well they remembered. Everything runs locally with no backend and no outside API.

## 2. Goals
- A working app I use daily for my own SRM coursework
- Clean, explainable code, where I can describe every function in an interview
- Deployed free on GitHub Pages with a good README

## 3. Tech Stack and Constraints
- HTML, CSS, vanilla JavaScript only. No frameworks, no build tools
- Data stored in localStorage, always through a storage layer (see Storage rules)
- No backend, no external API
- Works on mobile and desktop
- Scheduling logic lives in its own file (`scheduler.js`), separate from the UI

### Storage rules
- All reads and writes go through `storage.js` (`loadDecks()`, `saveDecks()`, `loadCards()`, `saveCards()`); no other file touches localStorage
- Data is saved as JSON strings; wrap `JSON.parse` in try/catch and fall back to empty data if it fails
- Limit is about 5 MB per site, so v1 cards are text only
- Never store passwords, tokens, or other sensitive data
- Browser data can be cleared or lost, so JSON export/import is an MVP feature, not an extra
- Moving to IndexedDB or Supabase later should mean editing `storage.js` only

## 4. MVP Features (must have)
1. Create, edit, delete decks
2. Create, edit, delete cards (front and back text)
3. Review screen: show the front, tap to flip, then rate Again / Hard / Good / Easy
4. SM-2 scheduling: each rating updates the card's interval, ease factor, and next due date
5. Due queue: only cards due today appear in review
6. Data persists across page reloads, with JSON export and import as a backup

## 5. Version 2 Features (nice to have)
- Stats page: cards due today, reviews done, daily streak, simple charts
- Search and tags
- Cloud sync with Supabase, replacing localStorage inside storage.js
- Dark mode
- Keyboard shortcuts (space to flip, 1-4 to rate)

## 6. Screens
- **Home:** list of decks with due counts
- **Deck view:** list of cards, add/edit/delete
- **Review:** one card at a time, flip, rating buttons, progress indicator
- **Stats (v2):** streak and charts

## 7. Data Model
- **Deck:** id, name, createdAt
- **Card:** id, deckId, front, back, interval (days), easeFactor, repetitions, dueDate

## 8. Scheduling Rules (SM-2 summary)
- Again: reset repetitions, interval back to 1 day, lower the ease factor
- Hard / Good / Easy: grow the interval (1 day, then 6 days, then interval x ease factor), adjusting the ease factor by rating
- Ease factor never drops below 1.3

## 9. Out of Scope for v1
Accounts, cloud sync, images or audio on cards (5 MB storage limit), AI-generated cards.

## 10. Build Order
1. Project setup, `storage.js`, decks and cards CRUD
2. Review screen with flip and rating buttons
3. `scheduler.js` with SM-2 and the due queue
4. JSON export/import, polish, responsive layout, then deploy
5. Version 2 features, one at a time

## 11. Definition of Done (v1)
I can add cards, review today's due cards, and see them reappear at the right future date after reloading the page. Deployed live with a README and screenshots.