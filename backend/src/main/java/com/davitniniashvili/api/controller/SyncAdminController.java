package com.davitniniashvili.api.controller;

import com.davitniniashvili.api.dto.ApiResponse;
import com.davitniniashvili.api.model.SyncJob;
import com.davitniniashvili.api.service.PlayerProfileSyncTask;
import com.davitniniashvili.api.service.SyncCoordinator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/sync")
public class SyncAdminController {

    @Autowired
    private SyncCoordinator syncCoordinator;

    @Autowired
    private PlayerProfileSyncTask playerProfileSyncTask;

    @PostMapping("/player-profile")
    public ApiResponse<String> triggerPlayerProfileSync() throws Exception {
        syncCoordinator.run(SyncJob.PLAYER_PROFILE, playerProfileSyncTask);
        return ApiResponse.success("player-profile sync completed");
    }
}
