import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Section from '../ui/Section';
import Typography from '../ui/Typography';
import { useLanguage } from '../context/LanguageContext';
import { 
    getFeaturedMedia, 
    getPublishedArchiveMedia, 
    getPendingVerificationMedia, 
    mediaFilterOptions 
} from '../config/media';
import { getFeaturedPress, getPressArchive } from '../api/api';

import MediaFeaturedStrip from '../features/media/MediaFeaturedStrip';
import MediaFilters from '../features/media/MediaFilters';
import MediaArchiveList from '../features/media/MediaArchiveList';
import MediaArchiveCard from '../features/media/MediaArchiveCard';
import MediaQuickViewModal from '../features/media/MediaQuickViewModal';

const MediaPage = () => {
    const { t } = useLanguage();
    
    // Internal State
    const [selectedItem, setSelectedItem] = useState(null);
    const [filters, setFilters] = useState({
        source: '',
        year: '',
        language: '',
        contentType: '',
        sourceTier: '',
        featuredOnly: false,
    });

    // Data Loaders
    const [featuredItems, setFeaturedItems] = useState(() => getFeaturedMedia());
    const [archiveItems, setArchiveItems] = useState(() => getPublishedArchiveMedia());
    const [pendingItems, setPendingItems] = useState(() => getPendingVerificationMedia());

    React.useEffect(() => {
        const fetchBackendMedia = async () => {
            try {
                const [featuredRes, archiveRes] = await Promise.all([
                    getFeaturedPress(),
                    getPressArchive()
                ]);

                if (featuredRes.data && featuredRes.data.length > 0) {
                    const normFeatured = featuredRes.data.map(i => ({
                        ...i, id: i.slug, contentType: i.contentType === 'MatchReport' ? 'Match Report' : i.contentType
                    }));
                    setFeaturedItems(normFeatured);
                }

                if (archiveRes.data && archiveRes.data.length > 0) {
                    const normArchive = archiveRes.data.map(i => ({
                        ...i, id: i.slug, contentType: i.contentType === 'MatchReport' ? 'Match Report' : i.contentType
                    }));
                    const confirmed = normArchive.filter(i => i.recordStatus === 'confirmed');
                    const pending = normArchive.filter(i => i.recordStatus === 'provisional');
                    
                    setArchiveItems(confirmed);
                    setPendingItems(pending);
                }
            } catch (err) {
                console.warn('Backend media endpoints failed. Keeping local fallback.', err);
            }
        };
        fetchBackendMedia();
    }, []);

    // Meta Stats
    const allRecords = useMemo(() => [...archiveItems, ...pendingItems, ...featuredItems], [archiveItems, pendingItems, featuredItems]);
    const totalRecordsCount = new Set(allRecords.map(r => r.id)).size;
    const tierACount = new Set(allRecords.filter(r => r.sourceTier === 'A').map(r => r.source)).size;
    const languagesCount = mediaFilterOptions.languages.length;

    // Filter Logic
    const filteredArchive = useMemo(() => {
        return archiveItems.filter(item => {
            if (filters.featuredOnly && !featuredItems.some(f => f.id === item.id)) return false;
            if (filters.source && item.source !== filters.source) return false;
            if (filters.year && !item.displayDate.startsWith(filters.year)) return false;
            if (filters.language && item.language !== filters.language) return false;
            if (filters.contentType && item.contentType !== filters.contentType) return false;
            if (filters.sourceTier && item.sourceTier !== filters.sourceTier) return false;
            return true;
        });
    }, [archiveItems, featuredItems, filters]);

    const handleOpenModal = (item) => {
        setSelectedItem(item);
        document.body.style.overflow = 'hidden';
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
        document.body.style.overflow = '';
    };

    React.useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') handleCloseModal();
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, []);

    const handleResetFilters = () => {
        setFilters({ 
            source: '', 
            year: '',
            language: '',
            contentType: '',
            sourceTier: '',
            featuredOnly: false
        });
    };

    return (
        <div className="bg-surface-base min-h-screen">
            
            {/* Header Block & Stats Strip */}
            <Section className="bg-obsidian pt-32 pb-16 md:py-40 relative z-10 border-b border-divider">
                <div className="text-center max-w-4xl mx-auto mb-16 px-6">
                    <Typography variant="tiny" className="mb-6 block">
                        {t('page.media.title')}
                    </Typography>
                    <Typography variant="h1" className="text-rochelais-gold mb-8 leading-none md:leading-none">
                        {t('page.media.title')}
                    </Typography>
                    <Typography variant="body" className="text-mid-grey">
                        {t('page.media.subtitle')}
                    </Typography>
                </div>

                {/* Stats Strip */}
                <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-12 text-center">
                    <div className="border border-divider p-8 rounded-lg bg-surface-base hover:border-rochelais-gold/30 transition-colors">
                        <span className="block font-primary text-4xl font-bold text-off-white mb-2">
                            {totalRecordsCount}
                        </span>
                        <span className="font-secondary text-xs uppercase tracking-widest text-rochelais-gold">
                            {t('page.media.stats.records')}
                        </span>
                    </div>
                    <div className="border border-divider p-8 rounded-lg bg-surface-base hover:border-rochelais-gold/30 transition-colors">
                        <span className="block font-primary text-4xl font-bold text-off-white mb-2">
                            {tierACount}
                        </span>
                        <span className="font-secondary text-xs uppercase tracking-widest text-rochelais-gold">
                            {t('page.media.stats.tierA')}
                        </span>
                    </div>
                    <div className="border border-divider p-8 rounded-lg bg-surface-base hover:border-rochelais-gold/30 transition-colors">
                        <span className="block font-primary text-4xl font-bold text-off-white mb-2">
                            {languagesCount}
                        </span>
                        <span className="font-secondary text-xs uppercase tracking-widest text-rochelais-gold">
                            {t('page.media.stats.languages')}
                        </span>
                    </div>
                </div>
            </Section>

            {/* Featured Strip */}
            <MediaFeaturedStrip 
                items={featuredItems} 
                onOpenModal={handleOpenModal} 
            />

            {/* Sticky Filters */}
            <MediaFilters 
                currentFilters={filters}
                setFilters={setFilters}
                onReset={handleResetFilters}
                options={mediaFilterOptions}
            />

            {/* Main Archive */}
            <Section className="pt-0 pb-24 relative z-10">
                <MediaArchiveList 
                    title={t('page.media.archive.title')} 
                    items={filteredArchive} 
                />
            </Section>

            {/* Pending Verification Section */}
            {pendingItems.length > 0 && (
                <Section className="bg-obsidian py-24 border-t border-divider relative z-10">
                    <div className="mb-12 text-center max-w-3xl mx-auto px-6">
                        <Typography variant="h2" className="text-3xl md:text-4xl mb-4 text-off-white/50">
                            {t('page.media.pending.title')}
                        </Typography>
                        <Typography variant="body" className="text-off-white/40">
                            {t('page.media.pending.subtitle')}
                        </Typography>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-60 hover:opacity-100 transition-opacity duration-500">
                        {pendingItems.map(item => (
                            <div key={item.id} className="h-full">
                                <MediaArchiveCard item={item} />
                            </div>
                        ))}
                    </div>
                </Section>
            )}

            {/* Footer Nav */}
            <Section className="py-16 bg-surface-base border-t border-divider !mt-0 text-center">
                <Link
                    to="/"
                    className="font-secondary text-sm uppercase tracking-widest text-rochelais-gold hover:text-off-white transition-colors duration-300 inline-block px-8 py-4 border border-divider hover:border-rochelais-gold"
                >
                    ← {t('page.media.backHome')}
                </Link>
            </Section>

            {/* Global Modal */}
            <MediaQuickViewModal 
                item={selectedItem} 
                isOpen={!!selectedItem} 
                onClose={handleCloseModal} 
            />
            
        </div>
    );
};

export default MediaPage;
