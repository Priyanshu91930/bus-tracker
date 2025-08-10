// Environment configuration for Appwrite
export const ENV = {
  APPWRITE_ENDPOINT: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1',
  APPWRITE_PROJECT_ID: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || '688faaad001f24274bba',
  APPWRITE_DATABASE_ID: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID || 'your-database-id',
  APPWRITE_USERS_COLLECTION_ID: process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID || 'users',
};

// Validate required environment variables
export const validateEnv = () => {
  const required = ['APPWRITE_PROJECT_ID'];
  const missing = required.filter(key => !ENV[key] || ENV[key] === 'your-project-id');
  
  if (missing.length > 0) {
    console.warn('⚠️  Missing required environment variables:', missing);
    console.warn('Please update your .env file or app/config/appwrite.js with your Appwrite project ID');
  }
  
  return missing.length === 0;
}; 