package com.ball.nba_fantasy.roster;

import com.ball.nba_fantasy.player.Player;
import com.ball.nba_fantasy.player.PlayerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class RosterEntryService {
    private static final Logger log = LoggerFactory.getLogger(RosterEntryService.class);

    private final RosterEntryRepository rosterEntryRepository;
    private final PlayerRepository playerRepository;

    @Autowired
    public RosterEntryService(RosterEntryRepository rosterEntryRepository, PlayerRepository playerRepository) {
        this.rosterEntryRepository = rosterEntryRepository;
        this.playerRepository = playerRepository;
    }

    public List<RosterEntry> getRoster(String team, String year) {
        return rosterEntryRepository.findAll().stream()
                .filter(entry -> team.equals(entry.getTeam()) && year.equals(entry.getYear()))
                .collect(Collectors.toList());
    }

    public PlayerDetailResponse getPlayerDetail(String nbaPlayerId, String team, String year) {
        RosterEntry bio = rosterEntryRepository.findAll().stream()
                .filter(entry -> nbaPlayerId.equals(entry.getNbaPlayerId())
                        && team.equals(entry.getTeam())
                        && year.equals(entry.getYear()))
                .findFirst()
                .orElse(null);

        if (bio == null) {
            log.warn("No roster entry found for nbaPlayerId={}, team={}, year={}", nbaPlayerId, team, year);
            return new PlayerDetailResponse(null, Collections.emptyList());
        }

        String normalizedTarget = normalizeName(bio.getPlayer());

        List<Player> stats = playerRepository.findAll().stream()
                .filter(p -> normalizedTarget.equals(normalizeName(p.getPlayer())) && team.equals(p.getTeam()))
                .collect(Collectors.toList());

        if (stats.isEmpty()) {
            log.warn("No Player stats matched for '{}' ({}) on team {}", bio.getPlayer(), normalizedTarget, team);
        }

        return new PlayerDetailResponse(bio, stats);
    }

    private String normalizeName(String name) {
        if (name == null) {
            return "";
        }
        String normalized = name.toLowerCase()
                .replace(".", "")
                .replace("'", "");
        normalized = normalized.replaceAll("\\b(jr|sr|ii|iii|iv)\\b", "");
        return normalized.trim().replaceAll("\\s+", " ");
    }
}
