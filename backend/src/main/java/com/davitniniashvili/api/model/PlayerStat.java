package com.davitniniashvili.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "player_stats")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlayerStat {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String season;
    
    private Integer matches;
    private Integer tries;
    private Integer meters;
    private Integer defendersBeaten;
    private Integer lineBreaks;
    private Integer offloads;
    
    @Column(length = 100)
    private String team; // e.g., "Lyon", "Georgia National Team"
    
    @Column(length = 50)
    private String competition; // e.g., "Top 14", "Rugby World Cup"
}
