import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const AuthorityStrip = () => {
    const { t, language } = useLanguage();
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.remove('opacity-0', 'translate-y-8');
                        entry.target.classList.add('opacity-100', 'translate-y-0');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        const elements = sectionRef.current?.querySelectorAll('.reveal-on-scroll');
        elements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const slogan = t('home.authority.slogan');
    const author = t('home.authority.author');

    const closingStatement =
        language === 'ka'
            ? 'უმაღლესი დონის თამაში — გლობალური მასშტაბი!'
            : language === 'fr'
              ? "Performance d'élite — Impact global!"
              : 'Elite Performance — Global Impact!';

    const primaryHighlights = [
        {
            label: language === 'ka' ? 'ევროპის ჩემპიონი' : 'European Champion',
            sub: '2021—2024',
            icon: 'icons/erc-trophy.png',
        },
        {
            label: language === 'ka' ? 'ჩელენჯ ქაფი' : 'EPCR Challenge Cup',
            sub: 'Winner — Lyon',
            icon: 'icons/epcr-challenge-cup.png',
        },
        {
            label: language === 'ka' ? 'Midi Olympique' : 'Oscars du Midi Olympique',
            sub: 'Winner 2023',
            icon: 'icons/midi-olympique-oscars.png',
        },
    ];

    const milestones = [
        {
            id: 1,
            title: 'უნიკალური კარიერული სტარტი და ტრაექტორია!',
            ctaLabel: 'იხილეთ მეტი',
            contentKey: 'career-start',
        },
        {
            id: 2,
            title: 'ტოპ გუნდები საფრანგეთის „ტოპ 14“-ში',
            ctaLabel: 'იხილეთ მეტი',
            contentKey: 'top14-clubs',
        },
        {
            id: 3,
            title: 'თანმიმდევრული და უწყვეტი წარმატებების ბილიკი',
            ctaLabel: 'იხილეთ მეტი',
            contentKey: 'success-path',
        },
        {
            id: 4,
            title: 'მუდამ მედიის ფოკუსში',
            ctaLabel: 'იხილეთ მეტი',
            contentKey: 'media-focus',
        },
    ];

    return (
        <section
            id="authority-section"
            ref={sectionRef}
            className="relative w-full bg-surface-base border-t border-divider overflow-hidden py-16 md:py-20 lg:py-24 scroll-mt-16"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-rochelais-gold/[0.02] to-black/40 pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 w-full">
                <div className="text-center mb-16 md:mb-20 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-1000 ease-out">
                    <h2
                        className={`font-secondary font-extrabold italic text-off-white/95 mb-8 max-w-5xl xl:max-w-none mx-auto leading-tight xl:whitespace-nowrap ${
                            language === 'ka'
                                ? 'text-2xl md:text-4xl lg:text-5xl'
                                : 'text-2xl md:text-4xl lg:text-5xl tracking-tighter'
                        }`}
                    >
                        "{slogan}"
                    </h2>
                    <div className="flex flex-col items-center">
                        <span className="w-12 h-px bg-rochelais-gold/40 mb-6" />
                        <p
                            className={`font-secondary text-rochelais-gold/90 uppercase tracking-section-heading font-bold ${
                                language === 'ka' ? 'text-xs md:text-sm' : 'text-sm md:text-base'
                            }`}
                        >
                            {author}
                        </p>
                    </div>
                </div>

                <div className="w-full mb-20 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-1000 delay-150 ease-out">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
                        {primaryHighlights.map((item, index) => (
                            <div
                                key={`award-${index}`}
                                className="relative flex flex-col items-center text-center p-8 md:p-10 bg-gradient-to-br from-surface-raised/95 via-surface-raised/78 to-surface-raised/42 border border-white/10 ring-1 ring-inset ring-white/5 rounded-2xl group transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-[0_14px_48px_rgba(232,168,0,0.16)] hover:border-rochelais-gold/60 hover:ring-rochelais-gold/20 overflow-hidden shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03),inset_0_0_60px_rgba(232,168,0,0.035)]"
                            >
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(232,168,0,0.08)_0%,rgba(232,168,0,0.025)_34%,transparent_72%)] opacity-90 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                <div className="relative h-32 md:h-44 mb-8 flex items-center justify-center">
                                    <img
                                        src={`/${item.icon}`}
                                        alt={item.label}
                                        className="h-full object-contain filter drop-shadow-[0_0_15px_rgba(232,168,0,0.22)] group-hover:drop-shadow-[0_0_20px_rgba(232,168,0,0.34)] transition-all duration-700"
                                    />
                                </div>

                                <div className="relative z-10 mt-auto">
                                    <h4 className="font-secondary text-base lg:text-lg font-bold text-white/90 group-hover:text-rochelais-gold transition-colors mb-2">
                                        {item.label}
                                    </h4>
                                    <span className="font-secondary text-xs text-rochelais-gold/78 tracking-widest uppercase block border-t border-white/10 pt-4 mt-4 w-full text-center group-hover:border-rochelais-gold/40 group-hover:text-rochelais-gold/95 transition-colors duration-700">
                                        {item.sub}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full mb-16 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-1000 delay-300 ease-out">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {milestones.map((milestone) => (
                            <div
                                key={milestone.id}
                                className="group relative h-full min-h-[260px] overflow-hidden rounded-2xl bg-gradient-to-br from-surface-raised/95 via-surface-raised/80 to-surface-raised/46 border border-white/10 ring-1 ring-inset ring-white/5 flex flex-col justify-between transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-[0_14px_48px_rgba(232,168,0,0.16)] hover:border-rochelais-gold/60 hover:ring-rochelais-gold/20 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03),inset_0_0_70px_rgba(232,168,0,0.035)]"
                            >
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(232,168,0,0.08)_0%,rgba(232,168,0,0.028)_34%,transparent_74%)] opacity-90 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                <div className="relative z-10 flex-grow px-6 pt-7 pb-6 md:px-8 md:pt-8 md:pb-7 flex items-center justify-center text-center">
                                    <h3 className="font-secondary text-lg md:text-xl md:text-2xl font-medium text-white/95 group-hover:text-rochelais-gold transition-colors duration-700 leading-snug tracking-wide w-full">
                                        {milestone.title}
                                    </h3>
                                </div>

                                <div className="relative z-10 mt-auto border-t border-white/10 bg-gradient-to-r from-white/[0.02] via-white/[0.015] to-transparent group-hover:from-rochelais-gold/[0.07] group-hover:via-rochelais-gold/[0.045] group-hover:border-rochelais-gold/45 px-6 py-5 md:px-8 md:py-6 flex items-center justify-between transition-colors duration-700">
                                    <span className="font-secondary text-xs text-off-white/40 uppercase tracking-widest group-hover:text-rochelais-gold/95 transition-colors duration-700 flex items-center gap-2">
                                        {milestone.ctaLabel}
                                    </span>
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-off-white/40 group-hover:text-rochelais-gold group-hover:translate-x-1 transition-all duration-700"
                                    >
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                        <polyline points="12 5 19 12 12 19" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center reveal-on-scroll opacity-0 translate-y-8 transition-all duration-1000 delay-500 ease-out border-t border-off-white/5 pt-12">
                    <p
                        className={`font-secondary font-extrabold text-off-white/90 uppercase tracking-section-heading mx-auto transition-all duration-500 ${
                            language === 'ka' ? 'text-xl md:text-3xl max-w-4xl' : 'text-2xl md:text-4xl max-w-5xl'
                        }`}
                    >
                        {closingStatement}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AuthorityStrip;