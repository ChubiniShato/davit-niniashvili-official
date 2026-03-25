package com.davitniniashvili.api.dto;

import lombok.Data;

@Data
public class AwardRequest {
    private Long playerId;
    
    // Manual validation needed in controller
    private String title;

    private String year;
    private Long competitionId;
    private Long seasonId;
    private String description;
    private String imageUrl;
}
