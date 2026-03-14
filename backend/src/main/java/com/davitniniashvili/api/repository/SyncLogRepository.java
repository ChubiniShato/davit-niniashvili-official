package com.davitniniashvili.api.repository;

import com.davitniniashvili.api.model.SyncLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SyncLogRepository extends JpaRepository<SyncLog, Long> {
    Optional<SyncLog> findTopByJobNameOrderByStartedAtDesc(String jobName);
}
