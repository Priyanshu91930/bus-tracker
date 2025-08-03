import { Account, Client, Databases } from 'appwrite';
import { Platform } from 'react-native';
import { ENV, validateEnv } from './env';

// Validate environment variables
validateEnv();

// Appwrite configuration
const client = new Client()
    .setEndpoint(ENV.APPWRITE_ENDPOINT)
    .setProject(ENV.APPWRITE_PROJECT_ID);

// Initialize Appwrite services
export const account = new Account(client);
export const databases = new Databases(client);

// Database and collection IDs
export const DATABASE_ID = ENV.APPWRITE_DATABASE_ID;
export const USERS_COLLECTION_ID = ENV.APPWRITE_USERS_COLLECTION_ID;

// Get callback URL based on platform
const getCallbackUrl = () => {
    if (Platform.OS === 'web') {
        return 'http://localhost:19006'; // Web development server
    } else {
        return 'exp://127.0.0.1:19000/--/'; // Expo Go for mobile development
    }
};

// Test Appwrite connection
export const testConnection = async () => {
    try {
        console.log('🔗 Testing Appwrite connection...');
        console.log('📡 Endpoint:', ENV.APPWRITE_ENDPOINT);
        console.log('🆔 Project ID:', ENV.APPWRITE_PROJECT_ID);
        console.log('📱 Platform:', Platform.OS);
        console.log('🔗 Callback URL:', getCallbackUrl());
        
        // Test 1: Basic connectivity (no auth required)
        const healthResponse = await fetch(`${ENV.APPWRITE_ENDPOINT}/health`, {
            method: 'GET',
        });
        
        if (!healthResponse.ok) {
            console.log('❌ Appwrite health check failed:', healthResponse.status);
            return { success: false, error: `Health check failed: HTTP ${healthResponse.status}` };
        }
        
        console.log('✅ Appwrite health check passed');
        
        // Test 2: Project access (requires proper project ID)
        const projectResponse = await fetch(`${ENV.APPWRITE_ENDPOINT}/projects/${ENV.APPWRITE_PROJECT_ID}`, {
            method: 'GET',
            headers: {
                'X-Appwrite-Project': ENV.APPWRITE_PROJECT_ID,
                'Content-Type': 'application/json',
            }
        });
        
        if (projectResponse.ok) {
            console.log('✅ Appwrite project access successful!');
            return { success: true, message: 'Connection successful' };
        } else if (projectResponse.status === 401) {
            console.log('❌ Project access failed: Unauthorized (401)');
            return { 
                success: false, 
                error: 'Project access denied. Please check: 1) Project ID is correct, 2) Platform is registered in Appwrite console' 
            };
        } else {
            console.log('❌ Project access failed:', projectResponse.status, projectResponse.statusText);
            return { success: false, error: `Project access failed: HTTP ${projectResponse.status}` };
        }
    } catch (error) {
        console.error('❌ Appwrite connection error:', error);
        return { success: false, error: error.message };
    }
};

// Authentication methods
export const appwriteAuth = {
    // Create account
    createAccount: async (email, password, name) => {
        try {
            const response = await account.create(
                'unique()', // User ID (auto-generated)
                email,
                password,
                name
            );
            return { success: true, data: response };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Sign in with email/password
    signIn: async (email, password) => {
        try {
            const response = await account.createEmailSession(email, password);
            return { success: true, data: response };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Sign in with Google OAuth
    signInWithGoogle: async () => {
        try {
            const callbackUrl = getCallbackUrl();
            console.log('🔗 Using callback URL:', callbackUrl);
            
            const response = await account.createOAuth2Session(
                'google',
                callbackUrl, // Success callback
                callbackUrl  // Failure callback
            );
            return { success: true, data: response };
        } catch (error) {
            console.error('❌ Google OAuth error:', error);
            return { success: false, error: error.message };
        }
    },

    // Get current user
    getCurrentUser: async () => {
        try {
            const response = await account.get();
            return { success: true, data: response };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Sign out
    signOut: async () => {
        try {
            await account.deleteSession('current');
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Check if user is authenticated
    isAuthenticated: async () => {
        try {
            await account.get();
            return true;
        } catch (error) {
            return false;
        }
    }
};

export default client; 