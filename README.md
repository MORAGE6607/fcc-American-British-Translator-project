# American-British English Translator

## Project Overview

This project is a full-stack JavaScript web application built for the [FreeCodeCamp](https://www.freecodecamp.org/) Quality Assurance certification. It translates text between American and British English using well-defined dictionaries and provides a user interface to perform and highlight translations.

The server is built with **Node.js** and **Express**, and supports both **unit** and **functional** tests using **Mocha**, **Chai**, and **Chai-HTTP**.

Users can:

- Submit a block of text to be translated from American to British English or vice versa.
- Receive translated terms highlighted with `<span class="highlight">...</span>`.
- Handle titles (e.g., `Mr.`, `Dr.`), time formats (`12:15` ↔ `12.15`), and localized vocabulary.

---

## API Route

### `POST /api/translate`

**Request Body:**
```json
{
  "text": "Mangoes are my favorite fruit.",
  "locale": "american-to-british"
}
```

**Valid `locale` values:**
- `american-to-british`
- `british-to-american`

**Response:**
```json
{
  "text": "Mangoes are my favorite fruit.",
  "translation": "Mangoes are my <span class=\"highlight\">favourite</span> fruit."
}
```

**Error Responses:**
```json
{ "error": "Required field(s) missing" }
{ "error": "No text to translate" }
{ "error": "Invalid value for locale field" }
```

---

## Installation & Setup

Clone the repository:
```bash
git clone https://github.com/MORAGE6607/fcc-American-British-Translator-project.git
cd fcc-American-British-Translator-project
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the project root with:
```env
NODE_ENV=test
PORT=3000
```

---

## Run Tests

```bash
npm test
```

---

## Start the Server

```bash
npm start
```

The app will be available at: [http://localhost:3000](http://localhost:3000)

---

## Completion Status

✅ All unit and functional tests have been completed and are passing.

### Unit Tests (`tests/1_unit-tests.js`) cover:
- Translation of words and phrases (American ↔ British)
- Time formatting
- Title/honorific abbreviation handling
- Highlight rendering

### Functional Tests (`tests/2_functional-tests.js`) cover:
- Valid translations
- Missing or empty fields
- Invalid locale input
- Text that requires no translation

---

📄 **License:** Completed for educational purposes under the FreeCodeCamp curriculum.
