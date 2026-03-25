package com.davitniniashvili.api.service;

import com.davitniniashvili.api.dto.CareerMetaDTO;
import com.davitniniashvili.api.dto.CareerProfileDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.List;

@Service
public class CareerService {

    private static final Logger log = LoggerFactory.getLogger(CareerService.class);
    private static final String CAREER_JSON_PATH = "data/career-profile.json";
    private static final String EXTERNAL_FILE_PATH = "data/career-profile.json";

    private final ObjectMapper objectMapper;

    public CareerService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public CareerProfileDTO getCareerProfile() {
        try {
            java.io.File externalFile = new java.io.File(EXTERNAL_FILE_PATH);
            if (externalFile.exists() && externalFile.canRead()) {
                log.info("Loading career profile from external file: {}", EXTERNAL_FILE_PATH);
                return objectMapper.readValue(externalFile, CareerProfileDTO.class);
            }

            ClassPathResource resource = new ClassPathResource(CAREER_JSON_PATH);
            if (!resource.exists()) {
                log.error("career-profile.json not found locally or at classpath:{}", CAREER_JSON_PATH);
                return emptyProfile();
            }
            try (InputStream is = resource.getInputStream()) {
                return objectMapper.readValue(is, CareerProfileDTO.class);
            }
        } catch (Exception e) {
            log.error("Failed to load or parse career-profile.json: {}", e.getMessage(), e);
            return emptyProfile();
        }
    }

    public void saveCareerProfile(CareerProfileDTO profile) throws Exception {
        java.io.File externalFile = new java.io.File(EXTERNAL_FILE_PATH);
        if (!externalFile.getParentFile().exists()) {
            externalFile.getParentFile().mkdirs();
        } else if (externalFile.exists()) {
            try {
                java.time.format.DateTimeFormatter formatter = java.time.format.DateTimeFormatter.ofPattern("yyyyMMdd-HHmmss");
                String timestamp = java.time.LocalDateTime.now().format(formatter);
                java.io.File backupFile = new java.io.File(externalFile.getParentFile(), "career-profile-" + timestamp + ".json");
                java.nio.file.Files.copy(externalFile.toPath(), backupFile.toPath(), java.nio.file.StandardCopyOption.REPLACE_EXISTING);
                log.info("Created backup of current career profile at: {}", backupFile.getAbsolutePath());
            } catch (Exception e) {
                log.warn("Failed to create backup of career profile, proceeding with publish: {}", e.getMessage());
            }
        }
        objectMapper.writerWithDefaultPrettyPrinter().writeValue(externalFile, profile);
        log.info("Successfully published career profile to {}", EXTERNAL_FILE_PATH);
        
        // Convenience for local dev: try syncing to src/main/resources if it exists
        java.io.File devSourceFile = new java.io.File("src/main/resources/data/career-profile.json");
        if (devSourceFile.exists()) {
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(devSourceFile, profile);
        }
    }

    private CareerProfileDTO emptyProfile() {
        return new CareerProfileDTO(
                new CareerMetaDTO("", "", ""),
                List.of(),
                List.of(),
                List.of()
        );
    }
}
