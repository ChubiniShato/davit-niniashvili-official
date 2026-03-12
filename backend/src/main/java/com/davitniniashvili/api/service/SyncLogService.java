package com.davitniniashvili.api.service;

import com.davitniniashvili.api.model.SyncLog;
import com.davitniniashvili.api.model.SyncStatus;
import com.davitniniashvili.api.repository.SyncLogRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class SyncLogService {

    private final SyncLogRepository syncLogRepository;

    public SyncLogService(SyncLogRepository syncLogRepository) {
        this.syncLogRepository = syncLogRepository;
    }

    public SyncLog log(
            String jobName,
            SyncStatus status,
            Instant startedAt,
            Instant completedAt,
            Integer recordsProcessed,
            String errorMessage
    ) {
        SyncLog entry = new SyncLog(
                null,
                jobName,
                status,
                startedAt,
                completedAt,
                recordsProcessed,
                errorMessage
        );
        return syncLogRepository.save(entry);
    }
}
