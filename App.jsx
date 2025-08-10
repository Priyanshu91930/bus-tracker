import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform } from 'react-native';
import AuthGuard from './app/components/AuthGuard';
import { AuthProvider } from './app/context/AuthContext';
import HomePage from './app/HomePage';
import SplashScreen from './app/index';
import LoginPage from './app/login';
import MapView from './app/MapView';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <AuthGuard>
        <NavigationContainer
          linking={{
            prefixes: [
              'http://localhost:19006', 
              'exp://localhost:19006', 
              'http://localhost:19006/#'
            ],
            config: {
              screens: {
                Splash: '',
                Login: 'login',
                Home: 'home',
                MapView: 'map-view'
              }
            }
          }}
        >
          <Stack.Navigator 
            initialRouteName="Splash" 
            screenOptions={{ 
              headerShown: false,
              gestureEnabled: Platform.OS !== 'web',
              animationEnabled: Platform.OS !== 'web'
            }}
          >
            <Stack.Screen 
              name="Splash" 
              component={SplashScreen} 
            />
            <Stack.Screen 
              name="Login" 
              component={LoginPage} 
            />
            <Stack.Screen 
              name="Home" 
              component={HomePage} 
            />
            <Stack.Screen 
              name="MapView" 
              component={MapView} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthGuard>
    </AuthProvider>
  );
} 