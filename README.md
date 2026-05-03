# Rudra Agarwal — Personal Portfolio

A high-performance personal portfolio built with React, Tailwind CSS, and Framer Motion. Designed with a dark, engineering-forward aesthetic featuring animated timelines, glassmorphism UI, and a fully functional contact form.

**Live site:** [rudraagarwal.dev](https://rudra-agarwal.com)

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment & Configuration](#environment--configuration)
- [Deployment](#deployment)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 (Create React App) |
| Styling | Tailwind CSS v3 (JIT) |
| Animation | Framer Motion v12 |
| Icons | react-icons, lucide-react |
| Email | EmailJS (`@emailjs/browser`) |
| Language | JavaScript (JSX) |

---

## Features

### Global UI
- **Star Background** — 600 procedurally drifting/twinkling stars with 8 animated shooting stars
- **Tech Grid Overlay** — fixed CSS grid at 4% opacity for a subtle engineering aesthetic
- **Cursor Spotlight** — radial gradient that follows the mouse, highlighting content on hover
- **Custom Scroll Indicator** — disappearing right-side scroll thumb with zero-lag direct DOM updates
- **Scroll Progress Bar** — 1px blue-to-purple gradient bar fixed at the top of the viewport
- **Command Palette** — `⌘K` / `Ctrl+K` global shortcut opens a searchable jump menu

### Navbar
- Fixed frosted-glass navbar with active section tracking via `getBoundingClientRect`
- Animated sliding pill indicator on the active nav link
- Centered nav links using CSS Grid (`grid-cols-[auto_1fr_auto]`)
- Responsive hamburger menu for mobile

### Hero
- Full-screen layout with profile photo, name, role, and Fannie Mae incoming badge
- Animated typing terminal (`system_status.sh`) cycling through stack verification logs
- Social icon dock with tooltip labels (Email, GitHub, LinkedIn, AWS Credly)

### About
- Glassmorphism card with bio, values, and academic stats
- Highlighted goal statements with bold metric callouts

### Experience
- Animated circuit timeline using `useScroll` + `useSpring` + `useTransform` from Framer Motion
- Glowing scroll-tracking dot that travels along the timeline as you scroll
- Per-role tech trace icons (brand-colored, `size={20}`) and system status footer bar
- "Incoming" badge with pulse animation for the Fannie Mae role

### Projects
- Featured cards (AuthGuard, Fitness Genius) with blue highlight callout boxes
- Standard project cards with transparent border at rest, white border on hover
- Tech stack badges and external/GitHub links per project

### Skills
- 4-quadrant bento grid: Languages, AI/ML, Engineering & Cloud, Security & Ethics
- Always-on brand colors per icon via `hexGlow()` drop-shadow filter
- Spring-animated pill hover effect

### Certifications
- Clickable cards linking to Credly badge and Forage simulation PDF

### Leadership
- "Proof of Impact Hub" layout: two satellite cards connected to a central animated Community Core node via live SVG data streams
- Lucide + Game Icons per organization (Trophy, HeartHandshake)
- Bold metric callouts, role titles, and Visit Website links per card

### Contact
- Glassmorphism centered card with labeled, high-contrast input fields
- **Ghost text autocomplete** — context-aware suggestions for Subject and Message fields; press `Tab` to accept
- **EmailJS integration** — form submits directly via `emailjs.send()` with no backend required
- Animated success/error states via `AnimatePresence`
- Auto-reset: form clears 2.5s after a successful send
- Social links (GitHub, LinkedIn, Email) in card footer

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Fixed nav with command palette and active tracking
│   ├── Hero.jsx            # Hero section with typing terminal
│   ├── About.jsx           # Bio card
│   ├── Experience.jsx      # Animated timeline with scroll tracking
│   ├── Projects.jsx        # Featured + standard project cards
│   ├── Skills.jsx          # Bento icon grid with glow effects
│   ├── Certifications.jsx  # Credential cards
│   ├── Leadership.jsx      # Hub-satellite impact layout
│   ├── Contact.jsx         # EmailJS form with ghost text autocomplete
│   ├── Footer.jsx          # Footer with back-to-top
│   ├── StarBackground.jsx  # Animated star field
│   ├── ScrollProgress.js   # Top progress bar
│   └── CustomCursor.js     # Cursor tracking
├── context/                # Theme context
├── App.js                  # Root layout, cursor spotlight, scroll indicator
├── App.css                 # Global styles, tech-grid overlay
└── index.css               # Scrollbar hiding, base resets
public/
└── logos/                  # Company logo assets
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
git clone https://github.com/rudraagarwal01/portfolio.git
cd portfolio
npm install
```

### Development

```bash
npm start
```

Runs the app at `http://localhost:3000` with hot reload.

### Production Build

```bash
npm run build
```

Outputs an optimized static bundle to `/build`.

---

## Environment & Configuration

### EmailJS (Contact Form)

The contact form sends email directly from the browser via EmailJS. No backend required.

Update the constants in `src/components/Contact.jsx`:

```js
const EMAILJS_SERVICE_ID  = "your_service_id";
const EMAILJS_TEMPLATE_ID = "your_template_id";
const EMAILJS_PUBLIC_KEY  = "your_public_key";
```

**EmailJS template variables used:**
| Variable | Source |
|---|---|
| `{{from_email}}` | Sender's email input |
| `{{subject}}` | Subject input |
| `{{message}}` | Message textarea |

Set **Reply To** to `{{from_email}}` in your EmailJS template so replies go directly to the sender.

---

## Deployment

The build output is a standard static site and can be deployed to any static host:

```bash
npm run build
# Deploy the /build directory
```

Compatible with: **Vercel**, **Netlify**, **GitHub Pages**, **AWS S3 + CloudFront**

---

*Built by [Rudra Agarwal](https://github.com/rudraagarwal01)*
