import React from 'react';
import Section from '../ui/Section';
import Typography from '../ui/Typography';
import { useLanguage } from '../context/LanguageContext';
import { sponsors } from '../config/sponsors';

const PROOF_POINTS = {
    en: [
        'Stade Rochelais \u2014 Elite Top 14 & Champions Cup competitor',
        'Georgia National Team \u2014 Established international performance',
        'High-engagement digital audience across Europe & Georgia',
        'International media coverage: Canal+, World Rugby, L\'\u00c9quipe',
        'Strategic athlete brand with exponential reach potential',
    ],
    ka: [
        'Stade Rochelais \u2014 Top 14 & Champions Cup \u10d4\u10da\u10d8\u10e2\u10d0\u10e0\u10e3\u10da\u10d8 \u10db\u10dd\u10dc\u10d0\u10ec\u10d8\u10da\u10d4',
        '\u10e1\u10d0\u10e5\u10d0\u10e0\u10d7\u10d5\u10d4\u10da\u10dd\u10e1 \u10d4\u10e0\u10dd\u10d5\u10dc\u10e3\u10da\u10d8 \u10dc\u10d0\u10d9\u10e0\u10d4\u10d1\u10d8 \u2014 \u10db\u10d3\u10d2\u10e0\u10d0\u10d3\u10d8 \u10e1\u10d0\u10d4\u10e0\u10d7\u10d0\u10e8\u10dd\u10e0\u10d8\u10e1\u10dd \u10e8\u10d4\u10d3\u10d4\u10d2\u10d4\u10d1\u10d8',
        '\u10db\u10d0\u10e6\u10d0\u10da\u10d8 \u10e9\u10d0\u10e0\u10d7\u10e3\u10da\u10dd\u10d1\u10d8\u10e1 \u10ea\u10d8\u10e4\u10e0\u10e3\u10da\u10d8 \u10d0\u10e3\u10d3\u10d8\u10e2\u10dd\u10e0\u10d8\u10d0 \u10d4\u10d5\u10e0\u10dd\u10de\u10d0\u10e1\u10d0 \u10d3\u10d0 \u10e1\u10d0\u10e5\u10d0\u10e0\u10d7\u10d5\u10d4\u10da\u10dd\u10e8\u10d8',
        '\u10d2\u10d0\u10db\u10dd\u10e0\u10e9\u10d4\u10e3\u10da\u10d8 \u10db\u10d4\u10d3\u10d8\u10d0 \u10d2\u10d0\u10e8\u10e3\u10e5\u10d4\u10d1\u10d0: Canal+, World Rugby, L\'\u00c9quipe',
        '\u10e1\u10e2\u10e0\u10d0\u10e2\u10d4\u10d2\u10d8\u10e3\u10da\u10d8 \u10e1\u10de\u10dd\u10e0\u10e2\u10e1\u10db\u10d4\u10dc\u10d8\u10e1 \u10d1\u10e0\u10d4\u10dc\u10d3\u10d8 \u10db\u10d0\u10e1\u10e8\u10e2\u10d0\u10d1\u10d8\u10e0\u10d4\u10d1\u10d0\u10d3\u10d8 \u10d4\u10e5\u10e1\u10de\u10dd\u10d6\u10d8\u10ea\u10d8\u10d8\u10d7',
    ],
    fr: [
        'Stade Rochelais \u2014 comp\u00e9titeur d\'\u00e9lite Top 14 & Champions Cup',
        '\u00c9quipe nationale de G\u00e9orgie \u2014 performance internationale reconnue',
        'Audience digitale \u00e0 fort engagement en Europe et en G\u00e9orgie',
        'Couverture m\u00e9diatique internationale : Canal+, World Rugby, L\'\u00c9quipe',
        'Marque athl\u00e8te strat\u00e9gique avec potentiel de rayonnement exponentiel',
    ],
};

