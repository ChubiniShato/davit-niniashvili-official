import React from 'react';
import Section from '../ui/Section';
import Typography from '../ui/Typography';
import { useLanguage } from '../context/LanguageContext';
import { sponsors } from '../config/sponsors';

const PROOF_POINTS = {
    en: [
        'Stade Rochelais \u2014 Top 14 & Champions Cup competitor',
        'Georgia National Team \u2014 full international',
        'Growing digital audience across Europe & Georgia',
        'Media coverage: Canal+, World Rugby, L\'\u00c9quipe',
        'High-engagement athlete brand with growing reach',
    ],
    ka: [
        'Stade Rochelais \u2014 Top 14 & Champions Cup \u10db\u10dd\u10dc\u10d0\u10ec\u10d8\u10da\u10d4',
        '\u10e1\u10d0\u10e5\u10d0\u10e0\u10d7\u10d5\u10d4\u10da\u10dd\u10e1 \u10d4\u10e0\u10dd\u10d5\u10dc\u10e3\u10da\u10d8 \u10dc\u10d0\u10d9\u10e0\u10d4\u10d1\u10d8 \u2014 \u10e1\u10e0\u10e3\u10da\u10d8 \u10e1\u10d0\u10d4\u10e0\u10d7\u10d0\u10e8\u10dd\u10e0\u10d8\u10e1\u10dd',
        '\u10db\u10d6\u10d0\u10e0\u10d3\u10d8 \u10ea\u10d8\u10e4\u10e0\u10e3\u10da\u10d8 \u10d0\u10e3\u10d3\u10d8\u10e2\u10dd\u10e0\u10d8\u10d0 \u10d4\u10d5\u10e0\u10dd\u10de\u10d0\u10e1\u10d0 \u10d3\u10d0 \u10e1\u10d0\u10e5\u10d0\u10e0\u10d7\u10d5\u10d4\u10da\u10dd\u10e8\u10d8',
        '\u10db\u10d4\u10d3\u10d8\u10d0 \u10d2\u10d0\u10e8\u10e3\u10e5\u10d4\u10d1\u10d0: Canal+, World Rugby, L\'\u00c9quipe',
        '\u10db\u10d0\u10e6\u10d0\u10da\u10d8 \u10e9\u10d0\u10e0\u10d7\u10e3\u10da\u10dd\u10d1\u10d8\u10e1 \u10e1\u10de\u10dd\u10e0\u10e2\u10e1\u10db\u10d4\u10dc\u10d8\u10e1 \u10d1\u10e0\u10d4\u10dc\u10d3\u10d8 \u10db\u10d6\u10d0\u10e0\u10d3\u10d8 \u10d0\u10e3\u10d3\u10d8\u10e2\u10dd\u10e0\u10d8\u10d8\u10d7',
    ],
    fr: [
        'Stade Rochelais \u2014 comp\u00e9titeur Top 14 & Champions Cup',
        '\u00c9quipe nationale de G\u00e9orgie \u2014 international \u00e0 part enti\u00e8re',
        'Audience digitale croissante en Europe et en G\u00e9orgie',
        'Couverture m\u00e9diatique : Canal+, World Rugby, L\'\u00c9quipe',
        'Marque athl\u00e8te \u00e0 fort engagement et audience croissante',
    ],
};

