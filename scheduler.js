// Pure functions only: no DOM, no localStorage. Easy to test and explain.

const MIN_EASE = 1.3;
// How each rating changes the ease factor (higher ease = longer gaps)
const EASE_CHANGE = { Again: -0.2, Hard: -0.15, Good: 0, Easy: 0.15 };

// Local date as YYYY-MM-DD. Not toISOString(), which uses UTC and gives
// the wrong day for the first hours after midnight in India
function todayString() {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return d.getFullYear() + "-" + month + "-" + day;
}

function addDays(dateString, days) {
  const d = new Date(dateString + "T00:00:00");
  d.setDate(d.getDate() + days);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return d.getFullYear() + "-" + month + "-" + day;
}

// Takes a card and a rating, returns an updated copy. Never changes the original
function scheduleCard(card, rating) {
  let { interval, easeFactor, repetitions } = card;

  easeFactor = Math.max(MIN_EASE, easeFactor + EASE_CHANGE[rating]);
  easeFactor = Math.round(easeFactor * 100) / 100; // avoid 2.3000000000000003

  if (rating === "Again") {
    repetitions = 0;
    interval = 1;
  } else {
    repetitions += 1;
    if (repetitions === 1) interval = 1;
    else if (repetitions === 2) interval = 6;
    else interval = Math.round(interval * easeFactor);
  }

  return { ...card, interval, easeFactor, repetitions, dueDate: addDays(todayString(), interval) };
}