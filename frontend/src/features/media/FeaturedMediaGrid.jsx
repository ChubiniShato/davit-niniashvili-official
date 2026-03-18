import React, { useState, useEffect } from 'react';
import MediaFeatureCard from './MediaFeatureCard';
import MediaQuickViewModal from './MediaQuickViewModal';
import { getFeaturedMedia } from '../../config/media';

const FeaturedMediaGrid = () => {
    const [featuredItems, setFeaturedItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        setFeaturedItems(getFeaturedMedia());
    }, []);

    const openModal = (item) => {
        setSelectedItem(item);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedItem(null);
        document.body.style.overflow = '';
    };

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') closeModal();
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, []);

    if (featuredItems.length === 0) return null;

    const primaryItem = featuredItems[0];
    const secondaryItems = featuredItems.slice(1, 3);

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Primary Card (Left / Top) */}
                <div className="lg:col-span-7 h-full">
                    {primaryItem && (
                        <MediaFeatureCard 
                            item={primaryItem} 
                            isPrimary={true} 
                            onClick={() => openModal(primaryItem)}
                        />
                    )}
                </div>

                {/* Secondary Cards (Right / Bottom) */}
                <div className="lg:col-span-5 flex flex-col gap-6 h-full">
                    {secondaryItems.map((item, idx) => (
                        <div key={item.id} className="flex-1">
                            <MediaFeatureCard 
                                item={item} 
                                isPrimary={false} 
                                onClick={() => openModal(item)}
                            />
                        </div>
                    ))}
                </div>

            </div>

            <MediaQuickViewModal 
                item={selectedItem} 
                isOpen={!!selectedItem} 
                onClose={closeModal} 
            />
        </div>
    );
};

export default FeaturedMediaGrid;
