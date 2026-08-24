package com.ball.nba_fantasy.team;

import com.ball.nba_fantasy.player.Player;
import com.ball.nba_fantasy.player.PlayerId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Team, TeamId> {

}
