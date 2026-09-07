# Design Map

## Spacing Scale
2px, 4px, 6px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 208px — 2px base unit for component internals, 208px for section separation, almost nothing in between

## Font Hierarchy
- h1: 64px / 400 / GeistSans — line-height 64px (1.0), letter-spacing −0.06em
- h2: 56px / 450 / GeistSans — line-height 56px (1.0), letter-spacing −0.06em
- Subhead: 24px / 400 / GeistSans
- Body: 14px / 400 / GeistSans — line-height 20px (dominant size, ~76% of all text)
- Meta: 12px / 400 · Micro: 11px / 400

## Color Palette
- Page background: `#FAFAFA` (71.2% of surface)
- Panel surface: `#FFFFFF` (17.4%)
- Text primary: `#171717`
- Text secondary: `#4D4D4D` (most-used text colour)
- Text muted: `#8F8F8F`
- Border/hairline: `#EBEBEB`
- Inverted surface: `#171717`
- All neutrals are pure (R=G=B exactly) — no warm or cool tint

## Image Ratios
- Product screenshot: 1.90:1
- Product screenshot (alt): 1.78:1

## Component Tokens
- Radius: 4px, 6px, and `9999px` pills (written as 2²⁵ px, 22 occurrences)
- Shadows: `0 0 0 1px rgba(0,0,0,0.08)` and `0 0 0 1px #EBEBEB` — hairline rings, never elevation
- Grid: 12 columns × 94px, 24px gutter, 1440px container (9 grids on the page)
- Motion: `cubic-bezier(0.4, 0, 0.2, 1)` at 0.15s / 0.3s / 0.5s, animating opacity, colour, background-color, border-color, height
- Accessibility: `:focus-visible` and `prefers-reduced-motion` both shipped

---

# Taste DNA

### Restraint: A Weight Ceiling of 500
- **Trigger**: Needing a 64px hero headline to dominate the viewport
- **Decision**: Set it at weight 400 — the same weight as body copy — over the 600–700 nearly every marketing site reaches for
- **Reason**: At 64px the size alone already commands the page; weight past ~500 turns presence into aggression, and the restraint reads as confidence rather than salesmanship
- **Evidence**: h1 is 64px at weight 400; no weight above 500 exists anywhere (400×112, 500×42, 450×16)

### Depth Is Forbidden; Tone Does the Separating
- **Trigger**: Distinguishing content panels from the page beneath them
- **Decision**: Made the page floor `#FAFAFA` and panels `#FFFFFF` with shadows reduced to 1px hairlines, over lifting white panels off white with real elevation
- **Reason**: A 5-point tonal step is enough to read as "forward" without simulating physical layers; elevation implies things can be moved or dismissed, which is wrong for static marketing content
- **Evidence**: 71.2% `#FAFAFA` vs 17.4% `#FFFFFF`; every shadow is 4 transparent layers plus one 8%-black or `#EBEBEB` ring; zero card components detected

### Optical Correction Only Where the Eye Catches It
- **Trigger**: Setting type across a 64px→11px range
- **Decision**: Collapsed display line-height to exactly 1.0 and pulled tracking to −0.06em, leaving body at 1.43 and normal tracking — over one tracking rule across the whole scale
- **Reason**: Letter-spacing and leading errors are invisible at 14px and glaring at 56px; correcting only the display tier is the smallest intervention that fixes what is actually perceptible
- **Evidence**: h1 64px/64px at −3.84px and h2 56px/56px at −3.36px (both exactly −0.06em), against body 14px/20px at normal

### Micro-Grid Inside, Vast Void Between
- **Trigger**: Deciding rhythm for a page mixing dense UI clusters with distinct marketing sections
- **Decision**: Ran component internals on a 2px grid and separated sections by 208px, deliberately leaving the middle of the spacing scale nearly empty
- **Reason**: Tight internal spacing makes a cluster read as one object rather than loose parts, and only a gap far larger than any internal gap reliably signals "new idea" — mid-range spacing would blur the two
- **Evidence**: 2px (336) and 6px (94) dominate the distribution while 40px appears only 9 times; section gaps measured 208px twice, identically
