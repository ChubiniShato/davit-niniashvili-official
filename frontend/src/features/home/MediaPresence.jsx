import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import Typography from '../../ui/Typography';
import MediaFeatureCard from '../media/MediaFeatureCard';
import MediaQuickViewModal from '../media/MediaQuickViewModal';
import { getFeaturedMedia } from '../../config/media';
import { getFeaturedPress } from '../../api/api';

const MediaPresence = () => {
    const { t } = useLanguage();
    const [featuredItems, setFeaturedItems] = useState(getFeaturedMedia());
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const fetchBackendFeatured = async () => {
            try {
                const response = await getFeaturedPress();
                if (response.data && response.data.length > 0) {
                    const normalized = response.data.map(item => ({
                        ...item,
                        id: item.slug,
                        contentType: item.contentType === "MatchReport" ? "Match Report" : item.contentType
                    }));
                    setFeaturedItems(normalized);
                }
            } catch (err) {
                console.warn('Backend featured press fetch failed, using local fallback.', err);
            }
        };
        fetchBackendFeatured();
    }, []);

    const openModal = (item) => {
        setSelectedItem(item);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedItem(null);
        document.body.style.overflow = '';
    };

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') closeModal();
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, []);

    const primaryItem = featuredItems[0];
    const secondaryItems = featuredItems.slice(1, 3);

    return (
        <section className="w-full bg-obsidian py-24 md:py-32 relative overflow-hidden">
            {/* Subtle Texture/Background Layer */}
            <div className="absolute inset-0 bg-surface-base/50 pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full mb-16 md:mb-24 flex flex-col items-center text-center">
                <Typography variant="h2" className="mb-6 leading-none">
                    {t('home.media.title')}
                </Typography>
                <div className="w-12 h-0.5 bg-rochelais-gold mb-8 mx-auto" />
                <Typography variant="body" className="max-w-3xl mx-auto">
                    {t('home.media.subtitle')}
                </Typography>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full mb-16 md:mb-24">
                {featuredItems.length > 0 && (
                    <div className="w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            {/* Primary Card (Left / Top) */}
                            <div className="lg:col-span-7 h-full">
                                {primaryItem && (
                                    <MediaFeatureCard 
                                        item={primaryItem} 
                                        isPrimary={true} 
                                        onClick={() => openModal(primaryItem)}
                                    />
                                )}
                            </div>

                            {/* Secondary Cards (Right / Bottom) */}
                            <div className="lg:col-span-5 flex flex-col gap-6 h-full">
                                {secondaryItems.map((item) => (
                                    <div key={item.id} className="flex-1">
                                        <MediaFeatureCard 
                                            item={item} 
                                            isPrimary={false} 
                                            onClick={() => openModal(item)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="relative z-10 text-center flex justify-center w-full max-w-7xl mx-auto px-6 md:px-12">
                <Link
                    to="/media"
                    className="inline-flex items-center gap-3 font-secondary text-sm uppercase tracking-widest text-rochelais-gold hover:text-off-white transition-colors duration-300 border border-rochelais-gold/30 hover:border-rochelais-gold px-8 py-4 rounded-xl group max-w-fit"
                >
                    {t('home.media.viewAll')}
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </Link>
            </div>

            <MediaQuickViewModal 
                item={selectedItem} 
                isOpen={!!selectedItem} 
                onClose={closeModal} 
            />
        </section>
    );
};

export default MediaPresence;
