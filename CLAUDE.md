# CLAUDE.md

Spaced repetition flashcard app. Requirements are in @PRD.md. Progress is tracked in @TODO.md.

## Stack
- HTML, CSS, vanilla JavaScript only. No frameworks, no libraries, no build tools
- No backend and no external APIs
- Data lives in localStorage

## File structure
- `index.html`, `style.css`, `app.js` for the UI
- `storage.js` for all localStorage reads and writes
- `scheduler.js` for SM-2 scheduling logic

## Rules
- Only `storage.js` may touch localStorage. Every other file calls its functions
- Keep scheduling logic in `scheduler.js`, separate from the UI. Write it as pure functions (card and rating in, updated card out)
- Wrap `JSON.parse` in try/catch and fall back to empty data
- Never store passwords, tokens, or sensitive data
- Keep functions small, with clear names and short comments explaining why, not what
- Do not add features that are not in @PRD.md or @TODO.md

## Workflow
- Work on one unchecked item in @TODO.md at a time, then tick it off
- Before writing code for a new step, briefly state your plan
- After writing code, explain in simple terms what it does and why
- Tell me how to test it in the browser before moving on
- Commit after each working step with a clear message
- If a requirement is unclear or something in the PRD seems wrong, ask instead of guessing