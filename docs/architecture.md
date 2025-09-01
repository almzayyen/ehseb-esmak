# vercel-word-sum Architecture and Design

Overview
- A minimal web app that computes a numeric sum for an Arabic word based on a fixed per-letter mapping.
- Frontend: Next.js React app for input and display.
- Backend: Vercel serverless API (/api/sum) that computes the sum using a strict 29-item mapping.

Goals
- Provide a super simple, publicly accessible tool for word-sum calculations.
- Keep architecture lean with a single API and a small UI.
- Enable easy deployment to Vercel with minimal configuration.

System Context
- Users input an Arabic word on the web UI.
- The UI forwards the word to /api/sum.
- The API uses a deterministic mapping (the 29-entry mapping) to compute the sum and returns JSON.

High-Level Architecture
```
User UI (vercel-app/pages/index.js) --> REST API (vercel-app/pages/api/sum.js) --> Mapping (vercel-app/lib/mapping.js) --> Sum (calculation)
```

Directory & File Overview
- vercel-app/
  - pages/
    - index.js: Frontend UI for word input and result display.
    - api/sum.js: Serverless function that returns { word, sum }.
  - lib/
    - mapping.js: Exposes calculateWordSum(word) using the explicit 29-entry mapping.
  - docs/
    - architecture.md: This document.
  - README.md: Project overview.
  - package.json: App dependencies and scripts.

Data Model
- Word input: string (Arabic word).
- Mapping: Dictionary<string, int> with 29 entries as provided by the user.
- API response: { word: string, sum: number }.

Data Flow (UI to API)
- User types a word on the UI.
- UI sends GET /api/sum?word=<word>.
- API loads mapping and sums character values, returning JSON with the total.
- UI displays the sum to the user.

Mapping Details
- 29-entry mapping as provided by the user. Variants of alif/hamza map to the same numeric value if instructed by the mapping.
- The code uses an explicit mapping object to translate characters to numbers.
- Unknown characters contribute 0.

API Contract
- Endpoint: GET /api/sum?word=...
- Response: { word: string, sum: number }
- Error: { error: string } on bad requests.

Frontend UI (Basic Design)
- A clean input, a single compute button, and a display area for the sum.
- Basic accessibility: aria-labels, focus states, and clear error messages.

Security & Validation
- Validate presence of word param.
- Sanitize and handle unexpected characters gracefully (treat as 0 or ignore).
- Consider rate limiting if exposed publicly.

Deployment & Environment
- Target: Vercel with Next.js runtime.
- Use serverless functions for API and a static-like frontend served by Next.js.

Testing & Validation
- Manual sanity checks with known mappings.
- Add unit tests for calculateWordSum and API (when the mapping module is isolated).

Future Enhancements
- Support multiple mappings (config per tenant).
- Add client-side validation and examples, plus a small docs site.
- Improve tests and add CI workflow.

Glossary
- API: Application Programming Interface.
- UI: User Interface.
- Vercel: Deployment platform for serverless Next.js apps.

