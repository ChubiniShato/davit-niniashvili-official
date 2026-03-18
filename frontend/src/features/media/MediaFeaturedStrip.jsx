import React from 'react';
import MediaFeatureCard from './MediaFeatureCard';
import Typography from '../../ui/Typography';
import { useLanguage } from '../../context/LanguageContext';

const MediaFeaturedStrip = ({ items, onOpenModal }) => {
    const { t, language } = useLanguage();

    if (!items || items.length === 0) return null;

    return (
        <section className="w-full bg-obsidian py-16 md:py-24 border-b border-divider">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                
                <div className="mb-12 flex items-center gap-6">
                    <Typography variant="h2" className="text-3xl md:text-4xl text-off-white">
                        {t('page.media.filters.featuredOnly')}
                    </Typography>
                    <div className="flex-1 h-px bg-divider"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item, index) => (
                        <div key={item.id} className="h-full">
                            <MediaFeatureCard 
                                item={item} 
                                isPrimary={index === 0} 
                                onClick={() => onOpenModal(item)}
                            />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default MediaFeaturedStrip;
