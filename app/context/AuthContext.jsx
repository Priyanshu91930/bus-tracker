import React, { createContext, useContext, useEffect, useState } from 'react';
import { appwriteAuth } from '../config/appwrite';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check authentication status on app start
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            setLoading(true);
            const isAuth = await appwriteAuth.isAuthenticated();
            if (isAuth) {
                const userResult = await appwriteAuth.getCurrentUser();
                if (userResult.success) {
                    setUser(userResult.data);
                }
            }
        } catch (error) {
            console.error('Auth check error:', error);
        } finally {
            setLoading(false);
        }
    };

    const signIn = async (email, password) => {
        try {
            setError(null);
            setLoading(true);
            const result = await appwriteAuth.signIn(email, password);
            
            if (result.success) {
                const userResult = await appwriteAuth.getCurrentUser();
                if (userResult.success) {
                    setUser(userResult.data);
                    return { success: true };
                }
            } else {
                setError(result.error);
                return { success: false, error: result.error };
            }
        } catch (error) {
            setError(error.message);
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const signUp = async (email, password, name) => {
        try {
            setError(null);
            setLoading(true);
            const result = await appwriteAuth.createAccount(email, password, name);
            
            if (result.success) {
                // Auto sign in after successful sign up
                const signInResult = await signIn(email, password);
                return signInResult;
            } else {
                setError(result.error);
                return { success: false, error: result.error };
            }
        } catch (error) {
            setError(error.message);
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const signInWithGoogle = async () => {
        try {
            setError(null);
            setLoading(true);
            const result = await appwriteAuth.signInWithGoogle();
            
            if (result.success) {
                const userResult = await appwriteAuth.getCurrentUser();
                if (userResult.success) {
                    setUser(userResult.data);
                    return { success: true };
                }
            } else {
                setError(result.error);
                return { success: false, error: result.error };
            }
        } catch (error) {
            setError(error.message);
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const signOut = async () => {
        try {
            setLoading(true);
            const result = await appwriteAuth.signOut();
            if (result.success) {
                setUser(null);
                return { success: true };
            } else {
                setError(result.error);
                return { success: false, error: result.error };
            }
        } catch (error) {
            setError(error.message);
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const clearError = () => {
        setError(null);
    };

    const value = {
        user,
        loading,
        error,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
        clearError,
        checkAuthStatus
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}; 