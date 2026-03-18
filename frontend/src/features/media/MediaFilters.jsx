import React from 'react';
import Typography from '../../ui/Typography';
import { useLanguage } from '../../context/LanguageContext';

const MediaFilters = ({ options, currentFilters, setFilters, onReset }) => {
    const { t } = useLanguage();

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: prev[key] === value ? '' : value
        }));
    };

    const hasActiveFilters = Object.values(currentFilters).some(v => v !== '' && v !== false);

    return (
        <div className="w-full bg-obsidian py-6 border-y border-divider mb-16 md:mb-24 sticky top-[64px] z-40 backdrop-blur-md bg-opacity-90">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-6">
                
                <div className="flex flex-wrap items-center gap-4 w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0">
                    {/* Source Filter */}
                    <div className="relative group">
                        <select 
                            value={currentFilters.source} 
                            onChange={(e) => handleFilterChange('source', e.target.value)}
                            className="appearance-none bg-surface-base border border-divider rounded-lg px-4 py-2 font-secondary text-xs uppercase tracking-widest text-off-white/80 focus:outline-none focus:border-rochelais-gold/50 transition-colors pr-10 cursor-pointer"
                        >
                            <option value="">{t('page.media.filters.source')}</option>
                            {options.sources.map(s => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-off-white/50 group-hover:text-rochelais-gold transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Year Filter */}
                    <div className="relative group">
                        <select 
                            value={currentFilters.year} 
                            onChange={(e) => handleFilterChange('year', e.target.value)}
                            className="appearance-none bg-surface-base border border-divider rounded-lg px-4 py-2 font-secondary text-xs uppercase tracking-widest text-off-white/80 focus:outline-none focus:border-rochelais-gold/50 transition-colors pr-10 cursor-pointer"
                        >
                            <option value="">{t('page.media.filters.year')}</option>
                            {options.years.map(y => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-off-white/50 group-hover:text-rochelais-gold transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                    {/* Language Filter */}
                    <div className="relative group">
                        <select 
                            value={currentFilters.language} 
                            onChange={(e) => handleFilterChange('language', e.target.value)}
                            className="appearance-none bg-surface-base border border-divider rounded-lg px-4 py-2 font-secondary text-xs uppercase tracking-widest text-off-white/80 focus:outline-none focus:border-rochelais-gold/50 transition-colors pr-10 cursor-pointer"
                        >
                            <option value="">{t('page.media.filters.language')}</option>
                            {options.languages.map(l => (
                                <option key={l} value={l}>{l}</option>
                            ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-off-white/50 group-hover:text-rochelais-gold transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Content Type Filter */}
                    <div className="relative group">
                        <select 
                            value={currentFilters.contentType} 
                            onChange={(e) => handleFilterChange('contentType', e.target.value)}
                            className="appearance-none bg-surface-base border border-divider rounded-lg px-4 py-2 font-secondary text-xs uppercase tracking-widest text-off-white/80 focus:outline-none focus:border-rochelais-gold/50 transition-colors pr-10 cursor-pointer"
                        >
                            <option value="">{t('page.media.filters.type')}</option>
                            {options.contentTypes.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-off-white/50 group-hover:text-rochelais-gold transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Tier Filter */}
                    <div className="relative group">
                        <select 
                            value={currentFilters.sourceTier} 
                            onChange={(e) => handleFilterChange('sourceTier', e.target.value)}
                            className="appearance-none bg-surface-base border border-divider rounded-lg px-4 py-2 font-secondary text-xs uppercase tracking-widest text-off-white/80 focus:outline-none focus:border-rochelais-gold/50 transition-colors pr-10 cursor-pointer"
                        >
                            <option value="">{t('page.media.filters.tier')}</option>
                            {options.tiers.map(tr => (
                                <option key={tr} value={tr}>Tier {tr}</option>
                            ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-off-white/50 group-hover:text-rochelais-gold transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Featured Only Toggle */}
                    <button
                        onClick={() => handleFilterChange('featuredOnly', !currentFilters.featuredOnly)}
                        className={`font-secondary text-xs uppercase tracking-widest px-4 py-2 border rounded-lg transition-colors duration-300 ${
                            currentFilters.featuredOnly 
                                ? 'bg-rochelais-gold text-obsidian border-rochelais-gold' 
                                : 'bg-surface-base text-off-white/80 border-divider hover:border-rochelais-gold/50'
                        }`}
                    >
                        {t('page.media.filters.featuredOnly')}
                    </button>
                </div>

                {/* Reset Button (Mobile right aligned, Desktop flex trailing) */}
                {hasActiveFilters && (
                    <button 
                        onClick={onReset}
                        className="ml-auto font-secondary text-xs md:text-xs uppercase tracking-widest text-rochelais-gold hover:text-off-white transition-colors duration-300 flex items-center gap-2 whitespace-nowrap"
                    >
                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        {t('page.media.filters.reset')}
                    </button>
                )}

            </div>
        </div>
    );
};

export default MediaFilters;
