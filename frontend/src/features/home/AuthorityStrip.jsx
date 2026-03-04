import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const AuthorityStrip = () => {
    const { t } = useLanguage();

    const slogan = t('home.authority.slogan');
    const kpis = t('home.authority.kpis');
    const status = t('home.authority.status');
    const ctaCareer = t('home.authority.cta.career');
    const ctaHighlights = t('home.authority.cta.highlights');

    return (
        <section className="relative w-full bg-surface-base border-t border-divider min-h-[calc(100dvh-64px)] py-14 md:py-24 pb-28 md:pb-36 flex items-center overflow-hidden">
            {/* Subtle mesh/gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-rochelais-gold/5 via-transparent to-black/40 pointer-events-none"></div>

            <div className="relative max-w-6xl mx-auto px-6 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                    {/* Left Column (lg:col-span-5) */}
                    <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
                        {/* Slogan Headline */}
                        <p className="font-secondary text-xl md:text-2xl font-extrabold italic text-off-white/90 mb-8 lg:mb-10 tracking-tight">
                            {slogan}
                        </p>

                        {/* Current Status */}
                        <div className="hidden lg:block w-12 h-px bg-rochelais-gold/40 mb-6"></div>
                        <p className="font-secondary text-sm tracking-wide text-off-white/50 mb-8 lg:mb-12">
                            {status}
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                            <Link
                                to="/career"
                                className="inline-block font-secondary text-xs uppercase tracking-widest px-5 py-1.5 border border-rochelais-gold/40 text-rochelais-gold hover:border-rochelais-gold hover:text-off-white transition-all duration-300 rounded-xl"
                            >
                                {ctaCareer}
                            </Link>
                            <Link
                                to="/#highlights-section"
                                className="inline-block font-secondary text-xs uppercase tracking-widest px-5 py-1.5 border border-rochelais-gold/40 text-rochelais-gold hover:border-rochelais-gold hover:text-off-white transition-all duration-300 rounded-xl"
                            >
                                {ctaHighlights}
                            </Link>
                        </div>
                    </div>

                    {/* Right Column (lg:col-span-7) */}
                    <div className="lg:col-span-7">
                        {Array.isArray(kpis) && (
                            <div className="flex flex-col gap-8">
                                {/* Primary KPI Cards (First 3) */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                                    {kpis.slice(0, 3).map((kpi, i) => (
                                        <div key={i} className="relative bg-off-white/5 border border-rochelais-gold/20 rounded-xl px-5 py-5 overflow-hidden flex items-center group">
                                            {/* Accent left border */}
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-rochelais-gold/40 transition-colors group-hover:bg-rochelais-gold"></div>
                                            <span className="font-secondary text-sm md:text-base tracking-wide text-off-white/90 group-hover:text-off-white transition-colors">
                                                {kpi}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Secondary KPI Items (Remaining 3) */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 pt-4 border-t border-off-white/10">
                                    {kpis.slice(3).map((kpi, i) => (
                                        <div key={i + 3} className="flex items-start gap-3 px-2">
                                            <span className="w-1.5 h-1.5 mt-2 bg-rochelais-gold/60 rounded-full flex-shrink-0"></span>
                                            <span className="font-secondary text-sm md:text-base tracking-wide text-off-white/60">
                                                {kpi}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AuthorityStrip;
