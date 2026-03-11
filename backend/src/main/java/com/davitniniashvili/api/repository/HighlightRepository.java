package com.davitniniashvili.api.repository;

import com.davitniniashvili.api.model.AuthorityHighlight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HighlightRepository extends JpaRepository<AuthorityHighlight, Long> {
    List<AuthorityHighlight> findByIsActiveTrueOrderByPriorityAsc();
}
