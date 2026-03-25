import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const AuthorityStrip = () => {
    const { t, language } = useLanguage();
    const sectionRef = useRef(null);
    const [selectedMilestone, setSelectedMilestone] = useState(null);

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

    // Modal Lifecycle: Lock scroll and handle ESC
    useEffect(() => {
        if (selectedMilestone) {
            document.body.style.overflow = 'hidden';
            const handleEsc = (e) => {
                if (e.key === 'Escape') setSelectedMilestone(null);
            };
            window.addEventListener('keydown', handleEsc);
            return () => {
                document.body.style.overflow = '';
                window.removeEventListener('keydown', handleEsc);
            };
        }
    }, [selectedMilestone]);

    const slogan = t('home.authority.slogan');
    const author = t('home.authority.author');
    
    // Exact Closing Statement logic
    const closingStatement = language === 'ka' 
        ? 'უმაღლესი დონის თამაში — გლობალური მასშტაბი!'
        : language === 'fr'
        ? "Performance d'élite — Impact global!"
        : 'Elite Performance — Global Impact!';

    const primaryHighlights = [
        { label: language === 'ka' ? 'ევროპის ჩემპიონი' : 'European Champion', sub: '2021—2024', icon: 'icons/erc-trophy.png' },
        { label: language === 'ka' ? 'ჩელენჯ ქაფი' : 'EPCR Challenge Cup', sub: 'Winner — Lyon', icon: 'icons/epcr-challenge-cup.png' },
        { label: language === 'ka' ? 'Midi Olympique' : 'Oscars du Midi Olympique', sub: 'Winner 2023', icon: 'icons/midi-olympique-oscars.png' }
    ];

    const milestones = [
        {
            id: 1,
            label: language === 'ka' ? 'გარღვევა' : 'Breakthrough',
            title: language === 'ka' ? 'ადრეული აღიარება' : 'Early Recognition',
            description: language === 'ka' ? 'საერთაშორისო ასპარეზზე გამოჩენა ყველაზე იმედისმომცემი ტალანტის სტატუსით.' : 'Early emergence as one of the most exciting Georgian rugby talents.',
            image: '/images/davit-barbarians.jpg'
        },
        {
            id: 2,
            label: language === 'ka' ? 'ევროპული ეტაპი' : 'European Stage',
            title: language === 'ka' ? 'ელიტარული კლუბები' : 'Elite Club Rugby',
            description: language === 'ka' ? 'განვითარება ევროპული რაგბის უმაღლეს დონეზე.' : 'Development within elite European club rugby.',
            image: '/images/rugby-europe-cup.webp'
        },
        {
            id: 3,
            label: language === 'ka' ? 'აღიარება' : 'International Recognition',
            title: language === 'ka' ? 'სტაბილური თამაში' : 'Consistent Performance',
            description: language === 'ka' ? 'საქართველოს ეროვნული ნაკრებისა და საერთაშორისო ჩემპიონატების მუდმივი მონაწილე.' : 'Regular presence in international rugby competitions.',
            image: '/images/hero-challenge-cup.webp'
        }
    ];

    return (
        <section
            id="authority-section"
            ref={sectionRef}
            className="relative w-full bg-surface-base border-t border-divider overflow-hidden py-16 md:py-20 lg:py-24 scroll-mt-16"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-rochelais-gold/[0.02] to-black/40 pointer-events-none"></div>

            <div className="relative max-w-7xl mx-auto px-6 w-full">
                
                {/* 1. Principle Intro */}
                <div className="text-center mb-16 md:mb-20 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-1000 ease-out">
                    <h2 className={`font-secondary font-extrabold italic text-off-white/95 mb-8 max-w-5xl xl:max-w-none mx-auto leading-tight xl:whitespace-nowrap ${language === 'ka' ? 'text-2xl md:text-4xl lg:text-5xl' : 'text-2xl md:text-4xl lg:text-5xl tracking-tighter'}`}>
                        "{slogan}"
                    </h2>
                    <div className="flex flex-col items-center">
                        <span className="w-12 h-px bg-rochelais-gold/40 mb-6"></span>
                        <p className={`font-secondary text-rochelais-gold/90 uppercase tracking-section-heading font-bold ${language === 'ka' ? 'text-xs md:text-sm' : 'text-sm md:text-base'}`}>
                            {author}
                        </p>
                    </div>
                </div>

                {/* 2. Honors / Awards Row */}
                <div className="w-full mb-20 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-1000 delay-150 ease-out">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
                        {primaryHighlights.map((item, index) => (
                            <div
                                key={`award-${index}`}
                                className="relative flex flex-col items-center text-center p-8 md:p-10 bg-surface-raised/40 border border-off-white/5 rounded-2xl group hover:border-rochelais-gold/20 transition-all duration-500"
                            >
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(232,168,0,0.08)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                <div className="relative h-32 md:h-44 mb-8 flex items-center justify-center">
                                    <img
                                        src={`/${item.icon}`}
                                        alt={item.label}
                                        className="h-full object-contain filter drop-shadow-[0_0_15px_rgba(232,168,0,0.25)] group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="relative z-10 mt-auto">
                                    <h4 className="font-secondary text-base lg:text-lg font-bold text-white/90 group-hover:text-rochelais-gold transition-colors mb-2">
                                        {item.label}
                                    </h4>
                                    <span className="font-secondary text-xs text-off-white/40 tracking-widest uppercase block border-t border-off-white/5 pt-3">
                                        {item.sub}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. Career Milestones Grid + Visibility Card */}
                <div className="w-full mb-16 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-1000 delay-300 ease-out">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {milestones.map((milestone) => (
                            <div
                                key={milestone.id}
                                onClick={() => setSelectedMilestone(milestone)}
                                className="group relative aspect-[4/3] overflow-hidden rounded-2xl cursor-pointer border border-off-white/5"
                            >
                                <img
                                    src={milestone.image}
                                    alt={milestone.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
                                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                                    <span className="inline-block font-secondary text-xs tracking-brand-ka text-rochelais-gold uppercase mb-3 px-2 py-0.5 border border-rochelais-gold/30 rounded">
                                        {milestone.label}
                                    </span>
                                    <h3 className="font-secondary text-xl md:text-2xl font-bold text-white mb-2 group-hover:translate-x-1 transition-transform">
                                        {milestone.title}
                                    </h3>
                                    <p className="font-secondary text-xs text-off-white/60 line-clamp-2 max-w-sm">
                                        {milestone.description}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* 4. Current Image / Visibility Card */}
                        <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-off-white/10 bg-surface-raised flex flex-col p-6 md:p-8">
                            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none overflow-hidden">
                                <img src="/images/midi-olympique-award.webp" className="w-full h-full object-cover grayscale blur-sm" alt="" />
                            </div>
                            
                            <div className="relative z-10 flex flex-col h-full">
                                <span className="font-secondary text-xs tracking-brand-ka text-off-white/40 uppercase mb-8">
                                    {language === 'ka' ? 'სპონსორებისთვის' : 'Visibility & Reach'}
                                </span>
                                
                                <div className="space-y-6 flex-grow">
                                    {[
                                        { en: 'Elite league visibility', ka: 'ელიტარული ლიგის ხილვადობა' },
                                        { en: 'Broadcast and highlight exposure', ka: 'ჰაილაითებისა და ტრანსლაციების სივრცე' },
                                        { en: 'Club and international recognition', ka: 'კლუბისა და საერთაშორისო აღიარება' }
                                    ].map((indicator, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="w-1.5 h-1.5 rounded-full bg-rochelais-gold/60"></div>
                                            <p className="font-secondary text-xs md:text-sm text-off-white/80 tracking-wide font-medium">
                                                {language === 'ka' ? indicator.ka : indicator.en}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <Link 
                                    to="/media" 
                                    className="inline-flex items-center gap-3 mt-10 text-rochelais-gold hover:text-white transition-colors group/link"
                                >
                                    <span className="font-secondary text-xs uppercase tracking-widest font-bold">
                                        {language === 'ka' ? 'იხილეთ მედია სივრცე' : 'Access Media Room'}
                                    </span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover/link:translate-x-1 transition-transform">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. Closing Statement */}
                <div className="text-center reveal-on-scroll opacity-0 translate-y-8 transition-all duration-1000 delay-500 ease-out border-t border-off-white/5 pt-12">
                    <p className={`font-secondary font-extrabold text-off-white/90 uppercase tracking-section-heading mx-auto transition-all duration-500 ${language === 'ka' ? 'text-xl md:text-3xl max-w-4xl' : 'text-2xl md:text-4xl max-w-5xl'}`}>
                        {closingStatement}
                    </p>
                </div>
            </div>

            {/* Modal for Milestones */}
            {selectedMilestone && (
                <div 
                    role="dialog"
                    aria-modal="true"
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md transition-all duration-300"
                    onClick={() => setSelectedMilestone(null)}
                >
                    <div 
                        className="relative max-w-5xl w-full aspect-[16/10] overflow-hidden rounded-xl border border-off-white/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img 
                            src={selectedMilestone.image} 
                            alt={selectedMilestone.title} 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
                            <h3 className="font-secondary text-2xl font-bold text-white mb-2">{selectedMilestone.title}</h3>
                            <p className="font-secondary text-sm text-off-white/80">{selectedMilestone.description}</p>
                        </div>
                        <button 
                            className="absolute top-6 right-6 p-2 bg-black/50 text-white rounded-full hover:bg-rochelais-gold/80 transition-colors"
                            onClick={() => setSelectedMilestone(null)}
                            aria-label="Close modal"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default AuthorityStrip;

