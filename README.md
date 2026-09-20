# Digitz Creative
Production marketing site for **Digitz Creative**, a digital marketing and creative agency in Trichy, Tamil Nadu. Built as a dark, architectural single-page site for business owners — not a generic agency template.

Art direction: **Signal Architecture**. Brand system from the official rocket lockup (navy, electric cyan, lime, gold).

## Stack

- Vite 8
- React 19
- TypeScript
- Tailwind CSS v4
- lucide-react

## Run locally

```bash
npm install
npm run dev
```

Dev server: `http://127.0.0.1:43127`

```bash
npm run build
npm run preview
```

## Content

Copy, stats, services, process, packages, founder, and CTAs are sourced from the 15-page portfolio designer brief and the official client wall graphic.

- Phone: +91 99946 39700
- WhatsApp CTA: `wa.me/919994639700`
- Instagram: [@digitzcreative](https://www.instagram.com/digitzcreative)
- Site: [digitzcreative.com](https://www.digitzcreative.com)

Case-study results and testimonials are labeled as samples/placeholders until verified metrics and permissioned quotes exist. No invented analytics charts.

## Structure

```
src/App.tsx
src/data/content.ts          # all copy
src/components/layout/       # nav, footer, WhatsApp float
src/components/sections/     # page sections
public/logo.svg              # vector lockup recreation
public/brand/logo.png        # cropped official lockup
```
