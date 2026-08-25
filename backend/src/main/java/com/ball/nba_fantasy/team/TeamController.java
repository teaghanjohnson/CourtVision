package com.ball.nba_fantasy.team;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="api/v1/team")
public class TeamController {

    private final TeamService teamService;

    @Autowired
    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping
    public ResponseEntity<?> getTeam(
            @RequestParam(required = false) String team,
            @RequestParam(required = false) String year) {
        if (team != null && year != null) {
            return teamService.getTeamsByAbbrevAndYear(team, year).stream()
                    .findFirst()
                    .<ResponseEntity<?>>map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } else if (team != null) {
            return ResponseEntity.ok(teamService.getTeamsByAbbrevAndYear(team, null));
        } else if (year != null) {
            return ResponseEntity.ok(teamService.getTeamsByYear(year));
        } else {
            return ResponseEntity.ok(teamService.getTeams());
        }
    }
}
