import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../ui/Section';
import Typography from '../ui/Typography';
import { useLanguage } from '../context/LanguageContext';
import { collaborations } from '../config/collaborations';

const PartnersPage = () => {
    const { t } = useLanguage();
    return (
        <Section className="min-h-[60vh]">
            <div className="text-center mb-16">
                <Typography variant="h1" className="text-rochelais-gold mb-4">
                    {t('page.partners.title')}
                </Typography>
                <Typography variant="body" className="text-mid-grey">
                    {t('page.partners.subtitle')}
                </Typography>
            </div>
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto mb-16">
                {collaborations.map((collab) => (
                    <div key={collab.id} className="text-center">
                        <Typography variant="h3" className="text-rochelais-gold mb-3">
                            {collab.name}
                        </Typography>
                        <Typography variant="body" className="text-mid-grey mb-4">
                            {collab.summary}
                        </Typography>
                        <ul className="flex flex-wrap justify-center gap-3">
                            {collab.assets.map((asset, i) => (
                                <li key={i} className="font-secondary text-xs uppercase tracking-widest text-off-white/50 border border-off-white/10 rounded px-3 py-1">
                                    {asset}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="text-center">
                <Link
                    to="/for-brands"
                    className="inline-block font-secondary text-sm uppercase tracking-widest px-6 py-2.5 bg-transparent border border-rochelais-gold/60 text-rochelais-gold rounded-xl shadow-sm hover:bg-rochelais-gold hover:text-obsidian transition-all duration-300"
                >
                    {t('home.forBrands.cta')}
                </Link>
            </div>
        </Section>
    );
};

export default PartnersPage;
