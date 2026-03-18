import React from 'react';
import Typography from '../../ui/Typography';
import { useLanguage } from '../../context/LanguageContext';

const MediaFeatureCard = ({ item, isPrimary, onClick }) => {
    const { t } = useLanguage();

    return (
        <button 
            onClick={() => onClick(item)}
            className={`
                group text-left p-6 md:p-8 flex flex-col justify-between 
                border border-divider bg-surface-base hover:bg-obsidian/40 
                hover:border-rochelais-gold/30 hover:shadow-2xl hover:-translate-y-1 
                transition-all duration-300 h-full w-full min-h-[300px]
                relative overflow-hidden
            `}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-obsidian/20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative z-10 w-full mb-8">
                <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-secondary text-xs tracking-widest uppercase text-rochelais-gold">
                        {item.source}
                    </span>
                    <span className="w-1 h-1 bg-rochelais-gold/50 rounded-full"></span>
                    <span className="font-secondary text-xs tracking-widest text-off-white/70 uppercase">
                        {item.displayDate}
                    </span>
                    <span className="hidden sm:inline-block w-1 h-1 bg-rochelais-gold/50 rounded-full"></span>
                    <span className="hidden sm:inline-block font-secondary text-xs tracking-widest text-off-white/40 uppercase px-2 py-0.5 border border-divider">
                        {item.contentType}
                    </span>
                </div>

                <Typography 
                    variant={isPrimary ? 'h2' : 'h3'} 
                    className={`leading-tight group-hover:text-rochelais-gold transition-colors duration-300 mb-4 ${
                        isPrimary ? 'md:leading-none' : ''
                    }`}
                >
                    {item.title}
                </Typography>

                <p className={`font-primary text-off-white/60 leading-relaxed max-w-2xl line-clamp-1 ${
                    isPrimary ? 'text-lg md:text-xl' : 'text-base'
                }`}>
                    {item.summaryShort}
                </p>
            </div>

            <div className="relative z-10 w-full flex items-center justify-between mt-auto pt-6 border-t border-divider group-hover:border-rochelais-gold/20 transition-colors duration-300">
                <span className="font-secondary text-xs uppercase tracking-widest text-off-white/40 group-hover:text-rochelais-gold transition-colors duration-300">
                    {t('home.media.open')}
                </span>
                <svg 
                    className="w-5 h-5 text-rochelais-gold transform group-hover:translate-x-2 transition-transform duration-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </div>
        </button>
    );
};

export default MediaFeatureCard;
