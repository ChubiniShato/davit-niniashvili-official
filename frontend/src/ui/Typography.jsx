import React from 'react';

const variants = {
    h1: "font-primary text-5xl md:text-7xl font-bold uppercase tracking-tighter text-off-white",
    h2: "font-primary text-3xl md:text-5xl font-bold uppercase tracking-wide text-off-white",
    h3: "font-primary text-2xl md:text-3xl font-semibold uppercase tracking-wide text-off-white",
    body: "font-primary text-base md:text-lg text-off-white/80 leading-relaxed",
    tiny: "font-secondary text-xs uppercase tracking-widest text-rochelais-gold"
};

const Typography = ({ variant = 'body', children, className = '', ...props }) => {
    const Tag = variant.startsWith('h') ? variant : 'p';
    return (
        <Tag className={`${variants[variant]} ${className}`} {...props}>
            {children}
        </Tag>
    );
};

export default Typography;
