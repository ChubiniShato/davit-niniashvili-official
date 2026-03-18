import React from 'react';
import Typography from '../../ui/Typography';
import { useLanguage } from '../../context/LanguageContext';

const MediaArchiveCard = ({ item }) => {
    const { t } = useLanguage();

    return (
        <article className="border border-divider bg-surface-base hover:bg-obsidian/40 hover:border-rochelais-gold/20 transition-all duration-300 p-6 md:p-8 flex flex-col h-full group">
            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4">
                <span className="font-secondary text-xs tracking-widest uppercase text-rochelais-gold">
                    {item.source}
                </span>
                <span className="w-1 h-1 bg-rochelais-gold/50 rounded-full"></span>
                <span className="font-secondary text-xs tracking-widest text-off-white/70 uppercase">
                    {item.displayDate}
                </span>
                <span className="w-1 h-1 bg-rochelais-gold/50 rounded-full hidden sm:inline-block"></span>
                <span className="font-secondary text-xs tracking-widest text-off-white/50 uppercase border border-divider px-2 py-0.5 hidden sm:inline-block">
                    {item.contentType}
                </span>
                <span className="w-1 h-1 bg-rochelais-gold/50 rounded-full"></span>
                <span className={`font-secondary text-xs tracking-widest uppercase px-2 py-0.5 ${
                    item.sourceTier === 'A' 
                    ? 'text-rochelais-gold bg-rochelais-gold/10' 
                    : 'text-off-white/50 border border-divider'
                }`}>
                    Tier {item.sourceTier}
                </span>
            </div>

            <Typography variant="h3" className="mb-3 group-hover:text-rochelais-gold transition-colors duration-300 leading-tight">
                {item.title}
            </Typography>

            <p className="font-primary text-sm md:text-base text-off-white/60 mb-6 flex-grow leading-relaxed">
                {item.summaryShort}
            </p>

            <div className="pt-6 border-t border-divider mt-auto flex items-center justify-between group-hover:border-rochelais-gold/20 transition-colors duration-300">
                <span className="font-secondary text-xs tracking-widest uppercase text-off-white/40">
                    {item.language}
                </span>
                {item.hasLiveSourceLink && item.sourceUrl ? (
                    <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-secondary text-xs uppercase tracking-widest text-rochelais-gold hover:text-off-white transition-colors duration-300 flex items-center gap-2"
                    >
                        {t('page.media.viewSource')}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                ) : (
                    <span className="font-secondary text-xs uppercase tracking-widest text-off-white/30">
                        {t('page.media.linkPending')}
                    </span>
                )}
            </div>
        </article>
    );
};

export default MediaArchiveCard;
