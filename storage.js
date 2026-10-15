// The only file that touches localStorage.
// Every other file must call these functions instead.

const DECKS_KEY = "flashcards_decks";
const CARDS_KEY = "flashcards_cards";

function loadList(key) {
  try {
    const raw = localStorage.getItem(key);
    const data = raw ? JSON.parse(raw) : [];
    // If the saved data is corrupted or not a list, start fresh
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

function saveList(key, list) {
  try {
    localStorage.setItem(key, JSON.stringify(list));
    return true;
  } catch (error) {
    // Can fail if storage is full or blocked
    return false;
  }
}

function loadDecks() { return loadList(DECKS_KEY); }
function saveDecks(decks) { return saveList(DECKS_KEY, decks); }
function loadCards() { return loadList(CARDS_KEY); }
function saveCards(cards) { return saveList(CARDS_KEY, cards); }