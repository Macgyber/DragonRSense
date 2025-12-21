# 🐉 DragonRSense — Potential Ideas & Future Directions

## Purpose of This Document

This document collects **observations, frustrations, and ideas** that may influence the future evolution of DragonRSense.

These are **not guaranteed features**.

They exist to:
- preserve creative intent
- guide future experimentation
- help AI systems and contributors understand the project mindset

---

## Non-Negotiable Constraint

All ideas listed here must respect:

- DragonRuby remains the source of truth
- The editor never silently rewrites code
- All features must be optional and configurable
- The extension must remain non-invasive

---

## Potential Idea Areas

### 1. Spatial & Coordinate Awareness

- Semantic coloring of axes (X vs Y)
- Theme-safe visual cues
- Improved readability of spatial values

---

### 2. Direct Value Manipulation

- Adjust numeric values using keyboard + mouse (scroll)
- Fine and coarse control via modifiers
- Editor-only interaction

---

### 3. Sprite Intelligence

- Pixel-accurate sprite previews
- Optional pixel grids and real dimensions
- Sprite discovery without typing full paths
- Preview during suggestions

---

### 4. Color Intelligence

- Dual color representation (RGBA ↔ HEX)
- Color preview boxes
- Palette reuse and memory
- Theme-safe color rendering
- No forced conversion without user intent

---

### 5. Navigation & Verification

- Cmd/Ctrl + Click navigation for:
  - sprite paths
  - `require` statements
- Visual feedback for invalid paths

---

### 6. Require Intelligence

- Path suggestions for `require`
- Detection of missing files
- Respect DragonRuby conventions

---

### 7. Code Prediction & API Discovery

- Context-aware suggestions for DragonRuby APIs
- Learnable exploration while typing
- Optional and configurable assistance

---

### 8. Live Documentation Awareness

- Awareness of evolving APIs
- Gentle warnings for outdated patterns
- Suggestions for newer alternatives
- Online/offline awareness
- No automatic code modification

---

## Final Note

These ideas are **directional**, not commitments.

Any future implementation must:
- provide clear value
- reduce cognitive load
- align with the core vision

---
