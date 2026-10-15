const app = document.getElementById("app");
let decks = loadDecks();

// Unique id without needing a library
function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

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

// Cards belong to a deck, so deleting a deck must delete its cards too,
// otherwise orphaned cards stay in storage forever
function deleteDeck(id) {
  decks = decks.filter((d) => d.id !== id);
  saveCards(loadCards().filter((c) => c.deckId !== id));
  saveDecks(decks);
  renderHome();
}

function makeButton(label, onClick) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = label;
  btn.addEventListener("click", onClick);
  return btn;
}

function makeDeckRow(deck) {
  const row = document.createElement("li");
  row.className = "deck-row";

  // textContent (not innerHTML) so deck names can never run as code
  const name = document.createElement("span");
  name.textContent = deck.name;

  const rename = makeButton("Rename", () => {
    const newName = prompt("Rename deck:", deck.name);
    if (newName !== null) renameDeck(deck.id, newName);
  });

  const remove = makeButton("Delete", () => {
    if (confirm('Delete "' + deck.name + '" and all its cards?')) deleteDeck(deck.id);
  });

  row.append(name, rename, remove);
  return row;
}

function makeAddForm() {
  const form = document.createElement("form");
  const input = document.createElement("input");
  input.placeholder = "New deck name";
  input.required = true;
  const submit = document.createElement("button");
  submit.type = "submit";
  submit.textContent = "Add deck";
  form.append(input, submit);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    addDeck(input.value);
  });
  return form;
}

function renderHome() {
  app.replaceChildren();

  const title = document.createElement("h1");
  title.textContent = "My Decks";
  app.append(title, makeAddForm());

  if (decks.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "No decks yet. Add your first one above.";
    app.append(empty);
    return;
  }

  const list = document.createElement("ul");
  decks.forEach((deck) => list.append(makeDeckRow(deck)));
  app.append(list);
}

renderHome();