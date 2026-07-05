# Copilot Instructions

## Project Context
- This is a frontend-only prototype/flow demo — no real backend yet (backend comes later, separately)
- Goal: demonstrate the intended system flow and UI/UX, not production architecture
- Data is preadded/static JSON for now, served through API routes — not a real database

## Stack
- Frontend: Next.js (App Router), TypeScript
- Data layer: static JSON files (e.g. `data/items.json`), read/written only through Next.js API routes (`app/api/**/route.ts`)
- No database, no ORM — this is a stand-in for the real backend

## Conventions
- Keep API routes thin: read JSON file, apply request logic, return response — no business logic layers yet (this isn't the real backend)
- "Writes" (e.g. adding a row) mutate an in-memory copy of the JSON for the session, or rewrite the JSON file if persistence across reloads is needed — keep it simple, don't build a queue/lock system for this
- Client components fetch via `fetch()` to API routes, never import JSON directly — this keeps the API seam intact for later
- API responses always use the envelope format: `{ status, message, data }` — matches the real backend's shape so components don't need changes when the real backend is plugged in later

## Response Style
- Code only, no simple explanation unless I ask
- No markdown prose wrapping around code blocks
- Be concise — skip preambles like "Sure! Here's..."

## What to Avoid
- Don't introduce a database, ORM, or migrations tooling — static JSON only for now
- Don't build auth, roles, or permission logic — out of scope until real backend
- Don't add file-locking, transactions, or concurrency handling for JSON writes — this is a demo, not production
- Only add simple comments to obvious code
- Don't wrap responses in explanatory paragraphs