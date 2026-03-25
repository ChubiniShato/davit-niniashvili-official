import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../api/api';

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    const refreshSession = useCallback(async () => {
        try {
            const response = await api.get('/admin/auth/me');
            if (response.data.authenticated) {
                setUser({
                    username: response.data.username,
                    role: response.data.role
                });
                setAuthenticated(true);
            } else {
                setUser(null);
                setAuthenticated(false);
            }
        } catch (error) {
            setUser(null);
            setAuthenticated(false);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refreshSession();
    }, [refreshSession]);

    const login = async (username, password) => {
        // Ensure XSRF cookie is present before login
        await api.get('/admin/auth/me');
        const response = await api.post('/admin/auth/login', { username, password });
        if (response.data.authenticated) {
            setUser({
                username: response.data.username,
                role: response.data.role
            });
            setAuthenticated(true);
        }
        return response.data;
    };

    const logout = async () => {
        try {
            await api.post('/admin/auth/logout');
        } finally {
            setUser(null);
            setAuthenticated(false);
        }
    };

    return (
        <AdminAuthContext.Provider value={{ user, authenticated, loading, login, logout, refreshSession }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
