package com.ball.nba_fantasy.player;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class PlayerService {
    private final PlayerRepository playerRepository;

    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository =  playerRepository;
    }

    public List<Player> getPlayers(){
        return playerRepository.findAll();
    }

    public List<Player> getPlayersFromTeam(String teamName) {
        return playerRepository.findAll().stream()
                .filter(player->teamName.equals(player.getTeam())).collect(Collectors.toList());
    }

    public List<Player> getPlayersByName(String searchText) {
        return playerRepository.findAll().stream()
                .filter(player -> player.getPlayer().toLowerCase().contains(searchText.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Player> getPlayerByPos(String searchText) {
        return playerRepository.findAll().stream()
                .filter(player ->
                        player.getPosition().toLowerCase().contains(searchText.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Player> getPlayersByTeamAndPosition(String team, String position) {
        return playerRepository.findAll().stream()
                .filter(player -> team.equals(player.getTeam()) && position.equals(player.getPlayer()))
                .collect(Collectors.toList());
    }

    public List<Player> getPlayersByYear(String year) {}

    public List<Player> getPlayersByTeamAndYear(String year, String team){}

    public List<Player> getPlayersBy

    public Player addPlayer(Player player) {
        playerRepository.save(player);
        return player;
    }

    public Player updatePlayer(Player updatePlayer) {
        Optional<Player> existingPlayer = playerRepository.findByPlayer(updatePlayer.getPlayer());

        if (existingPlayer.isPresent()) {
           Player playerToUpdate = existingPlayer.get();
           playerToUpdate.setPlayer(updatePlayer.getPlayer());
           playerToUpdate.setTeam(updatePlayer.getTeam());
           playerToUpdate.setPosition(updatePlayer.getPosition());

           playerRepository.save(playerToUpdate);
           return playerToUpdate;
        }
        return null;
    }

    @Transactional
    public void deletePlayer(String playerName) {
        playerRepository.deleteByPlayer(playerName);
    }


}
