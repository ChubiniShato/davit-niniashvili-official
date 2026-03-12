package com.davitniniashvili.api.service;

import com.davitniniashvili.api.model.SyncJob;
import com.davitniniashvili.api.model.SyncLog;
import com.davitniniashvili.api.model.SyncStatus;
import org.springframework.stereotype.Service;

@Service
public class SyncCoordinator {

    private final SyncLogService syncLogService;

    public SyncCoordinator(SyncLogService syncLogService) {
        this.syncLogService = syncLogService;
    }

    public void run(SyncJob job, SyncTask task) throws Exception {
        SyncLog log = syncLogService.start(job.name());
        try {
            task.execute();
            syncLogService.complete(log, SyncStatus.SUCCESS, null, null);
        } catch (Exception e) {
            syncLogService.complete(log, SyncStatus.FAILED, null, e.getMessage());
            throw e;
        }
    }
}
