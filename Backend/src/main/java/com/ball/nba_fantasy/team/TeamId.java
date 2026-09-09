package com.ball.nba_fantasy.team;

import java.io.Serializable;
import java.util.Objects;

public class TeamId implements Serializable {
    private String teamId;
    private String year;

    public TeamId() {
    }

    public TeamId(String teamId, String year) {
        this.teamId = teamId;
        this.year = year;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof com.ball.nba_fantasy.team.TeamId)) return false;
        com.ball.nba_fantasy.team.TeamId that = (com.ball.nba_fantasy.team.TeamId) o;
        return Objects.equals(teamId, that.teamId) && Objects.equals(year, that.year);
    }

    @Override
    public int hashCode() {
        return Objects.hash(teamId, year);
    }
}
