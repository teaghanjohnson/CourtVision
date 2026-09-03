import argparse
import json
import re
import sys
import time
from pathlib import Path

import requests

BASE_URL = "https://www.fiba.basketball/en/events/mens-olympic-basketball-tournament-paris-2024/teams/{slug}"

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
    """
    Extract every self.__next_f.push([...]) argument out of the HTML
    and stitch the text chunks together into one big string to search.
    """
    chunks = []
    for m in re.finditer(r"self\.__next_f\.push\(", html):
        start = m.end()
        depth = 1
        i = start
        while depth > 0 and i < len(html):
            if html[i] == "(":
                depth += 1
            elif html[i] == ")":
                depth -= 1
            i += 1
        arg_text = html[start : i - 1]
        try:
            parsed = json.loads(arg_text)
            if isinstance(parsed, list) and len(parsed) == 2 and isinstance(parsed[1], str):
                chunks.append(parsed[1])
        except (json.JSONDecodeError, ValueError):
            continue
    return "".join(chunks)


def extract_json_objects(text: str, marker: str) -> list[dict]:
    """
    Find every place `marker` appears, then brace-match backward/forward
    from there to isolate and parse the enclosing JSON object.
    """
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
            continue
        try:
            results.append(json.loads(text[start : i + 1]))
        except json.JSONDecodeError:
            continue
    return results


def scrape_team_raw(slug: str, code: str) -> tuple[dict | None, list[dict]]:
    """Fetch one team's page and return (raw_team_wrapper_or_None, list_of_raw_player_dicts)."""

    url = BASE_URL.format(slug=slug)
    resp = requests.get(url, headers=HEADERS, timeout=20)
    resp.raise_for_status()
    flight = extract_flight_text(resp.text)

    team_candidates = extract_json_objects(flight, '"profile":{"teamId"')

    # Two different objects per player both use the field name "playerId":
    #   - the full tournament stat line (has "pointsPerGame")
    #   - a lightweight roster entry (has "positionCode", no stats)
    # Match each on a marker unique to it, then merge bio fields onto the
    # stats object per player so neither clobbers the other.
    stat_candidates = extract_json_objects(flight, '"pointsPerGame":')
    bio_candidates = extract_json_objects(flight, '"positionCode":')

    players_by_id: dict[int, dict] = {}
    for p in stat_candidates:
        pid = p.get("playerId")
        if pid is not None:
            players_by_id[pid] = dict(p)

    for b in bio_candidates:
        pid = b.get("playerId")
        if pid is None:
            continue
        if pid in players_by_id:
            for key, value in b.items():
                players_by_id[pid].setdefault(key, value)
        else:
            players_by_id[pid] = dict(b)

    players = list(players_by_id.values())
    for p in players:
        p["teamCode"] = code

    team = None
    if team_candidates:
        team = team_candidates[0]
        team["teamCode"] = code

    return team, players


def _round(value, digits=1):
    return round(value, digits) if isinstance(value, (int, float)) else value


def normalize_player(raw: dict) -> dict:
    """Map raw FIBA field names onto stat sets for the frontend."""
    total_seconds = raw.get("totalPlayTimeInSeconds") or 0
    per_game_seconds = raw.get("playTimeInSecondsPerGame") or 0
    return {
        # identity
        "playerId": raw.get("playerId"),
        "firstName": raw.get("firstName"),
        "lastName": raw.get("lastName"),
        "uniformNumber": raw.get("uniformNumber"),
        "position": raw.get("positionCode") or raw.get("position"),
        "nationality": raw.get("nationality"),
        "dateOfBirth": raw.get("dateOfBirth"),
        "teamCode": raw.get("teamCode"),

        # per-game
        "gp": raw.get("totalGamesPlayed") or raw.get("gamesPlayed"),
        "mpg": _round(per_game_seconds / 60),
        "ppg": _round(raw.get("pointsPerGame")),
        "rpg": _round(raw.get("reboundsPerGame")),
        "apg": _round(raw.get("assistsPerGame")),
        "stl": _round(raw.get("stealsPerGame")),
        "blk": _round(raw.get("blocksPerGame")),
        "fgPct": _round(raw.get("fieldGoalsPercentage")),
        "tpPct": _round(raw.get("threePointsPercentage")),
        "ftPct": _round(raw.get("freeThrowsPercentage")),
        "tov": _round(raw.get("turnoversPerGame")),
        "pfpg": _round(raw.get("foulsPerGame")),
        "effpg": _round(raw.get("efficiencyPerGame")),
        "plusMinusPerGame": _round(raw.get("plusMinusPerGame")),
        # totals
        "totalMin": _round(total_seconds / 60),
        "totalPts": raw.get("totalPoints"),
        "totalReb": raw.get("totalRebounds"),
        "totalAst": raw.get("totalAssists"),
        "totalStl": raw.get("totalSteals"),
        "totalBlk": raw.get("totalBlocks"),
        "totalTov": raw.get("totalTurnovers"),
        "totalPf": raw.get("totalFouls"),
        "totalEff": raw.get("totalEfficiency"),
        "totalPlusMinus": raw.get("totalPlusMinus"),
        "fgm": raw.get("totalFieldGoalsMade"),
        "fga": raw.get("totalFieldGoalsAttempted"),
        "tpm": raw.get("totalThreePointsMade"),
        "tpa": raw.get("totalThreePointsAttempted"),
        "ftm": raw.get("totalFreeThrowsMade"),
        "fta": raw.get("totalFreeThrowsAttempted"),
    }


