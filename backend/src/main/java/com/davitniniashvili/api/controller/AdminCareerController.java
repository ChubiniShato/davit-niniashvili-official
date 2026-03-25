package com.davitniniashvili.api.controller;

import com.davitniniashvili.api.dto.ApiResponse;
import com.davitniniashvili.api.dto.CareerProfileDTO;
import com.davitniniashvili.api.service.CareerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/admin/content/career")
public class AdminCareerController {

    @Autowired
    private CareerService careerService;

    @GetMapping
    public ApiResponse<CareerProfileDTO> getEditableCareer() {
        return ApiResponse.success(careerService.getCareerProfile());
    }

    @PostMapping("/validate")
    public ApiResponse<String> validateCareer(@RequestBody CareerProfileDTO request) {
        if (request == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Payload is required");
        }
        if (request.getMeta() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing 'meta' structure");
        }
        if (request.getOverview() == null || request.getSeasons() == null || request.getBreakdown() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing required tables (overview, seasons, breakdown)");
        }
        
        // Minimal basic check: ensure source primary string exists
        if (request.getMeta().getPrimarySource() == null || request.getMeta().getPrimarySource().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "'meta.primarySource' cannot be blank");
        }

        return ApiResponse.success("Validation passed");
    }

    @PutMapping("/publish")
    public ApiResponse<String> publishCareer(@RequestBody CareerProfileDTO request) {
        try {
            // Re-validate strictly before trusting save
            validateCareer(request);
            careerService.saveCareerProfile(request);
            return ApiResponse.success("Career profile successfully published");
        } catch (ResponseStatusException e) {
            throw e; // Pass through bad request validations
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to persist career data", e);
        }
    }
}
