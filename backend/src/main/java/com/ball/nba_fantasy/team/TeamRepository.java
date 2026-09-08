package com.ball.nba_fantasy.team;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamRepository extends JpaRepository<Team, TeamId> {

    List<Team> findByTeam(String team, Pageable pageable);

    List<Team> findByTeamAndYear(String team, String year, Pageable pageable);

    List<Team> findByYear(String year, Pageable pageable);
}
