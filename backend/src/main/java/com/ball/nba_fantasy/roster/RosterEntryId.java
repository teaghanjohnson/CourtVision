package com.ball.nba_fantasy.roster;


import java.io.Serializable;
import java.util.Objects;

public class RosterEntryId implements Serializable {
    private String nbaPlayerId;
    private String team;
    private String year;

    public RosterEntryId() {
    }

    public RosterEntryId(String nbaPlayerId, String team, String year) {
        this.nbaPlayerId = nbaPlayerId;
        this.team = team;
        this.year = year;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof com.ball.nba_fantasy.roster.RosterEntryId)) return false;
        com.ball.nba_fantasy.roster.RosterEntryId that = (com.ball.nba_fantasy.roster.RosterEntryId) o;
        return Objects.equals(nbaPlayerId, that.nbaPlayerId) && Objects.equals(year, that.year) && Objects.equals(team, that.team);
    }

    @Override
    public int hashCode() {
        return Objects.hash(nbaPlayerId, year);
    }
}


