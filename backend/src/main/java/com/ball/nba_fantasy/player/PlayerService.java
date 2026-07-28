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

    public List<Player> getPlayersByYear(String year) {
        return playerRepository.findAll().stream().filter(player -> year.equals(player.getYear()))
                .collect(Collectors.toList());
    }

    public List<Player> getPlayersFromTeamAndYear(String teamName, String year) {
        return playerRepository.findAll().stream()
                .filter(player -> teamName.equals(player.getTeam()) && (year == null || year.equals(player.getYear())))
                .collect(Collectors.toList());

    }
    public List<Player> getPlayersByNameAndYear(String searchText, String year) {
        return playerRepository.findAll().stream()
                .filter(player -> player.getPlayer().toLowerCase().contains(searchText.toLowerCase()) && year.equals(player.getYear()))
                .collect(Collectors.toList());
    }

    public List<Player> getPlayerByPosAndYear(String searchText, String year) {
        return playerRepository.findAll().stream()
                .filter(player ->
                        player.getPosition().toLowerCase().contains(searchText.toLowerCase()) && year.equals(player.getYear()))
                .collect(Collectors.toList());
    }

    public List<Player> getPlayersByTeamAndPositionAndYear(String team, String position, String year) {
        return playerRepository.findAll().stream()
                .filter(player -> team.equals(player.getTeam()) && position.equals(player.getPosition()) && year.equals(player.getYear()))
                .collect(Collectors.toList());
    }

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
