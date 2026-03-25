import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../features/admin/AdminHeader';
import ProtectedRoute from '../features/admin/ProtectedRoute';

const AdminLayout = () => {
    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-black text-white">
                <AdminHeader />
                <main>
                    <Outlet />
                </main>
            </div>
        </ProtectedRoute>
    );
};

export default AdminLayout;
