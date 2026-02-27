import React, { createContext, useContext, useState, useCallback } from 'react';
import movieApi from '../api/movieAPI';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        // Khôi phục user từ localStorage nếu đã login trước
        try {
            const saved = localStorage.getItem('movie_user');
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });
    const [authError, setAuthError] = useState('');
    const [authLoading, setAuthLoading] = useState(false);

    const login = useCallback(async (username, password) => {
        setAuthLoading(true);
        setAuthError('');
        try {
            const res = await movieApi.get('/accounts');
            const accounts = res.data;
            const found = accounts.find(
                (acc) => acc.username === username && acc.password === password
            );
            if (found) {
                // Không lưu password vào state / localStorage
                const { password: _pw, ...safeUser } = found;
                setCurrentUser(safeUser);
                localStorage.setItem('movie_user', JSON.stringify(safeUser));
                setAuthLoading(false);
                return { success: true };
            } else {
                setAuthError('Tên đăng nhập hoặc mật khẩu không đúng!');
                setAuthLoading(false);
                return { success: false };
            }
        } catch (err) {
            console.error('Lỗi login:', err);
            setAuthError('Lỗi kết nối server. Vui lòng thử lại!');
            setAuthLoading(false);
            return { success: false };
        }
    }, []);

    const logout = useCallback(() => {
        setCurrentUser(null);
        localStorage.removeItem('movie_user');
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, authError, authLoading, login, logout, setAuthError }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
