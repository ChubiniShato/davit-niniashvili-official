package com.davitniniashvili.api.dto;

public class PlayerProfileRequest {

    private String name;
    private String position;
    private String nationality;
    private String birthDate;
    private String currentTeam;
    private String previousTeam;
    private String description;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPosition() { return position; }
    public void setPosition(String position) { this.position = position; }

    public String getNationality() { return nationality; }
    public void setNationality(String nationality) { this.nationality = nationality; }

    public String getBirthDate() { return birthDate; }
    public void setBirthDate(String birthDate) { this.birthDate = birthDate; }

    public String getCurrentTeam() { return currentTeam; }
    public void setCurrentTeam(String currentTeam) { this.currentTeam = currentTeam; }

    public String getPreviousTeam() { return previousTeam; }
    public void setPreviousTeam(String previousTeam) { this.previousTeam = previousTeam; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
