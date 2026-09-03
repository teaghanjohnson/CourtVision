# Plan: Trim Nations page to Paris 2024 Olympic teams + real stats

## What's already true in your codebase (confirmed by reading it)

- `Frontend/src/constants/nations.ts` has a `COUNTRY_MAP` (name → 3-letter abbrev) covering ~40 countries, and a `CountryAbbrev` union type. All 12 Olympic teams are already in there: `AUS, BRA, CAN, FRA, GER, GRE, JPN, PUR, SRB, SSD, ESP, USA`.
- `Frontend/public/images/NATIONS/` already has logo PNGs for all 12 of those — no new assets needed.
- `Frontend/src/app/nations/page.tsx` renders its grid directly off `Object.entries(COUNTRY_MAP)`. Trimming the map automatically shrinks the grid — no changes needed there.
- There is **no** `app/nations/[nation]/page.tsx` yet. The grid's "Enter" links already point to `nations/{abbrev}`, but nothing resolves them. This is the main net-new work.
- Compare to `app/players/[team]/` (the NBA team page) — it's the pattern to mirror: `page.tsx` fetches from the Spring Boot backend, passes data into `TeamDashboard.tsx`, which composes `TeamStatsSummary.tsx`, `TeamPlayersTable.tsx`, `TeamRoster.tsx`.
- The NBA data pipeline is: Python notebooks in `DataScraping/` (`get_player_stats.ipynb`, `get_team_stats.ipynb`) scrape basketball-reference → write CSVs into `DataScraping/data/` → a Java/Spring Boot `Backend/` with a Postgres DB ingests them → exposes `/api/v1/player`, `/api/v1/team`, `/api/v1/roster` → frontend calls those.

## Decision to make first: full pipeline or static JSON?

The NBA pipeline exists because NBA data changes every season and needs re-scraping. Paris 2024 is over and will never change again. Two options:

1. **Mirror the NBA pattern exactly** — new DB tables, a new scraping notebook, new Spring Boot endpoints (`/api/v1/olympic-team`, `/api/v1/olympic-player`). Consistent with the rest of the app, but a lot of scaffolding for data that's frozen forever.
2. **Static JSON, no backend involved** — scrape once, save two JSON files into `Frontend/public/data/olympics-2024/`, have the new nation page read them directly (via `fetch()` client-side or `fs.readFile` in a server component). Much less work, and appropriate since this dataset will never need re-scraping.

Recommendation: **option 2**, unless you specifically want Olympic data queryable through the same backend/DB as everything else for architectural consistency.

## Step-by-step

