import React, { useEffect, useState, useCallback } from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const HighlightCard = ({
    card,
    index,
    onCardClick,
}) => {
    const { language } = useLanguage();
    const displayName = typeof card.teamName === 'object'
        ? (card.teamName[language] || card.teamName.en)
        : card.teamName;
    const [reducedMotion, setReducedMotion] = useState(false);

    // SSR-safe media query detection
    useEffect(() => {
        if (typeof window === 'undefined') return;
        setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }, []);

    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onCardClick(card);
            }
        },
        [card, onCardClick]
    );

    return (
        <button
            type="button"
            className="relative w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-off-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian group"
            style={{ aspectRatio: '4 / 5' }}
            aria-label={`Watch ${displayName} highlights`}
            onClick={() => onCardClick(card)}
            onKeyDown={handleKeyDown}
        >
            <div className={`absolute inset-0 overflow-hidden rounded-xl bg-surface-base border border-black/10 transition-all duration-700 ease-out [box-shadow:0_20px_50px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.15)] group-hover:shadow-[0_22px_55px_rgba(0,0,0,0.5)] ${reducedMotion ? 'transition-none' : ''}`}
            >
                {/* Background Layer — Clean premium dark surface, no visible poster */}
                <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-br from-surface-raised via-obsidian to-black">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                </div>

                {/* Main logo Layer — Subtle Support Plate, upper-third composition */}
                <div className="absolute inset-x-0 top-6 lg:top-8 bottom-[35%] flex flex-col items-center justify-center pointer-events-none z-[1]">
                    {/* Subdued normalization disk */}
                    <div className="absolute top-1/2 -translate-y-1/2 w-[50%] md:w-[45%] aspect-square rounded-full bg-white/[0.04] shadow-[0_4px_16px_rgba(0,0,0,0.1)] pointer-events-none" />
                    
                    {/* Foreground dominant visual anchor */}
                    <img
                        src={card.logo}
                        alt={`${displayName} logo`}
                        loading={index <= 1 ? 'eager' : 'lazy'}
                        decoding="async"
                        className="relative w-[88%] h-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] z-[2] group-hover:-translate-y-1.5 transition-transform duration-700 ease-out"
                    />
                </div>

                {/* Team info — bottom left */}
                <div className="absolute bottom-5 left-5 flex flex-col gap-0.5 pointer-events-none z-[3]">
                    <span className="text-off-white font-primary text-lg font-semibold tracking-wide leading-tight drop-shadow-md transition-colors duration-700 group-hover:text-white">
                        {displayName}
                    </span>
                    <span className="text-off-white/70 font-secondary text-xs uppercase tracking-widest leading-tight transition-colors duration-700 group-hover:text-off-white/90">
                        {card.years}
                    </span>
                </div>
            </div>
        </button>
    );
};

export default HighlightCard;
