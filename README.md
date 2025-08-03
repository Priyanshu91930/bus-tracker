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
