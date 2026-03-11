package com.davitniniashvili.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "content_blocks")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContentBlock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String page;

    private String section;

    @Column(name = "block_key", nullable = false)
    private String key;

    @Column(nullable = false)
    private String locale;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String value;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;
}
