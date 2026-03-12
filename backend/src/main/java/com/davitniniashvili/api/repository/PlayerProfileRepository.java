package com.davitniniashvili.api.repository;

import com.davitniniashvili.api.model.PlayerProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlayerProfileRepository extends JpaRepository<PlayerProfile, Long> {
    Optional<PlayerProfile> findTopByOrderByIdAsc();
}
