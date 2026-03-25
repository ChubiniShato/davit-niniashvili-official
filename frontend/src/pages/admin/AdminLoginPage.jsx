import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';

const AdminLoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const { login, authenticated, loading } = useAdminAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    const from = location.state?.from?.pathname || '/admin';

    // Redirect if already authenticated
    React.useEffect(() => {
        if (authenticated && !loading) {
            navigate('/admin', { replace: true });
        }
    }, [authenticated, loading, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        
        try {
            await login(username, password);
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
            <form 
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-[#141414] border border-[#222] p-8 rounded-2xl shadow-2xl"
            >
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold text-white tracking-tight">Admin Portal</h1>
                    <p className="text-gray-500 text-sm mt-2">Sign in to manage official content</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-lg">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full bg-black border border-[#333] text-white px-4 py-3 rounded-xl focus:outline-none focus:border-white transition-colors"
                            placeholder="username"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full bg-black border border-[#333] text-white px-4 py-3 rounded-xl focus:outline-none focus:border-white transition-colors"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-8 bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors disabled:bg-gray-500"
                >
                    {isSubmitting ? 'Verifying...' : 'Sign In'}
                </button>
            </form>
        </div>
    );
};

export default AdminLoginPage;
