"""
Scrapes team + player tournament stats for the 12 Paris 2024 Olympic
basketball teams from fiba.basketball team pages.

How it works: each team page is server-rendered by Next.js, and the full
roster + per-player stats + team profile are embedded as JSON text inside
<script>self.__next_f.push([...])</script> tags in the raw HTML. This script
pulls those chunks out, stitches them together, and picks out the specific
objects we care about (matched by a distinctive marker string, then
brace-matched to find where each JSON object actually ends).

Usage:
    python scrape_olympics_2024.py --test canada   # try one team, print results
    python scrape_olympics_2024.py                 # run all 12, write JSON files
"""

import argparse
import json
import re
import sys
import time
from pathlib import Path

import requests

BASE_URL = "https://www.fiba.basketball/en/events/mens-olympic-basketball-tournament-paris-2024/teams/{slug}"

# Slug -> the 3-letter code your frontend already uses in COUNTRY_MAP.
TEAM_SLUGS = {
    "australia": "AUS",
    "brazil": "BRA",
    "canada": "CAN",
    "france": "FRA",
    "germany": "GER",
    "greece": "GRE",
    "japan": "JPN",
    "puerto-rico": "PUR",
    "serbia": "SRB",
    "south-sudan": "SSD",
    "spain": "ESP",
    "usa": "USA",
}

HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; personal-project-scraper/1.0)"}


def extract_flight_text(html: str) -> str:
    """Pull every self.__next_f.push([...]) argument out of the HTML and
    stitch the text chunks together into one big string to search."""
    chunks = []
    for m in re.finditer(r"self\.__next_f\.push\(", html):
        start = m.end()
        depth = 1
        i = start
        # walk forward counting parens to find where this push(...) call ends
        while depth > 0 and i < len(html):
            if html[i] == "(":
                depth += 1
            elif html[i] == ")":
                depth -= 1
            i += 1
        arg_text = html[start : i - 1]  # e.g. [1,"...json string..."]
        try:
            parsed = json.loads(arg_text)
            if isinstance(parsed, list) and len(parsed) == 2 and isinstance(parsed[1], str):
                chunks.append(parsed[1])
        except (json.JSONDecodeError, ValueError):
            # Not every push() call is a simple [id, string] pair; skip ones that aren't
            continue
    return "".join(chunks)


def extract_json_objects(text: str, marker: str) -> list[dict]:
    """Find every place `marker` appears, then brace-match backward/forward
    from there to isolate and parse the enclosing JSON object."""
    results = []
    for m in re.finditer(re.escape(marker), text):
        start = text.rfind("{", 0, m.start() + 1)
        if start == -1:
            continue
        depth = 0
        i = start
        while i < len(text):
            if text[i] == "{":
                depth += 1
            elif text[i] == "}":
                depth -= 1
                if depth == 0:
                    break
            i += 1
        else:
            continue  # never closed, malformed — skip
        try:
            results.append(json.loads(text[start : i + 1]))
        except json.JSONDecodeError:
            continue
    return results


def scrape_team(slug: str, code: str) -> tuple[dict | None, list[dict]]:
    """Fetch one team's page and return (team_profile_or_None, list_of_players)."""
    url = BASE_URL.format(slug=slug)
    resp = requests.get(url, headers=HEADERS, timeout=20)
    resp.raise_for_status()
    flight = extract_flight_text(resp.text)

    team_candidates = extract_json_objects(flight, '"profile":{"teamId"')
    player_candidates = extract_json_objects(flight, '"playerId":')

    # Dedupe players by playerId (the marker can match the same player's
    # object more than once if it's referenced from two places in the payload)
    players_by_id: dict[int, dict] = {}
    for p in player_candidates:
        pid = p.get("playerId")
        if pid is not None:
            players_by_id[pid] = p  # last one wins, they should be identical anyway
    players = list(players_by_id.values())
    for p in players:
        p["teamCode"] = code  # tag with your frontend's abbreviation

    team = None
    if team_candidates:
        # the outer object that wraps "profile" carries teamId/code/etc.
        team = team_candidates[0]
        team["teamCode"] = code

    return team, players


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--test",
        metavar="SLUG",
        help="Run against just one team slug (e.g. canada) and print results instead of saving.",
    )
    parser.add_argument(
        "--out",
        default="data/olympics-2024",
        help="Output directory for teams.json / players.json (default: data/olympics-2024)",
    )
    args = parser.parse_args()

    if args.test:
        slug = args.test
        if slug not in TEAM_SLUGS:
            print(f"Unknown slug '{slug}'. Valid slugs: {', '.join(TEAM_SLUGS)}", file=sys.stderr)
            sys.exit(1)
        team, players = scrape_team(slug, TEAM_SLUGS[slug])
        print(f"--- Team profile for {slug} ---")
        print(json.dumps(team, indent=2)[:2000])
        print(f"\n--- {len(players)} players found ---")
        for p in players[:5]:
            print(f"  {p.get('firstName')} {p.get('lastName')}: "
                  f"{p.get('pointsPerGame')} PPG, {p.get('reboundsPerGame')} RPG, "
                  f"{p.get('assistsPerGame')} APG")
        if len(players) > 5:
            print(f"  ... and {len(players) - 5} more")
        return

    all_teams = []
    all_players = []
    for slug, code in TEAM_SLUGS.items():
        print(f"Scraping {slug} ({code})...")
        try:
            team, players = scrape_team(slug, code)
            if team:
                all_teams.append(team)
            else:
                print(f"  WARNING: no team profile found for {slug}", file=sys.stderr)
            if not players:
                print(f"  WARNING: no players found for {slug}", file=sys.stderr)
            all_players.extend(players)
            print(f"  -> {len(players)} players")
        except Exception as e:
            print(f"  FAILED for {slug}: {e}", file=sys.stderr)
            continue
        time.sleep(1)  # be polite to FIBA's servers between requests

    out_dir = Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)
    (out_dir / "teams.json").write_text(json.dumps(all_teams, indent=2))
    (out_dir / "players.json").write_text(json.dumps(all_players, indent=2))
    print(f"\nDone. {len(all_teams)} teams, {len(all_players)} players written to {out_dir}/")


if __name__ == "__main__":
    main()
