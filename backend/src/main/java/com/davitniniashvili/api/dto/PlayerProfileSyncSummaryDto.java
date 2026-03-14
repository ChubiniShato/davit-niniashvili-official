package com.davitniniashvili.api.dto;

import java.time.Instant;

public class PlayerProfileSyncSummaryDto {

    private boolean hasRun;
    private boolean healthy;
    private String jobName;
    private String status;
    private Instant startedAt;
    private Instant completedAt;
    private Integer recordsProcessed;
    private String errorMessage;

    public boolean isHasRun() {
        return hasRun;
    }

    public void setHasRun(boolean hasRun) {
        this.hasRun = hasRun;
    }

    public String getJobName() {
        return jobName;
    }

    public void setJobName(String jobName) {
        this.jobName = jobName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Instant getStartedAt() {
        return startedAt;
    }

    public void setStartedAt(Instant startedAt) {
        this.startedAt = startedAt;
    }

    public Instant getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(Instant completedAt) {
        this.completedAt = completedAt;
    }

    public Integer getRecordsProcessed() {
        return recordsProcessed;
    }

    public void setRecordsProcessed(Integer recordsProcessed) {
        this.recordsProcessed = recordsProcessed;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public boolean isHealthy() {
        return healthy;
    }

    public void setHealthy(boolean healthy) {
        this.healthy = healthy;
    }
}
