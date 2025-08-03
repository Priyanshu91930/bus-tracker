# 🔧 Fix HTTP 401 Error

## 🚨 **Current Issue: HTTP 401 Unauthorized**

Your app **CAN** reach Appwrite (connection works), but Appwrite is rejecting the request.

## 🔍 **What HTTP 401 Means:**

- ✅ **Network connection**: Working
- ✅ **Appwrite endpoint**: Reachable  
- ❌ **Authentication**: Failed
- ❌ **Project access**: Denied

## 🛠️ **Step-by-Step Fix:**

### **Step 1: Verify Project ID**
Your current project ID: `688faaad001f24274bba`

**Check if this is correct:**
1. Go to https://cloud.appwrite.io/
2. Select your project
3. Go to **Settings** → **General**
4. Copy the **Project ID** from there
5. Compare with your `.env` file

### **Step 2: Register Your Platform (CRITICAL)**

**This is the most common cause of HTTP 401!**

1. In Appwrite console, go to **Settings** → **Platforms**
2. Click **Add Platform**
3. Choose platform type:

**For Web Testing:**
- Type: **Web App**
- URL: `http://localhost:19006`
- Name: `Bus Tracker Web`

**For Mobile Testing:**
- Type: **Custom** 
- URL: `exp://127.0.0.1:19000/--/`
- Name: `Bus Tracker Mobile`

### **Step 3: Enable Authentication Methods**

1. Go to **Auth** → **Settings**
2. Enable **Email/Password** authentication
3. Save changes

### **Step 4: Test Again**

1. **Restart your app:**
   ```bash
   npx expo start --clear
   ```

2. **Click "Test Appwrite Connection"** button

3. **Check the result:**
   - ✅ Success: "Connected to Appwrite!"
   - ❌ Still 401: Continue troubleshooting

## 🔧 **Advanced Troubleshooting:**

### **If Still Getting 401:**

1. **Check Project Permissions:**
   - Go to **Settings** → **API Keys**
   - Ensure you have proper API keys configured

2. **Verify Project Status:**
   - Go to **Settings** → **General**
   - Ensure project is **Active**

3. **Check CORS Settings:**
   - Go to **Settings** → **Platforms**
   - Ensure your platform URL is listed

4. **Try Different Endpoint:**
   - If using cloud: `https://cloud.appwrite.io/v1`
   - If self-hosted: Your custom endpoint

## 📱 **Platform-Specific Issues:**

### **Web Platform:**
- Ensure you're testing on `http://localhost:19006`
- Check browser console for CORS errors

### **Mobile Platform:**
- Ensure you're using Expo Go
- Check if the Expo URL matches: `exp://127.0.0.1:19000/--/`

## 🎯 **Quick Test:**

After registering your platform, try this in your browser:
```
https://fra.cloud.appwrite.io/v1/projects/688faaad001f24274bba
```

If you get a JSON response, your project ID is correct.
If you get 401, the project ID is wrong or platform not registered.

## 📞 **Still Having Issues?**

1. **Check Appwrite console logs**
2. **Verify project ID is correct**
3. **Ensure platform is registered**
4. **Restart Expo server**

---

**Most likely fix**: Register your platform in Appwrite console! 🎯 