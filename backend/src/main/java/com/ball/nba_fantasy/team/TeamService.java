package com.ball.nba_fantasy.team;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class TeamService {
    private final TeamRepository teamRepository;

    @Autowired
    public TeamService(TeamRepository teamRepository) {this.teamRepository = teamRepository;}

    public List<Team> getTeams() {return teamRepository.findAll();}

    public List<Team> getTeamsByYear(String year) {
        return teamRepository.findAll().stream()
                .filter(team -> year.equals(team.getYear()))
                .collect(Collectors.toList());
    }

    public List<Team> getTeamsByAbbrevAndYear(String teamAbbrev, String year) {
        return teamRepository.findAll().stream()
                .filter(t -> teamAbbrev.equals(t.getTeam()) && (year == null || year.equals(t.getYear())))
                .collect(Collectors.toList());
    }
}
