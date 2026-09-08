package com.ball.nba_fantasy.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PlayerService {
    private final PlayerRepository playerRepository;

    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    /**
     * Returns players matching the supplied filters. Blank/null filters are
     * ignored. Never returns more than {@code maxResults} rows, so an unfiltered
     * request cannot load an unbounded amount of data. Filtering happens in the
     * database.
     */
    public List<Player> search(String team, String name, String position, String year, int maxResults) {
        team = blankToNull(team);
        name = blankToNull(name);
        position = blankToNull(position);
        year = blankToNull(year);
        Pageable page = PageRequest.of(0, maxResults);

        if (team != null && position != null) {
            return year != null
                    ? playerRepository.findByTeamAndPositionAndYear(team, position, year, page)
                    : playerRepository.findByTeamAndPosition(team, position, page);
        }
        if (team != null) {
            return year != null
                    ? playerRepository.findByTeamAndYear(team, year, page)
                    : playerRepository.findByTeam(team, page);
        }
        if (name != null) {
            return year != null
                    ? playerRepository.findByPlayerContainingIgnoreCaseAndYear(name, year, page)
                    : playerRepository.findByPlayerContainingIgnoreCase(name, page);
        }
        if (position != null) {
            return year != null
                    ? playerRepository.findByPositionContainingIgnoreCaseAndYear(position, year, page)
                    : playerRepository.findByPositionContainingIgnoreCase(position, page);
        }
        if (year != null) {
            return playerRepository.findByYear(year, page);
        }
        return playerRepository.findAll(page).getContent();
    }

    private static String blankToNull(String value) {
        return (value == null || value.isBlank()) ? null : value;
    }
}
