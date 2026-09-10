# CourtVision

A full-stack NBA stats and scouting web app for browsing teams, players, positions, and national-team rosters, backed by a scraped-and-curated Postgres dataset served through a read-only REST API.

## What it does

- **Browse by Team** — all 30 NBA franchises, each with a full current roster and player stat tables (sortable columns, null values pinned to the bottom).
- **Browse by Position** — Point Guard / Shooting Guard / Small Forward / Power Forward / Center hub pages.
- **Browse by Nation** — national-team pages seeded from the **2024 Paris Olympics** rosters (scraped from FIBA), covering countries like the USA, France, Germany, Serbia, Canada, and more, with age auto-calculated from birthdate and school/college tagged per player (including overseas/high-school players).
- **League-wide stats page** — cross-team, cross-player season stats in one sortable table.
- Animated UI throughout: a 3D interactive logo (Three.js), page transitions and micro-interactions (GSAP, Framer Motion, animate.css).

## Architecture

```
DataScraping/  →  Backend (Postgres + Spring Boot API)  →  Frontend (Next.js)
   (scrape)            (store + serve, read-only)              (display)
```

The database is populated **out-of-band** by the scraping pipeline (CSV/JSON imports), never through the API — the API itself only exposes `GET` endpoints.

### Frontend — `Frontend/`
- **Next.js 16** (App Router) on **React 19** + **TypeScript**
- **Tailwind CSS v4** for layout/styling, plus SCSS modules for a few components
- **Three.js** for the interactive 3D logo, **GSAP** + **Framer Motion** + **animate.css** for animation/transitions
- FontAwesome for iconography

### Backend — `Backend/`
- **Java 21**, **Spring Boot 4.1** (`spring-boot-starter-webmvc`, `spring-boot-starter-data-jpa`)
- **PostgreSQL** for storage
- Read-only REST API: `/api/v1/player`, `/api/v1/team`, `/api/v1/roster`, `/api/v1/roster/detail` — no write endpoints, results capped and paginated at the repository layer, CORS locked to configured origins only
- Config is environment-driven (`DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, `CORS_ALLOWED_ORIGINS`, `DDL_AUTO`) — no credentials baked into the image

### Data pipeline — `DataScraping/`
- Python (`requests`, `BeautifulSoup`, `pandas`) notebooks that scrape NBA season/player/team stats from **basketball-reference.com**
- `scrape_olympics_2024.py` pulls national-team rosters from FIBA's 2024 Olympics pages
- Output is cleaned into CSV/JSON and loaded into Postgres to feed the Backend

## Running locally

**Backend** (Postgres running locally, DB `nba_stats` on `localhost:5432`):
```bash
cd Backend
DB_USERNAME=<user> DB_PASSWORD=<password> ./mvnw spring-boot:run
```
Defaults to port `8080`; override with `-Dspring-boot.run.arguments=--server.port=NNNN`.

**Frontend**:
```bash
cd Frontend
npm install
npm run dev
```

**Docker**: both `Backend/Dockerfile` and `Frontend/Dockerfile` are multi-stage builds ready for deployment — configure the env vars above (plus `NEXT_PUBLIC_API_URL` for the frontend build) at run time.

## Roadmap

- **Live NBA autoscraper** — a scheduled job to keep NBA rosters/stats current through the season automatically, likely pairing basketball-reference (season totals) with ESPN's live scoreboard data, feeding into match predictions.
- National-team rosters are currently a static 2024 Olympics snapshot (considered the truest per-country roster, since FIBA competition rosters fluctuate constantly) rather than auto-updated — a lower-priority, "extra credit" part of the project.
