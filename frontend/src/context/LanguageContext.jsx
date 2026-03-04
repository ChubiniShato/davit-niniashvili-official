import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
    en: {
        'nav.home': 'HOME',
        'nav.bio': 'BIO',
        'nav.career': 'CAREER',
        'nav.gallery': 'GALLERY',
        'nav.highlights': 'HIGHLIGHTS',
        'nav.contact': 'CONTACT',
        'nav.media': 'MEDIA',
        'nav.partners': 'PARTNERS',
        'nav.forBrands': 'FOR BRANDS',
        'page.media.title': 'Media',
        'page.media.subtitle': 'Press & Coverage',
        'page.partners.title': 'Partners',
        'page.partners.subtitle': 'Brand Collaborations',
        'page.forBrands.title': 'For Brands',
        'page.forBrands.whyPartner': 'Why Partner With Davit',
        'page.forBrands.packages': 'Packages',
        'page.forBrands.inquiryCta': 'Get in Touch',
        'page.forBrands.subtitle': 'Premium digital partnership with a top-tier international rugby athlete.',
        'page.forBrands.proof': 'Why Davit Niniashvili',
        'page.forBrands.process': 'How It Works',
        'page.forBrands.step1': 'Intro Call',
        'page.forBrands.step2': 'Proposal + Assets',
        'page.forBrands.step3': 'Launch',
        'home.media.title': 'In the Media',
        'home.career.title': 'Career',
        'home.career.viewFull': 'View Full Career',
        'home.highlights.viewGallery': 'View Full Gallery',
        'home.partners.title': 'Partners',
        'home.partners.collaborations': 'Current Brand Collaborations',
        'home.partners.sponsorship': 'Digital Sponsorship Opportunities',
        'home.partners.primaryAvailable': 'Primary Digital Partner — Available',
        'home.partners.officialAvailable': 'Official Partners — 3 Available',
        'home.forBrands.cta': 'Explore Partnership Options',
        'page.contact.subtitle': 'Get in touch',
        'home.authority.slogan': 'Love what you do \u2014 wholeheartedly!',
        'home.authority.status': 'Current \u2014 Top14: Stade Rochelais | Georgia national team',
        'home.authority.cta.career': 'See Full Career',
        'home.authority.cta.highlights': 'See Featured Moments',
        'home.authority.kpis': [
            '4\u00d7 European Rugby Championship Winner (2021\u20132024)',
            'EPCR Challenge Cup Winner \u2014 Lyon (2021\u201322)',
            '46 International Caps \u2014 Georgia (debut 2020)',
            'Oscars du Midi Olympique Winner (2023)',
            'RugbyPass Top 100 Player \u2014 #83 (2025)',
            'Barbarian F.C. Appearance \u2014 80 minutes (2022)',
        ],
    },
    ka: {
        'nav.home': 'ᲛᲗᲐᲕᲐᲠᲘ',
        'nav.bio': 'ᲑᲘᲝ',
        'nav.career': 'ᲙᲐᲠᲘᲔᲠᲐ',
        'nav.gallery': 'ᲒᲐᲚᲔᲠᲔᲐ',
        'nav.highlights': 'ᲒᲐᲛᲝᲠᲩᲔᲣᲚᲘ',
        'nav.contact': 'ᲙᲝᲜᲢᲐᲥᲢᲘ',
        'nav.media': 'ᲛᲔᲓᲘᲐ',
        'nav.partners': 'ᲞᲐᲠᲢᲜᲘᲝᲠᲔᲑᲘ',
        'nav.forBrands': 'ᲑᲠᲔᲜᲓᲔᲑᲘᲡᲗᲕᲘᲡ',
        'page.media.title': 'მედია',
        'page.media.subtitle': 'პრესა და გაშუქება',
        'page.partners.title': 'პარტნიორები',
        'page.partners.subtitle': 'ბრენდ თანამშრომლობა',
        'page.forBrands.title': 'ბრენდებისთვის',
        'page.forBrands.whyPartner': 'რატომ თანამშრომლობა',
        'page.forBrands.packages': 'პაკეტები',
        'page.forBrands.inquiryCta': 'დაგვიკავშირდით',
        'page.forBrands.subtitle': 'პრემიუმ ციფრული პარტნიორობა საერთაშორისო დონის რაგბისტთან.',
        'page.forBrands.proof': 'რატომ დავით ნინიაშვილი',
        'page.forBrands.process': 'როგორ მუშაობს',
        'page.forBrands.step1': 'გაცნობითი ზარი',
        'page.forBrands.step2': 'შეთავაზება + მასალები',
        'page.forBrands.step3': 'გაშვება',
        'home.media.title': '\u10e3\u10d0\u10ee\u10da\u10d4\u10e1\u10d8 \u10db\u10d4\u10d3\u10d8\u10d0',
        'home.career.title': 'კარიერა',
        'home.career.viewFull': 'სრული კარიერა',
        'home.highlights.viewGallery': 'სრული გალერეა',
        'home.partners.title': 'პარტნიორები',
        'home.partners.collaborations': 'ბრენდ თანამშრომლობა',
        'home.partners.sponsorship': 'ციფრული სპონსორობა',
        'home.partners.primaryAvailable': 'მთავარი ციფრული პარტნიორი — ხელმისაწვდომი',
        'home.partners.officialAvailable': 'ოფიციალური პარტნიორები — 3 ხელმისაწვდომი',
        'home.forBrands.cta': 'პარტნიორობის ვარიანტები',
        'page.contact.subtitle': 'დაგვიკავშირდით',
        'home.authority.slogan': 'რასაც აკეთებ — გიყვარდეს მთელი გულით!',
        'home.authority.status': 'მიმდინარე პერიოდში — Top14: Stade Rochelais | საქართველოს ეროვნული ნაკრები',
        'home.authority.cta.career': 'იხილეთ სრული კარიერა',
        'home.authority.cta.highlights': 'იხილეთ გამორჩეული მომენტები',
        'home.authority.kpis': [
            '4-\u10d2\u10d6\u10d8\u10e1 \u10d4\u10d5\u10e0\u10dd\u10de\u10d8\u10e1 \u10e0\u10d0\u10d2\u10d1\u10d8\u10e1 \u10e9\u10d4\u10db\u10de\u10d8\u10dd\u10dc\u10d0\u10e2\u10d8\u10e1 \u10d2\u10d0\u10db\u10d0\u10e0\u10ef\u10d5\u10d4\u10d1\u10e3\u10da\u10d8 (2021\u20132024)',
            'EPCR Challenge Cup \u10d2\u10d0\u10db\u10d0\u10e0\u10ef\u10d5\u10d4\u10d1\u10e3\u10da\u10d8 \u2014 Lyon (2021\u201322)',
            '46 \u10e1\u10d0\u10d4\u10e0\u10d7\u10d0\u10e8\u10dd\u10e0\u10d8\u10e1\u10dd \u10db\u10d0\u10e2\u10e9\u10d8 \u2014 \u10e1\u10d0\u10e5\u10d0\u10e0\u10d7\u10d5\u10d4\u10da\u10dd (\u10d3\u10d4\u10d1\u10d8\u10e3\u10e2\u10d8 2020)',
            'Oscars du Midi Olympique \u10d2\u10d0\u10db\u10d0\u10e0\u10ef\u10d5\u10d4\u10d1\u10e3\u10da\u10d8 (2023)',
            'RugbyPass Top 100 \u10db\u10dd\u10d7\u10d0\u10db\u10d0\u10e8\u10d4 \u2014 #83 (2025)',
            'Barbarian F.C. \u10d2\u10d0\u10db\u10dd\u10e9\u10d4\u10dc\u10d0 \u2014 80 \u10ec\u10e3\u10d7\u10d8 (2022)',
        ],
    },
    fr: {
        'nav.home': 'ACCUEIL',
        'nav.bio': 'BIO',
        'nav.career': 'CARRIÈRE',
        'nav.gallery': 'GALERIE',
        'nav.highlights': 'TEMPS FORTS',
        'nav.contact': 'CONTACT',
        'nav.media': 'MÉDIAS',
        'nav.partners': 'PARTENAIRES',
        'nav.forBrands': 'POUR LES MARQUES',
        'page.media.title': 'Médias',
        'page.media.subtitle': 'Presse & Couverture',
        'page.partners.title': 'Partenaires',
        'page.partners.subtitle': 'Collaborations de marque',
        'page.forBrands.title': 'Pour les marques',
        'page.forBrands.whyPartner': 'Pourquoi collaborer',
        'page.forBrands.packages': 'Forfaits',
        'page.forBrands.inquiryCta': 'Nous contacter',
        'page.forBrands.subtitle': 'Partenariat digital premium avec un athlète de rugby international.',
        'page.forBrands.proof': 'Pourquoi Davit Niniashvili',
        'page.forBrands.process': 'Comment ça marche',
        'page.forBrands.step1': 'Appel découverte',
        'page.forBrands.step2': 'Proposition + Visuels',
        'page.forBrands.step3': 'Lancement',
        'home.media.title': 'Dans les médias',
        'home.career.title': 'Carrière',
        'home.career.viewFull': 'Carrière complète',
        'home.highlights.viewGallery': 'Galerie complète',
        'home.partners.title': 'Partenaires',
        'home.partners.collaborations': 'Collaborations de marque',
        'home.partners.sponsorship': 'Opportunités de sponsoring',
        'home.partners.primaryAvailable': 'Partenaire digital principal — Disponible',
        'home.partners.officialAvailable': 'Partenaires officiels — 3 disponibles',
        'home.forBrands.cta': 'Découvrir les options',
        'page.contact.subtitle': 'Prendre contact',
        'home.authority.slogan': 'Aime ce que tu fais \u2014 de tout c\u0153ur !',
        'home.authority.status': 'Actuellement \u2014 Top14: Stade Rochelais | \u00c9quipe nationale de G\u00e9orgie',
        'home.authority.cta.career': 'Voir la carri\u00e8re compl\u00e8te',
        'home.authority.cta.highlights': 'Voir les moments forts',
        'home.authority.kpis': [
            '4\u00d7 Vainqueur du Championnat d\u2019Europe de Rugby (2021\u20132024)',
            'Vainqueur EPCR Challenge Cup \u2014 Lyon (2021\u201322)',
            '46 s\u00e9lections internationales \u2014 G\u00e9orgie (d\u00e9but 2020)',
            'Laur\u00e9at Oscars du Midi Olympique (2023)',
            'Joueur RugbyPass Top 100 \u2014 #83 (2025)',
            'Barbarian F.C. \u2014 80 minutes (2022)',
        ],
    }
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        // 1. Check persistence
        const saved = localStorage.getItem('site_lang');
        if (saved && ['ka', 'fr', 'en'].includes(saved)) {
            return saved;
        }

        // 2. Check browser locale
        const browserLang = navigator.language || navigator.languages?.[0];
        if (browserLang) {
            if (browserLang.toLowerCase().startsWith('ka')) return 'ka';
            if (browserLang.toLowerCase().startsWith('fr')) return 'fr';
        }

        // 3. Default
        return 'en';
    });

    useEffect(() => {
        localStorage.setItem('site_lang', language);
    }, [language]);

    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
