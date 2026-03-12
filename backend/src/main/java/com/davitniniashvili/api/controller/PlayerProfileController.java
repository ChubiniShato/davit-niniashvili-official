package com.davitniniashvili.api.controller;

import com.davitniniashvili.api.dto.ApiResponse;
import com.davitniniashvili.api.dto.PlayerProfileRequest;
import com.davitniniashvili.api.model.PlayerProfile;
import com.davitniniashvili.api.service.PlayerProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/admin/player/profile")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:3000" })
public class PlayerProfileController {

    @Autowired
    private PlayerProfileService playerProfileService;

    @PutMapping
    public ApiResponse<PlayerProfile> updateProfile(@RequestBody PlayerProfileRequest request) {
        Optional<PlayerProfile> existing = playerProfileService.findFirst();
        PlayerProfile profile = existing.orElseGet(PlayerProfile::new);
        profile.setName(request.getName());
        profile.setPosition(request.getPosition());
        profile.setNationality(request.getNationality());
        profile.setBirthDate(request.getBirthDate());
        profile.setCurrentTeam(request.getCurrentTeam());
        profile.setPreviousTeam(request.getPreviousTeam());
        profile.setDescription(request.getDescription());
        PlayerProfile saved = playerProfileService.save(profile);
        return ApiResponse.success(saved);
    }
}
