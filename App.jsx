import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import AuthGuard from './app/components/AuthGuard';
import { AuthProvider } from './app/context/AuthContext';
import HomePage from './app/HomePage';
import SplashScreen from './app/index';
import LoginPage from './app/login';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <AuthGuard>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Home" component={HomePage} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthGuard>
    </AuthProvider>
  );
} 