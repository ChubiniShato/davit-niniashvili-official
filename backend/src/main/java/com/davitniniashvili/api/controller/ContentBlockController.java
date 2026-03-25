package com.davitniniashvili.api.controller;

import com.davitniniashvili.api.dto.ApiResponse;
import com.davitniniashvili.api.model.ContentBlock;
import com.davitniniashvili.api.repository.ContentBlockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/content/blocks")
public class ContentBlockController {

    @Autowired
    private ContentBlockRepository contentBlockRepository;

    @GetMapping
    public ApiResponse<List<ContentBlock>> getBlocks(
            @RequestParam(required = false) String page,
            @RequestParam(required = false) String section,
            @RequestParam(required = false) String locale) {
        
        List<ContentBlock> blocks = contentBlockRepository.findActiveBlocksWithOptionalFilters(page, section, locale);
        return ApiResponse.success(blocks);
    }
}
