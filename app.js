const app = document.getElementById("app");
let decks = loadDecks();
let currentDeckId = null; // null means the home screen

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

/* ---------- Decks ---------- */

function addDeck(name) {
  const trimmed = name.trim();
  if (!trimmed) return;
  decks.push({ id: makeId(), name: trimmed, createdAt: new Date().toISOString() });
  saveDecks(decks);
  renderHome();
}

function renameDeck(id, newName) {
  const trimmed = newName.trim();
  const deck = decks.find((d) => d.id === id);
  if (!trimmed || !deck) return;
  deck.name = trimmed;
  saveDecks(decks);
  renderHome();
}

// Deleting a deck also deletes its cards, so nothing is left orphaned
function deleteDeck(id) {
  decks = decks.filter((d) => d.id !== id);
  saveCards(loadCards().filter((c) => c.deckId !== id));
  saveDecks(decks);
  renderHome();
}

/* ---------- Cards ---------- */

// Scheduling fields start at defaults so scheduler.js can use them later
function addCard(deckId, front, back) {
  const f = front.trim();
  const b = back.trim();
  if (!f || !b) return;
  const cards = loadCards();
  cards.push({
    id: makeId(), deckId, front: f, back: b,
    interval: 0, easeFactor: 2.5, repetitions: 0, dueDate: today(),
  });
  saveCards(cards);
  renderDeck();
}

function editCard(id, front, back) {
  const f = front.trim();
  const b = back.trim();
  const cards = loadCards();
  const card = cards.find((c) => c.id === id);
  if (!f || !b || !card) return;
  card.front = f;
  card.back = b;
  saveCards(cards);
  renderDeck();
}

function deleteCard(id) {
  saveCards(loadCards().filter((c) => c.id !== id));
  renderDeck();
}

/* ---------- Navigation ---------- */

function openDeck(id) {
  currentDeckId = id;
  renderDeck();
}

function goHome() {
  currentDeckId = null;
  renderHome();
}

/* ---------- UI helpers ---------- */

function makeButton(label, onClick) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = label;
  btn.addEventListener("click", onClick);
  return btn;
}

// textContent (not innerHTML) so typed text can never run as code
function makeText(tag, text) {
  const el = document.createElement(tag);
  el.textContent = text;
  return el;
}

function makeForm(placeholders, buttonLabel, onSubmit) {
  const form = document.createElement("form");
  const inputs = placeholders.map((placeholder) => {
    const input = document.createElement("input");
    input.placeholder = placeholder;
    input.required = true;
    return input;
  });
  const submit = document.createElement("button");
  submit.type = "submit";
  submit.textContent = buttonLabel;
  form.append(...inputs, submit);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    onSubmit(inputs.map((i) => i.value));
  });
  return form;
}

/* ---------- Home screen ---------- */

function makeDeckRow(deck) {
  const row = document.createElement("li");
  row.className = "deck-row";

  const open = makeButton("Open", () => openDeck(deck.id));
  const rename = makeButton("Rename", () => {
    const newName = prompt("Rename deck:", deck.name);
    if (newName !== null) renameDeck(deck.id, newName);
  });
  const remove = makeButton("Delete", () => {
    if (confirm('Delete "' + deck.name + '" and all its cards?')) deleteDeck(deck.id);
  });

  const review = makeButton("Review", () => startReview(deck.id));
  row.append(makeText("span", deck.name), review, open, rename, remove);
  return row;
}

function renderHome() {
  app.replaceChildren();
  app.append(
    makeText("h1", "My Decks"),
    makeForm(["New deck name"], "Add deck", ([name]) => addDeck(name))
  );

  if (decks.length === 0) {
    app.append(makeText("p", "No decks yet. Add your first one above."));
    return;
  }

  const list = document.createElement("ul");
  decks.forEach((deck) => list.append(makeDeckRow(deck)));
  app.append(list);
}

/* ---------- Deck screen (cards) ---------- */

function makeCardRow(card) {
  const row = document.createElement("li");
  row.className = "deck-row";

  const text = document.createElement("div");
  text.className = "card-text";
  text.append(makeText("strong", card.front), makeText("div", card.back));

  const edit = makeButton("Edit", () => {
    const front = prompt("Front:", card.front);
    if (front === null) return;
    const back = prompt("Back:", card.back);
    if (back !== null) editCard(card.id, front, back);
  });
  const remove = makeButton("Delete", () => {
    if (confirm("Delete this card?")) deleteCard(card.id);
  });

  row.append(text, edit, remove);
  return row;
}

function renderDeck() {
  const deck = decks.find((d) => d.id === currentDeckId);
  if (!deck) return goHome();

  app.replaceChildren();
  app.append(
    makeButton("← Back to decks", goHome),
    makeText("h1", deck.name),
    makeForm(["Front (question)", "Back (answer)"], "Add card",
      ([front, back]) => addCard(deck.id, front, back))
  );

  const cards = loadCards().filter((c) => c.deckId === deck.id);
  if (cards.length === 0) {
    app.append(makeText("p", "No cards yet. Add your first one above."));
    return;
  }

  const list = document.createElement("ul");
  cards.forEach((card) => list.append(makeCardRow(card)));
  app.append(list);
}
/* ---------- Review screen ---------- */

let reviewQueue = [];
let reviewIndex = 0;
let showingBack = false;

function startReview(deckId) {
  currentDeckId = deckId;
  reviewQueue = loadCards().filter((c) => c.deckId === deckId);
  reviewIndex = 0;
  showingBack = false;
  renderReview();
}

// For now the rating is only logged. scheduler.js will use it in Step 3
function rateCard(rating) {
  console.log("Rated:", reviewQueue[reviewIndex].front, "->", rating);
  reviewIndex += 1;
  showingBack = false;
  renderReview();
}

function renderReview() {
  const deck = decks.find((d) => d.id === currentDeckId);
  if (!deck) return goHome();

  app.replaceChildren();
  app.append(makeButton("← Back to decks", goHome), makeText("h1", "Review: " + deck.name));

  if (reviewQueue.length === 0) {
    app.append(makeText("p", "No cards to review in this deck."));
    return;
  }
  if (reviewIndex >= reviewQueue.length) {
    app.append(makeText("p", "All done! You reviewed " + reviewQueue.length + " cards."));
    return;
  }

  const card = reviewQueue[reviewIndex];
  app.append(makeText("p", "Card " + (reviewIndex + 1) + " of " + reviewQueue.length));

  const box = makeText("div", showingBack ? card.back : card.front);
  box.className = "review-card";
  app.append(box);

  if (!showingBack) {
    app.append(makeButton("Show answer", () => {
      showingBack = true;
      renderReview();
    }));
    return;
  }

  const row = document.createElement("div");
  row.className = "rating-row";
  ["Again", "Hard", "Good", "Easy"].forEach((r) => row.append(makeButton(r, () => rateCard(r))));
  app.append(row);
}

renderHome();