def _pct(made, attempted):
    return _round((made / attempted) * 100) if attempted else 0.0


def normalize_team(raw_team: dict | None, code: str, players: list[dict]) -> dict:
    """Combine FIBA's authoritative team profile (PPG/RPG/APG/record/rank)
    with stats derived by aggregating this team's own player rows, since
    FIBA's team-profile object doesn't expose STL/BLK/TO/FG%/etc directly."""
    profile = (raw_team or {}).get("profile", {}) if raw_team else {}
    wins = profile.get("totalGamesWon") or 0
    losses = profile.get("totalGamesLost") or 0
    gp = wins + losses

    total_stl = sum(p.get("totalStl") or 0 for p in players)
    total_blk = sum(p.get("totalBlk") or 0 for p in players)
    total_tov = sum(p.get("totalTov") or 0 for p in players)
    total_pf = sum(p.get("totalPf") or 0 for p in players)
    total_eff = sum(p.get("totalEff") or 0 for p in players)
    total_plus_minus = sum(p.get("totalPlusMinus") or 0 for p in players)
    fgm = sum(p.get("fgm") or 0 for p in players)
    fga = sum(p.get("fga") or 0 for p in players)
    tpm = sum(p.get("tpm") or 0 for p in players)
    tpa = sum(p.get("tpa") or 0 for p in players)
    ftm = sum(p.get("ftm") or 0 for p in players)
    fta = sum(p.get("fta") or 0 for p in players)

    return {
        # identity
        "teamId": (raw_team or {}).get("teamId"),
        "teamCode": code,
        "name": profile.get("name") or (raw_team or {}).get("shortName"),
        "finalRanking": profile.get("finalRanking"),
        "wins": wins,
        "losses": losses,
        # per-game
        "gp": gp,
        "ppg": profile.get("pointsPerGame"),
        "rpg": profile.get("reboundsPerGame"),
        "apg": profile.get("assistsPerGame"),
        "stl": _round(total_stl / gp) if gp else None,
        "blk": _round(total_blk / gp) if gp else None,
        "fgPct": _pct(fgm, fga),
        "tpPct": _pct(tpm, tpa),
        "ftPct": _pct(ftm, fta),
        "tov": _round(total_tov / gp) if gp else None,
        "pfpg": _round(total_pf / gp) if gp else None,
        "effpg": _round(total_eff / gp) if gp else None,
        "plusMinusPerGame": _round(total_plus_minus / gp) if gp else None,
        # totals
        "totalPts": sum(p.get("totalPts") or 0 for p in players),
        "totalReb": sum(p.get("totalReb") or 0 for p in players),
        "totalAst": sum(p.get("totalAst") or 0 for p in players),
        "totalStl": total_stl,
        "totalBlk": total_blk,
        "totalTov": total_tov,
        "totalPf": total_pf,
        "totalEff": total_eff,
        "totalPlusMinus": total_plus_minus,
        "fgm": fgm,
        "fga": fga,
        "tpm": tpm,
        "tpa": tpa,
        "ftm": ftm,
        "fta": fta,
    }


def scrape_team(slug: str, code: str) -> tuple[dict, list[dict]]:
    raw_team, raw_players = scrape_team_raw(slug, code)
    players = [normalize_player(p) for p in raw_players]
    team = normalize_team(raw_team, code, players)
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
        print(f"--- Team stats for {slug} ---")
        print(json.dumps(team, indent=2))
        print(f"\n--- {len(players)} players found ---")
        for p in players[:5]:
            print(f"  {p.get('firstName')} {p.get('lastName')}: "
                  f"{p.get('ppg')} PPG, {p.get('rpg')} RPG, {p.get('apg')} APG, "
                  f"{p.get('stl')} STL, {p.get('blk')} BLK, {p.get('fgPct')} FG%")
        if len(players) > 5:
            print(f"  ... and {len(players) - 5} more")
        return

    all_teams = []
    all_players = []
    for slug, code in TEAM_SLUGS.items():
        print(f"Scraping {slug} ({code})...")
        try:
            team, players = scrape_team(slug, code)
            all_teams.append(team)
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
