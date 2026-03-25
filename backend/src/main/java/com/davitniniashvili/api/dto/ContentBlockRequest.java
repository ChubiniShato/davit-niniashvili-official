package com.davitniniashvili.api.dto;

import lombok.Data;

@Data
public class ContentBlockRequest {
    private String page;
    private String section;
    private String key;
    private String locale;
    private String value;
    private Boolean isActive;
}
