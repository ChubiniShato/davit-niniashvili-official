import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Hero from '../features/home/Hero';
import AuthorityStrip from '../features/home/AuthorityStrip';
import MediaPresence from '../features/home/MediaPresence';
import { useLanguage } from '../context/LanguageContext';
import PartnersSection from '../features/home/PartnersSection';
import HighlightsSection from '../features/home/highlights/HighlightsSection';
import ForBrandsCTA from '../features/home/ForBrandsCTA';
import Footer from '../features/home/Footer';

const HomePage = () => {
    const location = useLocation();
    const { t } = useLanguage();

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const el = document.getElementById(id);
            if (el) {
                const HEADER_OFFSET = 64;
                setTimeout(() => {
                    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
                    window.scrollTo({ top, behavior: 'smooth' });
                }, 50);
            }
        }
    }, [location]);

    return (
        <div>
            <Hero />
            <div id="authority-section">
                <AuthorityStrip />
            </div>
            <div id="media-section">
                <MediaPresence />
            </div>
            <div id="partners-section">
                <PartnersSection />
            </div>
            <div id="highlights-section" className="pt-16 md:pt-24">
                <HighlightsSection />
                <div className="w-full bg-surface-base pb-16 text-center">
                    <Link
                        to="/gallery"
                        className="inline-block font-secondary text-sm uppercase tracking-widest px-6 py-2.5 border border-rochelais-gold/40 text-rochelais-gold hover:border-rochelais-gold hover:text-off-white transition-all duration-300 rounded-xl"
                    >
                        {t('home.highlights.viewGallery')}
                    </Link>
                </div>
            </div>
            <div id="brands-section">
                <ForBrandsCTA />
            </div>
            <div id="contact-section">
                <Footer />
            </div>
        </div>
    );
};

export default HomePage;
