package com.davitniniashvili.api.service;

import com.davitniniashvili.api.model.PlayerProfile;
import org.springframework.stereotype.Service;

@Service
public class PlayerProfileSyncTask implements SyncTask {

    private final PlayerProfileService playerProfileService;

    public PlayerProfileSyncTask(PlayerProfileService playerProfileService) {
        this.playerProfileService = playerProfileService;
    }

    @Override
    public void execute() {
        PlayerProfile profile = playerProfileService.findFirst()
                .orElseThrow(() -> new IllegalStateException("PlayerProfile not found"));

        if (profile.getName() == null || profile.getName().isBlank()) {
            throw new IllegalStateException("PlayerProfile name is missing");
        }

        if (profile.getPosition() == null || profile.getPosition().isBlank()) {
            throw new IllegalStateException("PlayerProfile position is missing");
        }
    }
}
