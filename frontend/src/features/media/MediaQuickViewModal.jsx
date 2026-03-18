import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '../../ui/Typography';
import { useLanguage } from '../../context/LanguageContext';

const MediaQuickViewModal = ({ item, isOpen, onClose }) => {
    const { t } = useLanguage();

    if (!isOpen || !item) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
            <div 
                className="absolute inset-0 bg-obsidian/90 backdrop-blur-sm"
                onClick={onClose}
            />
            
            <div className="relative w-full max-w-3xl bg-surface-base border border-divider shadow-2xl flex flex-col max-h-[90vh]">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-off-white/50 hover:text-off-white transition-colors p-2"
                    aria-label={t('home.media.modal.close')}
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar flex-1">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="font-secondary text-xs tracking-widest uppercase text-rochelais-gold">
                            {item.source}
                        </span>
                        <span className="w-1 h-1 bg-rochelais-gold/50 rounded-full"></span>
                        <span className="font-secondary text-xs tracking-widest uppercase text-off-white/50">
                            {item.displayDate}
                        </span>
                        <span className="w-1 h-1 bg-rochelais-gold/50 rounded-full"></span>
                        <span className="font-secondary text-xs tracking-widest text-off-white/50 uppercase">
                            {item.contentType}
                        </span>
                    </div>

                    <Typography variant="h3" className="mb-6 leading-tight">
                        {item.title}
                    </Typography>

                    <p className="font-primary text-lg text-off-white/80 leading-relaxed mb-10 border-l-2 border-rochelais-gold pl-6 py-2 bg-gradient-to-r from-rochelais-gold/5 to-transparent">
                        {item.summaryShort}
                    </p>

                    {item.keyTakeaways && item.keyTakeaways.length > 0 && (
                        <div className="mb-10">
                            <h4 className="font-secondary text-xs uppercase tracking-widest text-off-white/50 mb-4">
                                {t('home.media.modal.takeaways')}
                            </h4>
                            <ul className="space-y-4">
                                {item.keyTakeaways.map((takeaway, idx) => (
                                    <li key={idx} className="flex items-start gap-4">
                                        <span className="text-rochelais-gold mt-1.5 opacity-70">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 8 8">
                                                <rect width="8" height="8" />
                                            </svg>
                                        </span>
                                        <span className="font-primary text-off-white/90 leading-relaxed">
                                            {takeaway}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="pt-8 border-t border-divider mt-auto flex flex-wrap items-center gap-4">
                        {item.hasLiveSourceLink && item.sourceUrl ? (
                            <a 
                                href={item.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 font-secondary text-xs uppercase tracking-widest text-obsidian bg-rochelais-gold px-8 py-4 hover:bg-off-white transition-colors"
                            >
                                {t('home.media.modal.viewSource')}
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        ) : (
                            <div className="inline-flex items-center gap-3 font-secondary text-xs tracking-widest uppercase text-off-white/30 px-8 py-4 border border-divider">
                                {t('home.media.modal.linkPending')}
                            </div>
                        )}
                        <Link 
                            to="/media"
                            className="inline-flex items-center gap-3 font-secondary text-xs uppercase tracking-widest text-off-white hover:text-rochelais-gold px-8 py-4 border border-divider hover:border-rochelais-gold/50 transition-colors"
                        >
                            {t('home.media.modal.allMedia')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MediaQuickViewModal;
