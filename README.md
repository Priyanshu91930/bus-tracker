<<<<<<< HEAD
# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
=======
# Bus Tracker App

A React Native bus tracking application with Appwrite authentication.

## Features

- 🚌 Real-time bus tracking
- 📍 Location-based bus stop search
- 🔐 Secure authentication with Appwrite
- 👤 User profile management
- 📱 Cross-platform (iOS, Android, Web)

## Authentication

This app uses **Appwrite** for authentication instead of Google Auth. The authentication system includes:

- Email/Password authentication
- Google OAuth (optional)
- User session management
- Secure sign out functionality

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Appwrite

1. Create an Appwrite account at [appwrite.io](https://appwrite.io)
2. Create a new project in your Appwrite console
3. Get your Project ID from the Appwrite console
4. Update the configuration in `app/config/appwrite.js`:

```javascript
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('your-actual-project-id'); // Replace with your Project ID
```

### 3. Set Up Authentication in Appwrite Console

1. Go to your Appwrite console → **Auth** section
2. Enable **Email/Password** authentication
3. Optionally enable **Google OAuth** for Google sign-in

### 4. Run the App

```bash
npm start
```

Then:
- Press `w` for web
- Press `a` for Android
- Press `i` for iOS

## Project Structure

```
bus_tracker/
├── app/
│   ├── config/
│   │   ├── appwrite.js      # Appwrite configuration
│   │   └── env.js           # Environment variables
│   ├── context/
│   │   └── AuthContext.jsx  # Authentication context
│   ├── components/
│   │   ├── AuthGuard.jsx    # Authentication guard
│   │   └── UserProfile.jsx  # User profile component
│   ├── login.jsx            # Login/signup page
│   └── HomePage.jsx         # Main app page
├── App.jsx                  # Main app component
└── APPWRITE_SETUP.md       # Detailed setup guide
```

## Environment Variables (Optional)

For better security, create a `.env` file in your project root:

```env
EXPO_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your-project-id
EXPO_PUBLIC_APPWRITE_DATABASE_ID=your-database-id
EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID=users
```

## Authentication Flow

1. **App Launch**: AuthGuard checks authentication status
2. **Login Page**: Users can sign in with email/password or Google
3. **Home Page**: Shows user profile and bus tracking features
4. **Sign Out**: Secure sign out with confirmation

## Troubleshooting

### Common Issues:

1. **"Project not found" error**: Update your Project ID in `app/config/appwrite.js`
2. **Authentication not working**: Check your Appwrite console settings
3. **Google OAuth issues**: Verify OAuth configuration in Appwrite console

### Debug Tips:

- Check console logs for detailed error messages
- Verify Appwrite project settings
- Test with email/password first before adding OAuth

## Dependencies

- **React Native**: Core framework
- **Expo**: Development platform
- **Appwrite**: Authentication and backend
- **React Navigation**: Navigation
- **React Native Maps**: Map functionality

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
#
>>>>>>> eaa3e8670fdfb10ec56c81b6afeb3d30c35020ff
