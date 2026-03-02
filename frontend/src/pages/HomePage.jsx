import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Hero from '../features/home/Hero';
import SloganReveal from '../features/home/SloganReveal';
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
                setTimeout(() => {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 50);
            }
        }
    }, [location]);
    return (
        <div>
            <Hero />
            <SloganReveal />
            <AuthorityStrip />
            <MediaPresence />
            <div id="highlights">
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
            <PartnersSection />
            <ForBrandsCTA />
            <Footer />
        </div>
    );
};

export default HomePage;
