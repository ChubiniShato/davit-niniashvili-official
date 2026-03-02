import React from 'react';

const Section = ({ children, className = '', ...props }) => {
    return (
        <section className={`relative w-full px-6 md:px-12 py-20 ${className}`} {...props}>
            <div className="max-w-7xl mx-auto">
                {children}
            </div>
        </section>
    );
};

export default Section;
