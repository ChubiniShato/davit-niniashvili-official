package com.davitniniashvili.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "authority_highlights")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthorityHighlight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String type; // e.g., Quote, Video, Article

    @Column(name = "source_name", nullable = false)
    private String sourceName;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "content_url")
    private String contentUrl;

    @Column(name = "year_label")
    private String yearLabel;

    private Integer priority;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;
}
