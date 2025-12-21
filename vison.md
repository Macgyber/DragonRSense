# 🐉 DragonRSense — Vision Document

## Purpose

DragonRSense is a Visual Studio Code extension designed to **augment the DragonRuby development experience** by making code more **visual, understandable, and interactive**, without altering or controlling the source code itself.

Its goal is not to replace DragonRuby, nor to impose new rules, but to **reduce cognitive friction** while programming games.

> DragonRSense is an *editor intelligence layer*, not a framework.

---

## Core Philosophy

### Non-Invasive Editor Intelligence

DragonRSense follows one strict principle:

> **The editor may enrich understanding, but it must never own the source code.**

**Core Rules:**
- What belongs to the editor stays in the editor
- What belongs to DragonRuby stays in DragonRuby
- The source code must remain valid and functional even if the extension is removed
- No "magic behavior", hidden transformations, or fragile projects
- The editor never silently rewrites code

---

## Problems DragonRSense Aims to Solve

- Coordinates (`x`, `y`, `w`, `h`) are numbers with spatial meaning, but are hard to read mentally
- Sprite paths are long, error-prone, and hard to verify
- Colors are written numerically, disconnected from visual perception
- APIs evolve, but the editor does not warn about outdated usage
- Repetitive trial-and-error breaks creative flow
- Visual context is lost when switching editor themes

---

## Guiding Principles

- **Visual over textual** when possible
- **Understanding over memorization**
- **Suggestion over enforcement**
- **Configuration over imposition**
- **Clarity over cleverness**
- **Assistance over automation**

---

## Feature Vision (Conceptual, Not Implementation)

### 1. Coordinate & Size Awareness

**Goal:** Make spatial data visually understandable

**Features:**
- Semantic understanding of `x`, `y`, `w`, `h`
- Visual differentiation:
  - `x` → horizontal (blue)
  - `y` → vertical (green)
- Optional decorations and hovers
- Theme-safe colors (never invisible in light/dark themes)
- Improved readability of spatial values

**Status:** ✅ Partially implemented (hovers, decorations)

---

### 2. Direct Numeric Manipulation

**Goal:** Reduce trial-and-error when adjusting values

**Features:**
- Adjust numeric values using:
  - `Cmd + Scroll` (macOS)
  - `Ctrl + Scroll` (Windows/Linux)
- Fine and coarse control via modifiers
- Especially useful for:
  - coordinates
  - sizes
  - angles
- Editor-only interaction (no code modification)

**Status:** ❌ Not implemented

---

### 3. Sprite Intelligence

**Goal:** Make sprite paths visual and discoverable

#### Sprite Preview
- Hover shows sprite preview
- Pixel-accurate (1:1) option
- Optional pixel grid and real dimensions
- Show file size and path

**Status:** ✅ Partially implemented (preview with dimensions)

#### Sprite Discovery
- Detect available sprites in the project
- Suggest sprites without typing full paths
- Show preview in suggestions
- Autocomplete sprite paths

**Status:** ❌ Not implemented

---

### 4. Require Intelligence

**Goal:** Make file dependencies clear and navigable

**Features:**
- Detect and suggest valid `require` paths
- Navigate to required files with Cmd/Ctrl + Click
- Warn when a required file does not exist
- Respect DragonRuby conventions
- Path suggestions for `require`
- Detection of missing files

**Status:** ❌ Not implemented

---

### 5. Navigation by Intent

**Goal:** Navigate code by clicking on references

**Features:**
- Cmd/Ctrl + Click on:
  - sprite paths
  - `require` statements
- Opens the referenced file or asset directly
- Provides visual warning if the path is invalid
- Visual feedback for invalid paths

**Status:** ❌ Not implemented

---

### 6. Color Intelligence

**Goal:** Make colors visual while respecting DragonRuby's format

#### Dual Representation Model
- DragonRuby remains the source of truth (RGBA 0–255)
- Editor provides parallel views:
  - HEX representation
  - Color picker
  - Palette memory

