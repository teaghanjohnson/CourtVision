package com.ball.nba_fantasy.player;

import java.io.Serializable;
import java.util.Objects;

public class PlayerId implements Serializable {
    private String playerId;
    private String year;

    public PlayerId() {
    }

    public PlayerId(String playerId, String year) {
        this.playerId = playerId;
        this.year = year;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PlayerId)) return false;
        PlayerId that = (PlayerId) o;
        return Objects.equals(playerId, that.playerId) && Objects.equals(year, that.year);
    }

    @Override
    public int hashCode() {
        return Objects.hash(playerId, year);
    }
}
