package com.davitniniashvili.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "media_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MediaItem {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String url;
    
    @Column(nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private MediaType type; // IMAGE or VIDEO
    
    @Column(length = 500)
    private String caption;
    
    @Column(length = 100)
    private String category; // e.g., "Highlights", "Training", "Personal"
    
    private Integer displayOrder;
    
    public enum MediaType {
        IMAGE, VIDEO
    }
}
