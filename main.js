// ── STATE ─────────────────────────────────────────────────────
let currentCat    = 'all';
let currentSearch = '';

// ── ELEMENTS ──────────────────────────────────────────────────
const chips   = document.querySelectorAll('.chip');
const cards   = document.querySelectorAll('.card');
const countEl = document.getElementById('count');

// ── COUNT ─────────────────────────────────────────────────────
function updateCount(n) {
  if (!countEl) return;
  const lang = window.getLang ? window.getLang() : 'ru';
  if (lang === 'kz') {
    countEl.textContent = `${n} маман көрсетілді`;
  } else {
    const s = n === 1 ? '' : n > 1 && n < 5 ? 'а' : 'ов';
    countEl.textContent = `Показано ${n} специалист${s}`;
  }
}

// ── FILTER + SEARCH ───────────────────────────────────────────
function filterCards() {
  let n = 0;
  cards.forEach(card => {
    const catMatch    = currentCat === 'all' || card.dataset.cat === currentCat;
    const cardText    = ((card.dataset.name || '') + ' ' + (card.dataset.addr || '')).toLowerCase();
    const searchMatch = !currentSearch || cardText.includes(currentSearch);
    const show        = catMatch && searchMatch;
    card.classList.toggle('hidden', !show);
    if (show) n++;
  });
  updateCount(n);
}

// Category chips
chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    currentCat = chip.dataset.cat;
    filterCards();
  });
});

// Search
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', () => {
    currentSearch = searchInput.value.trim().toLowerCase();
    filterCards();
  });
}

// ── HOW IT WORKS TABS ─────────────────────────────────────────
document.querySelectorAll('.how-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.how-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.how-panel').forEach(panel => panel.classList.remove('active'));
    tab.classList.add('active');
    const target = document.getElementById(tab.dataset.panel);
    if (target) target.classList.add('active');
  });
});

// ── RE-RENDER COUNT ON LANG CHANGE ────────────────────────────
document.addEventListener('langchange', () => {
  const visible = [...cards].filter(c => !c.classList.contains('hidden')).length;
  updateCount(visible);
});
