package com.ball.nba_fantasy.roster;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;

import java.time.LocalDate;

@Entity
@Table(name="roster_entries")
@IdClass(RosterEntryId.class)
public class RosterEntry {

    @Id
    private String nbaPlayerId;
    @Id
    private String team;
    @Id
    private String year;

    private String player;
    private String nickname;
    private String playerSlug;
    private String num;
    private String position;
    private String height;
    private Integer weight;
    private LocalDate birthDate;
    private double age;
    private String exp;
    private String school;
    private String howAcquired;

    public RosterEntry() {
    }

    public RosterEntry(String nbaPlayerId, String team, String year, String player, String nickname,
                       String playerSlug, String num, String position, String height, Integer weight,
                       LocalDate birthDate, double age, String exp, String school, String howAcquired) {
        this.nbaPlayerId = nbaPlayerId;
        this.team = team;
        this.year = year;
        this.player = player;
        this.nickname = nickname;
        this.playerSlug = playerSlug;
        this.num = num;
        this.position = position;
        this.height = height;
        this.weight = weight;
        this.birthDate = birthDate;
        this.age = age;
        this.exp = exp;
        this.school = school;
        this.howAcquired = howAcquired;
    }

    public String getNbaPlayerId() { return nbaPlayerId; }
    public String getTeam() { return team; }
    public String getYear() { return year; }
    public String getPlayer() { return player; }
    public String getNickname() { return nickname; }
    public String getPlayerSlug() { return playerSlug; }
    public String getNum() { return num; }
    public String getPosition() { return position; }
    public String getHeight() { return height; }
    public Integer getWeight() { return weight; }
    public LocalDate getBirthDate() { return birthDate; }
    public double getAge() { return age; }
    public String getExp() { return exp; }
    public String getSchool() { return school; }
    public String getHowAcquired() { return howAcquired; }

    public void setNbaPlayerId(String nbaPlayerId) {
        this.nbaPlayerId = nbaPlayerId;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public void setPlayer(String player) {
        this.player = player;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setPlayerSlug(String playerSlug) {
        this.playerSlug = playerSlug;
    }

    public void setNum(String num) {
        this.num = num;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public void setHeight(String height) {
        this.height = height;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public void setAge(double age) {
        this.age = age;
    }

    public void setExp(String exp) {
        this.exp = exp;
    }

    public void setSchool(String school) {
        this.school = school;
    }

    public void setHowAcquired(String howAcquired) {
        this.howAcquired = howAcquired;
    }

    @Override
    public String toString() {
        return player + " #" + num + " (" + position + ", " + team + ", " + year + ")";
    }
}