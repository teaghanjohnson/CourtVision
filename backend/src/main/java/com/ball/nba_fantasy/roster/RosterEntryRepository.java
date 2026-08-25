package com.ball.nba_fantasy.roster;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RosterEntryRepository extends JpaRepository<RosterEntry, RosterEntryId> {
}
