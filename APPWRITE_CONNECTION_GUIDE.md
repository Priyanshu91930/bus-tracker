# 🔗 Appwrite Connection Guide

## 🚨 Current Issues Fixed

1. ✅ **Created `.env` file** with proper Appwrite credentials
2. ✅ **Updated callback URLs** to use correct platform-specific URLs
3. ✅ **Added connection test function** to verify connectivity
4. ✅ **Added test button** in login screen

## 📋 Setup Checklist

### 1. Environment Variables ✅
Your `.env` file is now created with:
```
EXPO_PUBLIC_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
EXPO_PUBLIC_APPWRITE_PROJECT_ID=688faaad001f24274bba
```

### 2. Appwrite Console Setup (YOU NEED TO DO THIS)

#### Step 1: Go to Appwrite Console
- Open: https://cloud.appwrite.io/
- Login and select your project

#### Step 2: Add Platform
- Go to **Settings** → **Platforms**
- Click **Add Platform**
- Choose platform type based on how you're testing:

**For Web Testing:**
- Select **Web App**
- Enter: `http://localhost:19006`
- Name: `Bus Tracker Web`

**For Mobile Testing (Expo Go):**
- Select **Custom**
- Enter: `exp://127.0.0.1:19000/--/`
- Name: `Bus Tracker Mobile`

#### Step 3: Enable Authentication Methods
- Go to **Auth** → **Settings**
- Enable **Email/Password** authentication
- Enable **Google OAuth** (if you want Google sign-in)

#### Step 4: Configure Google OAuth (Optional)
- Go to **Auth** → **OAuth2 Providers**
- Enable **Google**
- Add your Google OAuth credentials

## 🧪 Testing Connection

### 1. Start Your App
```bash
npx expo start --clear
```

### 2. Test Connection
- Open your app
- Click the **"Test Appwrite Connection"** button
- Check the console for connection status

### 3. Expected Results
- ✅ **Success**: "Connected to Appwrite!"
- ❌ **Failure**: Check error message and follow troubleshooting

## 🔧 Troubleshooting

### Connection Failed
1. **Check Project ID**: Verify `688faaad001f24274bba` is correct
2. **Check Endpoint**: Verify `https://fra.cloud.appwrite.io/v1` is accessible
3. **Check Platform Registration**: Ensure you added the platform in Appwrite console

### OAuth Errors
1. **"Invalid success param"**: Platform not registered in Appwrite console
2. **"Invalid URI"**: Callback URL doesn't match registered platform URL

### Environment Variables Not Loading
1. **Restart Expo**: `npx expo start --clear`
2. **Check .env location**: Should be in project root
3. **Check variable names**: Must start with `EXPO_PUBLIC_`

## 📱 Platform-Specific URLs

### Web Development
- **Callback URL**: `http://localhost:19006`
- **Platform Type**: Web App

### Mobile Development (Expo Go)
- **Callback URL**: `exp://127.0.0.1:19000/--/`
- **Platform Type**: Custom

### Production (When Ready)
- **Web**: Your domain (e.g., `https://yourdomain.com`)
- **Mobile**: Your app's custom scheme (e.g., `myapp://callback`)

## 🎯 Next Steps

1. **Register your platform** in Appwrite console (see Step 2 above)
2. **Test connection** using the new test button
3. **Try authentication** once connection is successful
4. **Report any errors** with specific error messages

## 📞 Need Help?

If you're still having issues:
1. Check the browser console for detailed error messages
2. Verify your Appwrite project settings
3. Ensure all environment variables are loaded correctly

---

**Remember**: The most common issue is forgetting to register your platform in the Appwrite console. This is required before any OAuth or authentication will work! 