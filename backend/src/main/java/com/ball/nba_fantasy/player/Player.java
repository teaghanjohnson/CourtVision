package com.ball.nba_fantasy.player;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="player_season_stats")
public class Player {
    @Id
    @Column
    private String playerId;
    private String player;
    private String year;
    private String team;
    private String position;

    private double ppg;
    private double orpg;
    private double rpg;
    private double apg;
    private double spg;
    private double bpg;
    private double topg;
    private double mpg;
    private double fpg;

    private Double fgPct;
    private Double fg3Pct;
    private Double ftPct;

    private int pts;
    private int reb;
    private int ast;
    private int stl;
    private int blk;
    private int tov;
    private int fgm;
    private int fga;
    private int fg3m;
    private int fg3a;
    private int ftm;
    private int fta;
    private int mins;
    private int fls;
    private int g;
    private int gs;
    private int td;

    public Player() {
    }

    public Player(String playerId, String player, String year, String team, String position,
                  double ppg, double orpg, double rpg, double apg, double spg,
                  double bpg, double topg, double mpg, double fpg,
                  Double fgPct, Double fg3Pct, Double ftPct,
                  int pts, int reb, int ast, int stl, int blk, int tov,
                  int fgm, int fga, int fg3m, int fg3a, int ftm, int fta,
                  int mins, int fls, int g, int gs, int td) {
        this.playerId = playerId;
        this.player = player;
        this.year = year;
        this.team = team;
        this.position = position;
        this.ppg = ppg;
        this.orpg = orpg;
        this.rpg = rpg;
        this.apg = apg;
        this.spg = spg;
        this.bpg = bpg;
        this.topg = topg;
        this.mpg = mpg;
        this.fpg = fpg;
        this.fgPct = fgPct;
        this.fg3Pct = fg3Pct;
        this.ftPct = ftPct;
        this.pts = pts;
        this.reb = reb;
        this.ast = ast;
        this.stl = stl;
        this.blk = blk;
        this.tov = tov;
        this.fgm = fgm;
        this.fga = fga;
        this.fg3m = fg3m;
        this.fg3a = fg3a;
        this.ftm = ftm;
        this.fta = fta;
        this.mins = mins;
        this.fls = fls;
        this.g = g;
        this.gs = gs;
        this.td = td;
    }

    public String getPlayerId() { return playerId; }
    public String getPlayer() { return player; }
    public String getYear() { return year; }
    public String getTeam() { return team; }
    public String getPosition() { return position; }
    public double getPpg() { return ppg; }
    public double getOrpg() { return orpg; }
    public double getRpg() { return rpg; }
    public double getApg() { return apg; }
    public double getSpg() { return spg; }
    public double getBpg() { return bpg; }
    public double getTopg() { return topg; }
    public double getMpg() { return mpg; }
    public double getFpg() { return fpg; }
    public Double getFgPct() { return fgPct; }
    public Double getFg3Pct() { return fg3Pct; }
    public Double getFtPct() { return ftPct; }
    public int getPts() { return pts; }
    public int getReb() { return reb; }
    public int getAst() { return ast; }
    public int getStl() { return stl; }
    public int getBlk() { return blk; }
    public int getTov() { return tov; }
    public int getFgm() { return fgm; }
    public int getFga() { return fga; }
    public int getFg3m() { return fg3m; }
    public int getFg3a() { return fg3a; }
    public int getFtm() { return ftm; }
    public int getFta() { return fta; }
    public int getMins() { return mins; }
    public int getFls() { return fls; }
    public int getG() { return g; }
    public int getGs() { return gs; }
    public int getTd() { return td; }

    @Override
    public String toString() {
        return player + " (" + position + ", " + team + ", " + year + "): " +
                ppg + " PPG, " + rpg + " RPG, " + apg + " APG";
    }

    public void setPlayerId(String playerId) {
        this.playerId = playerId;
    }

    public void setPlayer(String player) {
        this.player = player;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public void setPpg(double ppg) {
        this.ppg = ppg;
    }

    public void setOrpg(double orpg) {
        this.orpg = orpg;
    }

    public void setRpg(double rpg) {
        this.rpg = rpg;
    }

    public void setApg(double apg) {
        this.apg = apg;
    }

    public void setSpg(double spg) {
        this.spg = spg;
    }

    public void setBpg(double bpg) {
        this.bpg = bpg;
    }

    public void setTopg(double topg) {
        this.topg = topg;
    }

    public void setMpg(double mpg) {
        this.mpg = mpg;
    }

    public void setFpg(double fpg) {
        this.fpg = fpg;
    }

    public void setFgPct(Double fgPct) {
        this.fgPct = fgPct;
    }

    public void setFg3Pct(Double fg3Pct) {
        this.fg3Pct = fg3Pct;
    }

    public void setFtPct(Double ftPct) {
        this.ftPct = ftPct;
    }

    public void setPts(int pts) {
        this.pts = pts;
    }

    public void setReb(int reb) {
        this.reb = reb;
    }

    public void setAst(int ast) {
        this.ast = ast;
    }

    public void setStl(int stl) {
        this.stl = stl;
    }

    public void setBlk(int blk) {
        this.blk = blk;
    }

    public void setTov(int tov) {
        this.tov = tov;
    }

    public void setFgm(int fgm) {
        this.fgm = fgm;
    }

    public void setFga(int fga) {
        this.fga = fga;
    }

    public void setFg3m(int fg3m) {
        this.fg3m = fg3m;
    }

    public void setFg3a(int fg3a) {
        this.fg3a = fg3a;
    }

    public void setFtm(int ftm) {
        this.ftm = ftm;
    }

    public void setFta(int fta) {
        this.fta = fta;
    }

    public void setMins(int mins) {
        this.mins = mins;
    }

    public void setFls(int fls) {
        this.fls = fls;
    }

    public void setG(int g) {
        this.g = g;
    }

    public void setGs(int gs) {
        this.gs = gs;
    }

    public void setTd(int td) {
        this.td = td;
    }
}
