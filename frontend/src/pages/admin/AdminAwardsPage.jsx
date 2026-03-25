import React, { useState, useEffect } from 'react';
import { getAdminAwards, createAdminAward, updateAdminAward, deleteAdminAward } from '../../api/api';

const AdminAwardsPage = () => {
    const [awards, setAwards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingAward, setEditingAward] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    
    const [formData, setFormData] = useState({
        title: '',
        year: '',
        description: '',
        imageUrl: '',
        playerId: 1,
        competitionId: '',
        seasonId: ''
    });

    const fetchAwards = async () => {
        try {
            const res = await getAdminAwards();
            // res.data is ApiResponse, res.data.data is the list of Awards
            setAwards(res.data.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAwards();
    }, []);

    const resetForm = () => {
        setFormData({ title: '', year: '', description: '', imageUrl: '', playerId: 1, competitionId: '', seasonId: '' });
        setEditingAward(null);
        setIsFormOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Ensure numeric fields are correctly typed
        const payload = {
            ...formData,
            playerId: formData.playerId ? Number(formData.playerId) : null,
            competitionId: formData.competitionId ? Number(formData.competitionId) : null,
            seasonId: formData.seasonId ? Number(formData.seasonId) : null
        };

        try {
            if (editingAward) {
                await updateAdminAward(editingAward.id, payload);
            } else {
                await createAdminAward(payload);
            }
            fetchAwards();
            resetForm();
        } catch (err) {
            alert('Operation failed');
        }
    };

    const handleEdit = (award) => {
        setEditingAward(award);
        setFormData({
            title: award.title || '',
            year: award.year || '',
            description: award.description || '',
            imageUrl: award.imageUrl || '',
            playerId: award.playerId || 1,
            competitionId: award.competitionId || '',
            seasonId: award.seasonId || ''
        });
        setIsFormOpen(true);
    };


    const handleDelete = async (id) => {
        if (window.confirm('Delete award?')) {
            try {
                await deleteAdminAward(id);
                fetchAwards();
            } catch (err) {
                alert('Delete failed');
            }
        }
    };

    if (loading) return <div className="p-10 text-white">Loading...</div>;

    return (
        <div className="p-8 md:p-12">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-3xl font-bold tracking-tight">Awards Management</h1>
                    <button 
                        onClick={() => setIsFormOpen(true)}
                        className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                    >
                        Add New Award
                    </button>
                </div>

                {isFormOpen && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <form onSubmit={handleSubmit} className="bg-[#141414] border border-[#222] p-8 rounded-2xl w-full max-w-xl">
                            <h2 className="text-xl font-bold mb-6">{editingAward ? 'Edit Award' : 'New Award'}</h2>
                            <div className="space-y-4">
                                <input 
                                    type="number"
                                    className="w-full bg-black border border-[#333] p-3 rounded-xl"
                                    placeholder="Player ID (e.g. 1)"
                                    value={formData.playerId}
                                    onChange={e => setFormData({...formData, playerId: e.target.value})}
                                    required
                                />
                                <input 
                                    className="w-full bg-black border border-[#333] p-3 rounded-xl"

                                    placeholder="Title"
                                    value={formData.title}
                                    onChange={e => setFormData({...formData, title: e.target.value})}
                                    required
                                />
                                <input 
                                    className="w-full bg-black border border-[#333] p-3 rounded-xl"
                                    placeholder="Year (e.g. 2023)"
                                    value={formData.year}
                                    onChange={e => setFormData({...formData, year: e.target.value})}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <input 
                                        type="number"
                                        className="w-full bg-black border border-[#333] p-3 rounded-xl"
                                        placeholder="Competition ID"
                                        value={formData.competitionId}
                                        onChange={e => setFormData({...formData, competitionId: e.target.value})}
                                    />
                                    <input 
                                        type="number"
                                        className="w-full bg-black border border-[#333] p-3 rounded-xl"
                                        placeholder="Season ID"
                                        value={formData.seasonId}
                                        onChange={e => setFormData({...formData, seasonId: e.target.value})}
                                    />
                                </div>
                                <textarea 
                                    className="w-full bg-black border border-[#333] p-3 rounded-xl min-h-[100px]"
                                    placeholder="Description"
                                    value={formData.description}
                                    onChange={e => setFormData({...formData, description: e.target.value})}
                                />
                                <input 
                                    className="w-full bg-black border border-[#333] p-3 rounded-xl"
                                    placeholder="Image URL"
                                    value={formData.imageUrl}
                                    onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                                />
                            </div>
                            <div className="flex gap-4 mt-8">
                                <button type="submit" className="flex-1 bg-white text-black py-3 rounded-xl font-bold">Save</button>
                                <button type="button" onClick={resetForm} className="flex-1 bg-[#222] py-3 rounded-xl font-bold">Cancel</button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="grid gap-4">
                    {awards.map(award => (
                        <div key={award.id} className="bg-[#141414] border border-[#222] p-6 rounded-2xl flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg">{award.title}</h3>
                                <p className="text-gray-500 text-sm">{award.year}</p>
                            </div>
                            <div className="flex gap-4">
                                <button 
                                    onClick={() => handleEdit(award)}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleDelete(award.id)}
                                    className="text-red-500 hover:text-red-400 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminAwardsPage;