1. **Data source — confirmed, no browser/API needed.** Each team page (`/teams/{slug}`) server-renders with Next.js, and the *entire* payload — full roster, full per-player tournament stats, and team-level stats — is embedded as literal JSON text in the raw HTML, inside a series of `<script>self.__next_f.push([id, "..."])</script>` tags (Next's App Router "flight" streaming format). This was verified two ways: reading `window.__next_f` in a live browser, and doing a plain `fetch()` with no credentials — same result either way, meaning a plain `requests.get(url)` from a script gets it too. No Playwright/Selenium, no reverse-engineered API, no XHR hunting required.

   Confirmed team page URLs:
   ```
   /teams/australia   /teams/brazil        /teams/canada
   /teams/france       /teams/germany       /teams/greece
   /teams/japan        /teams/puerto-rico   /teams/serbia
   /teams/south-sudan  /teams/spain         /teams/usa
   ```

2. **What's actually in there (verified on Canada's page, structure will be identical for all 12).**
   - **Team profile object** (search the flight text for `"profile":{"teamId"`): `finalRanking`, `pointsPerGame`, `reboundsPerGame`, `assistsPerGame` (team-level), `rankPointsPerGame`/`rankReboundsPerGame`/`rankAssistsPerGame`, `totalGamesWon`, `totalGamesLost`, plus a `group` object with standings and game results.
   - **Per-player objects, one per roster player** (search for `"playerId":` — there's one of these per player, not just a "leaders" subset): `firstName`, `lastName`, `uniformNumber`, `pointsPerGame`, `reboundsPerGame` (+ offensive/defensive split), `assistsPerGame`, `blocksPerGame`, `stealsPerGame`, `turnoversPerGame`, `foulsPerGame`, `plusMinusPerGame`, `efficiencyPerGame`, `playTimeInSecondsPerGame`, made/attempted/percentage for field goals, 2PT, 3PT, and free throws, `totalGamesPlayed`, and season-total versions of everything (`totalPoints`, `totalRebounds`, `totalDoubleDoubles`, etc.). This answers the earlier open question from step 2 of the old plan — you get every player, not just leaders.
   - There's also a separate, simpler roster object per player (bio info: `position`, `heightInCm`, `dateOfBirth`, `clubName`, `nationality`, `isCaptain`) if you want that too — it's a different JSON blob than the stats one, also searchable by `"personId":`.

3. **Write the scraper.** Plain Python, `requests` only (matching your existing notebook style, no new dependency needed):
   - `GET` each of the 12 team URLs.
   - Pull out every `self.__next_f.push([...])` call's argument. Each one is valid JSON — literally `[chunk_id, chunk_string]` — so `json.loads()` works directly on the extracted text between `self.__next_f.push(` and its matching closing `)`.
   - Concatenate all the `chunk_string` values in order into one big string per team. This is *not* one clean JSON document (it's React's flight wire format, with numbered segment markers like `17:[...]` mixed in) — so rather than trying to parse the whole thing as JSON, pull out just the objects you need with a brace-matching scan: find each occurrence of `"playerId":` (or `"profile":{"teamId"` for the team object), then walk forward counting `{`/`}` to find that object's matching closing brace, and `json.loads()` just that substring. This is far more reliable than a regex here, since these objects are large and regex greediness will bite you.
   - Do this for all 12 teams → you'll end up with 12 team-profile objects and roughly 12×12 (~144) player-stat objects.

   Rough shape of the extraction logic:
   ```python
   import re, json, requests

   def extract_flight_text(html: str) -> str:
       chunks = []
       for m in re.finditer(r'self\.__next_f\.push\(', html):
           start = m.end()
           depth = 1
           i = start
           while depth > 0:
               if html[i] == '(':
                   depth += 1
               elif html[i] == ')':
                   depth -= 1
               i += 1
           arg = html[start:i-1]  # e.g. [1,"...json string..."]
           try:
               _, text = json.loads(arg)
               chunks.append(text)
           except Exception:
               pass
       return ''.join(chunks)

   def extract_json_objects(text: str, marker: str) -> list[dict]:
       results = []
       for m in re.finditer(re.escape(marker), text):
           start = text.rfind('{', 0, m.start() + 1)
           depth = 0
           i = start
           while True:
               if text[i] == '{':
                   depth += 1
               elif text[i] == '}':
                   depth -= 1
                   if depth == 0:
                       break
               i += 1
           try:
               results.append(json.loads(text[start:i+1]))
           except Exception:
               pass
       return results

   slugs = ["australia","brazil","canada","france","germany","greece",
            "japan","puerto-rico","serbia","south-sudan","spain","usa"]
   base = "https://www.fiba.basketball/en/events/mens-olympic-basketball-tournament-paris-2024/teams/{}"

   all_teams, all_players = [], []
   for slug in slugs:
       html = requests.get(base.format(slug), headers={"User-Agent": "Mozilla/5.0"}).text
       flight = extract_flight_text(html)
       all_players += extract_json_objects(flight, '"playerId":')
       all_teams += extract_json_objects(flight, '"profile":{"teamId"')
   ```
   Note the `extract_json_objects` marker match will need de-duplicating (the same player object can get matched more than once if the marker text appears more than once nearby) — dedupe on `playerId` before saving. Treat this as a starting sketch to adapt, not drop-in final code — you'll want to add error handling, rate-limit the requests slightly (a short `time.sleep` between the 12 calls is a courtesy to FIBA's servers), and confirm the exact marker text still matches once you're looking at real output (formatting can vary slightly by team).

4. **Normalize team names to your existing abbreviations** — map "Puerto Rico" → `PUR`, "South Sudan" → `SSD`, "USA" → `USA`, etc., using the same codes already in `COUNTRY_MAP` so nothing else needs renaming.

5. **Save output** as `Frontend/public/data/olympics-2024/teams.json` and `.../players.json` (flat arrays, one object per team/player).

6. **Trim `constants/nations.ts`** — delete every entry from `COUNTRY_MAP` and the `CountryAbbrev` union that isn't one of the 12 Olympic teams. That's it for this file; `getCountryLogo` and the grid page don't need touching.

7. **Build `app/nations/[nation]/page.tsx`** mirroring `app/players/[team]/page.tsx`'s shape: read the `nation` param, look up the country name from `COUNTRY_MAP`, load the two JSON files (fetch from `/data/olympics-2024/...json` or read the file directly server-side), filter to that nation, and render. Build matching components (e.g. `NationStatsSummary.tsx`, `NationPlayersTable.tsx`) styled consistently with `TeamStatsSummary.tsx` / `TeamPlayersTable.tsx` so it feels like the same app — just swap the stat columns for the Olympic ones you chose in step 2.

8. **Test.** `npm run dev`, click all 12 tiles from `/nations`, confirm no leftover non-Olympic tiles, confirm each nation page renders team + player stats with no console errors on missing/mismatched data (e.g. a country name in scraped data not matching your abbreviation map).

9. **Optional cleanup.** The unused NATIONS logo PNGs for countries you removed can stay (harmless) or be deleted — your call.

## Notes

- No backend/DB changes needed at all if you go with the static-JSON route — this whole feature can live entirely in `Frontend/`.
- Since Paris 2024 stats are permanent, there's no need for a recurring scrape job the way the NBA notebooks presumably get re-run each season.
