import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../ui/Section';
import Typography from '../ui/Typography';
import { useLanguage } from '../context/LanguageContext';

const ContactPage = () => {
    const { t } = useLanguage();
    return (
        <>
            <Section className="bg-surface-base">
                <div className="text-center mb-16">
                    <Typography variant="h1" className="text-rochelais-gold mb-4">
                        {t('nav.contact')}
                    </Typography>
                    <Typography variant="body" className="text-mid-grey">
                        {t('page.contact.subtitle')}
                    </Typography>
                </div>

                <div className="max-w-xl mx-auto space-y-12 text-center mb-16">
                    {/* General */}
                    <div>
                        <p className="font-secondary text-xs uppercase tracking-widest text-off-white/50 mb-3">
                            {t('page.contact.labels.general')}
                        </p>
                        <a
                            href="mailto:info@dniniashvili.com"
                            className="font-primary text-xl text-rochelais-gold hover:text-off-white transition-colors duration-300"
                        >
                            info@dniniashvili.com
                        </a>
                    </div>

                    {/* Partnerships */}
                    <div>
                        <p className="font-secondary text-xs uppercase tracking-widest text-off-white/50 mb-3">
                            {t('page.contact.labels.partnerships')}
                        </p>
                        <a
                            href="mailto:partners@dniniashvili.com"
                            className="font-primary text-xl text-rochelais-gold hover:text-off-white transition-colors duration-300"
                        >
                            partners@dniniashvili.com
                        </a>
                    </div>

                    {/* Press */}
                    <div>
                        <p className="font-secondary text-xs uppercase tracking-widest text-off-white/50 mb-3">
                            {t('page.contact.labels.press')}
                        </p>
                        <a
                            href="mailto:press@dniniashvili.com"
                            className="font-primary text-xl text-rochelais-gold hover:text-off-white transition-colors duration-300"
                        >
                            press@dniniashvili.com
                        </a>
                    </div>
                </div>

                <div className="text-center">
                    <Link
                        to="/"
                        className="font-secondary text-sm uppercase tracking-widest text-rochelais-gold hover:text-off-white transition-colors duration-300"
                    >
                        {'\u2190'} {t('nav.home') || 'Home'}
                    </Link>
                </div>
            </Section>
        </>
    );
};

export default ContactPage;
