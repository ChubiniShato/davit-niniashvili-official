package com.davitniniashvili.api.repository;

import com.davitniniashvili.api.model.ContentBlock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContentBlockRepository extends JpaRepository<ContentBlock, Long> {

    // Simple JPA query to allow optional filtering by page, section, or locale, 
    // while ensuring we only return active blocks.
    @Query("SELECT c FROM ContentBlock c WHERE c.isActive = true " +
           "AND (:page IS NULL OR c.page = :page) " +
           "AND (:section IS NULL OR c.section = :section) " +
           "AND (:locale IS NULL OR c.locale = :locale)")
    List<ContentBlock> findActiveBlocksWithOptionalFilters(
            @Param("page") String page,
            @Param("section") String section,
            @Param("locale") String locale
    );
}
