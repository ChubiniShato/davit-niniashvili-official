package com.davitniniashvili.api.repository;

import com.davitniniashvili.api.model.PressMention;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PressMentionRepository extends JpaRepository<PressMention, Long> {
    
    List<PressMention> findByFeaturedOnHomeTrueOrderByFeatureRankAsc();
    
    Optional<PressMention> findBySlug(String slug);
    
    @Query("SELECT p FROM PressMention p ORDER BY CASE WHEN p.publishedAt IS NULL THEN 1 ELSE 0 END, p.publishedAt DESC")
    List<PressMention> findAllOrderedByPublishedAt();
}
