package com.davitniniashvili.api.controller;

import com.davitniniashvili.api.model.MediaItem;
import com.davitniniashvili.api.model.PlayerStat;
import com.davitniniashvili.api.repository.MediaItemRepository;
import com.davitniniashvili.api.repository.PlayerStatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import com.davitniniashvili.api.model.PlayerProfile;
import com.davitniniashvili.api.service.PlayerProfileService;

@RestController
@RequestMapping("/api/content")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:3000" })
public class PublicContentController {

    @Autowired
    private PlayerStatRepository playerStatRepository;

    @Autowired
    private MediaItemRepository mediaItemRepository;

    @Autowired
    private PlayerProfileService playerProfileService;

    @GetMapping("/stats")
    public List<PlayerStat> getAllStats() {
        return playerStatRepository.findAll();
    }

    @GetMapping("/media")
    public List<MediaItem> getAllMedia() {
        return mediaItemRepository.findAll();
    }

    @GetMapping("/bio")
    public PlayerProfile getBio() {
        Optional<PlayerProfile> profileOpt = playerProfileService.findFirst();
        if (profileOpt.isPresent()) {
            return profileOpt.get();
        }
        // Fallback: hardcoded until PlayerProfile row is seeded
        PlayerProfile bio = new PlayerProfile();
        bio.setName("Davit Niniashvili");
        bio.setPosition("Winger / Fullback");
        bio.setNationality("Georgian");
        bio.setBirthDate("July 14, 2002");
        bio.setCurrentTeam("Stade Rochelais (La Rochelle)");
        bio.setPreviousTeam("Lyon (LOU Rugby)");
        bio.setDescription(
                "Davit Niniashvili is a highly promising Georgian rugby union player known for his chaotic brilliance, exceptional pace, and unpredictable style. He has rapidly gained international recognition and played a pivotal role in Lyon's 2022 Challenge Cup victory.");
        return bio;
    }
}
