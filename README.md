# 3D Assembly Assistant

A web-based **3D assembly assistant** built with **React**, **Three.js**, and **React Three Fiber**. Walk through assembling a modular storage cabinet step by step with animated part placement, exploded view, camera focus, and an interactive bill of materials.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Three.js](https://img.shields.io/badge/Three.js-r170-black?logo=three.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript)

## Live Demo

Deploy the `dist` folder to any static host, or use one of these one-click options:

| Platform | Steps |
|----------|-------|
| **Vercel** | Import repo → framework preset: Vite → deploy |
| **Netlify** | Connect repo → build: `npm run build` → publish: `dist` |
| **GitHub Pages** | Enable Pages → source: GitHub Actions (see below) |

> After deploying, add your live URL here: `https://your-demo-url.vercel.app`

## Features

- **Step-by-step assembly flow** — 7 guided steps from base to door
- **Exploded view mode** — toggle to separate all installed parts
- **Part movement animation** — parts fly in from entry positions with easing
- **Active part highlighting** — emissive glow + edge outline on the current part
- **Instruction panel** — title, description, and tips per step
- **Previous / Next / Replay** — navigation with progress bar
- **Bill of Materials** — clickable part list with install status
- **Camera focus** — auto-frames the active part on each step
- **Orbit controls** — manual pan/zoom after camera settles

## Project Structure

```
src/
├── components/
│   ├── bom/              # Bill of materials UI
│   ├── controls/         # Navigation & view mode toggles
│   ├── instructions/     # Step instruction panel
│   ├── layout/           # App shell & header
│   ├── scene/            # R3F 3D scene & parts
│   └── ui/               # Reusable UI primitives
├── data/
│   └── cabinetAssembly.ts  # Product parts, steps, positions
├── hooks/
│   └── useAssemblyState.ts # Assembly state machine
├── styles/
│   └── index.css           # Global styles
├── types/
│   └── assembly.ts         # Shared TypeScript types
└── utils/
    └── animation.ts          # Easing & animation constants
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/assembly-assistant.git
cd assembly-assistant

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview   # preview production build locally
```

Output is written to the `dist/` directory.

## Usage

1. Use **Next** / **Previous** to move through assembly steps.
2. Click **Replay** to reset to step 1.
3. Toggle **Exploded / Assembled** to inspect part relationships.
4. Click any part in the **Bill of Materials** to jump to its step.
5. Drag to orbit, scroll to zoom in the 3D viewport.

## Customizing a Product

Edit `src/data/cabinetAssembly.ts`:

1. Define `parts` with assembled position, size, colors, and exploded/entry offsets.
2. Define `steps` linking each step to a `partId`, instruction text, and camera focus.

The scene reads everything from this data file — no 3D modeling software required.

## Tech Stack

| Library | Purpose |
|---------|---------|
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [React 18](https://react.dev/) | UI framework |
| [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) | React renderer for Three.js |
| [@react-three/drei](https://github.com/pmndrs/drei) | Helpers (Grid, Environment, Edges) |
| [Three.js](https://threejs.org/) | WebGL 3D engine |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |

## GitHub Repository

Push this project to GitHub:

```bash
git init
git add .
git commit -m "Initial commit: 3D assembly assistant"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/assembly-assistant.git
git push -u origin main
```

## Deploy to GitHub Pages

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Set **Settings → Pages → Source** to **GitHub Actions**.

## License

MIT
