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
        'page.media.title': 'Visibility',
        'page.media.subtitle': 'Global reach and international media coverage.',
        'page.partners.title': 'Partners',
        'page.partners.subtitle': 'A strategic ecosystem of global brand collaborations.',
        'page.forBrands.title': 'Partnerships',
        'page.forBrands.whyPartner': 'Value Proposition',
        'page.forBrands.packages': 'Commercial Opportunities',
        'page.forBrands.inquiryCta': 'Direct Inquiry',
        'page.forBrands.subtitle': 'Exclusive digital partnership with a top-tier international athlete brand.',
        'page.forBrands.proof': 'Impact & Authority',
        'page.forBrands.process': 'Strategic Path',
        'page.forBrands.step1': 'Alignment Call',
        'page.forBrands.step2': 'Strategic Proposal',
        'page.forBrands.step3': 'Brand Integration',
        'home.media.title': 'Global Presence',
        'home.career.title': 'Professional Career',
        'home.career.viewFull': 'Explore Full Career',
        'home.highlights.viewGallery': 'Explore Full Archive',
        'home.partners.title': 'Partners',
        'home.partners.collaborations': 'Commercial Partners',
        'home.partners.sponsorship': 'Strategic Partnerships',
        'home.partners.primaryAvailable': 'Primary Digital Partner — Available',
        'home.partners.officialAvailable': 'Official Partners — Selection Active',
        'home.forBrands.cta': 'Partner with Niniashvili',
        'page.contact.subtitle': 'Inquiries and professional representation.',
        'home.authority.slogan': 'Love what you do \u2014 wholeheartedly!',
        'home.authority.author': 'Davit Niniashvili',
        'home.authority.positioning': 'Global Performance. Elite Authority.',
        'home.authority.status': 'Current \u2014 Top14: Stade Rochelais | Georgia national team',
        'home.authority.cta.career': 'Professional Career',
        'home.authority.cta.highlights': 'Featured Moments',
        'home.authority.kpis': [
            '4\u00d7 European Rugby Championship Winner (2021\u20132024)',
            'EPCR Challenge Cup Winner \u2014 Lyon (2021\u201322)',
            '46 International Caps \u2014 Georgia (debut 2020)',
            'Oscars du Midi Olympique Winner (2023)',
            'RugbyPass Top 100 Player \u2014 #83 (2025)',
            'Barbarian F.C. Appearance \u2014 80 minutes (2022)',
        ],
        'home.authority.svg1.title': 'European Champion',
        'home.authority.svg1.subline': '2021\u20132024',
        'home.authority.svg2.title': 'Challenge Cup',
        'home.authority.svg2.subline': 'Winner \u2014 Lyon',
        'home.authority.svg3.title': 'Top 100 Player',
        'home.authority.svg3.subline': 'RugbyPass 2025',
        'page.bio.position': 'Position',
        'page.bio.currentTeam': 'Current Team',
        'page.bio.previousTeam': 'Previous Team',
        'page.bio.nationality': 'Nationality',
        'page.bio.birthDate': 'Birth Date',
        'page.bio.about': 'About',
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
        'page.media.title': 'ხილვადობა',
        'page.media.subtitle': 'გლობალური მასშტაბი და საერთაშორისო მედია გაშუქება.',
        'page.partners.title': 'პარტნიორები',
        'page.partners.subtitle': 'გლობალური ბრენდ თანამშრომლობის სტრატეგიული ეკოსისტემა.',
        'page.forBrands.title': 'პარტნიორობა',
        'page.forBrands.whyPartner': 'ღირებულება',
        'page.forBrands.packages': 'კომერციული შესაძლებლობები',
        'page.forBrands.inquiryCta': 'პირდაპირი მოთხოვნა',
        'page.forBrands.subtitle': 'ექსკლუზიური ციფრული პარტნიორობა უმაღლესი დონის საერთაშორისო სპორტსმენთან.',
        'page.forBrands.proof': 'გავლენა და ავტორიტეტი',
        'page.forBrands.process': 'სტრატეგიული გზა',
        'page.forBrands.step1': 'გაცნობითი ზარი',
        'page.forBrands.step2': 'სტრატეგიული შეთავაზება',
        'page.forBrands.step3': 'ბრენდ ინტეგრაცია',
        'home.media.title': 'მედია პლატფორმა',
        'home.career.title': 'პროფესიული კარიერა',
        'home.career.viewFull': 'სრული კარიერული გზა',
        'home.highlights.viewGallery': 'სრული არქივი',
        'home.partners.title': 'პარტნიორები',
        'home.partners.collaborations': 'კომერციული პარტნიორები',
        'home.partners.sponsorship': 'სტრატეგიული თანამშრომლობა',
        'home.partners.primaryAvailable': 'მთავარი ციფრული პარტნიორი — ხელმისაწვდომია',
        'home.partners.officialAvailable': 'ოფიციალური პარტნიორების შერჩევა',
        'home.forBrands.cta': 'პარტნიორობა ნინიაშვილთან',
        'page.contact.subtitle': 'მოთხოვნები და პროფესიული წარმომადგენლობა.',
        'home.authority.slogan': 'რასაც აკეთებ — გიყვარდეს მთელი გულით!',
        'home.authority.author': 'დავით ნინიაშვილი',
        'home.authority.positioning': 'გლობალური თამაში. ელიტარული ავტორიტეტი.',
        'home.authority.status': 'მიმდინარე პერიოდში — Top14: Stade Rochelais | საქართველოს ეროვნული ნაკრები',
        'home.authority.cta.career': 'პროფესიული კარიერა',
        'home.authority.cta.highlights': 'გამორჩეული მომენტები',
        'home.authority.kpis': [
            '5-გზის ევროპის რაგბის ჩემპიონატის გამარჯვებული (2021–2025)',
            'EPCR Challenge Cup \u10d2\u10d0\u10db\u10d0\u10e0\u10ef\u10d5\u10d4\u10d1\u10e3\u10da\u10d8 \u2014 Lyon (2021\u201322)',
            '46 \u10e1\u10d0\u10d4\u10e0\u10d7\u10d0\u10e8\u10dd\u10e0\u10d8\u10e1\u10dd \u10db\u10d0\u10e2\u10e9\u10d8 \u2014 \u10e1\u10d0\u10e5\u10d0\u10e0\u10d7\u10d5\u10d4\u10da\u10dd (\u10d3\u10d4\u10d1\u10d8\u10e3\u10e2\u10d8 2020)',
            'un Oscar Midi Olympique მფლობელი (2023)',
            'RugbyPass Top 100 \u10db\u10dd\u10d7\u10d0\u10db\u10d0\u10e8\u10d4 \u2014 #83 (2025)',
            'Barbarian F.C. \u10d2\u10d0\u10db\u10dd\u10e9\u10d4\u10dc\u10d0 \u2014 80 \u10ec\u10e3\u10d7\u10d8 (2022)',
        ],
        'home.authority.svg1.title': 'ევროპის ჩემპიონი',
        'home.authority.svg1.subline': '2021\u20132024',
        'home.authority.svg2.title': 'ჩელენჯ ქაფი',
        'home.authority.svg2.subline': 'გამარჯვებული — ლიონი',
        'home.authority.svg3.title': 'Top 100 მოთამაშე',
        'home.authority.svg3.subline': 'RugbyPass 2025',
        'page.bio.position': 'პოზიცია',
        'page.bio.currentTeam': 'მიმდინარე გუნდი',
        'page.bio.previousTeam': 'წინა გუნდი',
        'page.bio.nationality': 'მოქალაქეობა',
        'page.bio.birthDate': 'დაბადების თარიღი',
        'page.bio.about': 'ბიოგრაფია',
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
        'page.media.title': 'Visibilit\u00e9',
        'page.media.subtitle': 'Rayonnement mondial et couverture m\u00e9diatique internationale.',
        'page.partners.title': 'Partenaires',
        'page.partners.subtitle': 'Un \u00e9cosyst\u00e8me strat\u00e9gique de collaborations mondiales.',
        'page.forBrands.title': 'Partenariats',
        'page.forBrands.whyPartner': 'Proposition de Valeur',
        'page.forBrands.packages': 'Opportunit\u00e9s Commerciales',
        'page.forBrands.inquiryCta': 'Demande Directe',
        'page.forBrands.subtitle': 'Partenariat digital exclusif avec une marque d\'athl\u00e8te international d\'\u00e9lite.',
        'page.forBrands.proof': 'Impact et Autorit\u00e9',
        'page.forBrands.process': 'Parcours Strat\u00e9gique',
        'page.forBrands.step1': 'Appel d\'alignement',
        'page.forBrands.step2': 'Proposition Strat\u00e9gique',
        'page.forBrands.step3': 'Int\u00e9gration de Marque',
        'home.media.title': 'Pr\u00e9sence Mondiale',
        'home.career.title': 'Carri\u00e8re Professionnelle',
        'home.career.viewFull': 'Explorer la carri\u00e8re compl\u00e8te',
        'home.highlights.viewGallery': 'Explorer l\'archive compl\u00e8te',
        'home.partners.title': 'Partenaires',
        'home.partners.collaborations': 'Partenaires Commerciaux',
        'home.partners.sponsorship': 'Partenariats Strat\u00e9giques',
        'home.partners.primaryAvailable': 'Partenaire digital principal — Disponible',
        'home.partners.officialAvailable': 'Partenaires officiels — S\u00e9lection active',
        'home.forBrands.cta': 'Collaborer avec Niniashvili',
        'page.contact.subtitle': 'Inqu\u00eates et repr\u00e9sentation professionnelle.',
        'home.authority.slogan': 'Aime ce que tu fais \u2014 de tout c\u0153ur !',
        'home.authority.author': 'Davit Niniashvili',
        'home.authority.positioning': 'Performance Mondiale. Autorit\u00e9 d\'\u00c9lite.',
        'home.authority.status': 'Actuellement \u2014 Top14: Stade Rochelais | \u00c9quipe nationale de G\u00e9orgie',
        'home.authority.cta.career': 'Carri\u00e8re Professionnelle',
        'home.authority.cta.highlights': 'Moments Forts',
        'home.authority.kpis': [
            '4\u00d7 Vainqueur du Championnat d\u2019Europe de Rugby (2021\u20132024)',
            'Vainqueur EPCR Challenge Cup \u2014 Lyon (2021\u201322)',
            '46 s\u00e9lections internationales \u2014 G\u00e9orgie (d\u00e9but 2020)',
            'Laur\u00e9at Oscars du Midi Olympique (2023)',
            'Joueur RugbyPass Top 100 \u2014 #83 (2025)',
            'Barbarian F.C. \u2014 80 minutes (2022)',
        ],
        'home.authority.svg1.title': 'Champion d\'Europe',
        'home.authority.svg1.subline': '2021\u20132024',
        'home.authority.svg2.title': 'Challenge Cup',
        'home.authority.svg2.subline': 'Vainqueur \u2014 Lyon',
        'home.authority.svg3.title': 'Top 100 Joueur',
        'home.authority.svg3.subline': 'RugbyPass 2025',
        'page.bio.position': 'Poste',
        'page.bio.currentTeam': 'Équipe Actuelle',
        'page.bio.previousTeam': 'Équipe Précédente',
        'page.bio.nationality': 'Nationalité',
        'page.bio.birthDate': 'Date de Naissance',
        'page.bio.about': 'À Propos',
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
