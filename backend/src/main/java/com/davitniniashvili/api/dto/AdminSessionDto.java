package com.davitniniashvili.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminSessionDto {
    private boolean authenticated;
    private String username;
    private String role;
}
