package com.ball.nba_fantasy.roster;

import com.ball.nba_fantasy.player.Player;

import java.util.List;

public class PlayerDetailResponse {
    private RosterEntry bio;
    private List<Player> stats;

    public PlayerDetailResponse() {
    }

    public PlayerDetailResponse(RosterEntry bio, List<Player> stats) {
        this.bio = bio;
        this.stats = stats;
    }

    public RosterEntry getBio() { return bio; }
    public List<Player> getStats() { return stats; }

    public void setBio(RosterEntry bio) { this.bio = bio; }
    public void setStats(List<Player> stats) { this.stats = stats; }
}
