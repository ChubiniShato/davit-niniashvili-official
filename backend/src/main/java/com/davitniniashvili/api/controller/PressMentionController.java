package com.davitniniashvili.api.controller;

import com.davitniniashvili.api.model.PressMention;
import com.davitniniashvili.api.repository.PressMentionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/content/press")
public class PressMentionController {

    @Autowired
    private PressMentionRepository pressMentionRepository;

    @GetMapping("/featured")
    public List<PressMention> getFeaturedPress() {
        return pressMentionRepository.findByFeaturedOnHomeTrueOrderByFeatureRankAsc();
    }

    @GetMapping
    public List<PressMention> getArchivePress() {
        return pressMentionRepository.findAllOrderedByPublishedAt();
    }

    @GetMapping("/{slug}")
    public ResponseEntity<PressMention> getPressBySlug(@PathVariable String slug) {
        return pressMentionRepository.findBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
