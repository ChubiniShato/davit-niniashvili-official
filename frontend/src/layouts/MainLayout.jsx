import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';



const MainLayout = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { pathname } = useLocation();
    const { language, setLanguage, t } = useLanguage();
    const [activeSection, setActiveSection] = useState('home');

    // Track which section is visible on the home page
    useEffect(() => {
        if (pathname !== '/') {
            setActiveSection(null);
            return;
        }
        setActiveSection('home');
        let rafId;
        const onScroll = () => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                const threshold = window.innerHeight * 0.8;
                setActiveSection(scrollY >= threshold ? 'scrolled' : 'home');
            });
        };
        // Delayed initial check to ensure DOM is ready
        const timer = setTimeout(onScroll, 300);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            clearTimeout(timer);
            cancelAnimationFrame(rafId);
            window.removeEventListener('scroll', onScroll);
        };
    }, [pathname]);

    // Lock body scroll when menu is open
    React.useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            // Also ensure styles are cleaned up on unmount just in case
            return () => { document.body.style.overflow = 'unset'; };
        }
    }, [isMenuOpen]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const navigate = useNavigate();



    const scrollToTop = (e) => {
        e.preventDefault();
        closeMenu();
        if (pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/');
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
    };

    const navLinks = [
        { name: t('nav.bio'), path: '/bio' },
        { name: t('nav.career'), path: '/career' },
        { name: t('nav.media'), path: '/media' },
        { name: t('nav.partners'), path: '/partners', isBrand: true },
        { name: t('nav.gallery'), path: '/gallery' },
        { name: t('nav.contact'), path: '/contact' },
        { name: t('nav.forBrands'), path: '/for-brands' }
    ];

    const languages = [
        { code: 'ka', label: 'KA' }, // ქართული
        { code: 'fr', label: 'FR' }, // Français
        { code: 'en', label: 'EN' }  // English
    ];

    // Home page gets pt-0 (full bleed), others get pt-32 (offset fixed header)
    const mainPadding = pathname === '/' ? 'pt-0' : 'pt-32';

    return (
        <div className="min-h-screen bg-obsidian text-off-white selection:bg-rochelais-gold selection:text-obsidian overflow-x-hidden relative">

            {/* Primary Header */}
            <header className={`fixed top-0 left-0 w-full z-50 h-header px-6 flex justify-between items-center transition-all duration-300 ${pathname === '/' ? (activeSection === 'home' ? 'bg-gradient-to-b from-black/45 via-black/15 to-transparent' : 'bg-obsidian/70 backdrop-blur-lg border-b border-white/10') : 'bg-obsidian'}`}>
                {/* Left: Logo + Nav Links */}
                <div className="flex items-center gap-8">
                    <NavLink
                        to="/"
                        end
                        aria-label="Home"
                        onClick={pathname === '/' ? scrollToTop : undefined}
                        className="no-underline transition-all duration-300 hover:opacity-80"
                    >
                        <h1
                            className={`transition-all duration-300 cursor-pointer ${language === 'ka'
                                ? 'brand-title-ka'
                                : 'brand-title-en'
                                } ${pathname === '/' && activeSection === 'home'
                                    ? 'text-[var(--brand-gray)]'
                                    : 'text-[var(--brand-yellow)]'
                                }`}
                        >
                            {language === 'ka' ? 'ᲓᲐᲕᲘᲗ ᲜᲘᲜᲘᲐᲨᲕᲘᲚᲘ' : 'DAVIT NINIASHVILI'}
                        </h1>
                    </NavLink>

                    {/* Desktop Nav Links */}
                    <ul className="hidden md:flex gap-8 font-secondary items-center">
                        {navLinks.map((item) => (
                            <li key={item.path}>
                                {item.isBrand ? (
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `transition-all duration-300 px-3 py-1 rounded border ${language === 'ka'
                                                ? 'nav-link-ka'
                                                : 'nav-link-en'
                                            } ${isActive
                                                ? 'border-rochelais-gold/50 text-rochelais-gold'
                                                : 'border-rochelais-gold/50 text-rochelais-gold hover:bg-rochelais-gold hover:text-obsidian'
                                            }`
                                        }
                                    >
                                        {item.name}
                                    </NavLink>
                                ) : (
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `transition-all duration-300 ${language === 'ka'
                                                ? 'nav-link-ka'
                                                : 'nav-link-en'
                                            } ${isActive
                                                ? 'text-off-white'
                                                : 'text-off-white/70 hover:text-off-white'
                                            }`
                                        }
                                    >
                                        {item.name}
                                    </NavLink>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right: Language Switcher (always visible) + Mobile Menu */}
                <div className="flex items-center gap-6">
                    {/* Language Buttons (Desktop) */}
                    <div className="hidden md:flex items-center gap-6">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => setLanguage(lang.code)}
                                className={`font-secondary text-sm md:text-base font-semibold tracking-wider uppercase transition-all duration-300 ${language === lang.code
                                    ? 'text-off-white'
                                    : 'text-off-white/70 hover:text-off-white'
                                    }`}
                            >
                                {lang.label}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Menu Trigger */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden font-secondary text-sm font-semibold tracking-wider z-50 relative transition-all duration-300 text-off-white/70 hover:text-off-white"
                    >
                        {isMenuOpen ? 'CLOSE' : 'MENU'}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-40 bg-obsidian/95 backdrop-blur-md flex flex-col items-center justify-center animate-fade-in">
                    <ul className="flex flex-col gap-8 text-center mb-12">
                        {navLinks.map((item) => (
                            <li key={item.path}>
                                {item.isBrand ? (
                                    <NavLink
                                        to={item.path}
                                        onClick={closeMenu}
                                        className={({ isActive }) =>
                                            `font-header text-3xl uppercase tracking-widest transition-all duration-300 px-4 py-1 rounded border ${isActive
                                                ? 'border-rochelais-gold/50 text-rochelais-gold'
                                                : 'border-rochelais-gold/50 text-rochelais-gold hover:bg-rochelais-gold hover:text-obsidian'
                                            }`
                                        }
                                    >
                                        {item.name}
                                    </NavLink>
                                ) : (
                                    <NavLink
                                        to={item.path}
                                        onClick={closeMenu}
                                        className={({ isActive }) =>
                                            `font-header text-3xl uppercase tracking-widest transition-all duration-300 ${isActive
                                                ? 'text-off-white'
                                                : 'text-off-white/70 hover:text-off-white'
                                            }`
                                        }
                                    >
                                        {item.name}
                                    </NavLink>
                                )}
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Language Switcher */}
                    <div className="flex gap-6">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => {
                                    setLanguage(lang.code);
                                }}
                                className={`font-secondary text-sm font-semibold tracking-wider uppercase transition-all duration-300 ${language === lang.code
                                    ? 'text-off-white'
                                    : 'text-off-white/70 hover:text-off-white'
                                    }`}
                            >
                                {lang.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <main className={`relative z-10 ${mainPadding}`}>
                {children}
            </main>

        </div>
    );
};

export default MainLayout;
