package com.ball.nba_fantasy.team;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;

@Entity
@Table(name="team_season_stats")
@IdClass(TeamId.class)
public class Team {
    @Id
    @Column
    private String teamId;
    private String teamName;
    @Id
    private String year;
    private String team;

    private int gp;
    private int w;
    private int l;
    private double min;
    private double fgm;
    private double fga;
    private double fg3m;
    private double fg3a;
    private double ftm;
    private double fta;
    private double oreb;
    private double dreb;
    private double reb;
    private double ast;
    private double tov;
    private double stl;
    private double blk;
    private double blka;
    private double pf;
    private double pfd;
    private double pts;
    private double plusMinus;
    private double offRating;
    private double defRating;
    private double netRating;
    private double astTo;
    private double astRatio;
    private double pace;
    private double pacePer40;
    private int poss;
    private double pie;
    private double oppFgm;
    private double oppFga;
    private double oppFg3m;
    private double oppFg3a;
    private double oppFtm;
    private double oppFta;
    private double oppOreb;
    private double oppDreb;
    private double oppReb;
    private double oppAst;
    private double oppTov;
    private double oppStl;
    private double oppBlk;
    private double oppBlka;
    private double oppPf;
    private double oppPfd;
    private double oppPts;

    private Double winPct;
    private Double fgPct;
    private Double fg3Pct;
    private Double ftPct;
    private Double astPct;
    private Double orebPct;
    private Double drebPct;
    private Double rebPct;
    private Double tmTovPct;
    private Double efgPct;
    private Double tsPct;
    private Double oppFgPct;
    private Double oppFg3Pct;
    private Double oppFtPct;

    public Team() {
    }

    public Team(String teamId, String teamName, String year, String team,
                int gp, int w, int l, double min,
                double fgm, double fga, double fg3m, double fg3a, double ftm, double fta,
                double oreb, double dreb, double reb, double ast, double tov, double stl,
                double blk, double blka, double pf, double pfd, double pts, double plusMinus,
                double offRating, double defRating, double netRating, double astTo, double astRatio,
                double pace, double pacePer40, int poss, double pie,
                double oppFgm, double oppFga, double oppFg3m, double oppFg3a, double oppFtm, double oppFta,
                double oppOreb, double oppDreb, double oppReb, double oppAst, double oppTov, double oppStl,
                double oppBlk, double oppBlka, double oppPf, double oppPfd, double oppPts,
                Double winPct, Double fgPct, Double fg3Pct, Double ftPct, Double astPct,
                Double orebPct, Double drebPct, Double rebPct, Double tmTovPct, Double efgPct, Double tsPct,
                Double oppFgPct, Double oppFg3Pct, Double oppFtPct) {
        this.teamId = teamId;
        this.teamName = teamName;
        this.year = year;
        this.team = team;
        this.gp = gp;
        this.w = w;
        this.l = l;
        this.min = min;
        this.fgm = fgm;
        this.fga = fga;
        this.fg3m = fg3m;
        this.fg3a = fg3a;
        this.ftm = ftm;
        this.fta = fta;
        this.oreb = oreb;
        this.dreb = dreb;
        this.reb = reb;
        this.ast = ast;
        this.tov = tov;
        this.stl = stl;
        this.blk = blk;
        this.blka = blka;
        this.pf = pf;
        this.pfd = pfd;
        this.pts = pts;
        this.plusMinus = plusMinus;
        this.offRating = offRating;
        this.defRating = defRating;
        this.netRating = netRating;
        this.astTo = astTo;
        this.astRatio = astRatio;
        this.pace = pace;
        this.pacePer40 = pacePer40;
        this.poss = poss;
        this.pie = pie;
        this.oppFgm = oppFgm;
        this.oppFga = oppFga;
        this.oppFg3m = oppFg3m;
        this.oppFg3a = oppFg3a;
        this.oppFtm = oppFtm;
        this.oppFta = oppFta;
        this.oppOreb = oppOreb;
        this.oppDreb = oppDreb;
        this.oppReb = oppReb;
        this.oppAst = oppAst;
        this.oppTov = oppTov;
        this.oppStl = oppStl;
        this.oppBlk = oppBlk;
        this.oppBlka = oppBlka;
        this.oppPf = oppPf;
        this.oppPfd = oppPfd;
        this.oppPts = oppPts;
        this.winPct = winPct;
        this.fgPct = fgPct;
        this.fg3Pct = fg3Pct;
        this.ftPct = ftPct;
        this.astPct = astPct;
        this.orebPct = orebPct;
        this.drebPct = drebPct;
        this.rebPct = rebPct;
        this.tmTovPct = tmTovPct;
        this.efgPct = efgPct;
        this.tsPct = tsPct;
        this.oppFgPct = oppFgPct;
        this.oppFg3Pct = oppFg3Pct;
        this.oppFtPct = oppFtPct;
    }

