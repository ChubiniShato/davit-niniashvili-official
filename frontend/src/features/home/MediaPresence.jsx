import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { mediaItems } from '../../config/media';

const MediaPresence = () => {
    const { t } = useLanguage();

    return (
        <section className="w-full bg-surface-base py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <h2 className="font-primary text-2xl md:text-3xl font-bold uppercase tracking-wide text-off-white mb-10 text-center">
                    {t('home.media.title')}
                </h2>
                <div className="grid md:grid-cols-3 gap-6 mb-10">
                    {mediaItems.map((item) => (
                        <div key={item.id} className="border border-divider rounded-lg p-6">
                            <p className="font-secondary text-xs uppercase tracking-widest text-rochelais-gold mb-2">
                                {item.outlet} · {item.date}
                            </p>
                            <p className="font-primary text-base text-off-white/80">
                                {item.title}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="text-center">
                    <Link
                        to="/media"
                        className="font-secondary text-sm uppercase tracking-widest text-rochelais-gold hover:text-off-white transition-colors duration-300 border-b border-rochelais-gold/30 pb-0.5"
                    >
                        {t('page.media.title')} →
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default MediaPresence;
