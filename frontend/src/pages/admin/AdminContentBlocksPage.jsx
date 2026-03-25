import React, { useState, useEffect } from 'react';
import { getAdminContentBlocks, createAdminContentBlock, updateAdminContentBlock, deleteAdminContentBlock } from '../../api/api';

const AdminContentBlocksPage = () => {
    const [blocks, setBlocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBlock, setEditingBlock] = useState(null);
    const [formData, setFormData] = useState({
        page: '',
        section: '',
        key: '',
        locale: 'en',
        value: '',
        isActive: true
    });

    useEffect(() => {
        fetchBlocks();
    }, []);

    const fetchBlocks = async () => {
        try {
            const res = await getAdminContentBlocks();
            setBlocks(res.data.data || []);
        } catch (err) {
            console.error('Failed to fetch content blocks:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (block = null) => {
        if (block) {
            setEditingBlock(block);
            setFormData({
                page: block.page || '',
                section: block.section || '',
                key: block.key || '',
                locale: block.locale || 'en',
                value: block.value || '',
                isActive: block.isActive ?? true
            });
        } else {
            setEditingBlock(null);
            setFormData({
                page: '',
                section: '',
                key: '',
                locale: 'en',
                value: '',
                isActive: true
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingBlock) {
                await updateAdminContentBlock(editingBlock.id, formData);
            } else {
                await createAdminContentBlock(formData);
            }
            setIsModalOpen(false);
            fetchBlocks();
        } catch (err) {
            alert(err.response?.data?.message || 'Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await deleteAdminContentBlock(id);
            fetchBlocks();
        } catch (err) {
            alert('Delete failed');
        }
    };

    if (loading) return <div className="p-20 text-white">Loading...</div>;

    return (
        <div className="min-h-screen bg-black text-white p-8 md:p-20">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold">Content Blocks</h1>
                <button 
                    onClick={() => handleOpenModal()}
                    className="bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors"
                >
                    Add New Block
                </button>
            </div>

            <div className="grid gap-6">
                {blocks.map(block => (
                    <div key={block.id} className="bg-[#111] border border-[#222] p-6 rounded-xl flex justify-between items-start">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-xs font-bold uppercase tracking-widest text-rochelais-gold bg-rochelais-gold/10 px-2 py-1 rounded">
                                    {block.locale}
                                </span>
                                <span className="text-gray-500 text-sm font-mono">{block.page} / {block.section}</span>
                                {!block.isActive && <span className="text-red-500 text-xs font-bold uppercase">[Inactive]</span>}
                            </div>
                            <h3 className="text-lg font-bold mb-2">{block.key}</h3>
                            <p className="text-gray-400 text-sm line-clamp-2 italic">"{block.value}"</p>
                        </div>
                        <div className="flex gap-3 ml-6">
                            <button 
                                onClick={() => handleOpenModal(block)}
                                className="text-sm border border-[#333] px-3 py-1 rounded hover:bg-[#222] transition-colors"
                            >
                                Edit
                            </button>
                            <button 
                                onClick={() => handleDelete(block.id)}
                                className="text-sm border border-red-900/50 text-red-500 px-3 py-1 rounded hover:bg-red-950/30 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-[#111] border border-[#222] w-full max-w-2xl rounded-2xl p-8 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-6">{editingBlock ? 'Edit' : 'Create'} Content Block</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Page</label>
                                    <input 
                                        type="text"
                                        className="w-full bg-black border border-[#333] p-3 rounded-lg focus:outline-none focus:border-rochelais-gold"
                                        value={formData.page}
                                        onChange={e => setFormData({...formData, page: e.target.value})}
                                        placeholder="home, bio, etc"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Section</label>
                                    <input 
                                        type="text"
                                        className="w-full bg-black border border-[#333] p-3 rounded-lg focus:outline-none focus:border-rochelais-gold"
                                        value={formData.section}
                                        onChange={e => setFormData({...formData, section: e.target.value})}
                                        placeholder="hero, career, etc"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Key</label>
                                    <input 
                                        type="text"
                                        required
                                        className="w-full bg-black border border-[#333] p-3 rounded-lg focus:outline-none focus:border-rochelais-gold"
                                        value={formData.key}
                                        onChange={e => setFormData({...formData, key: e.target.value})}
                                        placeholder="cta_button_text"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Locale</label>
                                    <select 
                                        className="w-full bg-black border border-[#333] p-3 rounded-lg focus:outline-none focus:border-rochelais-gold"
                                        value={formData.locale}
                                        onChange={e => setFormData({...formData, locale: e.target.value})}
                                    >
                                        <option value="en">English (EN)</option>
                                        <option value="ka">Georgian (KA)</option>
                                        <option value="fr">French (FR)</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Value / Content</label>
                                <textarea 
                                    required
                                    rows="5"
                                    className="w-full bg-black border border-[#333] p-3 rounded-lg focus:outline-none focus:border-rochelais-gold font-mono text-sm"
                                    value={formData.value}
                                    onChange={e => setFormData({...formData, value: e.target.value})}
                                    placeholder="Enter content here..."
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input 
                                    type="checkbox"
                                    id="isActive"
                                    checked={formData.isActive}
                                    onChange={e => setFormData({...formData, isActive: e.target.checked})}
                                    className="w-4 h-4 accent-rochelais-gold"
                                />
                                <label htmlFor="isActive" className="text-sm font-bold text-gray-300">Active and Visible</label>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button 
                                    type="submit"
                                    className="flex-1 bg-rochelais-gold text-black py-3 rounded-lg font-bold hover:bg-gold-light transition-colors"
                                >
                                    {editingBlock ? 'Update' : 'Create'} Block
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 bg-[#222] text-white py-3 rounded-lg font-bold hover:bg-[#333] transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminContentBlocksPage;
