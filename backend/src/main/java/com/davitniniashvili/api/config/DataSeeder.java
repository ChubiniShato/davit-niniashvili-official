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

        @Autowired
        private PlayerProfileRepository playerProfileRepository;

        @Autowired
        private PressMentionRepository pressMentionRepository;

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

                // Seed Player Profile
                if (playerProfileRepository.count() == 0) {
                        playerProfileRepository.save(new PlayerProfile(
                                        null,
                                        "Davit Niniashvili",
                                        "Winger / Fullback",
                                        "Georgian",
                                        "July 14, 2002",
                                        "Stade Rochelais (La Rochelle)",
                                        "Lyon (LOU Rugby)",
                                        "Davit Niniashvili is a highly promising Georgian rugby union player known for his chaotic brilliance, exceptional pace, and unpredictable style. He has rapidly gained international recognition and played a pivotal role in Lyon's 2022 Challenge Cup victory."
                        ));
                }

                // Seed Press Mentions
                if (pressMentionRepository.count() == 0) {
                        pressMentionRepository.save(new PressMention(
                                null, "rugbyrama-2026-03-04-youth-core", "Rugbyrama",
                                PressMention.SourceTier.A, "FR", PressMention.ContentType.Analysis,
                                "La Rochelle youth core analysis featuring Davit Niniashvili",
                                "\"On accélère le processus avec les jeunes\" : le vieillissant Stade rochelais est devenu une véritable pépinière",
                                "Rugbyrama highlighted the influence of the young La Rochelle core.",
                                java.time.LocalDate.parse("2026-03-04"), "2026-03-04",
                                "", false, true, true, 1, PressMention.RecordStatus.confirmed, "", ""
                        ));
                        pressMentionRepository.save(new PressMention(
                                null, "lequipe-2025-09-03-la-rochelle-choice", "L’Équipe",
                                PressMention.SourceTier.A, "FR", PressMention.ContentType.Interview,
                                "Niniashvili explains why he chose La Rochelle",
                                "",
                                "L’Équipe ran a major interview/profile around Niniashvili’s decision to join La Rochelle.",
                                java.time.LocalDate.parse("2025-09-03"), "2025-09-03",
                                "", false, true, true, 2, PressMention.RecordStatus.confirmed, "", ""
                        ));
                        pressMentionRepository.save(new PressMention(
                                null, "rugbyrama-2026-02-28-castres-ratings", "Rugbyrama",
                                PressMention.SourceTier.A, "FR", PressMention.ContentType.MatchReport,
                                "Rugbyrama’s player ratings for Castres–La Rochelle",
                                "",
                                "Rugbyrama’s player ratings highlighted Davit Niniashvili.",
                                java.time.LocalDate.parse("2026-02-28"), "2026-02-28",
                                "", false, true, true, 3, PressMention.RecordStatus.confirmed, "", ""
                        ));
                        pressMentionRepository.save(new PressMention(
                                null, "rugbyrama-2026-01-30-development-interview", "Rugbyrama",
                                PressMention.SourceTier.A, "FR", PressMention.ContentType.Interview,
                                "Tout le monde sait que je n’aime pas le jeu au pied...",
                                "",
                                "Rugbyrama focused on Niniashvili’s development.",
                                java.time.LocalDate.parse("2026-01-30"), "2026-01-30",
                                "", false, true, false, null, PressMention.RecordStatus.confirmed, "", ""
                        ));
                        pressMentionRepository.save(new PressMention(
                                null, "lequipe-2025-09-02-top14-key-recruits", "L’Équipe",
                                PressMention.SourceTier.A, "FR", PressMention.ContentType.Analysis,
                                "Niniashvili named among the Top 14’s key recruits",
                                "",
                                "L’Équipe included Niniashvili in its selection of standout recruits.",
                                java.time.LocalDate.parse("2025-09-02"), "2025-09-02",
                                "", false, true, false, null, PressMention.RecordStatus.confirmed, "", ""
                        ));
                        pressMentionRepository.save(new PressMention(
                                null, "rugbyrama-2025-08-21-la-rochelle-start", "Rugbyrama",
                                PressMention.SourceTier.A, "FR", PressMention.ContentType.Interview,
                                "No pressure as Niniashvili prepares to begin at La Rochelle",
                                "",
                                "Rugbyrama published an interview-style piece on Niniashvili’s mindset.",
                                java.time.LocalDate.parse("2025-08-21"), "2025-08-21",
                                "", false, true, false, null, PressMention.RecordStatus.confirmed, "", ""
                        ));
                }
        }
}
