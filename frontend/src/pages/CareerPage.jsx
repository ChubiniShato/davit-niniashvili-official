import React from 'react';
import Section from '../ui/Section';
import Typography from '../ui/Typography';

const CareerPage = () => {
    return (
        <Section className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
                <Typography variant="h1" className="text-rochelais-gold mb-4">
                    Career
                </Typography>
                <Typography variant="body" className="text-mid-grey">
                    Stats, clubs, and achievements. Coming soon.
                </Typography>
            </div>
        </Section>
    );
};

export default CareerPage;
