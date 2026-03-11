import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const AuthorityStrip = () => {
    const { t } = useLanguage();
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.remove('opacity-0', 'translate-y-4');
                        entry.target.classList.add('opacity-100', 'translate-y-0');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
        );

        const elements = sectionRef.current?.querySelectorAll('.reveal-on-scroll');
        elements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const slogan = t('home.authority.slogan');
    const author = t('home.authority.author');
    const kpis = t('home.authority.kpis');
    const positioning = t('home.authority.positioning');

    // We will extract the specific KPIs based on the new structure
    // Primary: ERC Trophy (index 0), EPCR Challenge Cup (index 1), Midi Olympique (index 3)
    // Secondary: Georgia Caps (index 2), Top 100 (index 4), Barbarians (index 5)

    // Fallbacks just in case the array structure isn't exactly what we expect
    const isKpisArray = Array.isArray(kpis) && kpis.length >= 6;

    // Note: Since we can't change LanguageContext.jsx, we have to parse/use the strings as they are in the array.

    // Verified icon paths: /icons/erc-trophy.png, /icons/epcr-challenge-cup.png, /icons/midi-olympique-oscars.png
    const primaryHighlights = isKpisArray ? [
        { label: kpis[0] || 'European Rugby Championship', sub: '2021—2024', icon: 'icons/erc-trophy.png' },
        { label: kpis[1] || 'EPCR Challenge Cup', sub: 'Winner — Lyon', icon: 'icons/epcr-challenge-cup.png' },
        { label: kpis[3] || 'Oscars du Midi Olympique', sub: '2023', icon: 'icons/midi-olympique-oscars.png' }
    ] : [];

    const secondaryMilestones = isKpisArray ? [
        kpis[2] || 'International Caps',
        kpis[4] || 'RugbyPass Top 100',
        kpis[5] || 'Barbarian F.C.'
    ] : [];

    return (
        <section
            id="authority-section"
            ref={sectionRef}
            className="relative w-full bg-surface-base border-t border-divider flex flex-col justify-center items-center overflow-hidden min-h-[calc(100svh-64px)] py-12 md:py-16 scroll-mt-20"
        >
            {/* Subtle mesh/gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-rochelais-gold/5 via-transparent to-black/40 pointer-events-none"></div>

            <div className="relative max-w-6xl mx-auto px-6 w-full flex flex-col items-center">

                {/* 1. Slogan / Signature */}
                <div className="text-center mb-10 md:mb-14 reveal-on-scroll opacity-0 translate-y-4 transition-all duration-1000 ease-out">
                    <p className="font-secondary text-2xl md:text-3xl lg:text-4xl font-extrabold italic text-off-white/90 mb-4 tracking-tight">
                        "{slogan}"
                    </p>
                    <p className="font-secondary text-xs md:text-sm text-rochelais-gold/90 uppercase tracking-widest">
                        {author}
                    </p>
                </div>

                {/* 2. Primary Highlights (Centered, 3 Equal Width Tiles) */}
                {primaryHighlights.length > 0 && (
                    <div className="w-full mb-10 md:mb-14 reveal-on-scroll opacity-0 translate-y-4 transition-all duration-1000 delay-150 ease-out">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                            {primaryHighlights.map((item, index) => (
                                <div
                                    key={`primary-${index}`}
                                    className="relative flex flex-col items-center text-center p-4 sm:p-6 bg-transparent group transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    {/* Icon Box - Slightly compressed size for better vertical fit */}
                                    <div className="w-full h-24 sm:h-28 mb-4 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-105">
                                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                                            {/* Subtle Premium Spotlight / Halo */}
                                            <div className="absolute inset-x-[-20%] inset-y-[-20%] bg-[radial-gradient(circle,rgba(232,168,0,0.15)_0%,transparent_70%)] opacity-60 group-hover:opacity-100 group-hover:scale-110 blur-sm pointer-events-none transition-all duration-700 z-0"></div>

                                            {/* Using absolute path `/` ensures it always points to the public folder correctly */}
                                            <img
                                                src={`/${item.icon}`}
                                                alt={item.label}
                                                className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(232,168,0,0.35)] transition-all duration-500 group-hover:drop-shadow-[0_0_18px_rgba(232,168,0,0.55)]"
                                            />
                                        </div>
                                    </div>

                                    {/* Text Content */}
                                    <div className="w-full z-10 transition-transform duration-300 flex-grow flex flex-col items-center justify-end">
                                        <h4 className="font-secondary text-sm lg:text-base font-bold text-white/90 group-hover:text-rochelais-gold transition-colors leading-snug px-2 mb-1">
                                            {item.label}
                                        </h4>
                                        <span className="font-secondary text-xs text-off-white/40 tracking-widest uppercase block">
                                            {item.sub}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 3. Secondary Milestones */}
                {secondaryMilestones.length > 0 && (
                    <div className="w-full mb-12 border-t border-off-white/5 pt-8 reveal-on-scroll opacity-0 translate-y-4 transition-all duration-1000 delay-300 ease-out">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 text-center">
                            {/* Milestone 1: Caps */}
                            <div className="flex flex-col items-center justify-center px-4">
                                <span className="font-secondary text-3xl lg:text-4xl font-extrabold text-rochelais-gold/80 mb-2 block">
                                    48
                                </span>
                                <span className="font-secondary text-xs tracking-wide text-off-white/60 uppercase">
                                    {secondaryMilestones[0] || 'Georgia Caps'}
                                </span>
                            </div>
                            {/* Milestone 2: RugbyPass */}
                            <div className="flex flex-col items-center justify-center px-4">
                                <span className="font-secondary text-3xl lg:text-4xl font-extrabold text-rochelais-gold/80 mb-2 block">
                                    #83
                                </span>
                                <span className="font-secondary text-xs tracking-wide text-off-white/60 uppercase">
                                    {secondaryMilestones[1] || 'RugbyPass Top 100'}
                                </span>
                            </div>
                            {/* Milestone 3: Barbarians */}
                            <div className="flex flex-col items-center justify-center px-4">
                                <span className="font-secondary text-3xl lg:text-4xl font-extrabold text-rochelais-gold/80 mb-2 block">
                                    19
                                </span>
                                <span className="font-secondary text-xs tracking-wide text-off-white/60 uppercase">
                                    {secondaryMilestones[2] || 'Barbarians Debut Age'}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* 4. Lightweight Closing Positioning */}
                <div className="text-center reveal-on-scroll opacity-0 translate-y-4 transition-all duration-1000 delay-500 ease-out">
                    <p className="font-secondary text-xs font-medium text-rochelais-gold/40 tracking-widest uppercase">
                        {positioning}
                    </p>
                </div>

            </div>
        </section>
    );
};

export default AuthorityStrip;
