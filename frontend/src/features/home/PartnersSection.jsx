import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { collaborations } from '../../config/collaborations';
import { sponsors } from '../../config/sponsors';

const PartnersSection = () => {
    const { t } = useLanguage();
    const officialCount = sponsors.official.filter(s => s.status === 'available').length;

    return (
        <section id="partners" className="w-full bg-surface-base border-t border-divider py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <h2 className="font-primary text-3xl md:text-5xl font-bold uppercase tracking-wide text-off-white mb-16 text-center">
                    {t('home.partners.title')}
                </h2>

                <div className="grid md:grid-cols-2 gap-12 md:gap-16">
                    {/* A) Brand Collaborations */}
                    <div className="border-l-2 border-rochelais-gold/10 pl-5">
                        <h3 className="font-primary text-xl md:text-2xl font-semibold uppercase tracking-wide text-off-white mb-6">
                            {t('home.partners.collaborations')}
                        </h3>
                        <ul className="space-y-3 mb-8">
                            {collaborations.map((collab) => (
                                <li key={collab.id} className="font-primary text-base text-off-white/80 flex items-center gap-3">
                                    <span className="w-2 h-2 bg-rochelais-gold rounded-full flex-shrink-0"></span>
                                    {collab.name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* B) Digital Sponsorship */}
                    <div className="border-l-2 border-off-white/10 pl-5">
                        <h3 className="font-primary text-xl md:text-2xl font-semibold uppercase tracking-wide text-off-white mb-6">
                            {t('home.partners.sponsorship')}
                        </h3>
                        <div className="space-y-4 mb-8">
                            <div className="bg-surface-raised border border-rochelais-gold/30 rounded-lg p-5">
                                <p className="font-primary text-base text-rochelais-gold">
                                    {t('home.partners.primaryAvailable')}
                                </p>
                            </div>
                            <div className="border border-divider rounded-lg p-4">
                                <p className="font-primary text-base text-off-white/80">
                                    {t('home.partners.officialAvailable')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PartnersSection;
