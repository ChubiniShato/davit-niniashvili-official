import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const CLIPS = [
    {
        id: 1,
        src: '/videos/hero.mp4',
        cutStart: 0,
        cutEnd: 13.47,
        poster: '/videos/hero_fallback.jpg'
    }
];

const Hero = () => {
    const containerRef = useRef(null);
    const videoRef = useRef(null);
    const { language } = useLanguage();

    // Logic Refs
    const isSwitching = useRef(false);
    const requestRef = useRef(null);
    const rafRunning = useRef(false); // New: Track if loop is active
    const currentIndexRef = useRef(0);
    const didInit = useRef(false);
    const initSeekedHandlerRef = useRef(null); // Cleanup ref

    // --- Helpers ---

    const startRAF = () => {
        if (!rafRunning.current) {
            rafRunning.current = true;
            requestRef.current = requestAnimationFrame(animate);
        }
    };

    const stopRAF = () => {
        rafRunning.current = false;
        if (requestRef.current) {
            cancelAnimationFrame(requestRef.current);
            requestRef.current = null;
        }
    };

    const animate = () => {
        const video = videoRef.current;
        if (!video) return;

        // Logic Check
        if (!isSwitching.current && !video.paused) {
            const currentClip = CLIPS[currentIndexRef.current];
            const duration = video.duration || Infinity;
            const safeCutEnd = Math.min(currentClip.cutEnd, duration - 0.08);

            if (video.currentTime >= safeCutEnd) {
                const nextIndex = (currentIndexRef.current + 1) % CLIPS.length;
                performSwap(nextIndex);
                return; // Stop this frame's loop (performSwap will restart it)
            }
        }

        // Loop Continuation
        if (rafRunning.current) {
            requestRef.current = requestAnimationFrame(animate);
        }
    };

    /**
     * Swap Logic
     */
    const performSwap = (nextIndex) => {
        const video = videoRef.current;
        const container = containerRef.current;
        const nextClip = CLIPS[nextIndex];

        if (!video || !container) return;

        // 1. Lock & Stop Loop
        isSwitching.current = true;
        stopRAF();

        // 2. Set Fallback
        container.style.backgroundImage = `url(${nextClip.poster})`;

        // 3. Pause & Hide
        video.pause();
        video.style.visibility = 'hidden';

        // 4. Safari Safety
        video.removeAttribute('src');
        video.load();

        // 5. New Source
        video.src = nextClip.src;
        video.poster = nextClip.poster;
        video.load();

        // Helper to finalize
        const finishSwap = async () => {
            try {
                await video.play();
                video.style.visibility = 'visible';
                currentIndexRef.current = nextIndex;
            } catch (e) {
                console.warn("Autoplay blocked", e);
                // Video stays hidden, container bg visible
            } finally {
                isSwitching.current = false;
                startRAF();
            }
        };

        let canplayHandled = false;
        const onCanPlay = () => {
            if (canplayHandled) return;
            canplayHandled = true;

            video.currentTime = nextClip.cutStart;

            let isResolved = false;
            const onSeeked = () => {
                if (isResolved) return;
                isResolved = true;
                clearTimeout(fallbackTimer);
                finishSwap();
            };

            const fallbackTimer = setTimeout(() => {
                if (isResolved) return;
                isResolved = true;
                video.removeEventListener('seeked', onSeeked);
                console.warn("Seeked event timed out, forcing play attempt");
                finishSwap();
            }, 250);

            video.addEventListener('seeked', onSeeked, { once: true });
        };

        video.addEventListener('canplay', onCanPlay, { once: true });
        if (video.readyState >= 3) onCanPlay();
    };

    useEffect(() => {
        const video = videoRef.current;
        const container = containerRef.current;
        if (!video || !container) return;

        // --- INITIALIZATION ---

        // 1. Set Initial Fallback
        const firstClip = CLIPS[0];
        container.style.backgroundImage = `url(${firstClip.poster})`;

        // 2. Start RAF Loop
        startRAF();

        // Prevent double init
        if (didInit.current) return;
        didInit.current = true;

        // 3. Handle First Load logic
        video.style.visibility = 'hidden';
        video.src = firstClip.src;
        video.poster = firstClip.poster;

        const attemptInitialPlay = async () => {
            try {
                await video.play();
                video.style.visibility = 'visible';
            } catch (e) {
                console.warn("Initial autoplay blocked", e);
            }
        };

        let initCanplayHandled = false;
        const handleFirstCanPlay = () => {
            if (initCanplayHandled) return;
            initCanplayHandled = true;

            const target = firstClip.cutStart;

            // If we are basically at 0 and target is 0, just play.
            if (Math.abs(video.currentTime - target) < 0.1) {
                attemptInitialPlay();
            } else {
                video.currentTime = target;

                let isResolved = false;
                const onSeeked = () => {
                    if (isResolved) return;
                    isResolved = true;
                    clearTimeout(fallbackTimer);
                    attemptInitialPlay();
                };

                const fallbackTimer = setTimeout(() => {
                    if (isResolved) return;
                    isResolved = true;
                    video.removeEventListener('seeked', onSeeked);
                    attemptInitialPlay();
                }, 250);

                initSeekedHandlerRef.current = onSeeked;
                video.addEventListener('seeked', onSeeked, { once: true });
            }
        };

        // Attach listener
        video.addEventListener('canplay', handleFirstCanPlay, { once: true });
        // Reliability check
        if (video.readyState >= 3) {
            handleFirstCanPlay();
        }

        // 4. Tab Visibility
        const handleVisibilityChange = () => {
            if (document.hidden) {
                video.pause();
                stopRAF();
            } else {
                if (!isSwitching.current) {
                    if (video.paused && video.readyState >= 3) {
                        video.play().catch(() => { });
                    }
                    startRAF();
                }
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            stopRAF();
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            video.removeEventListener('canplay', handleFirstCanPlay);
            if (initSeekedHandlerRef.current) {
                video.removeEventListener('seeked', initSeekedHandlerRef.current);
                initSeekedHandlerRef.current = null;
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[calc(100dvh-60px)] mt-[60px] bg-obsidian overflow-hidden bg-cover bg-center"
            style={{ transition: 'none' }} // Guaranteed no-transition
        >
            {/* Fullscreen Video Container */}
            <video
                ref={videoRef}
                className="w-full h-full object-cover relative z-0"
                style={{ visibility: 'hidden', transition: 'none' }}
                playsInline
                muted
                preload="auto"
                disablePictureInPicture
            />

            {/* Dark Gradient Overlay */}
            <div
                className="absolute inset-0 z-[1] pointer-events-none"
                style={{
                    background: 'linear-gradient(to bottom, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.15) 40%, rgba(10,10,10,0.25) 70%, rgba(10,10,10,0.65) 100%)',
                }}
            />

            {/* Vignette Effect */}
            <div
                className="absolute inset-0 z-[2] pointer-events-none"
                style={{
                    boxShadow: 'inset 0 0 120px 40px rgba(0,0,0,0.5)',
                }}
            />

            {/* Cinematic Logo Overlay (softened) */}
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                <style>{`
                    @keyframes logoFadeIn { from { opacity: 0; } to { opacity: 0.5; } }
                    .hero-logo-soft { animation: logoFadeIn 2s ease-out 0.5s forwards; opacity: 0; }
                `}</style>
                <img
                    src="/logo.png"
                    alt="Brand Logo"
                    className="hero-logo-soft w-[65vw] md:w-[50vw] lg:w-[45vw] max-w-[700px] min-w-[220px] object-contain"
                    style={{ filter: 'saturate(0.7)', mixBlendMode: 'screen' }}
                />
            </div>

            {/* Cinematic Signature Slogan */}
            <div className="absolute bottom-[14%] left-[7%] z-10">
                <style>{`
                    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                    .slogan-reveal { animation: fadeIn 1.5s ease-out 1.8s forwards; opacity: 0; }
                `}</style>
                <Link to="/#authority-section" className="group no-underline">
                    <p className="slogan-reveal font-secondary text-xl md:text-2xl font-extrabold tracking-tight italic text-[var(--brand-gray)] hover:text-off-white border-b border-transparent group-hover:border-rochelais-gold transition-all duration-300 cursor-pointer inline-block">
                        {language === 'ka' ? 'მთელი გულით!' :
                            language === 'fr' ? 'De tout cœur!' :
                                'Wholeheartedly!'}
                    </p>
                </Link>
            </div>

            {/* Sponsor Badge */}
            <div className="absolute bottom-[5%] right-[5%] z-10">
                <style>{`
                    .sponsor-badge { animation: fadeIn 1.5s ease-out 2.5s forwards; opacity: 0; }
                `}</style>
                <Link to="/for-brands" className="no-underline">
                    <span className="sponsor-badge inline-block font-secondary text-xs tracking-widest uppercase text-off-white/40 bg-black/30 border border-rochelais-gold/30 rounded-xl px-3 py-1 hover:text-off-white/70 transition-colors duration-300 cursor-pointer">
                        Primary Digital Partner — Available
                    </span>
                </Link>
            </div>

            {/* Scroll Indicator (Static) */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-30 pointer-events-none pb-0 z-20">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                    <path d="M12 17.5L5 10.5L6.4 9.1L12 14.7L17.6 9.1L19 10.5L12 17.5Z" />
                </svg>
            </div>
        </div>
    );
};

export default Hero;