    public String getTeamId() { return teamId; }
    public String getTeamName() { return teamName; }
    public String getYear() { return year; }
    public String getTeam() { return team; }
    public int getGp() { return gp; }
    public int getW() { return w; }
    public int getL() { return l; }
    public double getMin() { return min; }
    public double getFgm() { return fgm; }
    public double getFga() { return fga; }
    public double getFg3m() { return fg3m; }
    public double getFg3a() { return fg3a; }
    public double getFtm() { return ftm; }
    public double getFta() { return fta; }
    public double getOreb() { return oreb; }
    public double getDreb() { return dreb; }
    public double getReb() { return reb; }
    public double getAst() { return ast; }
    public double getTov() { return tov; }
    public double getStl() { return stl; }
    public double getBlk() { return blk; }
    public double getBlka() { return blka; }
    public double getPf() { return pf; }
    public double getPfd() { return pfd; }
    public double getPts() { return pts; }
    public double getPlusMinus() { return plusMinus; }
    public double getOffRating() { return offRating; }
    public double getDefRating() { return defRating; }
    public double getNetRating() { return netRating; }
    public double getAstTo() { return astTo; }
    public double getAstRatio() { return astRatio; }
    public double getPace() { return pace; }
    public double getPacePer40() { return pacePer40; }
    public int getPoss() { return poss; }
    public double getPie() { return pie; }
    public double getOppFgm() { return oppFgm; }
    public double getOppFga() { return oppFga; }
    public double getOppFg3m() { return oppFg3m; }
    public double getOppFg3a() { return oppFg3a; }
    public double getOppFtm() { return oppFtm; }
    public double getOppFta() { return oppFta; }
    public double getOppOreb() { return oppOreb; }
    public double getOppDreb() { return oppDreb; }
    public double getOppReb() { return oppReb; }
    public double getOppAst() { return oppAst; }
    public double getOppTov() { return oppTov; }
    public double getOppStl() { return oppStl; }
    public double getOppBlk() { return oppBlk; }
    public double getOppBlka() { return oppBlka; }
    public double getOppPf() { return oppPf; }
    public double getOppPfd() { return oppPfd; }
    public double getOppPts() { return oppPts; }
    public Double getWinPct() { return winPct; }
    public Double getFgPct() { return fgPct; }
    public Double getFg3Pct() { return fg3Pct; }
    public Double getFtPct() { return ftPct; }
    public Double getAstPct() { return astPct; }
    public Double getOrebPct() { return orebPct; }
    public Double getDrebPct() { return drebPct; }
    public Double getRebPct() { return rebPct; }
    public Double getTmTovPct() { return tmTovPct; }
    public Double getEfgPct() { return efgPct; }
    public Double getTsPct() { return tsPct; }
    public Double getOppFgPct() { return oppFgPct; }
    public Double getOppFg3Pct() { return oppFg3Pct; }
    public Double getOppFtPct() { return oppFtPct; }

    @Override
    public String toString() {
        return teamName + " (" + team + ", " + year + "): " +
                pts + " PPG, " + reb + " RPG, " + ast + " APG";
    }

