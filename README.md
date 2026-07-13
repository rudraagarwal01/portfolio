# Rudra Agarwal — Personal Portfolio

A modern, interactive portfolio built with React, Tailwind CSS, and Framer Motion. It combines a dark, engineering-inspired visual style with fast page transitions, motion-rich sections, and a recruiter-friendly content flow.

**Live site:** [rudraagarwal.dev](https://rudra-agarwal.com)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment & Configuration](#environment--configuration)
- [Deployment](#deployment)

---

## Overview

This project is a multi-page portfolio experience focused on clarity, performance, and visual polish.  
It highlights professional experience, projects, skills, certifications, leadership, and contact in dedicated routes, while keeping navigation and interactions consistent across the app.

The UI is intentionally built to feel technical and immersive: animated background layers, subtle depth effects, contextual motion, and compact data-dense cards. The result is a portfolio that reads quickly for recruiters while still showcasing front-end engineering depth.

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

### Core Experience
- Multi-route portfolio with smooth animated transitions between Home, About, Experience, Certifications, Projects, Skills, Leadership, and Contact
- Glassmorphism + neon-accent visual language designed for dark mode readability
- Responsive layout system optimized for desktop and mobile navigation

### Navigation & Interaction
- Fixed frosted navbar with active-route highlighting and mobile menu
- Global command palette (`⌘K` / `Ctrl+K`) for quick page navigation
- Top progress bar and custom right-edge scroll indicator for better reading position awareness

### Home & Visual Identity
- Cinematic hero with motion effects, social links, and recruiter-facing intro
- Animated starfield, tech-grid overlay, and cursor spotlight to create depth without sacrificing content legibility

### Content Sections
- **About:** concise personal/academic context with strong visual hierarchy
- **Experience:** timeline-first layout with motion-driven progression cues
- **Projects:** featured and standard project cards with tech tags and external links
- **Skills:** categorized technical stack display with branded icon styling
- **Certifications:** direct links to verified credentials
- **Leadership:** impact-focused cards with metrics and organization links

### Contact Workflow
- Browser-only contact form powered by EmailJS (no backend required)
- Guided message composition with ghost-text autocomplete
- Animated submit states and success/error feedback for clear UX

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
