import React from 'react';
import Section from '../../ui/Section';
import Typography from '../../ui/Typography';

const AboutSection = () => {
    return (
        <Section id="about" className="bg-obsidian w-full relative z-20">
            {/* Constrained readable width */}
            <div className="w-full max-w-[720px] mx-auto px-6 lg:px-10 py-16 lg:py-24">

                {/* Title */}
                <Typography variant="h2" className="text-rochelais-gold text-2xl md:text-3xl font-bold mb-8 text-center uppercase tracking-widest">
                    ჩემ შესახებ
                </Typography>

                {/* Content */}
                <Typography variant="body" className="text-white/80 text-base md:text-lg leading-relaxed space-y-6 text-justify md:text-left">
                    <p>
                        გამარჯობა! <br />
                        თქვენ ხართ დავით ნინიაშვილის ვებ სივრცეში.
                        აქ მიიღებთ ინფორმაციას ჩემს ბიოგრაფიაზე, სპორტულ კარიერაზე; ნახავთ თვალსაჩინო მომენტებს ჩემი თამაშებიდან, პოსტებს, ინტერვიუებს, პოდკასტებს ჩემი მონაწილეობით და ბევრ სხვა რამეს, დაკავშირებულს ჩემთან ან რაგბის სამყაროსთან.
                    </p>

                    <p>
                        ასევე, შეძლებთ ეწვიოთ ინტერნეტ მაღაზიას და შიძინოთ სიმბოლიკით გაფორმებული ტანსაცმელი და აქსესუარები!
                    </p>

                    <p>
                        იყავით კავშირზე საკონტაქტო ინფორმაციის დახმარებით და მოგვაწოდეთ თქვენი სურვილები, აზრები, შენიშვნები!
                    </p>

                    <div className="pt-4">
                        <p className="font-medium text-white">გისურვებთ ყოველივე საუკეთესოს!</p>
                        <p className="font-bold text-rochelais-gold mt-2 uppercase tracking-wide">წარმატებები!</p>
                    </div>
                </Typography>
            </div>
        </Section>
    );
};

export default AboutSection;
