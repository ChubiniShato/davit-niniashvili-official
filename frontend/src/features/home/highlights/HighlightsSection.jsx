import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { HIGHLIGHTS_DATA } from './highlightsData';
import HighlightCard from './HighlightCard';
import VideoModal from './VideoModal';
import { useLanguage } from '../../../context/LanguageContext';

const SECTION_TITLE = {
    en: 'Highlights',
    ka: 'გამორჩეული ეპიზოდები',
    fr: 'Temps forts',
};

const HighlightsSection = () => {
    const { language } = useLanguage();
    const [modalTeam, setModalTeam] = useState(null);

    const handleCardClick = useCallback((card) => {
        setModalTeam(card);
    }, []);

    const handleModalClose = useCallback(() => {
        setModalTeam(null);
    }, []);

    return (
        <section id="highlights-section" className="w-full bg-surface-base pt-10 pb-24">
            <h2 className={`text-center text-off-white opacity-90 text-lg md:text-2xl mb-12 ${language === 'ka' ? 'font-georgian tracking-section-heading-ka' : 'font-header tracking-section-heading'}`}>
                {SECTION_TITLE[language] || SECTION_TITLE.en}
            </h2>
            <div className="w-full px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {HIGHLIGHTS_DATA.map((card, i) => (
                        <HighlightCard
                            key={card.id}
                            card={card}
                            index={i}
                            onCardClick={handleCardClick}
                        />
                    ))}
                </div>
            </div>

            <p className={`text-center mt-12 text-off-white/70 text-sm md:text-base ${language === 'ka' ? 'font-georgian' : 'font-primary tracking-wide'}`}>
                {language === 'ka' && (
                    <>ეპიზოდების სრული არქივი იხილეთ <Link to="/gallery" className="text-[var(--brand-yellow)] hover:text-[var(--brand-gray)] transition-colors duration-300">გალერეაში</Link></>
                )}
                {language === 'fr' && (
                    <>Retrouvez l'archive complète dans la <Link to="/gallery" className="text-[var(--brand-yellow)] hover:text-[var(--brand-gray)] transition-colors duration-300">Galerie</Link></>
                )}
                {language === 'en' && (
                    <>Full episode archive available in the <Link to="/gallery" className="text-[var(--brand-yellow)] hover:text-[var(--brand-gray)] transition-colors duration-300">Gallery</Link></>
                )}
            </p>

            {modalTeam && (
                <VideoModal team={modalTeam} onClose={handleModalClose} />
            )}
        </section>
    );
};

export default HighlightsSection;
