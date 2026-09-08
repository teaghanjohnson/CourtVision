package com.ball.nba_fantasy.roster;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RosterEntryRepository extends JpaRepository<RosterEntry, RosterEntryId> {

    List<RosterEntry> findByTeamAndYear(String team, String year);

    Optional<RosterEntry> findByPlayerIdAndTeamAndYear(String playerId, String team, String year);
}
