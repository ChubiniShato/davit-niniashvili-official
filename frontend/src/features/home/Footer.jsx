import React from 'react';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer id="contact" className="w-full bg-obsidian border-t border-divider py-14">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                <p className="font-secondary text-xs uppercase tracking-widest text-off-white/40">
                    © {year} Davit Niniashvili. All rights reserved.
                </p>
                <a
                    href="mailto:info@dniniashvili.com"
                    className="font-secondary text-xs uppercase tracking-widest text-rochelais-gold hover:text-off-white transition-colors duration-300"
                >
                    info@dniniashvili.com
                </a>
            </div>
        </footer>
    );
};

export default Footer;
