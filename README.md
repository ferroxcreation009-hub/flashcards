<div align="center">

# 🧠 Flashcards: Spaced Repetition App

**Study smarter, not longer.** A fast, private flashcard app that schedules reviews with the SM-2 spaced repetition algorithm. Built with plain HTML, CSS, and JavaScript. No backend, no API keys, no sign-up.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Open%20App-4f46e5?style=for-the-badge&logo=githubpages&logoColor=white)](https://ferroxcreation009-hub.github.io/flashcards/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Ankush%20Khan-0a66c2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ankush-khan-6a6219411/)
[![GitHub](https://img.shields.io/badge/GitHub-ferroxcreation009--hub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ferroxcreation009-hub)

![HTML5](https://img.shields.io/badge/HTML5-e34f26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572b6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-f7df1e?style=flat-square&logo=javascript&logoColor=black)

### 👉 [Try the live demo](https://ferroxcreation009-hub.github.io/flashcards/)

</div>

---

## 📸 Screenshots

<div align="center">

| Your decks | Review a card |
|:---:|:---:|
| ![Deck list](screenshots/decks.png) | ![Review screen](screenshots/review.png) |

</div>

---

## ✨ Features

- **Decks and cards:** create, rename, edit, and delete decks and cards.
- **Spaced repetition:** rate each card *Again / Hard / Good / Easy* and the app decides when you see it next.
- **Daily due queue:** only cards that are due today show up in a review, and each deck shows its due count.
- **Private by design:** all data stays in your browser's `localStorage`. Nothing is uploaded anywhere.
- **Backup and restore:** export everything to a JSON file and import it back. Imports are validated first, so a bad file can't overwrite your data.
- **Responsive layout:** works on desktop and phone screens.
- **Zero dependencies:** no frameworks, no libraries, no build step.

---

## 🧮 How the scheduling works

Each card stores an `interval` (days), an `easeFactor`, a `repetitions` count, and a `dueDate`. When you rate a card, `scheduler.js` returns an updated copy of it:

| Rating | What happens |
|:---|:---|
| **Again** | Repetitions reset to 0, interval goes back to 1 day, ease factor drops by 0.20 |
| **Hard** | Ease factor drops by 0.15, interval grows |
| **Good** | Ease factor unchanged, interval grows |
| **Easy** | Ease factor rises by 0.15, interval grows |

Intervals follow the SM-2 pattern: **1 day → 6 days → previous interval × ease factor**. The ease factor never drops below **1.3**.

This is a simplified version of SM-2, built to be easy to read and explain. For example, Hard, Good, and Easy give the same first two intervals and only diverge afterwards through the ease factor.

---

## 🗂️ Project structure

```
flashcards/
├── index.html      # Page shell, loads the scripts in order
├── style.css       # Theme and responsive layout
├── storage.js      # The only file that touches localStorage
├── scheduler.js    # SM-2 scheduling as pure functions
├── app.js          # UI: decks, cards, review, backup
├── PRD.md          # Product requirements
├── TODO.md         # Build checklist
└── CLAUDE.md       # Project rules for AI-assisted development
```

**Design decisions**

- **A storage layer.** Every read and write goes through `storage.js`, so moving to IndexedDB or a hosted database later means editing one file.
- **Pure scheduling functions.** `scheduleCard(card, rating)` takes a card and returns a new one without changing the original and without touching the page or storage. That makes it easy to test in the browser console.
- **Safe rendering.** User text is inserted with `textContent`, never `innerHTML`, so card text can't run as code.
- **Local dates.** Due dates use the local calendar day, not UTC, so "due today" flips at your midnight.

---

## 🚀 Run it locally

No install needed.

```bash
git clone https://github.com/ferroxcreation009-hub/flashcards.git
cd flashcards
```

Then open `index.html` in a browser, or serve the folder with a tool such as the VS Code **Live Server** extension.

**Quick test of the scheduler** (browser console):

```js
let c = { interval: 0, easeFactor: 2.5, repetitions: 0 };
c = scheduleCard(c, "Good"); // interval 1
c = scheduleCard(c, "Good"); // interval 6
c = scheduleCard(c, "Good"); // interval 15
```

---

## ⚠️ Known limitations

- Data is saved **per browser and per device**. Use **Export backup** and **Import backup** to move it between devices.
- Clearing browser data deletes your decks, so export a backup now and then.
- Browser storage is about 5 MB, so cards are text only.
- Rename and edit use the browser's built-in prompt boxes.

---

## 🛣️ Roadmap

- [ ] Stats page (reviews done, daily streak)
- [ ] Search and tags
- [ ] Dark mode
- [ ] Keyboard shortcuts (space to flip, 1-4 to rate)
- [ ] Optional cloud sync

---

## 👤 Author

**Ankush Khan**, B.Tech CSE (AI/ML) student at SRM Institute of Science and Technology.

- 💼 [LinkedIn](https://www.linkedin.com/in/ankush-khan-6a6219411/)
- 🐙 [GitHub](https://github.com/ferroxcreation009-hub)

If you find this useful, a ⭐ on the repo is appreciated.
