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
    public BioResponse getBio() {
        Optional<PlayerProfile> profileOpt = playerProfileService.findFirst();
        if (profileOpt.isPresent()) {
            PlayerProfile p = profileOpt.get();
            BioResponse bio = new BioResponse();
            bio.setName(p.getName());
            bio.setPosition(p.getPosition());
            bio.setNationality(p.getNationality());
            bio.setBirthDate(p.getBirthDate());
            bio.setCurrentTeam(p.getCurrentTeam());
            bio.setPreviousTeam(p.getPreviousTeam());
            bio.setDescription(p.getDescription());
            return bio;
        }
        // Fallback: hardcoded until PlayerProfile row is seeded
        BioResponse bio = new BioResponse();
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

    static class BioResponse {
        private String name;
        private String position;
        private String nationality;
        private String birthDate;
        private String currentTeam;
        private String previousTeam;
        private String description;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getPosition() {
            return position;
        }

        public void setPosition(String position) {
            this.position = position;
        }

        public String getNationality() {
            return nationality;
        }

        public void setNationality(String nationality) {
            this.nationality = nationality;
        }

        public String getBirthDate() {
            return birthDate;
        }

        public void setBirthDate(String birthDate) {
            this.birthDate = birthDate;
        }

        public String getCurrentTeam() {
            return currentTeam;
        }

        public void setCurrentTeam(String currentTeam) {
            this.currentTeam = currentTeam;
        }

        public String getPreviousTeam() {
            return previousTeam;
        }

        public void setPreviousTeam(String previousTeam) {
            this.previousTeam = previousTeam;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }
    }
}