const PACKAGES = {
    en: [
        {
            name: 'Primary Partner',
            slots: '01 Exclusive Slot',
            highlight: true,
            deliverables: [
                'Homepage hero integration',
                'Dedicated strategic brand page',
                'Global co-branded social initiatives',
                'Priority presence on all digital assets',
                'Direct collaboration + quarterly impact reports',
            ],
            idealFor: 'Full-scale, exclusive digital authority.',
        },
        {
            name: 'Official Partner',
            slots: 'Limited Availability',
            highlight: false,
            deliverables: [
                'Strategic logo placement',
                'Systematic social media integration',
                'Collaborative content development',
                'Commercial visibility alignment',
            ],
            idealFor: 'Consistent market presence alongside an elite athlete.',
        },
        {
            name: 'Supporting Partner',
            slots: 'Open Selection',
            highlight: false,
            deliverables: [
                'Logo placement on partnerships board',
                'Professional social acknowledgement',
                'Quarterly ecosystem highlights',
            ],
            idealFor: 'Emerging brands entering the premium sports market.',
        },
    ],
    ka: [
        {
            name: '\u10db\u10d7\u10d0\u10d5\u10d0\u10e0\u10d8 \u10de\u10d0\u10e0\u10e2\u10dc\u10d8\u10dd\u10e0\u10d8',
            slots: '01 \u10d4\u10e5\u10e1\u10d9\u10da\u10e3\u10d6\u10d8\u10e3\u10e0\u10d8 \u10d0\u10d3\u10d2\u10d8\u10da\u10d8',
            highlight: true,
            deliverables: [
                '\u10db\u10d7\u10d0\u10d5\u10d0\u10e0 \u10d2\u10d5\u10d4\u10e0\u10d3\u10d6\u10d4 Hero \u10d8\u10dc\u10e2\u10d4\u10d2\u10e0\u10d0\u10ea\u10d8\u10d0',
                '\u10d4\u10e5\u10e1\u10d9\u10da\u10e3\u10d6\u10d8\u10e3\u10e0\u10d8 \u10e1\u10e2\u10e0\u10d0\u10e2\u10d4\u10d2\u10d8\u10e3\u10da\u10d8 \u10d1\u10e0\u10d4\u10dc\u10d3 \u10d2\u10d5\u10d4\u10e0\u10d3\u10d8',
                '\u10d2\u10da\u10dd\u10d1\u10d0\u10da\u10e3\u10e0\u10d8 co-branded \u10d9\u10d0\u10db\u10de\u10d0\u10dc\u10d8\u10d4\u10d1\u10d8',
                '\u10de\u10e0\u10d8\u10dd\u10e0\u10d8\u10e2\u10d4\u10e2\u10e3\u10da\u10d8 \u10ec\u10d0\u10e0\u10db\u10dd\u10e9\u10d4\u10dc\u10d0 \u10ea\u10d8\u10e4\u10e0\u10e3\u10da \u10d0\u10e5\u10e2\u10d8\u10d5\u10d4\u10d1\u10d6\u10d4',
                '\u10de\u10d8\u10e0\u10d3\u10d0\u10de\u10d8\u10e0\u10d8 \u10d9\u10dd\u10da\u10d0\u10d1\u10dd\u10e0\u10d0\u10ea\u10d8\u10d0 + \u10d9\u10d5\u10d0\u10e0\u10e2\u10d0\u10da\u10e3\u10e0\u10d8 \u10d0\u10dc\u10d2\u10d0\u10e0\u10d8\u10e8\u10d4\u10d1\u10d8',
            ],
            idealFor: '\u10e1\u10e0\u10e3\u10da\u10db\u10d0\u10e1\u10e8\u10e2\u10d0\u10d1\u10d8\u10d0\u10dc\u10d8, \u10d4\u10e5\u10e1\u10d9\u10da\u10e3\u10d6\u10d8\u10e3\u10e0\u10d8 \u10ea\u10d8\u10e4\u10e0\u10e3\u10da\u10d8 \u10d0\u10d5\u10e2\u10dd\u10e0\u10d8\u10e2\u10d4\u10e2\u10d8.',
        },
        {
            name: '\u10dd\u10e4\u10d8\u10ea\u10d8\u10d0\u10da\u10e3\u10e0\u10d8 \u10de\u10d0\u10e0\u10e2\u10dc\u10d8\u10dd\u10e0\u10d8',
            slots: '\u10e8\u10d4\u10d6\u10e6\u10e3\u10d3\u10e3\u10da\u10d8 \u10e0\u10d0\u10dd\u10d3\u10d4\u10dc\u10dd\u10d1\u10d0',
            highlight: false,
            deliverables: [
                '\u10e1\u10e2\u10e0\u10d0\u10e2\u10d4\u10d2\u10d8\u10e3\u10da\u10d8 \u10da\u10dd\u10d2\u10dd \u10d8\u10dc\u10e2\u10d4\u10d2\u10e0\u10d0\u10ea\u10d8\u10d0',
                '\u10e1\u10d8\u10e1\u10e2\u10d4\u10db\u10d0\u10e2\u10e3\u10e0\u10d8 \u10e9\u10d0\u10e0\u10d7\u10d5\u10d0 \u10e1\u10dd\u10ea\u10d8\u10d0\u10da\u10e3\u10e0 \u10db\u10d4\u10d3\u10d8\u10d0\u10e8\u10d8',
                '\u10d9\u10dd\u10da\u10d0\u10d1\u10dd\u10e0\u10d0\u10ea\u10d8\u10e3\u10da\u10d8 \u10d9\u10dd\u10dc\u10e2\u10d4\u10dc\u10e2\u10d8\u10e1 \u10ec\u10d0\u10e0\u10db\u10dd\u10d4\u10d1\u10d0',
                '\u10d9\u10dd\u10db\u10d4\u10e0\u10ea\u10d8\u10e3\u10da\u10d8 \u10ee\u10d8\u10da\u10d5\u10d0\u10d3\u10dd\u10d1\u10d8\u10e1 \u10d0\u10da\u10d0\u10d8\u10dc\u10db\u10d4\u10dc\u10e2\u10d8',
            ],
            idealFor: '\u10e1\u10e2\u10d0\u10d1\u10d8\u10da\u10e3\u10e0\u10d8 \u10d4\u10e5\u10e1\u10de\u10dd\u10d6\u10d8\u10ea\u10d8\u10d0 \u10d4\u10da\u10d8\u10e2\u10d0\u10e0\u10e3\u10da \u10e1\u10de\u10dd\u10e0\u10e2\u10e1\u10db\u10d4\u10dc\u10d7\u10d0\u10dc \u10d4\u10e0\u10d7\u10d0\u10d3.',
        },
        {
            name: '\u10db\u10ee\u10d0\u10e0\u10d3\u10d0\u10db\u10ed\u10d4\u10e0\u10d8 \u10de\u10d0\u10e0\u10e2\u10dc\u10d8\u10dd\u10e0\u10d8',
            slots: '\u10e6\u10d8\u10d0 \u10e8\u10d4\u10e0\u10e9\u10d4\u10d5\u10d0',
            highlight: false,
            deliverables: [
                '\u10da\u10dd\u10d2\u10dd \u10de\u10d0\u10e0\u10e2\u10dc\u10d8\u10dd\u10e0\u10d4\u10d1\u10d8\u10e1 \u10d3\u10d0\u10e4\u10d0\u10d6\u10d4',
                '\u10de\u10e0\u10dd\u10e4\u10d4\u10e1\u10d8\u10dd\u10dc\u10d0\u10da\u10e3\u10e0\u10d8 \u10d0\u10e6\u10d8\u10d0\u10e0\u10d4\u10d1\u10d0 \u10e1\u10dd\u10ea\u10d8\u10d0\u10da\u10e3\u10e0 \u10db\u10d4\u10d3\u10d8\u10d0\u10e8\u10d8',
                '\u10d9\u10d5\u10d0\u10e0\u10e2\u10d0\u10da\u10e3\u10e0\u10d8 \u10d4\u10d9\u10dd\u10e1\u10d8\u10e1\u10e2\u10d4\u10db\u10e3\u10e0\u10d8 highlights',
            ],
            idealFor: '\u10db\u10d6\u10d0\u10e0\u10d3\u10d8 \u10d1\u10e0\u10d4\u10dc\u10d3\u10d4\u10d1\u10d8 \u10de\u10e0\u10d4\u10db\u10d8\u10e3\u10db \u10e1\u10de\u10dd\u10e0\u10e2\u10e3\u10da \u10d1\u10d0\u10d6\u10d0\u10e0\u10d6\u10d4.',
        },
    ],
    fr: [
        {
            name: 'Partenaire Principal',
            slots: '01 Place Exclusive',
            highlight: true,
            deliverables: [
                'Int\u00e9gration Hero en page d\'accueil',
                'Page de marque strat\u00e9gique d\u00e9di\u00e9e',
                'Initiatives co-brand\u00e9es mondiales sur les r\u00e9seaux sociaux',
                'Pr\u00e9sence prioritaire sur tous les supports digitaux',
                'Collaboration directe + rapports d\'impact trimestriels',
            ],
            idealFor: 'Autorit\u00e9 digitale exclusive et \u00e0 grande \u00e9chelle.',
        },
        {
            name: 'Partenaire Officiel',
            slots: 'Disponibilit\u00e9 Limit\u00e9e',
            highlight: false,
            deliverables: [
                'Placement strat\u00e9gique du logo',
                'Int\u00e9gration syst\u00e9matique sur les r\u00e9seaux sociaux',
                'D\u00e9veloppement de contenu collaboratif',
                'Alignement de la visibilit\u00e9 commerciale',
            ],
            idealFor: 'Pr\u00e9sence march\u00e9 r\u00e9guli\u00e8re aux c\u00f4t\u00e9s d\'un athl\u00e8te d\'\u00e9lite.',
        },
        {
            name: 'Partenaire de Soutien',
            slots: 'S\u00e9lection Ouverte',
            highlight: false,
            deliverables: [
                'Placement du logo sur le tableau des partenariats',
                'Reconnaissance professionnelle sur les r\u00e9seaux sociaux',
                'Points saillants trimestriels de l\'\u00e9cosyst\u00e8me',
            ],
            idealFor: 'Marques \u00e9mergentes entrant sur le march\u00e9 du sport premium.',
        },
    ],
};

