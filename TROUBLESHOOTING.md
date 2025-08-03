# Troubleshooting Guide

## Common Issues and Solutions

### 1. Web Bundling Failed - React Navigation Stack

**Error**: `Unable to resolve "@react-navigation/stack"`

**Solution**: 
```bash
npm install @react-navigation/stack
```

### 2. Image Format Issues

**Error**: `Unsupported MIME type: image/webp`

**Solution**: 
- Convert webp files to PNG format
- Or use the existing PNG icons from assets/images/

### 3. Appwrite Configuration Issues

**Error**: `Project not found`

**Solution**:
1. Update `app/config/appwrite.js` with your actual Project ID
2. Make sure your Appwrite project is properly configured
3. Check that authentication methods are enabled in Appwrite console

### 4. Environment Variables

**Error**: Missing environment variables

**Solution**:
1. Create a `.env` file in the project root
2. Add your Appwrite configuration:
```env
EXPO_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your-project-id
```

### 5. Authentication Not Working

**Symptoms**: Sign in/sign up fails

**Solutions**:
1. Check your Appwrite project settings
2. Verify email/password authentication is enabled
3. Check console logs for detailed error messages
4. Test with a simple email/password first

### 6. Google OAuth Issues

**Symptoms**: Google sign-in doesn't work

**Solutions**:
1. Configure Google OAuth in Appwrite console
2. Update callback URLs in `app/config/appwrite.js`
3. Verify Google OAuth credentials

### 7. Metro Bundler Issues

**Error**: Metro bundler fails to start

**Solutions**:
1. Clear Metro cache: `npx expo start --clear`
2. Reset project: `npm run reset-project`
3. Reinstall dependencies: `npm install`

### 8. Android Build Issues

**Error**: Android build fails

**Solutions**:
1. Use web version for testing: `npx expo start --web`
2. Check Android SDK installation
3. Verify Android Studio setup

## Quick Fixes

### Reset Everything
```bash
npm install
npx expo start --clear
```

### Test Web Version Only
```bash
npx expo start --web
```

### Check Dependencies
```bash
npm list @react-navigation/stack
npm list appwrite
```

## Debug Tips

1. **Check Console Logs**: Look for detailed error messages
2. **Test Incrementally**: Start with basic authentication before adding OAuth
3. **Verify Configuration**: Double-check all Appwrite settings
4. **Use Web Version**: Test on web first to avoid platform-specific issues

## Getting Help

If you're still having issues:

1. Check the [Appwrite documentation](https://appwrite.io/docs)
2. Review the `APPWRITE_SETUP.md` file
3. Check the console logs for specific error messages
4. Verify your Appwrite project configuration 