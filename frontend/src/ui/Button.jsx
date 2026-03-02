import React from 'react';

const variants = {
    primary: "bg-transparent border border-rochelais-gold/60 text-rochelais-gold rounded-xl px-6 py-2.5 shadow-sm hover:bg-rochelais-gold hover:text-obsidian transition-all duration-300",
    secondary: "border border-mid-grey text-off-white hover:border-rochelais-gold hover:text-rochelais-gold",
    ghost: "text-off-white/60 hover:text-rochelais-gold"
};

const Button = ({ variant = 'primary', children, className = '', ...props }) => {
    return (
        <button
            className={`
        px-8 py-4 uppercase font-primary font-bold tracking-widest text-sm
        transition-all duration-300 ease-snap
        ${variants[variant]} 
        ${className}
      `}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
