package com.davitniniashvili.api.service;

import com.davitniniashvili.api.model.PlayerProfile;
import com.davitniniashvili.api.repository.PlayerProfileRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PlayerProfileService {

    private final PlayerProfileRepository playerProfileRepository;

    public PlayerProfileService(PlayerProfileRepository playerProfileRepository) {
        this.playerProfileRepository = playerProfileRepository;
    }

    public PlayerProfile save(PlayerProfile profile) {
        return playerProfileRepository.save(profile);
    }

    public Optional<PlayerProfile> findFirst() {
        return playerProfileRepository.findTopByOrderByIdAsc();
    }
}
