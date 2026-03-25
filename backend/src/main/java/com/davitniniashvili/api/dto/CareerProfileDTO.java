package com.davitniniashvili.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CareerProfileDTO {
    private CareerMetaDTO meta;
    private List<CareerRowDTO> overview;
    private List<CareerRowDTO> seasons;
    private List<CareerRowDTO> breakdown;
}
