import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const HighlightCard = ({
    card,
    index,
    isPreviewActive,
    onPreviewStart,
    onPreviewStop,
    onCardClick,
}) => {
    const { language } = useLanguage();
    const displayName = typeof card.teamName === 'object'
        ? (card.teamName[language] || card.teamName.en)
        : card.teamName;
    const videoRef = useRef(null);
    const hoverTimeoutRef = useRef(null);
    const timeupdateHandlerRef = useRef(null);
    const [isPreviewing, setIsPreviewing] = useState(false);
    const [canHover, setCanHover] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);

    // SSR-safe media query detection
    useEffect(() => {
        if (typeof window === 'undefined') return;
        setCanHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
        setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }, []);

    // Cleanup helper — stops preview, releases resources
    const stopPreview = useCallback(() => {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;

        const video = videoRef.current;
        if (!video) return;

        // Remove timeupdate listener
        if (timeupdateHandlerRef.current) {
            video.removeEventListener('timeupdate', timeupdateHandlerRef.current);
            timeupdateHandlerRef.current = null;
        }

        video.pause();
        video.removeAttribute('src');
        video.load(); // release network/buffer

        setIsPreviewing(false);
        onPreviewStop();
    }, [onPreviewStop]);

    // Unmount cleanup
    useEffect(() => {
        return () => {
            clearTimeout(hoverTimeoutRef.current);
            const video = videoRef.current;
            if (video) {
                if (timeupdateHandlerRef.current) {
                    video.removeEventListener('timeupdate', timeupdateHandlerRef.current);
                }
                video.pause();
                video.removeAttribute('src');
                video.load();
            }
        };
    }, []);

    const handleMouseEnter = useCallback(() => {
        if (!canHover) return;

        hoverTimeoutRef.current = setTimeout(async () => {
            const video = videoRef.current;
            if (!video) return;

            video.src = card.videoSrc;

            const onMeta = async () => {
                video.currentTime = card.previewStart;

                // Attach segment loop handler
                const onTimeUpdate = () => {
                    if (video.currentTime >= card.previewEnd - 0.05) {
                        video.currentTime = card.previewStart;
                    }
                };
                timeupdateHandlerRef.current = onTimeUpdate;
                video.addEventListener('timeupdate', onTimeUpdate);

                try {
                    await video.play();
                    setIsPreviewing(true);
                    onPreviewStart();
                } catch {
                    // Autoplay blocked — keep poster visible
                    video.removeEventListener('timeupdate', onTimeUpdate);
                    timeupdateHandlerRef.current = null;
                }
            };

            video.addEventListener('loadedmetadata', onMeta, { once: true });
        }, 400);
    }, [canHover, card, onPreviewStart]);

    const handleMouseLeave = useCallback(() => {
        if (!canHover) return;
        stopPreview();
    }, [canHover, stopPreview]);

    // If another card started previewing, stop this one
    useEffect(() => {
        if (!isPreviewActive && isPreviewing) {
            stopPreview();
        }
    }, [isPreviewActive, isPreviewing, stopPreview]);

    const handleClick = useCallback(() => {
        stopPreview();
        onCardClick(card);
    }, [card, onCardClick, stopPreview]);

    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick();
            }
        },
        [handleClick]
    );

    const transitionClass = reducedMotion
        ? ''
        : 'transition-opacity duration-300';

    return (
        <button
            type="button"
            className="relative w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-off-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian group"
            style={{ aspectRatio: '3 / 4' }}
            aria-label={`Watch ${displayName} highlights`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            <div className={`absolute inset-0 overflow-hidden rounded-xl bg-[#C2B7AA] border border-black/5 [box-shadow:0_18px_45px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.35)] ${reducedMotion ? '' : 'transition-transform duration-300'} group-hover:scale-[1.03]`}
            >
                {/* Main logo — centered, lifted for optical balance */}
                <div className="absolute inset-0 flex items-center justify-center -translate-y-[8%] pointer-events-none z-[1]">
                    <img
                        src={card.logo}
                        alt={`${displayName} logo`}
                        loading={index <= 1 ? 'eager' : 'lazy'}
                        decoding="async"
                        className="w-[92%] max-h-[72%] object-contain"
                    />
                </div>

                {/* Video preview overlay — hover only */}
                <video
                    ref={videoRef}
                    muted
                    playsInline
                    preload="none"
                    className={`absolute inset-0 w-full h-full object-cover z-[2] ${transitionClass} ${isPreviewing ? 'opacity-100' : 'opacity-0'
                        }`}
                />

                {/* Play icon — always centered, top layer */}
                <div className={`absolute inset-0 flex items-center justify-center pointer-events-none z-[3] ${reducedMotion ? '' : 'transition-opacity duration-300'} opacity-0 group-hover:opacity-100`}>
                    <div className="w-14 h-14 rounded-full bg-black/50 border border-off-white/30 flex items-center justify-center backdrop-blur-sm">
                        <svg className="w-6 h-6 text-off-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>

                {/* Team info — bottom left */}
                <div className="absolute bottom-3 left-3 flex flex-col gap-0.5 pointer-events-none z-[3]">
                    <span className="text-obsidian font-primary text-lg font-semibold tracking-wide leading-tight">
                        {displayName}
                    </span>
                    <span className="text-obsidian/70 font-secondary text-sm uppercase tracking-widest leading-tight">
                        {card.years}
                    </span>
                </div>
            </div>
        </button>
    );
};

export default HighlightCard;
