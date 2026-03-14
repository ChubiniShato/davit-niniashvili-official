import React, { useState, useEffect } from 'react';
import Section from '../ui/Section';
import Typography from '../ui/Typography';
import { getBio } from '../api/api';

const BioPage = () => {
    const [bio, setBio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        getBio()
            .then((res) => setBio(res.data))
            .catch((err) => {
                console.error("Failed to load bio", err);
                setError(true);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <Section className="min-h-[60vh] flex items-center justify-center">
                <Typography variant="body" className="animate-pulse">
                    Loading profile...
                </Typography>
            </Section>
        );
    }

    if (error || !bio || typeof bio !== "object") {
        return (
            <Section className="min-h-[60vh] flex items-center justify-center text-center">
                <div>
                    <Typography variant="h3">Profile Unavailable</Typography>
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
                {bio.name || "Davit Niniashvili"}
            </Typography>

            <div className="grid md:grid-cols-[1fr_2fr] gap-12">
                <div className="space-y-8">
                    <div>
                        <Typography variant="tiny">Position</Typography>
                        <Typography variant="h3">{bio.position || "—"}</Typography>
                    </div>

                    <div>
                        <Typography variant="tiny">Current Team</Typography>
                        <Typography variant="h3">{bio.currentTeam || "—"}</Typography>
                    </div>

                    {bio.previousTeam && (
                        <div>
                            <Typography variant="tiny">Previous Team</Typography>
                            <Typography variant="body">{bio.previousTeam}</Typography>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Typography variant="tiny">Nationality</Typography>
                            <Typography variant="body">{bio.nationality || "—"}</Typography>
                        </div>
                        <div>
                            <Typography variant="tiny">Birth Date</Typography>
                            <Typography variant="body">{bio.birthDate || "—"}</Typography>
                        </div>
                    </div>
                </div>

                <div className="bg-black/20 p-8 rounded-lg border border-white/5">
                    <Typography variant="tiny" className="mb-4 block">
                        About
                    </Typography>
                    <Typography variant="body" className="whitespace-pre-wrap leading-relaxed">
                        {bio.description || "Player description pending."}
                    </Typography>
                </div>
            </div>
        </Section>
    );
};

export default BioPage;