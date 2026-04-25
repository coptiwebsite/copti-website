# COPTI Frontend — Next.js 14 + TypeScript + Sanity

Conference of Principals of Technical Institutes  
Built by **Celestial Web Solutions** — celestialwebsolutions.net

---

## Tech Stack

| Layer       | Technology              |
|-------------|-------------------------|
| Framework   | Next.js 14 (Pages Router) |
| Language    | TypeScript              |
| CMS         | Sanity v3               |
| Styling     | Custom CSS (globals.css) |
| Deployment  | Vercel                  |
| Fonts       | Playfair Display · Source Sans Pro · Montserrat |
| Brand       | Navy #1A3A6B · Gold #C9952A · Orange #E87722 |

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and fill in values
cp .env.local.example .env.local

# 3. Start development server
npm run dev
# → http://localhost:3000

# 4. Open Sanity Studio (separate tab)
npm run sanity
# → http://localhost:3333
```

---

## Project Structure

```
copti-frontend/
├── pages/                  # All Next.js pages
│   ├── index.tsx           # Homepage
│   ├── about.tsx           # About COPTI
│   ├── contact.tsx         # Contact page
│   ├── events.tsx          # Events listing
│   ├── 404.tsx             # Not found page
│   ├── schools/
│   │   ├── index.tsx       # Schools directory
│   │   └── [slug].tsx      # Individual school profile
│   ├── news/
│   │   ├── index.tsx       # News archive
│   │   └── [slug].tsx      # Single post
│   └── api/
│       ├── contact.ts      # Contact form handler
│       └── enquiry.ts      # School enquiry handler
├── components/
│   ├── layout/
│   │   ├── Layout.tsx      # Page wrapper (Head + Header + Footer)
│   │   ├── Header.tsx      # Top bar + sticky nav + mobile menu
│   │   └── Footer.tsx      # Footer with CTA strip
│   ├── schools/
│   │   └── SchoolCard.tsx  # Card used in directory grid
│   └── ui/
│       └── ScrollTop.tsx   # Scroll to top button
├── lib/
│   └── sanity.ts           # Sanity client + all GROQ queries
├── types/
│   └── index.ts            # All TypeScript interfaces
├── styles/
│   └── globals.css         # Full CSS (brand colours, all components)
├── sanity/
│   └── schemas/            # Sanity content schemas
│       ├── school.ts       # Member School document
│       └── index.ts        # Post, Author, Category, Event, SiteSettings
├── scripts/
│   └── migrate-schools.ts  # WordPress CSV → Sanity migration
└── sanity.config.ts        # Sanity Studio configuration
```

---

## Sanity Setup

1. Create a free project at **sanity.io**
2. Copy your **Project ID** from the dashboard
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=abc123
   ```
4. Create an **Editor** API token at sanity.io/manage → API → Tokens
5. Add to `.env.local`:
   ```
   SANITY_API_TOKEN=sk...
   ```

---

## Migration (WordPress → Sanity)

```bash
# 1. Export schools from WordPress as CSV
#    (WP All Export plugin or phpMyAdmin export)

# 2. Place file at:
scripts/schools-export.csv

# 3. Run migration
npm run migrate
```

---

## Deployment (Vercel)

```bash
# Push to GitHub
git init && git add . && git commit -m "initial"
git remote add origin https://github.com/celestialweb/copti-frontend
git push -u origin main

# Then in Vercel dashboard:
# New Project → Import from GitHub → Add env vars → Deploy
```

---

## Brand Reference

| Token          | Value     | Usage                    |
|----------------|-----------|--------------------------|
| `--navy`       | `#1A3A6B` | Headers, footer, navs    |
| `--gold`       | `#C9952A` | Buttons, accents, CTAs   |
| `--orange`     | `#E87722` | Step banners, highlights |
| `--light-bg`   | `#F0F4FA` | Section backgrounds      |
| `--font-head`  | Playfair Display  | H1–H6          |
| `--font-body`  | Source Sans Pro   | Body text      |
| `--font-btn`   | Montserrat Bold   | Buttons, labels|
