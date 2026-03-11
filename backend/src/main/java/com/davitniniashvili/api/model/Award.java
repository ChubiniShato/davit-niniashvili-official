package com.davitniniashvili.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "awards")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Award {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "player_id")
    private Long playerId;

    @Column(nullable = false)
    private String title;

    private String year;

    @Column(name = "competition_id")
    private Long competitionId;

    @Column(name = "season_id")
    private Long seasonId;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "image_url")
    private String imageUrl;
}
