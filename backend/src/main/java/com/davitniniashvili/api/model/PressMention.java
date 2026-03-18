package com.davitniniashvili.api.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "press_mentions")
public class PressMention {

    public enum SourceTier {
        A, B
    }

    public enum ContentType {
        Analysis, Interview, MatchReport, Article, Reference
    }

    public enum RecordStatus {
        confirmed, provisional
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String slug;
    private String source;

    @Enumerated(EnumType.STRING)
    private SourceTier sourceTier;

    private String language;

    @Enumerated(EnumType.STRING)
    private ContentType contentType;

    private String title;
    private String originalHeadline;
    private String summaryShort;
    private LocalDate publishedAt;
    private String displayDate;
    private String sourceUrl;
    private Boolean hasLiveSourceLink;
    private Boolean homepageEligible;
    private Boolean featuredOnHome;
    private Integer featureRank;

    @Enumerated(EnumType.STRING)
    private RecordStatus recordStatus;

    private String duplicateOf;
    private String notes;

    public PressMention() {
    }

    public PressMention(Long id, String slug, String source, SourceTier sourceTier, String language,
                        ContentType contentType, String title, String originalHeadline, String summaryShort,
                        LocalDate publishedAt, String displayDate, String sourceUrl, Boolean hasLiveSourceLink,
                        Boolean homepageEligible, Boolean featuredOnHome, Integer featureRank,
                        RecordStatus recordStatus, String duplicateOf, String notes) {
        this.id = id;
        this.slug = slug;
        this.source = source;
        this.sourceTier = sourceTier;
        this.language = language;
        this.contentType = contentType;
        this.title = title;
        this.originalHeadline = originalHeadline;
        this.summaryShort = summaryShort;
        this.publishedAt = publishedAt;
        this.displayDate = displayDate;
        this.sourceUrl = sourceUrl;
        this.hasLiveSourceLink = hasLiveSourceLink;
        this.homepageEligible = homepageEligible;
        this.featuredOnHome = featuredOnHome;
        this.featureRank = featureRank;
        this.recordStatus = recordStatus;
        this.duplicateOf = duplicateOf;
        this.notes = notes;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }

    public SourceTier getSourceTier() { return sourceTier; }
    public void setSourceTier(SourceTier sourceTier) { this.sourceTier = sourceTier; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public ContentType getContentType() { return contentType; }
    public void setContentType(ContentType contentType) { this.contentType = contentType; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getOriginalHeadline() { return originalHeadline; }
    public void setOriginalHeadline(String originalHeadline) { this.originalHeadline = originalHeadline; }

    public String getSummaryShort() { return summaryShort; }
    public void setSummaryShort(String summaryShort) { this.summaryShort = summaryShort; }

    public LocalDate getPublishedAt() { return publishedAt; }
    public void setPublishedAt(LocalDate publishedAt) { this.publishedAt = publishedAt; }

    public String getDisplayDate() { return displayDate; }
    public void setDisplayDate(String displayDate) { this.displayDate = displayDate; }

    public String getSourceUrl() { return sourceUrl; }
    public void setSourceUrl(String sourceUrl) { this.sourceUrl = sourceUrl; }

    public Boolean getHasLiveSourceLink() { return hasLiveSourceLink; }
    public void setHasLiveSourceLink(Boolean hasLiveSourceLink) { this.hasLiveSourceLink = hasLiveSourceLink; }

    public Boolean getHomepageEligible() { return homepageEligible; }
    public void setHomepageEligible(Boolean homepageEligible) { this.homepageEligible = homepageEligible; }

    public Boolean getFeaturedOnHome() { return featuredOnHome; }
    public void setFeaturedOnHome(Boolean featuredOnHome) { this.featuredOnHome = featuredOnHome; }

    public Integer getFeatureRank() { return featureRank; }
    public void setFeatureRank(Integer featureRank) { this.featureRank = featureRank; }

    public RecordStatus getRecordStatus() { return recordStatus; }
    public void setRecordStatus(RecordStatus recordStatus) { this.recordStatus = recordStatus; }

    public String getDuplicateOf() { return duplicateOf; }
    public void setDuplicateOf(String duplicateOf) { this.duplicateOf = duplicateOf; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
