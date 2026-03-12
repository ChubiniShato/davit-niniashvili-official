package com.davitniniashvili.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "player_profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlayerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String position;

    private String nationality;

    @Column(name = "birth_date")
    private String birthDate;

    @Column(name = "current_team")
    private String currentTeam;

    @Column(name = "previous_team")
    private String previousTeam;

    @Column(columnDefinition = "TEXT")
    private String description;
}
