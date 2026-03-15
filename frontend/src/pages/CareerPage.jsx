import React, { useState, useEffect } from 'react';
import Section from '../ui/Section';
import Typography from '../ui/Typography';
import { useLanguage } from '../context/LanguageContext';
import { getStats, getAwards } from '../api/api';

const CareerPage = () => {
    const { t } = useLanguage();
    const [stats, setStats] = useState([]);
    const [loadingStats, setLoadingStats] = useState(true);
    const [statsError, setStatsError] = useState(false);
    const [awards, setAwards] = useState([]);

    useEffect(() => {
        let isMounted = true;

        getStats()
            .then((res) => {
                if (!isMounted) return;
                const data = Array.isArray(res.data) ? res.data : [];
                const sorted = [...data].sort((a, b) =>
                    String(b.season ?? "").localeCompare(String(a.season ?? ""))
                );
                setStats(sorted);
            })
            .catch((err) => {
                if (!isMounted) return;
                console.error("Failed to load stats", err);
                setStatsError(true);
            })
            .finally(() => {
                if (isMounted) setLoadingStats(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        let isMounted = true;

        getAwards()
            .then((res) => {
                if (!isMounted) return;
                const data = Array.isArray(res.data) ? res.data : [];
                const sorted = [...data].sort((a, b) =>
                    String(b.year ?? "").localeCompare(String(a.year ?? ""))
                );
                setAwards(sorted);
            })
            .catch((err) => {
                if (!isMounted) return;
                console.error("Failed to load awards (silently ignored)", err);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    if (loadingStats) {
        return (
            <Section className="min-h-[60vh] flex items-center justify-center">
                <Typography variant="body" className="animate-pulse">
                    Loading career data...
                </Typography>
            </Section>
        );
    }

    if (statsError) {
        return (
            <Section className="min-h-[60vh] flex items-center justify-center text-center">
                <div>
                    <Typography variant="h3">Career Data Unavailable</Typography>
                    <Typography variant="body" className="mt-4">
                        Please check back later.
                    </Typography>
                </div>
            </Section>
        );
    }

    return (
        <Section className="py-24">
            <Typography variant="h1" className="text-rochelais-gold mb-12">
                {t('home.career.title')}
            </Typography>

            {stats.length === 0 ? (
                <div className="text-center py-12 border border-white/10 rounded-lg bg-black/20">
                    <Typography variant="body" className="text-mid-grey">
                        No statistics recorded yet.
                    </Typography>
                </div>
            ) : (
                <div className="overflow-x-auto border border-white/10 rounded-lg bg-black/40 backdrop-blur-sm">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead className="bg-white/5 border-b border-white/10">
                            <tr>
                                <th className="p-4 px-6 font-secondary text-xs uppercase tracking-widest text-rochelais-gold">Season</th>
                                <th className="p-4 px-6 font-secondary text-xs uppercase tracking-widest text-rochelais-gold">Team</th>
                                <th className="p-4 px-6 font-secondary text-xs uppercase tracking-widest text-rochelais-gold">Competition</th>
                                <th className="p-4 px-6 font-secondary text-xs uppercase tracking-widest text-rochelais-gold text-right">Matches</th>
                                <th className="p-4 px-6 font-secondary text-xs uppercase tracking-widest text-rochelais-gold text-right">Tries</th>
                                <th className="p-4 px-6 font-secondary text-xs uppercase tracking-widest text-rochelais-gold text-right">Meters</th>
                                <th className="p-4 px-6 font-secondary text-xs uppercase tracking-widest text-rochelais-gold text-right">Defenders Beaten</th>
                                <th className="p-4 px-6 font-secondary text-xs uppercase tracking-widest text-rochelais-gold text-right">Line Breaks</th>
                                <th className="p-4 px-6 font-secondary text-xs uppercase tracking-widest text-rochelais-gold text-right">Offloads</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {stats.map((stat) => (
                                <tr
                                    key={stat.id || `${stat.season}-${stat.team}-${stat.competition}`}
                                    className="hover:bg-white/5 transition-colors"
                                >
                                    <td className="p-4 px-6">
                                        <Typography variant="body" className="font-semibold text-white">
                                            {stat.season ?? "—"}
                                        </Typography>
                                    </td>
                                    <td className="p-4 px-6">
                                        <Typography variant="body">{stat.team ?? "—"}</Typography>
                                    </td>
                                    <td className="p-4 px-6">
                                        <Typography variant="body">{stat.competition ?? "—"}</Typography>
                                    </td>
                                    <td className="p-4 px-6 text-right">
                                        <Typography variant="body">{stat.matches ?? "—"}</Typography>
                                    </td>
                                    <td className="p-4 px-6 text-right">
                                        <Typography variant="body">{stat.tries ?? "—"}</Typography>
                                    </td>
                                    <td className="p-4 px-6 text-right">
                                        <Typography variant="body">{stat.meters ?? "—"}</Typography>
                                    </td>
                                    <td className="p-4 px-6 text-right">
                                        <Typography variant="body">{stat.defendersBeaten ?? "—"}</Typography>
                                    </td>
                                    <td className="p-4 px-6 text-right">
                                        <Typography variant="body">{stat.lineBreaks ?? "—"}</Typography>
                                    </td>
                                    <td className="p-4 px-6 text-right">
                                        <Typography variant="body">{stat.offloads ?? "—"}</Typography>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {awards.length > 0 && (
                <div className="mt-24">
                    <Typography variant="h2" className="text-rochelais-gold mb-12">
                        Awards & Honors
                    </Typography>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {awards.map((award) => (
                            <div
                                key={award.id || `${award.year}-${award.title}`}
                                className="p-8 border border-white/10 rounded-lg bg-black/20 hover:bg-black/40 transition-colors"
                            >
                                <Typography variant="tiny" className="mb-3 block">
                                    {award.year ?? "—"}
                                </Typography>
                                <Typography variant="h3" className="mb-4">
                                    {award.title ?? "Untitled award"}
                                </Typography>
                                {award.description && (
                                    <Typography variant="body" className="text-mid-grey text-sm">
                                        {award.description}
                                    </Typography>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Section>
    );
};

export default CareerPage;