const PACKAGES = {
    en: [
        {
            name: sponsors.primary.label,
            slots: '1 exclusive slot',
            highlight: true,
            deliverables: [
                'Homepage hero placement',
                'Dedicated brand integration page',
                'Co-branded social media content',
                'Priority logo on all digital assets',
                'Direct athlete collaboration + quarterly reporting',
            ],
            idealFor: 'Exclusive, high-visibility digital presence.',
        },
        {
            name: 'Official Partner',
            slots: `${sponsors.official.length} slots available`,
            highlight: false,
            deliverables: [
                'Logo placement on partner page',
                'Social media mentions (monthly)',
                'Co-branded content opportunities',
                'Event visibility integration',
            ],
            idealFor: 'Consistent exposure alongside a top athlete.',
        },
        {
            name: 'Support Partner',
            slots: 'Open',
            highlight: false,
            deliverables: [
                'Logo on partners page',
                'Social media acknowledgment',
                'Newsletter feature (quarterly)',
            ],
            idealFor: 'Emerging brands or local businesses.',
        },
    ],
    ka: [
        {
            name: '\u10db\u10d7\u10d0\u10d5\u10d0\u10e0\u10d8 \u10ea\u10d8\u10e4\u10e0\u10e3\u10da\u10d8 \u10de\u10d0\u10e0\u10e2\u10dc\u10d8\u10dd\u10e0\u10d8',
            slots: '1 \u10d4\u10e5\u10e1\u10d9\u10da\u10e3\u10d6\u10d8\u10e3\u10e0\u10d8 \u10d0\u10d3\u10d2\u10d8\u10da\u10d8',
            highlight: true,
            deliverables: [
                '\u10db\u10d7\u10d0\u10d5\u10d0\u10e0 \u10d2\u10d5\u10d4\u10e0\u10d3\u10d6\u10d4 Hero \u10d2\u10d0\u10dc\u10d7\u10d0\u10d5\u10e1\u10d4\u10d1\u10d0',
                '\u10e1\u10de\u10d4\u10ea\u10d8\u10d0\u10da\u10e3\u10e0\u10d8 \u10d1\u10e0\u10d4\u10dc\u10d3 \u10d8\u10dc\u10e2\u10d4\u10d2\u10e0\u10d0\u10ea\u10d8\u10d8\u10e1 \u10d2\u10d5\u10d4\u10e0\u10d3\u10d8',
                '\u10e1\u10dd\u10ea\u10d8\u10d0\u10da\u10e3\u10e0 \u10db\u10d4\u10d3\u10d8\u10d0\u10e8\u10d8 \u10d4\u10e0\u10d7\u10dd\u10d1\u10da\u10d8\u10d5\u10d8 \u10d9\u10dd\u10dc\u10e2\u10d4\u10dc\u10e2\u10d8',
                '\u10de\u10e0\u10d8\u10dd\u10e0\u10d8\u10e2\u10d4\u10e2\u10e3\u10da\u10d8 \u10da\u10dd\u10d2\u10dd \u10e7\u10d5\u10d4\u10da\u10d0 \u10ea\u10d8\u10e4\u10e0\u10e3\u10da \u10d0\u10e5\u10e2\u10d8\u10d5\u10d6\u10d4',
                '\u10de\u10d8\u10e0\u10d3\u10d0\u10de\u10d8\u10e0\u10d8 \u10d7\u10d0\u10dc\u10d0\u10db\u10e8\u10e0\u10dd\u10db\u10da\u10dd\u10d1\u10d0 + \u10d9\u10d5\u10d0\u10e0\u10e2\u10d0\u10da\u10e3\u10e0\u10d8 \u10d0\u10dc\u10d2\u10d0\u10e0\u10d8\u10e8\u10d8',
            ],
            idealFor: '\u10d4\u10e5\u10e1\u10d9\u10da\u10e3\u10d6\u10d8\u10e3\u10e0\u10d8 \u10ea\u10d8\u10e4\u10e0\u10e3\u10da\u10d8 \u10e7\u10dd\u10e4\u10dc\u10d0 \u10db\u10d0\u10e6\u10d0\u10da\u10d8 \u10ee\u10d8\u10da\u10d5\u10d0\u10d3\u10dd\u10d1\u10d8\u10d7.',
        },
        {
            name: '\u10dd\u10e4\u10d8\u10ea\u10d8\u10d0\u10da\u10e3\u10e0\u10d8 \u10de\u10d0\u10e0\u10e2\u10dc\u10d8\u10dd\u10e0\u10d8',
            slots: `${sponsors.official.length} \u10ee\u10d4\u10da\u10db\u10d8\u10e1\u10d0\u10ec\u10d5\u10d3\u10dd\u10db\u10d8`,
            highlight: false,
            deliverables: [
                '\u10da\u10dd\u10d2\u10dd \u10de\u10d0\u10e0\u10e2\u10dc\u10d8\u10dd\u10e0\u10d4\u10d1\u10d8\u10e1 \u10d2\u10d5\u10d4\u10e0\u10d3\u10d6\u10d4',
                '\u10e1\u10dd\u10ea\u10d8\u10d0\u10da\u10e3\u10e0 \u10db\u10d4\u10d3\u10d8\u10d0\u10e8\u10d8 \u10ee\u10e1\u10d4\u10dc\u10d4\u10d1\u10d0 (\u10e7\u10dd\u10d5\u10d4\u10da\u10d7\u10d5\u10d4)',
                '\u10d4\u10e0\u10d7\u10dd\u10d1\u10da\u10d8\u10d5\u10d8 \u10d9\u10dd\u10dc\u10e2\u10d4\u10dc\u10e2\u10d8\u10e1 \u10e8\u10d4\u10e1\u10d0\u10eb\u10da\u10d4\u10d1\u10da\u10dd\u10d1\u10d0',
                '\u10e6\u10dd\u10dc\u10d8\u10e1\u10eb\u10d8\u10d4\u10d1\u10d4\u10d1\u10d6\u10d4 \u10d8\u10dc\u10e2\u10d4\u10d2\u10e0\u10d0\u10ea\u10d8\u10d0',
            ],
            idealFor: '\u10e1\u10e2\u10d0\u10d1\u10d8\u10da\u10e3\u10e0\u10d8 \u10d4\u10e5\u10e1\u10de\u10dd\u10d6\u10d8\u10ea\u10d8\u10d0 \u10e2\u10dd\u10de \u10e1\u10de\u10dd\u10e0\u10e2\u10e1\u10db\u10d4\u10dc\u10d7\u10d0\u10dc \u10d4\u10e0\u10d7\u10d0\u10d3.',
        },
        {
            name: '\u10db\u10ee\u10d0\u10e0\u10d3\u10d0\u10db\u10ed\u10d4\u10e0\u10d8 \u10de\u10d0\u10e0\u10e2\u10dc\u10d8\u10dd\u10e0\u10d8',
            slots: '\u10e6\u10d8\u10d0',
            highlight: false,
            deliverables: [
                '\u10da\u10dd\u10d2\u10dd \u10de\u10d0\u10e0\u10e2\u10dc\u10d8\u10dd\u10e0\u10d4\u10d1\u10d8\u10e1 \u10d2\u10d5\u10d4\u10e0\u10d3\u10d6\u10d4',
                '\u10e1\u10dd\u10ea\u10d8\u10d0\u10da\u10e3\u10e0 \u10db\u10d4\u10d3\u10d8\u10d0\u10e8\u10d8 \u10ee\u10e1\u10d4\u10dc\u10d4\u10d1\u10d0',
                '\u10dc\u10d8\u10e3\u10e1\u10da\u10d4\u10d7\u10d4\u10e0\u10e8\u10d8 \u10d2\u10d0\u10db\u10dd\u10e9\u10d4\u10dc\u10d0 (\u10d9\u10d5\u10d0\u10e0\u10e2\u10d0\u10da\u10e3\u10e0\u10d0\u10d3)',
            ],
            idealFor: '\u10db\u10d6\u10d0\u10e0\u10d3\u10d8 \u10d1\u10e0\u10d4\u10dc\u10d3\u10d4\u10d1\u10d8 \u10d3\u10d0 \u10d0\u10d3\u10d2\u10d8\u10da\u10dd\u10d1\u10e0\u10d8\u10d5\u10d8 \u10d1\u10d8\u10d6\u10dc\u10d4\u10e1\u10d4\u10d1\u10d8.',
        },
    ],
    fr: [
        {
            name: 'Partenaire Digital Principal',
            slots: '1 place exclusive',
            highlight: true,
            deliverables: [
                'Placement Hero en page d\'accueil',
                'Page d\u00e9di\u00e9e d\'int\u00e9gration de marque',
                'Contenu co-brand\u00e9 sur les r\u00e9seaux sociaux',
                'Logo prioritaire sur tous les supports digitaux',
                'Collaboration directe + reporting trimestriel',
            ],
            idealFor: 'Pr\u00e9sence digitale exclusive et haute visibilit\u00e9.',
        },
        {
            name: 'Partenaire Officiel',
            slots: `${sponsors.official.length} places disponibles`,
            highlight: false,
            deliverables: [
                'Logo sur la page partenaires',
                'Mentions sur les r\u00e9seaux sociaux (mensuel)',
                'Opportunit\u00e9s de contenu co-brand\u00e9',
                'Int\u00e9gration \u00e9v\u00e9nementielle',
            ],
            idealFor: 'Exposition r\u00e9guli\u00e8re aux c\u00f4t\u00e9s d\'un athl\u00e8te de haut niveau.',
        },
        {
            name: 'Partenaire de Soutien',
            slots: 'Ouvert',
            highlight: false,
            deliverables: [
                'Logo sur la page partenaires',
                'Reconnaissance sur les r\u00e9seaux sociaux',
                'Feature newsletter (trimestriel)',
            ],
            idealFor: 'Marques \u00e9mergentes ou entreprises locales.',
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
