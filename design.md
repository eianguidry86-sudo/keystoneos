---
name: Obsidian Meridian
colors:
  surface: '#0c1324'
  surface-dim: '#0c1324'
  surface-bright: '#33394c'
  surface-container-lowest: '#070d1f'
  surface-container-low: '#151b2d'
  surface-container: '#191f31'
  surface-container-high: '#23293c'
  surface-container-highest: '#2e3447'
  on-surface: '#dce1fb'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#dce1fb'
  inverse-on-surface: '#2a3043'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#4fdbc8'
  on-secondary: '#003731'
  secondary-container: '#04b4a2'
  on-secondary-container: '#003f38'
  tertiary: '#d0bcff'
  on-tertiary: '#3c0091'
  tertiary-container: '#a078ff'
  on-tertiary-container: '#340080'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#71f8e4'
  secondary-fixed-dim: '#4fdbc8'
  on-secondary-fixed: '#00201c'
  on-secondary-fixed-variant: '#005048'
  tertiary-fixed: '#e9ddff'
  tertiary-fixed-dim: '#d0bcff'
  on-tertiary-fixed: '#23005c'
  on-tertiary-fixed-variant: '#5516be'
  background: '#0c1324'
  on-background: '#dce1fb'
  surface-variant: '#2e3447'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  container-max: 1440px
  gutter: 20px
---

## Brand & Style

The design system is engineered for high-performance enterprise environments where precision, speed, and premium aesthetics are paramount. It targets a sophisticated user base of developers, product managers, and executives who value clarity over clutter.

The visual direction is a refined fusion of **Minimalism** and **Glassmorphism**. It utilizes deep, "obsidian" backgrounds to create a sense of infinite depth, contrasted by vibrant, glowing accents that guide attention to critical actions and status changes. The interface feels like a high-end physical tool—tactile yet digital—achieved through meticulous attention to border gradients, inner luminosity, and backdrop blurs.

**Key principles:**
- **Technical Elegance:** Every pixel must serve a functional purpose while maintaining a luxury feel.
- **Luminous Hierarchy:** Use light and glow to indicate focus and priority rather than heavy solid fills.
- **Deep Immersion:** Utilize translucency to maintain spatial awareness of the underlying application state.

## Colors

This design system is strictly optimized for **Dark Mode**, utilizing a palette of deep slates and pure obsidians to minimize eye strain and maximize the impact of accent colors.

- **Primary (Indigo):** Used for primary actions, active states, and focus indicators. 
- **Secondary (Teal):** Used for success states, secondary metrics, and alternative branding accents.
- **Accent Glows:** Both primary and secondary colors should be used as soft, diffused glows (20-40px blur) behind key surfaces or as 1px "outer glows" for active cards.
- **Surface Strategy:** Surfaces are built using a stack of `rgba(15, 23, 42, 0.6)` with a `backdrop-filter: blur(12px)`. This creates the glass effect seen in the reference, allowing background gradients to bleed through subtly.

## Typography

We use **Geist** for its technical precision and neutral, high-end SaaS aesthetic. It provides exceptional legibility at small sizes while appearing modern and authoritative in display roles. For data-heavy labels, status tags, and metadata, we introduce **JetBrains Mono** to reinforce the "OS" and developer-grade personality.

**Hierarchy Rules:**
- Use `display-lg` sparingly for marketing or landing hero sections.
- `label-md` and `label-sm` should be used for status tags, IDs, and secondary metadata (e.g., "Due Date").
- Contrast should be achieved through weight (Regular vs. SemiBold) and color (White vs. Slate-400) rather than drastic size changes alone.

## Layout & Spacing

The design system employs a **Fluid-Fixed Hybrid** grid. While the overall container can stretch to fill ultra-wide monitors, the internal modules (like Kanban columns or sidebar widths) follow strict fixed-width increments based on an 8px scale.

- **Desktop (1280px+):** 12-column grid, 24px margins, 20px gutters.
- **Tablet (768px - 1279px):** 8-column grid, 16px margins, 16px gutters.
- **Mobile (< 767px):** 4-column grid, 16px margins.

**Rhythm:**
Use a base-4 system for internal component spacing (padding/gap). Cards should utilize a standard `md` (16px) or `lg` (24px) padding to ensure content feels breathable despite the high-density information architecture.

## Elevation & Depth

Depth is not communicated via shadows, but through **Tonal Luminosity** and **Glassmorphism**.

1.  **The Canvas (Level 0):** Pure `#020617` obsidian background.
2.  **The Containers (Level 1):** Translucent `#0f172a` with `backdrop-filter: blur(12px)`. These must have a 1px border using a linear gradient: `top-left: rgba(255,255,255,0.1)` to `bottom-right: rgba(255,255,255,0.02)`.
3.  **Active Focus (Level 2):** When a card or input is focused, apply a soft inner glow `box-shadow: inset 0 0 12px rgba(99, 102, 241, 0.1)` and change the border gradient to use the primary Indigo color.
4.  **Floating Elements (Level 3):** Popovers and modals should increase the background blur to 24px and use a slightly lighter surface fill (`rgba(30, 41, 59, 0.8)`).

## Shapes

The design system uses a **Rounded** (0.5rem) base aesthetic. This strikes a balance between the clinical sharp edges of traditional enterprise software and the overly friendly, bubbly nature of consumer apps.

- **Base Radius (0.5rem / 8px):** Standard buttons, input fields, and task cards.
- **Large Radius (1rem / 16px):** Main layout containers, Kanban columns, and modals.
- **Full Radius (Pill):** Status indicators, user avatars (if not using the square avatar style), and toggle tracks.

## Components

### Buttons
- **Primary:** Solid indigo fill with a subtle top-down white-to-transparent gradient (10% opacity) to create a "glass-topped" look. White text.
- **Secondary:** Transparent background with a 1px slate-800 border. On hover, the border glows with the primary color.
- **Tertiary/Ghost:** No border or fill. Indigo text.

### Cards
- **Construction:** Use the Level 1 Elevation rules.
- **Interaction:** On hover, cards should subtly lift by increasing the opacity of the top-left border gradient and adding a faint primary color outer glow (`box-shadow: 0 0 20px rgba(99,102,241,0.1)`).

### Input Fields
- **Default:** Darker than the surface background (`#020617`). 1px border `rgba(255,255,255,0.05)`.
- **Focus:** Border transitions to Primary Indigo. An inner shadow should create a "sunken" feel.

### Chips & Tags
- Use JetBrains Mono for the text. 
- Backgrounds should be low-opacity versions of the status color (e.g., Success = Teal at 10% opacity) with a matching 1px border at 30% opacity.

### Status Indicators
- **Pulsing:** Critical or "In Progress" states should feature a small 8px dot with a CSS keyframe animation causing a 4px expansion of a 20% opacity halo.
