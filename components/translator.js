const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require('./american-to-british-titles.js');
const britishOnly = require('./british-only.js');

// Safely reverse key-value pairs
const reverseObj = (obj) =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]));

// Avoid value collisions when reversing british-only
const reverseBritishOnly = (obj) => {
  const reversed = {};
  for (let [brit, amer] of Object.entries(obj)) {
    reversed[brit] = amer;
  }
  return reversed;
};

class Translator {
  translate(text, locale) {
    if (text === '') return { error: 'No text to translate' };
    if (!text || !locale) return { error: 'Required field(s) missing' };
    if (
      locale !== 'american-to-british' &&
      locale !== 'british-to-american'
    ) {
      return { error: 'Invalid value for locale field' };
    }

    let translation = text;
    let translated = false;

    const highlight = (word) => `<span class="highlight">${word}</span>`;

    const spellingDict =
      locale === 'american-to-british'
        ? americanToBritishSpelling
        : reverseObj(americanToBritishSpelling);
    const onlyDict =
      locale === 'american-to-british'
        ? americanOnly
        : reverseBritishOnly(britishOnly);
    const titleDict =
      locale === 'american-to-british'
        ? americanToBritishTitles
        : reverseObj(americanToBritishTitles);

    // Replace honorifics/titles like Mr., Dr., etc.
    const sortedTitles = Object.keys(titleDict).sort((a, b) => b.length - a.length);
    for (let title of sortedTitles) {
      const replacement = titleDict[title];
      const escapedTitle = title.replace('.', '\\.');
      const regex = new RegExp(`\\b${escapedTitle}(?=\\s|$)`, 'gi');

      translation = translation.replace(regex, (match) => {
        translated = true;
        const capitalized =
          replacement.charAt(0).toUpperCase() + replacement.slice(1);
        return highlight(capitalized); // British side removes the period
      });
    }

    // Replace time formats
    const timeRegex =
      locale === 'american-to-british'
        ? /\b(\d{1,2}):(\d{2})\b/g
        : /\b(\d{1,2})\.(\d{2})\b/g;

    translation = translation.replace(timeRegex, (match, h, m) => {
      translated = true;
      const newTime =
        locale === 'american-to-british' ? `${h}.${m}` : `${h}:${m}`;
      return highlight(newTime);
    });

    // Combine dictionaries and replace longest phrases first
    const combinedDict = { ...spellingDict, ...onlyDict };
    const sortedKeys = Object.keys(combinedDict).sort((a, b) => b.length - a.length);

    for (let key of sortedKeys) {
      const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(?<!\\w)${escapedKey}(?!\\w)`, 'gi');
      translation = translation.replace(regex, (match) => {
        translated = true;
        return highlight(combinedDict[key]);
      });
    }

    return {
      text,
      translation: translated ? translation : 'Everything looks good to me!'
    };
  }
}

module.exports = Translator;
