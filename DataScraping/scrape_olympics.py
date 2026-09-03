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
  """
  extract every self.__next_f.push([...]) argument out of the HTML
  and stich the text chunks together into one big string to search
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
  Find every place 'marker'appears, then brace-match backward/forward
  from there to isolare and parse the enclosing JSON object
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

def scrape_team(slug: str, code: str) -> tuple[dict | None, list[dict]]:
    """Fetch one team's page and return (team_profile_or_None, list_of_players)."""

    url = BASE_URL.format(slug=slug)
    resp = requests.get(url, headers=HEADERS, timeout=20)
    resp.raise_for_status()
    flight = extract_flight_text(resp.text)
 
    team_candidates = extract_json_objects(flight, '"profile":{"teamId"')
    player_candidates = extract_json_objects(flight, '"playerId":')

    # Dedupe players by playerID
    players_by_id: dict[int, dict] = {}
    for p in player_candidates:
      pid = p.get("playerId")
      if pid is not None:
        players_by_id[pid] = p # last one wins

    players = list(players_by_id.values())
    for p in players:
      p["teamCode"] = code # connect to frontend abbrev

    team = None
    if team_candidates:
      team = team_candidates[0]
      team["teamCode"] = code

    return team,players

 