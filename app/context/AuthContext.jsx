import React, { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
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
            console.log('Attempting sign in with:', email);
            
            const result = await appwriteAuth.signIn(email, password);
            console.log('Sign in result:', result);
            
            if (result.success) {
                const userResult = await appwriteAuth.getCurrentUser();
                if (userResult.success) {
                    setUser(userResult.data);
                    console.log('User signed in successfully:', userResult.data);
                    return { success: true };
                } else {
                    console.log('Failed to get current user:', userResult.error);
                    return { success: false, error: 'Failed to get user data' };
                }
            } else {
                console.log('Sign in failed:', result.error);
                setError(result.error);
                return { success: false, error: result.error };
            }
        } catch (error) {
            console.error('Sign in error:', error);
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
            console.log('Attempting sign up with:', email, name);
            
            const result = await appwriteAuth.createAccount(email, password, name);
            console.log('Sign up result:', result);
            
            if (result.success) {
                console.log('Account created successfully, auto-signing in...');
                // Auto sign in after successful sign up
                const signInResult = await signIn(email, password);
                return signInResult;
            } else {
                console.log('Sign up failed:', result.error);
                setError(result.error);
                return { success: false, error: result.error };
            }
        } catch (error) {
            console.error('Sign up error:', error);
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
            console.log('Starting Google Sign-In Process');
            console.log('Platform:', Platform.OS);
            
            const result = await appwriteAuth.signInWithGoogle();
            console.log('Full Google Sign-In Result:', JSON.stringify(result, null, 2));
            
            if (result.success) {
                console.log('Google Sign-In Successful, User Data:', result.data);
                setUser(result.data);
                return { success: true };
            } else {
                console.error('Google Sign-In Failed:', result.error);
                
                // Enhanced error logging for Android
                if (Platform.OS === 'android') {
                    console.error('Detailed Android OAuth Error:', {
                        error: result.error,
                        details: result.details,
                        platform: Platform.OS,
                        packageName: 'com.bustracker'
                    });
                }
                
                setError(result.error || 'Google Sign-In Failed');
                return { 
                    success: false, 
                    error: result.error || 'Google Sign-In Failed',
                    details: result.details
                };
            }
        } catch (error) {
            console.error('Unexpected Google Sign-In Error:', error);
            
            // Enhanced error logging for Android
            if (Platform.OS === 'android') {
                console.error('Detailed Android OAuth Catch Error:', {
                    errorMessage: error.message,
                    errorStack: error.stack,
                    platform: Platform.OS,
                    packageName: 'com.bustracker'
                });
            }
            
            setError(error.message || 'Unexpected Google Sign-In Error');
            return { 
                success: false, 
                error: error.message || 'Unexpected Google Sign-In Error' 
            };
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