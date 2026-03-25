import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useContent } from '../../context/ContentContext';

const ForBrandsCTA = () => {
    const { t } = useLanguage();
    const { getBlock } = useContent();

    return (
        <section className="w-full bg-surface-raised border-t border-divider py-16 md:py-20">
            <div className="max-w-3xl mx-auto px-6 text-center">
                <Link
                    to="/for-brands"
                    className="inline-block font-secondary text-sm uppercase tracking-widest px-6 py-2.5 bg-transparent border border-rochelais-gold/60 text-rochelais-gold rounded-xl shadow-sm hover:bg-rochelais-gold hover:text-obsidian transition-all duration-300"
                >
                    {getBlock('home', 'brands_cta', 'button_text', t('home.forBrands.cta'))}
                </Link>
            </div>
        </section>
    );
};

export default ForBrandsCTA;
