package com.ball.nba_fantasy.roster;

import com.ball.nba_fantasy.player.Player;
import com.ball.nba_fantasy.player.PlayerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

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
        return rosterEntryRepository.findByTeamAndYear(team, year);
    }

    public PlayerDetailResponse getPlayerDetail(String playerId, String team, String year) {
        RosterEntry bio = rosterEntryRepository
                .findByPlayerIdAndTeamAndYear(playerId, team, year)
                .orElse(null);

        if (bio == null) {
            log.warn("No roster entry found for playerId={}, team={}, year={}", playerId, team, year);
            return new PlayerDetailResponse(null, Collections.emptyList());
        }

        // roster and player stats now share the same basketball-reference player ID
        // scheme, so this is an exact match - no more name-based fuzzy matching
        List<Player> stats = playerRepository.findByPlayerIdAndTeam(playerId, team);

        if (stats.isEmpty()) {
            log.warn("No Player stats matched for playerId={} on team {}", playerId, team);
        }

        return new PlayerDetailResponse(bio, stats);
    }
}
