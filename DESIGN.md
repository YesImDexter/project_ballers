# Design System

## Color Theory — 60–30–10 Rule

The palette follows the 60–30–10 proportional color system for balanced visual hierarchy.

| Token        | Role       | Hex       | Usage                                                     |
| ------------ | ---------- | --------- | --------------------------------------------------------- |
| `primary`    | 60 %       | `#fafaf7` | Page background, large sections, dominant negative space  |
| `secondary`  | 30 %       | `#ffffff` | Cards, panels, elevated surfaces                          |
| `accent`     | 10 %       | `#111111` | High-impact text, primary buttons, key interactive chrome |

### Brand highlight

An amber tint is reserved for decorative emphasis and brand flair — not part of the 60–30–10 split.

| Token          | Hex       | Usage                                          |
| -------------- | --------- | ---------------------------------------------- |
| `brand`        | `#d97706` | Small accent labels, icons, hover underlines   |
| `brand-soft`   | `#f59e0b` | Lighter brand accent for secondary highlights  |

### Neutral tokens

| Token            | Hex       | Usage                                  |
| ---------------- | --------- | -------------------------------------- |
| `muted`          | `#666666` | Secondary / muted body text            |
| `light-border`   | `#e5e5e0` | Subtle borders, dividers               |

### Extra palette — semantic / pastel tokens

These colors supplement the 60–30–10 palette for status, chips, progress, and dense employer UI. Use them as accents, not page-scale backgrounds.

| Token             | Hex       | Usage                            |
| ----------------- | --------- | -------------------------------- |
| `pastel-blue`     | `#dbeafe` | Info stat cards, blue icon chips |
| `pastel-green`    | `#d1fae5` | Success stat cards, hired badges |
| `pastel-orange`   | `#fed7aa` | Warning stat cards               |
| `pastel-purple`   | `#e9d5ff` | Match/stat cards                 |
| `pastel-red`      | `#fee2e2` | Alerts, unread/action cards      |
| `pastel-amber`    | `#fef3c7` | In-review statuses               |
| `pastel-pink`     | `#fce7f3` | Secondary notification chips     |
| `signal-blue`     | `#1d4ed8` | Blue icon/chip text              |
| `signal-green`    | `#059669` | Success text                     |
| `signal-orange`   | `#b45309` | Orange/warning text              |
| `signal-purple`   | `#7c3aed` | Purple icon/chip text            |
| `signal-red`      | `#b91c1c` | Alert text                       |
| `signal-amber`    | `#d97706` | Amber/in-review text             |
| `signal-pink`     | `#be185d` | Pink icon/chip text              |
| `soft-surface`    | `#f4f4f0` | Skill tags, neutral badges       |
| `soft-hover`      | `#fafaf7` | Row/card hover                   |
| `soft-row-border` | `#f1f1ee` | Table row dividers               |
| `soft-border`     | `#ececec` | Inputs/filter borders            |
| `soft-unread`     | `#fafaff` | Unread notification row          |
| `warm-panel`      | `#fff8f0` | Chat list header                 |
| `warm-active`     | `#fff1e6` | Active chat item                 |
| `warm-border`     | `#ffd9b8` | Warm panel border                |
| `warm-text`       | `#b5651d` | Warm panel text                  |
| `success-panel`   | `#e6f4ea` | Completed/success panels         |
| `success-border`  | `#bbe0c6` | Success panel border             |
| `success-text`    | `#2e7d4f` | Success panel text               |
| `info-panel`      | `#e6f1fb` | Onboarding/info panels           |
| `info-border`     | `#bbd7f0` | Info panel border                |
| `info-text`       | `#2563a8` | Info panel text                  |
| `purple-panel`    | `#eee6ff` | Interview panels                 |
| `purple-border`   | `#d4c2ff` | Purple panel border              |
| `purple-text`     | `#6b46c1` | Purple panel text                |

### Employer UI recipe

| Element        | Recipe                                      |
| -------------- | ------------------------------------------- |
| Page           | `bg-primary`                                |
| Card           | `bg-card rounded-2xl shadow-card`           |
| Stat card      | `rounded-2xl p-5` + pastel background       |
| Status badge   | `rounded-full text-xs font-medium`          |
| Table divider  | `border-soft-row-border`                    |
| Progress track | `bg-soft-row-border`                        |

---

## Typography

### Font stack

| Context    | Font              | CSS variable             |
| ---------- | ----------------- | ------------------------ |
| Headings   | **Kamerik 105**   | `--font-headings`        |
| Body       | **Paul Grotesk**  | `--font-paul-grotesk`    |

### Usage

- **Headings** (`h1`–`h6`): `font-family: var(--font-headings)` — applied globally.
- **Body text**: `font-family: var(--font-paul-grotesk)` — applied globally.
- Utility classes `font-headings` and `font-body` are available for overrides.

---

## Tailwind CSS integration

All design tokens are registered inside `@theme inline` in `app/globals.css` so they work as first‑class Tailwind utilities:

- `bg-primary` / `text-primary` / `border-primary`
- `bg-secondary` / `text-secondary` / `border-secondary`
- `bg-accent` / `text-accent` / `border-accent`
- `bg-brand` / `text-brand` / `border-brand`
- `text-muted`
- `border-light-border`

Do not reference `--color-cream`, `--color-card`, `--color-near-black`, `--color-accent` (old amber), or `--color-accent-soft` — these have been renamed.
