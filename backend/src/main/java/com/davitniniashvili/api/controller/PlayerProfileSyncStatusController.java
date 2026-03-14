package com.davitniniashvili.api.controller;

import com.davitniniashvili.api.dto.ApiResponse;
import com.davitniniashvili.api.dto.PlayerProfileSyncSummaryDto;
import com.davitniniashvili.api.model.SyncJob;
import com.davitniniashvili.api.model.SyncLog;
import com.davitniniashvili.api.service.SyncLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/admin/sync/player-profile")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:3000" })
public class PlayerProfileSyncStatusController {

    @Autowired
    private SyncLogService syncLogService;

    @GetMapping("/latest")
    public ApiResponse<SyncLog> getLatestPlayerProfileSync() {
        return ApiResponse.success(
                syncLogService.findLatestByJob(SyncJob.PLAYER_PROFILE.name()).orElse(null)
        );
    }

    @GetMapping("/summary")
    public ApiResponse<PlayerProfileSyncSummaryDto> getPlayerProfileSyncSummary() {
        Optional<SyncLog> latest = syncLogService.findLatestByJob(SyncJob.PLAYER_PROFILE.name());

        PlayerProfileSyncSummaryDto summary = new PlayerProfileSyncSummaryDto();

        if (latest.isPresent()) {
            SyncLog log = latest.get();
            summary.setHasRun(true);
            summary.setJobName(log.getJobName());
            summary.setStatus(log.getStatus().name());
            summary.setHealthy("SUCCESS".equals(log.getStatus().name()));
            summary.setStartedAt(log.getStartedAt());
            summary.setCompletedAt(log.getCompletedAt());
            summary.setRecordsProcessed(log.getRecordsProcessed());
            summary.setErrorMessage(log.getErrorMessage());
        } else {
            summary.setHasRun(false);
            summary.setJobName(SyncJob.PLAYER_PROFILE.name());
            summary.setHealthy(false);
        }

        return ApiResponse.success(summary);
    }
}
