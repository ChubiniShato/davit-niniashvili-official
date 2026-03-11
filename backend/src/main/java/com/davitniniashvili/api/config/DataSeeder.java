package com.davitniniashvili.api.config;

import com.davitniniashvili.api.model.*;
import com.davitniniashvili.api.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;

@Component
public class DataSeeder implements CommandLineRunner {

        @Autowired
        private PlayerStatRepository playerStatRepository;

        @Autowired
        private MediaItemRepository mediaItemRepository;

        @Autowired
        private ProductRepository productRepository;

        @Autowired
        private AwardRepository awardRepository;

        @Autowired
        private HighlightRepository highlightRepository;

        @Autowired
        private ContentBlockRepository contentBlockRepository;

        @Override
        public void run(String... args) throws Exception {
                // Seed Player Stats
                if (playerStatRepository.count() == 0) {
                        playerStatRepository.save(new PlayerStat(null, "2023", 4, 1, 245, 12, 3, 5, "Georgia",
                                        "Rugby World Cup"));
                        playerStatRepository.save(
                                        new PlayerStat(null, "2022-23", 33, 12, 1250, 45, 15, 20, "Lyon", "Top 14"));
                        playerStatRepository.save(new PlayerStat(null, "2024-25", 20, 8, 980, 38, 12, 18, "La Rochelle",
                                        "Top 14"));
                }

                // Seed Media Items
                if (mediaItemRepository.count() == 0) {
                        mediaItemRepository
                                        .save(new MediaItem(null, "/images/davit-in-GEO-National.jpg",
                                                        MediaItem.MediaType.IMAGE,
                                                        "Try against Wales - Historic Victory", "Highlights", 1));
                        mediaItemRepository
                                        .save(new MediaItem(null, "/images/davit-in-Barbarians.jpg.jpg",
                                                        MediaItem.MediaType.IMAGE,
                                                        "Training with Georgia National Team", "Training", 2));
                        mediaItemRepository
                                        .save(new MediaItem(null, "/images/davit-in-LaRochelle.jpg",
                                                        MediaItem.MediaType.IMAGE, "Challenge Cup Victory 2022",
                                                        "Highlights", 3));
                }

                // Seed Products
                if (productRepository.count() == 0) {
                        productRepository.save(new Product(null, "Official DN15 Jersey",
                                        "Official Davit Niniashvili #15 Georgia National Team Jersey",
                                        new BigDecimal("89.99"),
                                        "https://images.unsplash.com/photo-1627384113972-f97d78c397e8?w=800", 50,
                                        "Jersey", "L", "Red",
                                        true));
                        productRepository.save(new Product(null, "DN Signature T-Shirt",
                                        "Premium cotton t-shirt with DN signature",
                                        new BigDecimal("29.99"),
                                        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800", 100,
                                        "T-Shirt", "M", "Black", true));
                        productRepository.save(new Product(null, "Rugby Training Ball",
                                        "Official size 5 rugby ball with DN branding", new BigDecimal("49.99"),
                                        "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800", 30,
                                        "Equipment", "Standard",
                                        "White", true));
                        productRepository.save(new Product(null, "DN Cap", "Adjustable cap with embroidered logo",
                                        new BigDecimal("24.99"),
                                        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800", 75,
                                        "Accessories", "One Size", "Navy", true));
                }

                // Seed Awards
                if (awardRepository.count() == 0) {
                        awardRepository.save(new Award(null, 1L, "Challenge Cup Winner", "2022", null, null,
                                        "Historic Challenge Cup victory with Lyon.",
                                        "/images/davit-in-LaRochelle.jpg"));
                        awardRepository.save(new Award(null, 1L, "Top 14 Breakthrough Player", "2022", null, null,
                                        "Awarded for outstanding breakthrough performances in the Top 14.",
                                        "/images/davit-in-GEO-National.jpg"));
                }

                // Seed Highlights
                if (highlightRepository.count() == 0) {
                        highlightRepository.save(new AuthorityHighlight(null, "Quote", "L'Équipe", 
                                "The Georgian Prodigy", "Davit Niniashvili is redefining the modern fullback position.", 
                                null, null, "2023", 1, true));
                        highlightRepository.save(new AuthorityHighlight(null, "Video", "World Rugby", 
                                "Try of the Year Nominee", "Spectacular length-of-the-field try.", 
                                "/images/davit-in-LaRochelle.jpg", "https://youtube.com/watch?v=demo", "2022", 2, true));
                }

                // Seed Content Blocks
                if (contentBlockRepository.count() == 0) {
                        contentBlockRepository.save(new ContentBlock(null, "home", "hero", "slogan", "en", 
                                "CHAOS IS A LADDER.", true));
                        contentBlockRepository.save(new ContentBlock(null, "home", "for-brands", "pitch", "en", 
                                "Partner with Davit Niniashvili to elevate your brand presence globally.", true));
                }
        }
}
