import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../ui/Section';
import Typography from '../ui/Typography';
import { useLanguage } from '../context/LanguageContext';
import { mediaItems } from '../config/media';

const MediaPage = () => {
    const { t } = useLanguage();
    return (
        <>
            <Section className="bg-surface-base">
                <div className="text-center mb-16">
                    <Typography variant="h1" className="text-rochelais-gold mb-4">
                        {t('page.media.title')}
                    </Typography>
                    <Typography variant="body" className="text-mid-grey">
                        {t('page.media.subtitle')}
                    </Typography>
                </div>

                <div className="space-y-6 max-w-3xl mx-auto mb-16">
                    {mediaItems.map((item) => (
                        <article key={item.id} className="border border-divider rounded-lg p-6">
                            <p className="font-secondary text-xs uppercase tracking-widest text-rochelais-gold mb-2">
                                {item.outlet} · {item.date}
                            </p>
                            <h3 className="font-primary text-lg md:text-xl font-semibold text-off-white mb-2">
                                {item.title}
                            </h3>
                            <p className="font-primary text-sm text-off-white/60 mb-3">
                                {item.shortNote}
                            </p>
                            {item.url && (
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-secondary text-xs uppercase tracking-widest text-rochelais-gold/70 hover:text-rochelais-gold transition-colors duration-300"
                                >
                                    Read article →
                                </a>
                            )}
                        </article>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        to="/"
                        className="font-secondary text-sm uppercase tracking-widest text-rochelais-gold hover:text-off-white transition-colors duration-300"
                    >
                        ← {t('nav.home')}
                    </Link>
                </div>
            </Section>
        </>
    );
};

export default MediaPage;
