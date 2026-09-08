package com.ball.nba_fantasy.player;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * All finders take a {@link Pageable} so callers can cap the row count and the
 * database does the filtering - the whole table is never pulled into memory.
 */
@Repository
public interface PlayerRepository extends JpaRepository<Player, PlayerId> {

    List<Player> findByTeam(String team, Pageable pageable);

    List<Player> findByTeamAndYear(String team, String year, Pageable pageable);

    List<Player> findByTeamAndPosition(String team, String position, Pageable pageable);

    List<Player> findByTeamAndPositionAndYear(String team, String position, String year, Pageable pageable);

    List<Player> findByPlayerContainingIgnoreCase(String name, Pageable pageable);

    List<Player> findByPlayerContainingIgnoreCaseAndYear(String name, String year, Pageable pageable);

    List<Player> findByPositionContainingIgnoreCase(String position, Pageable pageable);

    List<Player> findByPositionContainingIgnoreCaseAndYear(String position, String year, Pageable pageable);

    List<Player> findByYear(String year, Pageable pageable);

    List<Player> findByPlayerIdAndTeam(String playerId, String team);
}
