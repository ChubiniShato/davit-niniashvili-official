import React from 'react';
import MediaArchiveCard from './MediaArchiveCard';
import Typography from '../../ui/Typography';
import { useLanguage } from '../../context/LanguageContext';

const MediaArchiveList = ({ items, title, subtitle }) => {
    const { t } = useLanguage();

    // Group items by year
    const groupedItems = items.reduce((acc, item) => {
        const year = item.displayDate.substring(0, 4) || 'Unknown';
        if (!acc[year]) acc[year] = [];
        acc[year].push(item);
        return acc;
    }, {});

    // Sort years descending
    const sortedYears = Object.keys(groupedItems).sort((a, b) => b.localeCompare(a));

    if (items.length === 0) return null;

    return (
        <div className="w-full mb-16 md:mb-24">
            <div className="mb-12 border-b border-divider pb-6">
                <Typography variant="h2" className="text-3xl md:text-4xl mb-4">
                    {title}
                </Typography>
                {subtitle && (
                    <Typography variant="body" className="text-mid-grey">
                        {subtitle}
                    </Typography>
                )}
            </div>

            <div className="space-y-16">
                {sortedYears.map(year => (
                    <div key={year} className="relative">
                        <div className="flex items-center gap-6 mb-8">
                            <h3 className="font-primary text-4xl font-bold text-off-white/20">
                                {year}
                            </h3>
                            <div className="flex-1 h-px bg-divider"></div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {groupedItems[year].map(item => (
                                <MediaArchiveCard key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MediaArchiveList;
