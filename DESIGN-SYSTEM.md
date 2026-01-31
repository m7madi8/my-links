# Design System — Personal Bio Link Page

## Colors

| Token | Dark (default) | Light |
|-------|----------------|-------|
| `--bg-base` | `#0c0c0f` | `#f8f8fa` |
| `--bg-glass` | `rgba(255,255,255,0.06)` | `rgba(0,0,0,0.04)` |
| `--text-primary` | `#f5f5f7` | `#18181b` |
| `--text-secondary` | `#a1a1aa` | `#52525b` |
| `--text-muted` | `#71717a` | `#71717a` |
| `--accent` | `#a78bfa` | `#7c3aed` |
| `--gradient-start` | `#6366f1` | `#4f46e5` |
| `--gradient-end` | `#a855f7` | `#9333ea` |

## Typography

- **Fonts:** Inter (body), Poppins (display/headings)
- **Sizes:** `--text-xs` (0.75rem) → `--text-3xl` (1.875rem)
- **Weights:** 400, 500, 600, 700

## Spacing (8pt grid)

- `--space-1` (4px) through `--space-16` (64px)
- Radius: `--radius-sm` (12px), `--radius-md` (18px), `--radius-lg` (24px)

## Components

### Buttons
- **Primary:** gradient background, rounded 18px, scale(0.98) on press
- **Social:** 48×48px glass pill, soft shadow, tap scale(0.92)

### Cards (links)
- **Standard:** glassmorphism, 18–24px radius, icon left + title/subtitle + arrow right
- **Featured:** larger padding, gradient glow border, stronger shadow on hover
- **Interaction:** hover → arrow slides right; active → scale(0.98)

### Icons
- Social row: 22×22px inside 48px touch targets
- Link cards: 44×44px icon container (22px SVG)
- Minimal style, soft shadow, tap animation

### Toast
- Fixed bottom, glass background, “Copied to clipboard!” on email/copy actions

## Layout

- **Mobile first:** single column, max-width 480px, centered
- **Desktop (768px+):** same column, max 420px content, more padding
- **900px+:** max 520px, larger hero avatar and featured card

## Motion

- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`
- Card press: 0.98 scale, 150ms
- Scroll reveal: IntersectionObserver, cards fade + translateY in
- Theme toggle: sun/moon icon transition
