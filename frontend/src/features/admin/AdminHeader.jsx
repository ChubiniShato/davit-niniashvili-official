import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';

const AdminHeader = () => {
    const { logout } = useAdminAuth();
    const navigate = useNavigate();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        if (isLoggingOut) return;
        setIsLoggingOut(true);
        try {
            await logout();
            navigate('/admin/login', { replace: true });
        } catch (error) {
            console.error('Logout failed:', error);
            setIsLoggingOut(false);
        }
    };

    return (
        <header className="bg-black border-b border-[#222] px-8 py-4 flex justify-between items-center sticky top-0 z-50">
            <div className="flex items-center gap-8">
                <NavLink to="/admin" className="text-xl font-bold hover:text-rochelais-gold transition-colors">DN Admin</NavLink>
                <nav className="hidden md:flex gap-6">
                    <NavLink to="/admin/awards" className={({ isActive }) => `text-sm font-medium transition-colors hover:text-rochelais-gold ${isActive ? 'text-rochelais-gold' : 'text-gray-400'}`}>Awards</NavLink>
                    <NavLink to="/admin/career" className={({ isActive }) => `text-sm font-medium transition-colors hover:text-rochelais-gold ${isActive ? 'text-rochelais-gold' : 'text-gray-400'}`}>Career</NavLink>
                    <NavLink to="/admin/content-blocks" className={({ isActive }) => `text-sm font-medium transition-colors hover:text-rochelais-gold ${isActive ? 'text-rochelais-gold' : 'text-gray-400'}`}>Content</NavLink>
                </nav>
            </div>
            <div className="flex items-center gap-4">
                <NavLink to="/" className="text-xs text-gray-500 hover:text-white transition-colors">View Site</NavLink>
                <button 
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="text-xs bg-red-900/20 text-red-500 px-3 py-1.5 rounded border border-red-900/50 hover:bg-red-900/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoggingOut ? 'Signing out...' : 'Sign Out'}
                </button>
            </div>
        </header>
    );
};

export default AdminHeader;
