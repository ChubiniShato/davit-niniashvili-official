package com.davitniniashvili.api.controller;

import com.davitniniashvili.api.dto.ApiResponse;
import com.davitniniashvili.api.model.SyncLog;
import com.davitniniashvili.api.repository.SyncLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/sync-logs")
public class SyncLogAdminController {

    @Autowired
    private SyncLogRepository syncLogRepository;

    @GetMapping
    public ApiResponse<List<SyncLog>> getLogs() {
        List<SyncLog> logs = syncLogRepository.findAll(
                Sort.by(Sort.Direction.DESC, "startedAt")
        );
        return ApiResponse.success(logs);
    }
}
