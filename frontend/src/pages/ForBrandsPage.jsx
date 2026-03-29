import React, { useState, useRef } from 'react';
import Section from '../ui/Section';
import Typography from '../ui/Typography';
import { useLanguage } from '../context/LanguageContext';
import { collaborations } from '../config/collaborations';

const ForBrandsPage = () => {
    const { t } = useLanguage();
    const formRef = useRef(null);
    const [formStatus, setFormStatus] = useState('idle');
    const [formData, setFormData] = useState({
        company: '',
        name: '',
        position: '',
        email: '',
        interest: '',
        category: '',
        message: ''
    });

    const scrollToForm = (interestType = '', categoryType = '') => {
        setFormData(prev => ({
            ...prev,
            interest: interestType || t('page.forBrands.form.interest.inquiry'),
            category: categoryType || ''
        }));
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('success');
    };

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="bg-obsidian w-full pb-20">
            {/* Section 1: Hero */}
            <Section className="min-h-[80vh] flex flex-col items-center justify-center text-center pt-40 pb-24 bg-surface-base md:pt-48 md:pb-32">
                <Typography variant="label" className="text-rochelais-gold/80 mb-6 tracking-widest uppercase text-sm font-semibold">
                    {t('page.forBrands.s1.eyebrow')}
                </Typography>
                <div className="max-w-4xl mx-auto">
                    <Typography variant="h1" className="text-off-white mb-8 text-4xl md:text-6xl lg:text-7xl tracking-tighter leading-none">
                        {t('page.forBrands.s1.title')}
                    </Typography>
                </div>
                <Typography variant="h3" className="text-off-white/70 max-w-2xl mx-auto mb-12 font-normal text-lg md:text-xl leading-relaxed">
                    {t('page.forBrands.s1.sub')}
                </Typography>
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto">
                    <button 
                        onClick={() => scrollToForm()}
                        className="w-full sm:w-auto px-8 py-4 bg-rochelais-gold text-obsidian font-secondary uppercase tracking-widest text-sm rounded-sm hover:bg-off-white transition-colors"
                    >
                        {t('page.forBrands.s1.cta1')}
                    </button>
                    <button 
                        onClick={() => scrollToForm(t('page.forBrands.form.interest.mediakit'))}
                        className="w-full sm:w-auto px-8 py-4 border border-divider text-off-white/80 font-secondary uppercase tracking-widest text-sm rounded-sm hover:border-off-white hover:text-off-white hover:bg-off-white/5 transition-colors"
                    >
                        {t('page.forBrands.s1.cta2')}
                    </button>
                </div>
            </Section>

            {/* Section 2: Why Brands Partner */}
            <Section className="py-24 bg-surface-base border-t border-divider">
                <div className="max-w-5xl mx-auto text-left">
                    <Typography variant="h2" className="text-off-white mb-8 md:text-4xl">
                        {t('page.forBrands.s2.title')}
                    </Typography>
                    <Typography variant="p" className="text-off-white/70 max-w-3xl mb-10 text-lg md:text-xl leading-relaxed">
                        {t('page.forBrands.s2.body')}
                    </Typography>
                </div>
            </Section>

            {/* Section 3: Partnership Structure */}
            <Section className="py-24 bg-surface-raised border-t border-divider">
                <div className="max-w-5xl mx-auto text-center md:text-left md:flex gap-16 items-start">
                    <div className="md:w-1/3 mb-10 md:mb-0 shrink-0">
                        <Typography variant="label" className="text-rochelais-gold/80 uppercase tracking-widest block mb-4 text-sm">
                            {t('page.forBrands.s3.eyebrow')}
                        </Typography>
                        <Typography variant="h2" className="text-off-white mb-4 md:text-3xl lg:text-4xl leading-tight">
                            {t('page.forBrands.s3.title')}
                        </Typography>
                    </div>
                    <div className="md:w-2/3 border-l-0 md:border-l border-rochelais-gold/20 md:pl-12">
                        <Typography variant="h3" className="text-off-white/90 mb-6 font-normal md:text-2xl leading-snug">
                            {t('page.forBrands.s3.sub')}
                        </Typography>
                        <Typography variant="p" className="text-off-white/70 text-lg leading-relaxed">
                            {t('page.forBrands.s3.body')}
                        </Typography>
                    </div>
                </div>
            </Section>

            {/* Section 4: Digital Partnership Opportunities */}
            <Section className="py-32 bg-surface-base border-t border-divider">
                <div className="max-w-6xl mx-auto mb-16 text-left">
                    <Typography variant="h2" className="text-off-white mb-6 md:text-4xl">
                        {t('page.forBrands.s4.title')}
                    </Typography>
                    <Typography variant="p" className="text-off-white/70 max-w-2xl text-lg leading-relaxed">
                        {t('page.forBrands.s4.body')}
                    </Typography>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
                    {/* Main Digital Partner */}
                    <div className="bg-surface-raised border border-rochelais-gold/60 p-10 flex flex-col relative rounded-sm shadow-[0_0_30px_rgba(232,168,0,0.05)] transform md:scale-105 z-10">
                        <Typography variant="h3" className="text-rochelais-gold mb-4 text-2xl font-bold">
                            {t('page.forBrands.cat.mainDigital')}
                        </Typography>
                        <Typography variant="p" className="text-off-white/90 mb-10 flex-grow text-lg leading-relaxed">
                            {t('page.forBrands.cat.mainDigital.desc')}
                        </Typography>
                        <button 
                            onClick={() => scrollToForm('', 'Main Digital Partner')}
                            className="w-full py-4 bg-rochelais-gold text-obsidian font-secondary uppercase tracking-widest text-sm rounded-sm hover:bg-off-white transition-colors"
                        >
                            {t('page.forBrands.s4.cta')}
                        </button>
                    </div>

                    {/* Digital Partner */}
                    <div className="bg-surface-base border border-divider/60 p-10 flex flex-col rounded-sm hover:border-off-white/30 transition-colors">
                        <Typography variant="h3" className="text-off-white mb-4 text-2xl">
                            {t('page.forBrands.cat.digital')}
                        </Typography>
                        <Typography variant="p" className="text-off-white/70 mb-10 flex-grow text-lg leading-relaxed">
                            {t('page.forBrands.cat.digital.desc')}
                        </Typography>
                        <button 
                            onClick={() => scrollToForm('', 'Digital Partner')}
                            className="w-full py-4 border border-off-white/20 text-off-white font-secondary uppercase tracking-widest text-sm rounded-sm hover:border-off-white/80 hover:bg-off-white/5 transition-colors"
                        >
                            {t('page.forBrands.s4.cta')}
                        </button>
                    </div>

                    {/* Website Supporter */}
                    <div className="bg-surface-base border border-divider/40 p-10 flex flex-col rounded-sm hover:border-off-white/20 transition-colors">
                        <Typography variant="h3" className="text-off-white/80 mb-4 text-xl">
                            {t('page.forBrands.cat.supporter')}
                        </Typography>
                        <Typography variant="p" className="text-off-white/60 mb-10 flex-grow text-lg leading-relaxed">
                            {t('page.forBrands.cat.supporter.desc')}
                        </Typography>
                        <button 
                            onClick={() => scrollToForm('', 'Website Supporter')}
                            className="w-full py-4 border border-off-white/10 text-off-white/70 font-secondary uppercase tracking-widest text-sm rounded-sm hover:border-off-white/30 hover:bg-off-white/5 transition-colors"
                        >
                            {t('page.forBrands.s4.cta')}
                        </button>
                    </div>
                </div>

                {/* Brand Partner Strip */}
                <div className="max-w-6xl mx-auto mt-16 pt-12 border-t border-divider/40">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 opacity-60 hover:opacity-100 transition-opacity">
                        <div className="max-w-2xl text-left">
                            <Typography variant="p" className="text-off-white/90 font-medium mb-2 tracking-widest uppercase text-sm">
                                {t('page.forBrands.cat.brand')}
                            </Typography>
                            <Typography variant="p" className="text-off-white/50 text-base leading-relaxed">
                                {t('page.forBrands.cat.brand.desc')}
                            </Typography>
                        </div>
                        <div className="shrink-0">
                            <button 
                                onClick={() => scrollToForm('', 'Brand Partner')}
                                className="px-6 py-3 border border-off-white/20 text-off-white/80 font-secondary uppercase tracking-widest text-xs rounded-sm hover:border-off-white/60 hover:text-off-white transition-colors whitespace-nowrap"
                            >
                                {t('page.forBrands.s4.cta')}
                            </button>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Section 5: Clarification */}
            <Section className="py-24 bg-surface-raised border-t border-divider">
                <div className="max-w-5xl mx-auto text-left">
                    <Typography variant="label" className="text-rochelais-gold/80 uppercase tracking-widest block mb-6 text-sm">
                        {t('page.forBrands.s5.eyebrow')}
                    </Typography>
                    <Typography variant="h2" className="text-off-white mb-8 md:text-3xl lg:text-4xl leading-tight">
                        {t('page.forBrands.s5.title')}
                    </Typography>
                    <Typography variant="p" className="text-off-white/70 text-lg md:text-xl leading-relaxed max-w-3xl">
                        {t('page.forBrands.s5.body')}
                    </Typography>
                </div>
            </Section>

            {/* Section 6: Platform Role */}
            <Section className="py-24 bg-surface-base border-t border-divider">
                <div className="max-w-5xl mx-auto text-center md:text-left flex flex-col md:flex-row gap-12 md:gap-20 items-center">
                    <div className="md:w-5/12">
                        <Typography variant="h2" className="text-off-white md:text-4xl leading-tight">
                            {t('page.forBrands.s6.title')}
                        </Typography>
                    </div>
                    <div className="md:w-7/12">
                        <Typography variant="p" className="text-off-white/70 text-lg leading-relaxed md:border-l border-rochelais-gold/20 md:pl-10">
                            {t('page.forBrands.s6.body')}
                        </Typography>
                    </div>
                </div>
            </Section>

            {/* Section 7: Selected Brand Collaborations */}
            <Section className="py-32 bg-surface-raised border-t border-divider text-center">
                <Typography variant="h2" className="text-off-white mb-16 md:text-3xl lg:text-4xl">
                    {t('page.forBrands.s7.title')}
                </Typography>
                
                <div className="flex flex-wrap justify-center items-center gap-4 mb-20 max-w-4xl mx-auto opacity-70">
                    {collaborations && collaborations.map((c, i) => (
                        <div key={i} className="flex items-center justify-center px-6 py-3 border border-divider/40 rounded-full bg-surface-base">
                            <span className="font-primary text-sm tracking-widest text-off-white/60 lowercase">{c.name}</span>
                        </div>
                    ))}
                </div>

                <p className="text-xs tracking-wider uppercase text-off-white/30 max-w-2xl mx-auto">
                    {t('page.forBrands.s7.body')}
                </p>
            </Section>

            {/* Section 8: Professional Status */}
            <Section className="py-24 bg-surface-base border-t border-divider">
                <div className="max-w-5xl mx-auto text-left mb-16">
                    <Typography variant="h2" className="text-off-white md:text-4xl">
                        {t('page.forBrands.s8.title')}
                    </Typography>
                </div>
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-x-16 gap-y-12 text-left shrink-0">
                    <div className="flex flex-col gap-3">
                        <div className="w-12 h-px bg-rochelais-gold/40 mb-1"></div>
                        <Typography variant="p" className="text-off-white/80 text-lg md:text-xl leading-relaxed font-light">
                            {t('page.forBrands.s8.p1')}
                        </Typography>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="w-12 h-px bg-rochelais-gold/40 mb-1"></div>
                        <Typography variant="p" className="text-off-white/80 text-lg md:text-xl leading-relaxed font-light">
                            {t('page.forBrands.s8.p2')}
                        </Typography>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="w-12 h-px bg-rochelais-gold/40 mb-1"></div>
                        <Typography variant="p" className="text-off-white/80 text-lg md:text-xl leading-relaxed font-light">
                            {t('page.forBrands.s8.p3')}
                        </Typography>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="w-12 h-px bg-rochelais-gold/40 mb-1"></div>
                        <Typography variant="p" className="text-off-white/80 text-lg md:text-xl leading-relaxed font-light">
                            {t('page.forBrands.s8.p4')}
                        </Typography>
                    </div>
                </div>
            </Section>

            {/* Section 9: Partnership Inquiry */}
            <div ref={formRef} className="scroll-mt-24">
                <Section className="py-32 bg-surface-raised border-t border-divider">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-left mb-16 border-l-2 border-rochelais-gold/50 pl-8">
                            <Typography variant="h2" className="text-off-white mb-4 md:text-4xl">
                                {t('page.forBrands.s9.title')}
                            </Typography>
                            <Typography variant="p" className="text-off-white/70 text-lg max-w-2xl">
                                {t('page.forBrands.s9.body')}
                            </Typography>
                        </div>

                        {formStatus === 'success' ? (
                            <div className="bg-surface-base p-16 text-center border border-divider rounded-sm">
                                <Typography variant="h3" className="text-rochelais-gold font-normal">
                                    {t('page.forBrands.form.success')}
                                </Typography>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="bg-surface-base p-10 md:p-14 border border-divider/50 rounded-sm space-y-8 shadow-[0_4px_40px_rgba(0,0,0,0.3)]">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="flex flex-col gap-3">
                                        <label className="text-xs font-secondary tracking-widest text-off-white/50">{t('page.forBrands.form.company')} *</label>
                                        <input required name="company" value={formData.company} onChange={handleChange} className="bg-obsidian w-full border border-divider/50 rounded-sm p-4 text-off-white outline-none focus:border-rochelais-gold/50 focus:bg-surface-raised transition-colors" />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <label className="text-xs font-secondary tracking-widest text-off-white/50">{t('page.forBrands.form.name')} *</label>
                                        <input required name="name" value={formData.name} onChange={handleChange} className="bg-obsidian w-full border border-divider/50 rounded-sm p-4 text-off-white outline-none focus:border-rochelais-gold/50 focus:bg-surface-raised transition-colors" />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="flex flex-col gap-3">
                                        <label className="text-xs font-secondary tracking-widest text-off-white/50">{t('page.forBrands.form.email')} *</label>
                                        <input required type="email" name="email" value={formData.email} onChange={handleChange} className="bg-obsidian w-full border border-divider/50 rounded-sm p-4 text-off-white outline-none focus:border-rochelais-gold/50 focus:bg-surface-raised transition-colors" />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <label className="text-xs font-secondary tracking-widest text-off-white/50">{t('page.forBrands.form.position')}</label>
                                        <input name="position" value={formData.position} onChange={handleChange} className="bg-obsidian w-full border border-divider/50 rounded-sm p-4 text-off-white outline-none focus:border-rochelais-gold/50 focus:bg-surface-raised transition-colors" />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="flex flex-col gap-3">
                                        <label className="text-xs font-secondary tracking-widest text-off-white/50">{t('page.forBrands.form.interest')} *</label>
                                        <select required name="interest" value={formData.interest} onChange={handleChange} className="bg-obsidian w-full border border-divider/50 rounded-sm p-4 text-off-white outline-none focus:border-rochelais-gold/50 focus:bg-surface-raised transition-colors appearance-none cursor-pointer">
                                            <option value="">-- Select --</option>
                                            <option value={t('page.forBrands.form.interest.inquiry')}>{t('page.forBrands.form.interest.inquiry')}</option>
                                            <option value={t('page.forBrands.form.interest.mediakit')}>{t('page.forBrands.form.interest.mediakit')}</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <label className="text-xs font-secondary tracking-widest text-off-white/50">{t('page.forBrands.form.category')}</label>
                                        <select name="category" value={formData.category} onChange={handleChange} className="bg-obsidian w-full border border-divider/50 rounded-sm p-4 text-off-white outline-none focus:border-rochelais-gold/50 focus:bg-surface-raised transition-colors appearance-none cursor-pointer">
                                            <option value="">-- Select --</option>
                                            <option value={t('page.forBrands.cat.mainDigital')}>{t('page.forBrands.cat.mainDigital')}</option>
                                            <option value={t('page.forBrands.cat.digital')}>{t('page.forBrands.cat.digital')}</option>
                                            <option value={t('page.forBrands.cat.supporter')}>{t('page.forBrands.cat.supporter')}</option>
                                            <option value={t('page.forBrands.cat.brand')}>{t('page.forBrands.cat.brand')}</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label className="text-xs font-secondary tracking-widest text-off-white/50">{t('page.forBrands.form.message')}</label>
                                    <textarea name="message" value={formData.message} onChange={handleChange} rows="5" className="bg-obsidian w-full border border-divider/50 rounded-sm p-4 text-off-white outline-none focus:border-rochelais-gold/50 focus:bg-surface-raised transition-colors resize-none"></textarea>
                                </div>
                                <div className="pt-8 flex justify-start">
                                    <button type="submit" className="w-full sm:w-auto px-12 py-4 bg-rochelais-gold text-obsidian font-secondary uppercase tracking-widest text-sm rounded-sm hover:bg-off-white transition-colors">
                                        {t('page.forBrands.form.submit')}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </Section>
            </div>

            {/* Section 10: Final CTA */}
            <Section className="py-24 bg-surface-base text-center border-t border-divider">
                <Typography variant="h3" className="text-off-white mb-6 font-normal md:text-2xl">
                    {t('page.forBrands.s10.title')}
                </Typography>
                <button 
                    onClick={() => scrollToForm()}
                    className="inline-block mt-4 text-rochelais-gold border-b border-rochelais-gold/30 hover:border-rochelais-gold transition-colors font-secondary uppercase tracking-widest text-sm pb-2"
                >
                    {t('page.forBrands.s10.cta1')}
                </button>
            </Section>
        </div>
    );
};

export default ForBrandsPage;
