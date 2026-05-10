const API_URL = 'https://api.magicthegathering.io/v1';

// Мапінг скорочень кольорів MTG API до повних назв
const COLOR_MAP = {
  W: 'WHITE',
  U: 'BLUE',
  B: 'BLACK',
  R: 'RED',
  G: 'GREEN',
};

/**
 * cleanText — очищає текст картки від спеціальних символів MTG.
 * API повертає символи як {T}, {G}, {3} — замінюємо на читабельний текст.
 * @param {string} text — оригінальний текст
 * @returns {string} — очищений текст
 */
const cleanText = (text) => {
  if (!text) return '';
  return text
    .replace(/\{T\}/g, 'TAP')
    .replace(/\{G\}/g, '(G)')
    .replace(/\{W\}/g, '(W)')
    .replace(/\{U\}/g, '(U)')
    .replace(/\{B\}/g, '(B)')
    .replace(/\{R\}/g, '(R)')
    .replace(/\{C\}/g, '(C)')
    .replace(/\{(\d+)\}/g, '($1)')
    .replace(/\{X\}/g, '(X)');
};

/**
 * normalizeCard — приводить картку з API до формату додатку.
 * API: { type: "Instant", rarity: "Common", colors: ["G"] }
 * UI:  { type: "INSTANT", rarity: "COMMON", colors: ["GREEN"] }
 *
 * @param {Object} card — картка з API
 * @returns {Object} — нормалізована картка
 */
export const normalizeCard = (card) => ({
    id: card.id,
    name: card.name,
    imageUrl: card.imageUrl || null,
    type: card.types?.[0]?.toUpperCase() || 'UNKNOWN',
    rarity: card.rarity?.toUpperCase() || 'COMMON',
    colors: card.colors?.map(c => COLOR_MAP[c] || c.toUpperCase()) || ['COLORLESS'],
    description: cleanText(card.text),
    isFavorite: false,
  });

/**
 * fetchCards — отримує список карток з випадкової сторінки.
 * @param {number} page — номер сторінки (не використовується, беремо рандомну)
 * @param {number} pageSize — кількість карток на сторінці
 * @returns {Promise<Array>} — масив нормалізованих карток
 */
export const fetchCards = async (page = 1, pageSize = 20) => {
  const randomPage = Math.floor(Math.random() * 100) + 1;

  const response = await fetch(
    `${API_URL}/cards?page=${randomPage}&pageSize=${pageSize}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch cards: ${response.status}`);
  }

  const data = await response.json();
  return data.cards
    .filter(card => card.imageUrl)
    .map(normalizeCard);
};

/**
 * searchCards — пошук карток за назвою.
 * Використовує query параметр ?name= замість окремого endpoint.
 * Прибирає дублікати за назвою — різні видання однієї картки.
 * @param {string} name — назва картки для пошуку
 * @returns {Promise<Array>} — масив нормалізованих карток
 */
export const searchCards = async (name) => {
  const response = await fetch(
    `${API_URL}/cards?name=${encodeURIComponent(name)}`
  );

  if (!response.ok) {
    throw new Error(`Failed to search cards: ${response.status}`);
  }

  const data = await response.json();

  const unique = data.cards
    .filter(card => card.imageUrl)
    .reduce((acc, card) => {
      if (!acc.find(c => c.name === card.name)) {
        acc.push(card);
      }
      return acc;
    }, []);

  return unique.map(normalizeCard);
};

/**
 * fetchCardById — отримує деталі картки за id.
 * @param {string} id — ідентифікатор картки
 * @returns {Promise<Object>} — нормалізована картка
 */
export const fetchCardById = async (id) => {
  const response = await fetch(`${API_URL}/cards/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch card: ${response.status}`);
  }

  const data = await response.json();
  return normalizeCard(data.card);
};