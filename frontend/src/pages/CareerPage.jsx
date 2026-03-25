import React, { useState, useEffect } from 'react';
import Section from '../ui/Section';
import Typography from '../ui/Typography';
import { useLanguage } from '../context/LanguageContext';
import { getCareerProfile, getAwards } from '../api/api';

// ─── Shared table wrapper ────────────────────────────────────────────────────
const StatTable = ({ columns, rows, rowKey, emptyLabel }) => (
    <div className="overflow-x-auto border border-white/10 rounded-lg bg-black/40 backdrop-blur-sm">
        <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-white/5 border-b border-white/10">
                <tr>
                    {columns.map(({ label, right }) => (
                        <th
                            key={label}
                            className={`p-4 px-6 font-secondary text-xs uppercase tracking-widest text-rochelais-gold${right ? ' text-right' : ''}`}
                        >
                            {label}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
                {rows.length === 0 ? (
                    <tr>
                        <td colSpan={columns.length} className="p-6 text-center text-mid-grey text-sm">
                            {emptyLabel}
                        </td>
                    </tr>
                ) : (
                    rows.map((row, i) => (
                        <tr key={rowKey(row, i)} className="hover:bg-white/5 transition-colors">
                            {columns.map(({ field, right, bold }) => (
                                <td key={field} className={`p-4 px-6${right ? ' text-right' : ''}`}>
                                    <Typography
                                        variant="body"
                                        className={bold ? 'font-semibold text-white' : undefined}
                                    >
                                        {row[field] != null ? row[field] : '—'}
                                    </Typography>
                                </td>
                            ))}
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    </div>
);

// ─── Section heading ─────────────────────────────────────────────────────────
const SubHeading = ({ children }) => (
    <Typography variant="h2" className="text-rochelais-gold mb-6 mt-16">
        {children}
    </Typography>
);

// ─── Page ────────────────────────────────────────────────────────────────────
const CareerPage = () => {
    const { t } = useLanguage();

    const [career, setCareer]               = useState(null);
    const [loadingCareer, setLoadingCareer] = useState(true);
    const [careerError, setCareerError]     = useState(false);
    const [awards, setAwards]               = useState([]);

    // Fetch career profile (meta + overview + seasons + breakdown)
    useEffect(() => {
        let isMounted = true;
        getCareerProfile()
            .then((res) => {
                if (!isMounted) return;
                // Normalize: backend returns object; guard against accidental array wrap
                const data = Array.isArray(res.data) ? res.data[0] : res.data;
                setCareer(data ?? null);
            })
            .catch((err) => {
                if (!isMounted) return;
                console.error('Failed to load career profile', err);
                setCareerError(true);
            })
            .finally(() => {
                if (isMounted) setLoadingCareer(false);
            });
        return () => { isMounted = false; };
    }, []);

    // Fetch awards separately – existing /api/player/awards endpoint unchanged
    useEffect(() => {
        let isMounted = true;
        getAwards()
            .then((res) => {
                if (!isMounted) return;
                const data = Array.isArray(res.data) ? res.data : [];
                const sorted = [...data].sort((a, b) =>
                    String(b.year ?? '').localeCompare(String(a.year ?? ''))
                );
                setAwards(sorted);
            })
            .catch((err) => {
                if (!isMounted) return;
                console.error('Failed to load awards (silently ignored)', err);
            });
        return () => { isMounted = false; };
    }, []);

    // ── Loading / Error states ──────────────────────────────────────────────
    if (loadingCareer) {
        return (
            <Section className="min-h-[60vh] flex items-center justify-center">
                <Typography variant="body" className="animate-pulse">
                    {t('page.career.loading')}
                </Typography>
            </Section>
        );
    }

    if (careerError) {
        return (
            <Section className="min-h-[60vh] flex items-center justify-center text-center">
                <div>
                    <Typography variant="h3">{t('page.career.errorTitle')}</Typography>
                    <Typography variant="body" className="mt-4">{t('page.career.errorSub')}</Typography>
                </div>
            </Section>
        );
    }

    const meta      = career?.meta      ?? {};
    const overview  = career?.overview  ?? [];
    const seasons   = career?.seasons   ?? [];
    const breakdown = career?.breakdown ?? [];

    // ── Column definitions ──────────────────────────────────────────────────
    const overviewCols = [
        { field: 'team',    label: t('page.career.table.team'),    bold: true },
        { field: 'matches', label: t('page.career.table.matches'), right: true },
        { field: 'wdl',     label: t('page.career.table.wdl'),     right: true },
        { field: 'starts',  label: t('page.career.table.starts'),  right: true },
        { field: 'tries',   label: t('page.career.table.tries'),   right: true },
        { field: 'points',  label: t('page.career.table.points'),  right: true },
        { field: 'cards',   label: t('page.career.table.cards'),   right: true },
        { field: 'minutes', label: t('page.career.table.minutes'), right: true },
    ];

    const seasonCols = [
        { field: 'season',      label: t('page.career.table.season'),      bold: true },
        { field: 'team',        label: t('page.career.table.team') },
        { field: 'competition', label: t('page.career.table.competition') },
        { field: 'matches',     label: t('page.career.table.matches'),     right: true },
        { field: 'wdl',         label: t('page.career.table.wdl'),         right: true },
        { field: 'starts',      label: t('page.career.table.starts'),      right: true },
        { field: 'tries',       label: t('page.career.table.tries'),       right: true },
        { field: 'points',      label: t('page.career.table.points'),      right: true },
        { field: 'cards',       label: t('page.career.table.cards'),       right: true },
        { field: 'minutes',     label: t('page.career.table.minutes'),     right: true },
    ];

    const breakdownCols = [
        { field: 'competition', label: t('page.career.table.competition'), bold: true },
        { field: 'matches',     label: t('page.career.table.matches'),     right: true },
        { field: 'wdl',         label: t('page.career.table.wdl'),         right: true },
        { field: 'starts',      label: t('page.career.table.starts'),      right: true },
        { field: 'tries',       label: t('page.career.table.tries'),       right: true },
        { field: 'points',      label: t('page.career.table.points'),      right: true },
        { field: 'cards',       label: t('page.career.table.cards'),       right: true },
        { field: 'minutes',     label: t('page.career.table.minutes'),     right: true },
    ];

    // ── Render ──────────────────────────────────────────────────────────────
    return (
        <Section className="py-24">

            {/* 1. Page title */}
            <Typography variant="h1" className="text-rochelais-gold mb-6">
                {t('home.career.title')}
            </Typography>

            {/* 2. Source / Meta block — only if backend provides data */}
            {(meta.sourceText || meta.primarySource || meta.lastUpdated) && (
                <div className="mb-10 p-4 border border-white/10 rounded-lg bg-black/20 flex flex-wrap gap-x-8 gap-y-1 items-baseline">
                    {meta.sourceText && (
                        <Typography variant="tiny" className="text-mid-grey">
                            {meta.sourceText}
                        </Typography>
                    )}
                    {meta.primarySource && (
                        <Typography variant="tiny" className="text-mid-grey/60 shrink-0">
                            {t('page.career.meta.source')}: {meta.primarySource}
                        </Typography>
                    )}
                    {meta.lastUpdated && (
                        <Typography variant="tiny" className="text-mid-grey/60 shrink-0">
                            {t('page.career.meta.lastUpdated')}: {meta.lastUpdated}
                        </Typography>
                    )}
                </div>
            )}

            {/* 3. Career Overview — team-based rows */}
            <SubHeading>{t('page.career.section.overview')}</SubHeading>
            <StatTable
                columns={overviewCols}
                rows={overview}
                rowKey={(r, i) => r.team ?? i}
                emptyLabel={t('page.career.noStats')}
            />

            {/* 4. Season-by-Season Statistics — season/team/competition rows */}
            <SubHeading>{t('page.career.section.seasons')}</SubHeading>
            <StatTable
                columns={seasonCols}
                rows={seasons}
                rowKey={(r, i) => `${r.season}-${r.team}-${r.competition}` || i}
                emptyLabel={t('page.career.noStats')}
            />

            {/* 5. Competition Breakdown — competition-based rows */}
            <SubHeading>{t('page.career.section.breakdown')}</SubHeading>
            <StatTable
                columns={breakdownCols}
                rows={breakdown}
                rowKey={(r, i) => r.competition ?? i}
                emptyLabel={t('page.career.noStats')}
            />

            {/* 6. Awards & Honors — from separate /api/player/awards */}
            {awards.length > 0 && (
                <div className="mt-16">
                    <Typography variant="h2" className="text-rochelais-gold mb-8">
                        {t('page.career.awardsTitle')}
                    </Typography>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {awards.map((award) => (
                            <div
                                key={award.id || `${award.year}-${award.title}`}
                                className="p-8 border border-white/10 rounded-lg bg-black/20 hover:bg-black/40 transition-colors"
                            >
                                <Typography variant="tiny" className="mb-3 block">
                                    {award.year ?? '—'}
                                </Typography>
                                <Typography variant="h3" className="mb-4">
                                    {award.title ?? t('page.career.untitledAward')}
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