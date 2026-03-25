import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const SloganReveal = () => {
    const { language } = useLanguage();

    const content = {
        ka: {
            base: 'რასაც აკეთებ — ',
            highlight: 'გიყვარდეს მთელი გულით!',
            author: 'დავით ნინიაშვილი',
            sloganClass: 'font-georgian tracking-normal',
            authorClass: 'font-georgian tracking-wide'
        },
        fr: {
            base: 'Aime ce que tu fais — ',
            highlight: 'de tout cœur - TEST!',
            author: 'Davit Niniashvili',
            sloganClass: 'font-header tracking-normal',
            authorClass: 'font-header tracking-slogan-author'
        },
        en: {
            base: 'Love what you do — ',
            highlight: 'wholeheartedly!',
            author: 'Davit Niniashvili',
            sloganClass: 'font-header tracking-normal',
            authorClass: 'font-header tracking-slogan-author'
        }
    }[language] || {
        base: 'Love what you do — ',
        highlight: 'wholeheartedly!',
        author: 'Davit Niniashvili',
        sloganClass: 'font-header tracking-normal',
        authorClass: 'font-header tracking-slogan-author'
    };

    return (
        <section className="w-full bg-surface-base text-off-white px-6 pt-32 pb-5 flex justify-center">
            <div className="flex flex-col items-center">
                <div className="flex flex-col gap-3 w-fit">
                    <p
                        className={`text-2xl md:text-3xl font-medium leading-relaxed whitespace-normal md:whitespace-nowrap text-center ${content.sloganClass}`}
                    >
                        <span className="opacity-90">{content.base}</span>
                        <span className="opacity-90">
                            {content.highlight}
                        </span>
                    </p>

                    <p className={`self-end text-sm md:text-base font-semibold text-off-white/50 ${content.authorClass}`}>
                        {content.author}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default SloganReveal;
