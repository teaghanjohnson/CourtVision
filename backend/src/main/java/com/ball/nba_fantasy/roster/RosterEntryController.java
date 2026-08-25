package com.ball.nba_fantasy.roster;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="api/v1/roster")
public class RosterEntryController {

    private final RosterEntryService rosterEntryService;

    @Autowired
    public RosterEntryController(RosterEntryService rosterEntryService) {
        this.rosterEntryService = rosterEntryService;
    }

    @GetMapping
    public List<RosterEntry> getRoster(
            @RequestParam String team,
            @RequestParam String year) {
        return rosterEntryService.getRoster(team, year);
    }

    @GetMapping("/detail")
    public PlayerDetailResponse getPlayerDetail(
            @RequestParam String team,
            @RequestParam String nbaPlayerId,
            @RequestParam String year) {
        return rosterEntryService.getPlayerDetail(nbaPlayerId, team, year);
    }
}
