import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    const API_URL = process.env.REACT_APP_API_URL || 'https://api.daniyaalperfumery.in/api/';

    useEffect(() => {
        if (token) {
            fetchProfile();
        } else {
            setLoading(false);
        }
    }, [token]);

    const fetchProfile = async () => {
        try {
            const response = await fetch(`${API_URL}auth/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                setUser(data.user || data);
            } else {
                logout();
            }
        } catch (error) {
            console.error('Fetch profile error:', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await fetch(`${API_URL}auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                setToken(data.token);
                localStorage.setItem('token', data.token);
                setUser(data.user);
                return { success: true };
            } else {
                return { success: false, message: data.message || 'Login failed' };
            }
        } catch (error) {
            return { success: false, message: 'Network error' };
        }
    };

    const register = async (userData) => {
        try {
            const response = await fetch(`${API_URL}auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            const data = await response.json();
            if (response.ok) {
                // Some APIs auto-login after register, check if token is returned
                if (data.token) {
                    setToken(data.token);
                    localStorage.setItem('token', data.token);
                    setUser(data.user);
                }
                return { success: true, message: data.message || 'Registration successful' };
            } else {
                return { success: false, message: data.message || 'Registration failed' };
            }
        } catch (error) {
            return { success: false, message: 'Network error' };
        }
    };

    const logout = async () => {
        try {
            if (token) {
                await fetch(`${API_URL}auth/logout`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setToken(null);
            setUser(null);
            localStorage.removeItem('token');
        }
    };

    const updateProfile = async (userData) => {
        try {
            const response = await fetch(`${API_URL}auth/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userData)
            });
            const data = await response.json();
            if (response.ok) {
                setUser(data.user || data);
                return { success: true, message: 'Profile updated successfully' };
            } else {
                return { success: false, message: data.message || 'Update failed' };
            }
        } catch (error) {
            return { success: false, message: 'Network error' };
        }
    };

    const changePassword = async (passwords) => {
        try {
            const response = await fetch(`${API_URL}auth/profile/password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(passwords)
            });
            const data = await response.json();
            if (response.ok) {
                return { success: true, message: 'Password changed successfully' };
            } else {
                return { success: false, message: data.message || 'Password change failed' };
            }
        } catch (error) {
            return { success: false, message: 'Network error' };
        }
    };

    const resetPassword = async (email) => {
        try {
            const response = await fetch(`${API_URL}auth/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            if (response.ok) {
                return { success: true, message: data.message || 'Reset link sent to your email' };
            } else {
                return { success: false, message: data.message || 'Reset request failed' };
            }
        } catch (error) {
            return { success: false, message: 'Network error' };
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            loading,
            login,
            register,
            logout,
            updateProfile,
            changePassword,
            resetPassword
        }}>
            {children}
        </AuthContext.Provider>
    );
};
