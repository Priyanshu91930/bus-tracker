# Appwrite Authentication Setup Guide

This guide will help you configure Appwrite authentication for your bus tracker app.

## Prerequisites

1. Create an Appwrite account at [appwrite.io](https://appwrite.io)
2. Create a new project in your Appwrite console

## Step 1: Configure Appwrite Project

1. Go to your Appwrite console
2. Create a new project or use an existing one
3. Note down your **Project ID** (you'll need this later)

## Step 2: Update Configuration

Edit the file `app/config/appwrite.js` and replace the placeholder values:

```javascript
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Keep this as is for cloud
    .setProject('your-project-id'); // Replace with your actual project ID
```

## Step 3: Set Up Authentication

1. In your Appwrite console, go to **Auth** section
2. Enable the following authentication methods:
   - Email/Password
   - Google OAuth (optional)

### For Google OAuth (Optional):
1. Go to **Auth > Settings**
2. Add Google as an OAuth provider
3. Configure your Google OAuth credentials
4. Update the callback URLs in `app/config/appwrite.js`:
   ```javascript
   'your-app-url://callback', // Replace with your app's callback URL
   'your-app-url://failure'   // Replace with your app's failure URL
   ```

## Step 4: Create Database (Optional)

If you want to store additional user data:

1. Go to **Databases** in your Appwrite console
2. Create a new database
3. Create a `users` collection
4. Update the database and collection IDs in `app/config/appwrite.js`:
   ```javascript
   export const DATABASE_ID = 'your-database-id';
   export const USERS_COLLECTION_ID = 'users';
   ```

## Step 5: Environment Variables (Recommended)

For better security, create a `.env` file in your project root:

```env
EXPO_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your-project-id
EXPO_PUBLIC_APPWRITE_DATABASE_ID=your-database-id
EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID=users
```

Then update `app/config/appwrite.js` to use environment variables:

```javascript
const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID);
```

## Step 6: Test the Authentication

1. Run your app: `npm start`
2. Try signing up with email/password
3. Try signing in with existing credentials
4. Test Google OAuth (if configured)

## Troubleshooting

### Common Issues:

1. **"Project not found" error**: Make sure your project ID is correct
2. **"Invalid credentials"**: Check your email/password format
3. **Google OAuth not working**: Verify your OAuth configuration and callback URLs
4. **Network errors**: Ensure you have internet connectivity

### Debug Tips:

1. Check the console logs for detailed error messages
2. Verify your Appwrite project settings
3. Test with a simple email/password first before adding OAuth

## Security Notes

1. Never commit your actual project ID to version control
2. Use environment variables for sensitive configuration
3. Set up proper CORS settings in your Appwrite console
4. Configure appropriate security rules for your database

## Next Steps

After setting up authentication, you can:

1. Add user profile management
2. Implement role-based access (Student/Driver)
3. Add password reset functionality
4. Set up email verification
5. Add additional OAuth providers (Facebook, GitHub, etc.)

For more information, visit the [Appwrite documentation](https://appwrite.io/docs). 