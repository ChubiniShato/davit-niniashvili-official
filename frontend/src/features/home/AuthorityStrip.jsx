import React from 'react';
import { Link } from 'react-router-dom';

const KPIS = [
    '30+ \u10e1\u10d0\u10dc\u10d0\u10d9\u10e0\u10d4\u10d1\u10dd \u10db\u10d0\u10e2\u10e9\u10d8 \u2014 \u10e1\u10d0\u10e5\u10d0\u10e0\u10d7\u10d5\u10d4\u10da\u10dd (\u10d3\u10d4\u10d1\u10d8\u10e3\u10e2\u10d8: 2020)',
    '\u10e0\u10d0\u10d2\u10d1\u10d8\u10e1 \u10db\u10e1\u10dd\u10e4\u10da\u10d8\u10dd \u10d7\u10d0\u10e1\u10d8 2023 \u2014 \u10e1\u10d0\u10e1\u10e2\u10d0\u10e0\u10e2\u10dd \u10e8\u10d4\u10db\u10d0\u10d3\u10d2\u10d4\u10dc\u10da\u10dd\u10d1\u10d0',
    'EPCR Challenge Cup \u10d2\u10d0\u10db\u10d0\u10e0\u10ef\u10d5\u10d4\u10d1\u10e3\u10da\u10d8 (2021\u201322)',
    '\u10d2\u10d0\u10db\u10d0\u10e0\u10ef\u10d5\u10d4\u10d1\u10e3\u10da\u10d8 \u2014 Oscars du Midi Olympique (2023)',
    '#83 \u2014 RugbyPass Top 100 \u10db\u10e1\u10dd\u10e4\u10da\u10d8\u10dd\u10e1 \u10e0\u10d4\u10d8\u10e2\u10d8\u10dc\u10d2\u10e8\u10d8 (2025)',
    'Barbarians (2022) \u2014 \u10e1\u10e0\u10e3\u10da\u10d8 80 \u10ec\u10e3\u10d7\u10d8',
];

const AuthorityStrip = () => {
    return (
        <section className="w-full bg-surface-raised border-t border-divider py-8">
            <div className="max-w-5xl mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {KPIS.map((kpi, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-rochelais-gold rounded-full flex-shrink-0"></span>
                            <span className="font-secondary text-xs uppercase tracking-widest text-off-white/70">
                                {kpi}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Current Status */}
                <p className="font-secondary text-xs uppercase tracking-widest text-off-white/50 mt-6">
                    {'\u10db\u10d8\u10db\u10d3\u10d8\u10dc\u10d0\u10e0\u10d4 \u10de\u10d4\u10e0\u10d8\u10dd\u10d3\u10e8\u10d8 \u2014 Top14: Stade Rochelais | \u10e1\u10d0\u10e5\u10d0\u10e0\u10d7\u10d5\u10d4\u10da\u10dd\u10e1 \u10d4\u10e0\u10dd\u10d5\u10dc\u10e3\u10da\u10d8 \u10dc\u10d0\u10d9\u10e0\u10d4\u10d1\u10d8'}
                </p>

                {/* Career CTA */}
                <div className="mt-4">
                    <Link
                        to="/career"
                        className="inline-block font-secondary text-xs uppercase tracking-widest px-5 py-1.5 border border-rochelais-gold/40 text-rochelais-gold hover:border-rochelais-gold hover:text-off-white transition-all duration-300 rounded-xl"
                    >
                        {'\u10e1\u10e0\u10e3\u10da\u10d8 \u10d9\u10d0\u10e0\u10d8\u10d4\u10e0\u10d0'}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default AuthorityStrip;
