package com.davitniniashvili.api.repository;

import com.davitniniashvili.api.model.Award;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AwardRepository extends JpaRepository<Award, Long> {
    List<Award> findByPlayerId(Long playerId);
}
