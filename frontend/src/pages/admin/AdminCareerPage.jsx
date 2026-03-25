import React, { useState, useEffect } from 'react';
import { getAdminCareer, publishAdminCareer, validateAdminCareer } from '../../api/api';

const AdminCareerPage = () => {
    const [payload, setPayload] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [validating, setValidating] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // For simplicity and resilience, we handle tables as JSON strings in the editor,
    // and meta fields as standard inputs. This perfectly matches the "minimal" requirement.
    const [tablesJson, setTablesJson] = useState({
        overview: '[]',
        seasons: '[]',
        breakdown: '[]'
    });

    useEffect(() => {
        loadCareer();
    }, []);

    const loadCareer = async () => {
        try {
            setLoading(true);
            const res = await getAdminCareer();
            const data = res.data.data;
            if (data) {
                setPayload({
                    meta: data.meta || { sourceText: '', primarySource: '', lastUpdated: '' }
                });
                setTablesJson({
                    overview: JSON.stringify(data.overview || [], null, 2),
                    seasons: JSON.stringify(data.seasons || [], null, 2),
                    breakdown: JSON.stringify(data.breakdown || [], null, 2)
                });
            }
        } catch (err) {
            setError('Failed to load career data');
        } finally {
            setLoading(false);
        }
    };

    const handleMetaChange = (field, value) => {
        setPayload(prev => ({
            ...prev,
            meta: { ...prev.meta, [field]: value }
        }));
    };

    const handleTableChange = (field, value) => {
        setTablesJson(prev => ({ ...prev, [field]: value }));
    };

    const handleValidate = async () => {
        setError('');
        setSuccess('');
        setValidating(true);
        try {
            const overview = JSON.parse(tablesJson.overview);
            const seasons = JSON.parse(tablesJson.seasons);
            const breakdown = JSON.parse(tablesJson.breakdown);

            const updatedPayload = {
                meta: payload.meta,
                overview,
                seasons,
                breakdown
            };

            const res = await validateAdminCareer(updatedPayload);
            setSuccess(res.data?.data || 'Validation successful!');
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data?.error || err.message || 'Validation Failed');
        } finally {
            setValidating(false);
        }
    };

    const handlePublish = async () => {
        setError('');
        setSuccess('');
        setSaving(true);
        try {
            // Parse textareas back to JSON arrays
            const overview = JSON.parse(tablesJson.overview);
            const seasons = JSON.parse(tablesJson.seasons);
            const breakdown = JSON.parse(tablesJson.breakdown);

            const updatedPayload = {
                meta: payload.meta,
                overview,
                seasons,
                breakdown
            };

            await publishAdminCareer(updatedPayload);
            setSuccess('Career content published successfully!');
        } catch (err) {
            setError(err.response?.data?.error || err.message || 'Validation or Publish Failed');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-10 text-white">Loading...</div>;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Career Management</h1>
                    <div className="flex gap-4">
                        <button 
                            onClick={handleValidate}
                            disabled={validating || saving}
                            className="bg-[#222] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#333] transition-colors disabled:opacity-50 border border-[#444]"
                        >
                            {validating ? 'Validating...' : 'Validate Only'}
                        </button>
                        <button 
                            onClick={handlePublish}
                            disabled={saving || validating}
                            className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50"
                        >
                            {saving ? 'Publishing...' : 'Publish Changes'}
                        </button>
                    </div>
                </div>

                {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-xl mb-6">{error}</div>}
                {success && <div className="bg-green-500/10 border border-green-500 text-green-500 p-4 rounded-xl mb-6">{success}</div>}

                {payload && (
                    <div className="space-y-8">
                        {/* Meta Section */}
                        <div className="bg-[#141414] border border-[#222] p-6 rounded-2xl">
                            <h2 className="text-xl font-bold mb-4">Metadata</h2>
                            <div className="grid gap-4">
                                <input 
                                    className="bg-black border border-[#333] p-3 rounded-xl w-full"
                                    placeholder="Primary Source (Required)"
                                    value={payload.meta.primarySource || ''}
                                    onChange={(e) => handleMetaChange('primarySource', e.target.value)}
                                />
                                <input 
                                    className="bg-black border border-[#333] p-3 rounded-xl w-full"
                                    placeholder="Source Text"
                                    value={payload.meta.sourceText || ''}
                                    onChange={(e) => handleMetaChange('sourceText', e.target.value)}
                                />
                                <input 
                                    className="bg-black border border-[#333] p-3 rounded-xl w-full"
                                    placeholder="Last Updated (e.g. March 2026)"
                                    value={payload.meta.lastUpdated || ''}
                                    onChange={(e) => handleMetaChange('lastUpdated', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Overview Editor */}
                        <div className="bg-[#141414] border border-[#222] p-6 rounded-2xl">
                            <h2 className="text-xl font-bold mb-2">Overview Table (JSON)</h2>
                            <p className="text-sm text-gray-500 mb-4">Edit the array of row objects directly.</p>
                            <textarea 
                                className="w-full bg-black border border-[#333] p-4 rounded-xl font-mono text-sm min-h-[200px]"
                                value={tablesJson.overview}
                                onChange={(e) => handleTableChange('overview', e.target.value)}
                            />
                        </div>

                        {/* Seasons Editor */}
                        <div className="bg-[#141414] border border-[#222] p-6 rounded-2xl">
                            <h2 className="text-xl font-bold mb-2">Seasons Table (JSON)</h2>
                            <textarea 
                                className="w-full bg-black border border-[#333] p-4 rounded-xl font-mono text-sm min-h-[200px]"
                                value={tablesJson.seasons}
                                onChange={(e) => handleTableChange('seasons', e.target.value)}
                            />
                        </div>

                        {/* Breakdown Editor */}
                        <div className="bg-[#141414] border border-[#222] p-6 rounded-2xl">
                            <h2 className="text-xl font-bold mb-2">Breakdown Table (JSON)</h2>
                            <textarea 
                                className="w-full bg-black border border-[#333] p-4 rounded-xl font-mono text-sm min-h-[200px]"
                                value={tablesJson.breakdown}
                                onChange={(e) => handleTableChange('breakdown', e.target.value)}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminCareerPage;
