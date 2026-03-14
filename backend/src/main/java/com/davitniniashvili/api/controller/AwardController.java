package com.davitniniashvili.api.controller;

import com.davitniniashvili.api.model.Award;
import com.davitniniashvili.api.repository.AwardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/player/awards")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:3000" })
public class AwardController {

    @Autowired
    private AwardRepository awardRepository;

    @GetMapping
    public List<Award> getAwards() {
        return awardRepository.findAll();
    }
}