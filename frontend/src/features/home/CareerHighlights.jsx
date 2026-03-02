import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import HighlightsSection from './highlights/HighlightsSection';

const CareerHighlights = () => {
    const { t, language } = useLanguage();

    return (
        <div id="highlights">
            {/* Career snapshot */}
            <section className="w-full bg-surface-base py-16 md:py-20 border-b border-divider">
                <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
                    <h2 className="font-primary text-2xl md:text-3xl font-bold uppercase tracking-wide text-off-white mb-4">
                        {t('home.career.title')}
                    </h2>
                    <p className="font-primary text-base md:text-lg text-off-white/80 leading-relaxed mb-6">
                        {language === 'ka'
                            ? 'Stade Rochelais · საქართველოს ეროვნული ნაკრები'
                            : language === 'fr'
                                ? 'Stade Rochelais · Équipe nationale de Géorgie'
                                : 'Stade Rochelais · Georgia National Team'}
                    </p>
                    <Link
                        to="/career"
                        className="inline-block font-secondary text-sm uppercase tracking-widest px-6 py-2.5 border border-rochelais-gold/40 text-rochelais-gold hover:border-rochelais-gold hover:text-off-white transition-all duration-300 rounded-xl"
                    >
                        {t('home.career.viewFull')}
                    </Link>
                </div>
            </section>

            {/* Existing highlights (keeps its own id="highlights-section" for navbar scroll) */}
            <HighlightsSection />

            {/* Gallery CTA */}
            <div className="w-full bg-surface-base pb-16 text-center">
                <Link
                    to="/gallery"
                    className="inline-block font-secondary text-sm uppercase tracking-widest px-6 py-2.5 border border-rochelais-gold/40 text-rochelais-gold hover:border-rochelais-gold hover:text-off-white transition-all duration-300 rounded-xl"
                >
                    {t('home.highlights.viewGallery')}
                </Link>
            </div>
        </div>
    );
};

export default CareerHighlights;
