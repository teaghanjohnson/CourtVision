package com.ball.nba_fantasy.team;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class TeamService {

    /** Hard ceiling on rows returned by a single request. */
    private static final int MAX_RESULTS = 10_000;

    private final TeamRepository teamRepository;

    @Autowired
    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    public List<Team> search(String team, String year) {
        team = blankToNull(team);
        year = blankToNull(year);
        Pageable page = PageRequest.of(0, MAX_RESULTS);

        if (team != null && year != null) {
            return teamRepository.findByTeamAndYear(team, year, page);
        }
        if (team != null) {
            return teamRepository.findByTeam(team, page);
        }
        if (year != null) {
            return teamRepository.findByYear(year, page);
        }
        return teamRepository.findAll(page).getContent();
    }

    public Optional<Team> getTeam(String team, String year) {
        return teamRepository
                .findByTeamAndYear(blankToNull(team), blankToNull(year), PageRequest.of(0, 1))
                .stream()
                .findFirst();
    }

    private static String blankToNull(String value) {
        return (value == null || value.isBlank()) ? null : value;
    }
}
