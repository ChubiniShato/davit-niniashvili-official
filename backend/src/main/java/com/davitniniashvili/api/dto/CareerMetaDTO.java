package com.davitniniashvili.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CareerMetaDTO {
    private String sourceText;
    private String primarySource;
    private String lastUpdated;
}
