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

                <div className="max-w-xl mx-auto space-y-8 text-center mb-16">
                    {/* Email */}
                    <div>
                        <p className="font-secondary text-xs uppercase tracking-widest text-off-white/50 mb-2">Email</p>
                        <a
                            href="mailto:contact@davitniniashvili.com"
                            className="font-primary text-lg text-rochelais-gold hover:text-off-white transition-colors duration-300"
                        >
                            contact@davitniniashvili.com
                        </a>
                    </div>

                    {/* Social */}
                    <div>
                        <p className="font-secondary text-xs uppercase tracking-widest text-off-white/50 mb-3">Social</p>
                        <div className="flex justify-center gap-6">
                            <a
                                href="https://www.instagram.com/davit_niniashvili/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-secondary text-sm uppercase tracking-widest text-off-white/60 hover:text-rochelais-gold transition-colors duration-300"
                            >
                                Instagram
                            </a>
                            <a
                                href="https://www.facebook.com/profile.php?id=100063606498498"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-secondary text-sm uppercase tracking-widest text-off-white/60 hover:text-rochelais-gold transition-colors duration-300"
                            >
                                Facebook
                            </a>
                        </div>
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
