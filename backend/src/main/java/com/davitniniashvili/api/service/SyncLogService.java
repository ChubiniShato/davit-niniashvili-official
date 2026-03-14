package com.davitniniashvili.api.service;

import com.davitniniashvili.api.model.SyncLog;
import com.davitniniashvili.api.model.SyncStatus;
import com.davitniniashvili.api.repository.SyncLogRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

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

    public SyncLog start(String jobName) {
        SyncLog entry = new SyncLog(
                null,
                jobName,
                SyncStatus.IN_PROGRESS,
                Instant.now(),
                null,
                null,
                null
        );
        return syncLogRepository.save(entry);
    }

    public SyncLog complete(SyncLog log, SyncStatus status, Integer recordsProcessed, String errorMessage) {
        log.setStatus(status);
        log.setCompletedAt(Instant.now());
        log.setRecordsProcessed(recordsProcessed);
        log.setErrorMessage(errorMessage);
        return syncLogRepository.save(log);
    }

    public Optional<SyncLog> findLatestByJob(String jobName) {
        return syncLogRepository.findTopByJobNameOrderByStartedAtDesc(jobName);
    }
}
