package com.davitniniashvili.api.controller;

import com.davitniniashvili.api.dto.ApiResponse;
import com.davitniniashvili.api.dto.ContentBlockRequest;
import com.davitniniashvili.api.model.ContentBlock;
import com.davitniniashvili.api.repository.ContentBlockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/admin/content/blocks")
public class AdminContentBlockController {

    @Autowired
    private ContentBlockRepository contentBlockRepository;

    @GetMapping
    public ApiResponse<List<ContentBlock>> listBlocks() {
        return ApiResponse.success(contentBlockRepository.findAll());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<ContentBlock> createBlock(@RequestBody ContentBlockRequest request) {
        validateRequest(request);
        ContentBlock block = new ContentBlock();
        mapRequestToEntity(request, block);
        ContentBlock saved = contentBlockRepository.save(block);
        return ApiResponse.success(saved);
    }

    @PutMapping("/{id}")
    public ApiResponse<ContentBlock> updateBlock(@PathVariable Long id, @RequestBody ContentBlockRequest request) {
        validateRequest(request);
        ContentBlock block = contentBlockRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Content block not found"));
        
        mapRequestToEntity(request, block);
        ContentBlock updated = contentBlockRepository.save(block);
        return ApiResponse.success(updated);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBlock(@PathVariable Long id) {
        if (!contentBlockRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Content block not found");
        }
        contentBlockRepository.deleteById(id);
    }

    private void validateRequest(ContentBlockRequest request) {
        if (request.getKey() == null || request.getKey().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Key is required");
        }
        if (request.getLocale() == null || request.getLocale().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Locale is required");
        }
        if (request.getValue() == null || request.getValue().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Value is required");
        }
    }

    private void mapRequestToEntity(ContentBlockRequest request, ContentBlock block) {
        block.setPage(request.getPage());
        block.setSection(request.getSection());
        block.setKey(request.getKey());
        block.setLocale(request.getLocale());
        block.setValue(request.getValue());
        block.setIsActive(request.getIsActive() != null ? request.getIsActive() : true);
    }
}
