package com.davitniniashvili.api.controller;

import com.davitniniashvili.api.dto.ApiResponse;
import com.davitniniashvili.api.model.AuthorityHighlight;
import com.davitniniashvili.api.repository.HighlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/player/highlights")
public class HighlightController {

    @Autowired
    private HighlightRepository highlightRepository;

    @GetMapping
    public ApiResponse<List<AuthorityHighlight>> getHighlights() {
        List<AuthorityHighlight> highlights = highlightRepository.findByIsActiveTrueOrderByPriorityAsc();
        return ApiResponse.success(highlights);
    }
}
