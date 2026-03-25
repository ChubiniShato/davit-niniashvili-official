import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getContentBlocks } from '../api/api';
import { useLanguage } from './LanguageContext';

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
    const { language } = useLanguage();
    const [blocks, setBlocks] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchBlocks = useCallback(async () => {
        try {
            setLoading(true);
            const res = await getContentBlocks({ locale: language });
            const data = res.data.data || [];
            
            // Map blocks by "page.section.key" for easy lookup
            const mapped = data.reduce((acc, block) => {
                const fullKey = `${block.page}.${block.section}.${block.key}`;
                acc[fullKey] = block.value;
                return acc;
            }, {});
            
            setBlocks(mapped);
        } catch (err) {
            console.error('Failed to fetch content blocks:', err);
        } finally {
            setLoading(false);
        }
    }, [language]);

    useEffect(() => {
        fetchBlocks();
    }, [fetchBlocks]);

    const getBlock = (page, section, key, fallback) => {
        const fullKey = `${page}.${section}.${key}`;
        return blocks[fullKey] || fallback;
    };

    return (
        <ContentContext.Provider value={{ blocks, loading, getBlock, refresh: fetchBlocks }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => {
    const context = useContext(ContentContext);
    if (!context) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
};