    public void setTeamId(String teamId) {
        this.teamId = teamId;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public void setGp(int gp) {
        this.gp = gp;
    }

    public void setW(int w) {
        this.w = w;
    }

    public void setL(int l) {
        this.l = l;
    }

    public void setMin(double min) {
        this.min = min;
    }

    public void setFgm(double fgm) {
        this.fgm = fgm;
    }

    public void setFga(double fga) {
        this.fga = fga;
    }

    public void setFg3m(double fg3m) {
        this.fg3m = fg3m;
    }

    public void setFg3a(double fg3a) {
        this.fg3a = fg3a;
    }

    public void setFtm(double ftm) {
        this.ftm = ftm;
    }

    public void setFta(double fta) {
        this.fta = fta;
    }

    public void setOreb(double oreb) {
        this.oreb = oreb;
    }

    public void setDreb(double dreb) {
        this.dreb = dreb;
    }

    public void setReb(double reb) {
        this.reb = reb;
    }

    public void setAst(double ast) {
        this.ast = ast;
    }

    public void setTov(double tov) {
        this.tov = tov;
    }

    public void setStl(double stl) {
        this.stl = stl;
    }

    public void setBlk(double blk) {
        this.blk = blk;
    }

    public void setBlka(double blka) {
        this.blka = blka;
    }

    public void setPf(double pf) {
        this.pf = pf;
    }

    public void setPfd(double pfd) {
        this.pfd = pfd;
    }

    public void setPts(double pts) {
        this.pts = pts;
    }

    public void setPlusMinus(double plusMinus) {
        this.plusMinus = plusMinus;
    }

    public void setOffRating(double offRating) {
        this.offRating = offRating;
    }

    public void setDefRating(double defRating) {
        this.defRating = defRating;
    }

    public void setNetRating(double netRating) {
        this.netRating = netRating;
    }

    public void setAstTo(double astTo) {
        this.astTo = astTo;
    }

    public void setAstRatio(double astRatio) {
        this.astRatio = astRatio;
    }

    public void setPace(double pace) {
        this.pace = pace;
    }

    public void setPacePer40(double pacePer40) {
        this.pacePer40 = pacePer40;
    }

    public void setPoss(int poss) {
        this.poss = poss;
    }

    public void setPie(double pie) {
        this.pie = pie;
    }

    public void setOppFgm(double oppFgm) {
        this.oppFgm = oppFgm;
    }

    public void setOppFga(double oppFga) {
        this.oppFga = oppFga;
    }

    public void setOppFg3m(double oppFg3m) {
        this.oppFg3m = oppFg3m;
    }

    public void setOppFg3a(double oppFg3a) {
        this.oppFg3a = oppFg3a;
    }

    public void setOppFtm(double oppFtm) {
        this.oppFtm = oppFtm;
    }

    public void setOppFta(double oppFta) {
        this.oppFta = oppFta;
    }

    public void setOppOreb(double oppOreb) {
        this.oppOreb = oppOreb;
    }

    public void setOppDreb(double oppDreb) {
        this.oppDreb = oppDreb;
    }

    public void setOppReb(double oppReb) {
        this.oppReb = oppReb;
    }

    public void setOppAst(double oppAst) {
        this.oppAst = oppAst;
    }

    public void setOppTov(double oppTov) {
        this.oppTov = oppTov;
    }

    public void setOppStl(double oppStl) {
        this.oppStl = oppStl;
    }

    public void setOppBlk(double oppBlk) {
        this.oppBlk = oppBlk;
    }

    public void setOppBlka(double oppBlka) {
        this.oppBlka = oppBlka;
    }

    public void setOppPf(double oppPf) {
        this.oppPf = oppPf;
    }

    public void setOppPfd(double oppPfd) {
        this.oppPfd = oppPfd;
    }

    public void setOppPts(double oppPts) {
        this.oppPts = oppPts;
    }

    public void setWinPct(Double winPct) {
        this.winPct = winPct;
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

    public void setAstPct(Double astPct) {
        this.astPct = astPct;
    }

    public void setOrebPct(Double orebPct) {
        this.orebPct = orebPct;
    }

    public void setDrebPct(Double drebPct) {
        this.drebPct = drebPct;
    }

    public void setRebPct(Double rebPct) {
        this.rebPct = rebPct;
    }

    public void setTmTovPct(Double tmTovPct) {
        this.tmTovPct = tmTovPct;
    }

    public void setEfgPct(Double efgPct) {
        this.efgPct = efgPct;
    }

    public void setTsPct(Double tsPct) {
        this.tsPct = tsPct;
    }

    public void setOppFgPct(Double oppFgPct) {
        this.oppFgPct = oppFgPct;
    }

    public void setOppFg3Pct(Double oppFg3Pct) {
        this.oppFg3Pct = oppFg3Pct;
    }

    public void setOppFtPct(Double oppFtPct) {
        this.oppFtPct = oppFtPct;
    }
}