#### Supported Concepts
- RGBA ↔ HEX awareness
- Small color preview box
- Reuse of previously used colors
- Theme-safe rendering
- No forced conversion without user intent
- Palette reuse and memory

> The editor interprets colors; DragonRuby executes them.

**Status:** ❌ Not implemented

---

### 7. Code Intelligence & Autocomplete

**Goal:** Learn DragonRuby API while typing

**Features:**
- Context-aware suggestions for DragonRuby:
  - `args.outputs`
  - `args.inputs`
  - `args.state`
  - `args.grid`
  - `args.geometry`
- Learnable API exploration while typing
- Optional and configurable assistance

**Status:** ❌ Not implemented

---

### 8. Live Documentation Awareness

**Goal:** Stay current with DragonRuby evolution

**Features:**
- Awareness of evolving APIs
- Soft warnings for deprecated or changed usage
- Gentle warnings for outdated patterns
- Suggestions for updated patterns
- Online/offline mode
- Never auto-modifies code
- No automatic code modification

**Status:** ❌ Not implemented

---

## Configuration Philosophy

**Every feature must be:**
- Optional
- Independently toggleable via settings
- Respectful of different workflows

**Users choose:**
- What to enable
- What to ignore
- Minimal assistance vs full visual augmentation
- How much assistance they want

**No "one-size-fits-all"**

---

## What DragonRSense Is NOT

- ❌ Not a replacement for DragonRuby documentation
- ❌ Not a framework or engine
- ❌ Not a runtime dependency
- ❌ Not a code transformer without consent
- ❌ Not dependent on constant internet access
- ❌ Not intrusive or opinionated
- ❌ Does not enforce architectural patterns

---

## Scope

### DragonRSense Focuses On:

- ✅ Helping developers **understand what their code represents**
- ✅ Reducing cognitive friction while working with spatial data
- ✅ Making DragonRuby code more readable and navigable
- ✅ Making game code feel **spatial, visual, and alive**

### DragonRSense Does NOT:

- ❌ Replace documentation
- ❌ Rewrite code automatically
- ❌ Enforce architectural patterns
- ❌ Depend on constant internet access

---

## Long-Term Vision

DragonRSense aims to make **game code feel spatial, visual, and alive**, closer to how game developers think, without sacrificing clarity or control.

> The code should not fight the creator.  
> The editor should quietly assist.  
> The editor becomes a quiet assistant, not a ruler.

---

## User Control

Every capability in DragonRSense must be:

- ✅ Optional
- ✅ Independently toggleable
- ✅ Respectful of different workflows

Users decide:
- What to enable
- What to ignore
- How much assistance they want

---

## Implementation Status

This document represents **vision and intent**, not a promise of immediate implementation.

Features are expected to be developed incrementally, guided by real usage and feedback.

### Current Implementation (v0.0.1):
- ✅ Coordinate & Size Awareness (partial)
- ✅ Sprite Preview with dimensions (partial)
- ✅ Configuration system (complete)
- ❌ Direct Numeric Manipulation
- ❌ Sprite Discovery
- ❌ Require Intelligence
- ❌ Navigation by Intent
- ❌ Color Intelligence
- ❌ Code Autocomplete
- ❌ Live Documentation

**Progress:** ~25% of vision completed

---

## Design Constraints

All ideas and implementations must respect:

- ✅ DragonRuby remains the source of truth
- ✅ The editor never silently rewrites code
- ✅ All features must be optional and configurable
- ✅ The extension must remain non-invasive
- ✅ All code remains valid DragonRuby code
- ✅ Removing the extension never breaks a project
- ✅ No hidden transformations
- ✅ No forced conventions

---

## Future Direction

Any future implementation must:
- Provide clear value
- Reduce cognitive load
- Align with the core vision
- Respect the non-invasive philosophy

These ideas are **directional**, not commitments.

---

*Last updated: 2025-12-20*