const ForBrandsPage = () => {
    const { t, language } = useLanguage();
    const proofPoints = PROOF_POINTS[language] || PROOF_POINTS.en;
    const packages = PACKAGES[language] || PACKAGES.en;
    const steps = [
        { num: '01', label: t('page.forBrands.step1') },
        { num: '02', label: t('page.forBrands.step2') },
        { num: '03', label: t('page.forBrands.step3') },
    ];

    return (
        <>
            {/* A) Hero Header */}
            <Section className="min-h-[40vh] flex items-end pb-10 bg-surface-base">
                <div className="text-center w-full">
                    <Typography variant="h1" className="text-rochelais-gold mb-4">
                        {t('page.forBrands.title')}
                    </Typography>
                    <p className="font-primary text-base md:text-lg text-off-white/70 leading-relaxed max-w-2xl mx-auto">
                        {t('page.forBrands.subtitle')}
                    </p>
                </div>
            </Section>

            {/* B) Proof Block */}
            <Section className="bg-surface-base border-t border-divider">
                <Typography variant="h2" className="text-off-white mb-10 text-center">
                    {t('page.forBrands.proof')}
                </Typography>
                <ul className="max-w-3xl mx-auto space-y-4">
                    {proofPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <span className="w-2 h-2 mt-2 bg-rochelais-gold rounded-full flex-shrink-0"></span>
                            <span className="font-primary text-base text-off-white/80">{point}</span>
                        </li>
                    ))}
                </ul>
            </Section>

            {/* C) Packages */}
            <Section className="bg-obsidian border-t border-divider">
                <Typography variant="h2" className="text-off-white mb-12 text-center">
                    {t('page.forBrands.packages')}
                </Typography>
                <div className="grid md:grid-cols-3 gap-6">
                    {packages.map((pkg, i) => (
                        <div
                            key={i}
                            className={`rounded-lg p-6 flex flex-col ${pkg.highlight
                                ? 'bg-surface-raised border border-rochelais-gold/30'
                                : 'bg-surface-base border border-divider'
                                }`}
                        >
                            <Typography variant="h3" className={`mb-2 ${pkg.highlight ? 'text-rochelais-gold' : 'text-off-white'}`}>
                                {pkg.name}
                            </Typography>
                            <p className="font-secondary text-xs uppercase tracking-widest text-rochelais-gold/70 mb-5">
                                {pkg.slots}
                            </p>
                            <ul className="space-y-2 mb-6 flex-1">
                                {pkg.deliverables.map((d, j) => (
                                    <li key={j} className="flex items-start gap-2">
                                        <span className="text-rochelais-gold/50 mt-0.5">\u00b7</span>
                                        <span className="font-primary text-sm text-off-white/70">{d}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="font-primary text-sm text-off-white/50 italic border-t border-divider pt-4">
                                {pkg.idealFor}
                            </p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* D) Process / Timeline */}
            <Section className="bg-surface-base border-t border-divider">
                <Typography variant="h2" className="text-off-white mb-12 text-center">
                    {t('page.forBrands.process')}
                </Typography>
                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    {steps.map((step) => (
                        <div key={step.num} className="text-center">
                            <p className="font-secondary text-3xl text-rochelais-gold/30 mb-3">{step.num}</p>
                            <p className="font-primary text-base text-off-white uppercase tracking-wide">{step.label}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* E) Single Conversion CTA */}
            <Section className="bg-surface-raised border-t border-divider">
                <div className="text-center">
                    <a
                        href="mailto:contact@davitniniashvili.com"
                        className="inline-block font-secondary text-sm uppercase tracking-widest px-6 py-2.5 bg-transparent border border-rochelais-gold/60 text-rochelais-gold rounded-xl shadow-sm hover:bg-rochelais-gold hover:text-obsidian transition-all duration-300"
                    >
                        {t('page.forBrands.inquiryCta')}
                    </a>
                </div>
            </Section>
        </>
    );
};

export default ForBrandsPage;
