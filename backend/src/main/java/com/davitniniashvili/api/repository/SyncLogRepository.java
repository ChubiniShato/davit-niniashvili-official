package com.davitniniashvili.api.repository;

import com.davitniniashvili.api.model.SyncLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SyncLogRepository extends JpaRepository<SyncLog, Long> {
}
