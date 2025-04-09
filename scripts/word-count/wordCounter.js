// wordCounter.js
const countWords = (text) => text.split(/\s+/).filter(Boolean).length;

module.exports = { countWords };
