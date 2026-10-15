# TODO: Flashcard App

Requirements are in PRD.md. Do one unchecked item at a time, tick it off, then commit.

## Step 1: Setup, storage, decks and cards
- [ ] Create project folder with index.html, style.css, app.js, storage.js
- [ ] storage.js: loadDecks, saveDecks, loadCards, saveCards (JSON, try/catch on parse)
- [ ] Home screen: list decks
- [ ] Add deck
- [ ] Rename deck
- [ ] Delete deck (also deletes its cards)
- [ ] Deck view: list cards
- [ ] Add card (front and back)
- [ ] Edit card
- [ ] Delete card
- [ ] Check: data survives a page reload

## Step 2: Review screen
- [ ] Review screen shows one card front
- [ ] Tap to flip and show the back
- [ ] Rating buttons: Again / Hard / Good / Easy
- [ ] Progress indicator (e.g. 3 of 10)
- [ ] Empty state when nothing is left to review

## Step 3: Scheduling
- [ ] scheduler.js: function that takes a card and a rating, returns updated interval, easeFactor, repetitions, dueDate
- [ ] Again: reset repetitions, interval 1 day, lower ease factor
- [ ] Hard / Good / Easy: interval 1 day, then 6 days, then interval x ease factor
- [ ] Ease factor never below 1.3
- [ ] Due queue: only cards due today appear in review
- [ ] Home screen shows due count per deck
- [ ] Check: a rated card comes back on the right future date

## Step 4: Backup, polish, deploy
- [ ] Export all data as a JSON file
- [ ] Import from a JSON file (validate before overwriting)
- [ ] Responsive layout for phone and desktop
- [ ] README with screenshots
- [ ] Deploy to GitHub Pages

## Step 5: Version 2 (one at a time)
- [ ] Stats page (due today, reviews done, streak)
- [ ] Search and tags
- [ ] Dark mode
- [ ] Keyboard shortcuts
- [ ] Cloud sync with Supabase (inside storage.js)