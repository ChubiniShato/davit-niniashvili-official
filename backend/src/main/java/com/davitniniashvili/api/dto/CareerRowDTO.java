package com.davitniniashvili.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Shared row DTO for all three career tables.
 * Field semantics by table:
 * - overview rows:   team is primary identifier; season and competition are null
 * - seasons rows:    season + team + competition all populated
 * - breakdown rows:  competition is primary identifier; season and team are null
 *
 * Tactical metrics (meters, defenders beaten, line breaks, offloads) are intentionally excluded.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CareerRowDTO {
    private String season;
    private String team;
    private String competition;
    private Integer matches;
    private Integer starts;
    private Integer points;
    private Integer tries;
    private String wdl;
    private String cards;
    private Integer minutes;
}
