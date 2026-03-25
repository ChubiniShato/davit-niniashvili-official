package com.davitniniashvili.api.controller;

import com.davitniniashvili.api.dto.ApiResponse;
import com.davitniniashvili.api.dto.AwardRequest;
import com.davitniniashvili.api.model.Award;
import com.davitniniashvili.api.repository.AwardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/admin/awards")
public class AdminAwardController {

    @Autowired
    private AwardRepository awardRepository;

    @GetMapping
    public ApiResponse<List<Award>> listAwards() {
        return ApiResponse.success(awardRepository.findAll());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<Award> createAward(@RequestBody AwardRequest request) {
        validateRequest(request);
        Award award = new Award();
        mapRequestToEntity(request, award);
        Award saved = awardRepository.save(award);
        return ApiResponse.success(saved);
    }

    @PutMapping("/{id}")
    public ApiResponse<Award> updateAward(@PathVariable Long id, @RequestBody AwardRequest request) {
        validateRequest(request);
        Award award = awardRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Award not found"));
        
        mapRequestToEntity(request, award);
        Award updated = awardRepository.save(award);
        return ApiResponse.success(updated);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAward(@PathVariable Long id) {
        if (!awardRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Award not found");
        }
        awardRepository.deleteById(id);
    }

    private void validateRequest(AwardRequest request) {
        if (request.getTitle() == null || request.getTitle().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Title is required");
        }
    }

    private void mapRequestToEntity(AwardRequest request, Award award) {
        award.setPlayerId(request.getPlayerId());
        award.setTitle(request.getTitle());
        award.setYear(request.getYear());
        award.setCompetitionId(request.getCompetitionId());
        award.setSeasonId(request.getSeasonId());
        award.setDescription(request.getDescription());
        award.setImageUrl(request.getImageUrl());
    }
}

