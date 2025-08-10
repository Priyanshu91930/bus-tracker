import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ActivityIndicator, Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from './context/AuthContext';

export default function LoginPage() {
  const [userType, setUserType] = useState(null);
  const [showSignIn, setShowSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  
  const { signIn, signUp, signInWithGoogle, loading, clearError } = useAuth();
  const navigation = useNavigation();

  // Handle email/password sign in
  const handleSignIn = async () => {
    clearError();
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    console.log('Attempting sign in with:', email);
    const result = await signIn(email, password);
    console.log('Sign in result:', result);
    
    if (result.success) {
      console.log('Navigating to HomePage');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } else {
      console.error('Sign in failed:', result.error);
      setError(result.error || 'Sign in failed');
    }
  };

  // Handle email/password sign up
  const handleSignUp = async () => {
    clearError();
    if (!email || !password || !name) {
      setError('Please enter email, password, and name');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters long');
      return;
    }

    console.log('Attempting sign up with:', email, name);
    const result = await signUp(email, password, name);
    console.log('Sign up result:', result);
    
    if (result.success) {
      console.log('Navigating to HomePage');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } else {
      console.error('Sign up failed:', result.error);
      setError(result.error || 'Sign up failed');
    }
  };

  // Handle Google sign in
  const handleGoogleSignIn = async () => {
    clearError();
    console.log('Attempting Google sign in');
    console.log('Platform:', Platform.OS);
    
    const result = await signInWithGoogle();
    console.log('Google sign in full result:', JSON.stringify(result, null, 2));
    
    if (result.success) {
      console.log('Navigating to HomePage');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } else {
      console.error('Google sign in failed:', result.error);
      console.error('Google sign in details:', result.details);
      
      // More detailed and user-friendly error messages
      let errorMessage = 'Google sign in failed';
      if (result.error) {
        if (result.error.includes('network')) {
          errorMessage = 'Network error. Please check your connection.';
        } else if (result.error.includes('unauthorized')) {
          errorMessage = 'Authorization failed. Please try again.';
        } else if (result.error.includes('cancelled')) {
          errorMessage = 'Sign-in was cancelled.';
        } else if (result.error.includes('OAuth configuration incomplete')) {
          errorMessage = 'OAuth setup is incomplete. Please contact support.';
        }
      }
      
      // If details are available and relate to scope, provide more guidance
      if (result.details && result.details.type === 'general_unauthorized_scope') {
        errorMessage += '\n\nTroubleshooting:\n1. Ensure Google OAuth is correctly set up in Appwrite\n2. Check your project permissions\n3. Verify callback URLs';
      }
      
      setError(errorMessage);
    }
  };

  // Forgot Password
  const handleForgotPassword = () => {
    // TODO: Implement forgot password functionality
    alert('Forgot Password functionality will be implemented soon');
  };

  // Initial user type selection
  if (!userType) {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/images/clg.png')} style={styles.logo} />
        <Text style={styles.title}>Select User Type</Text>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => {
            setUserType('driver');
            setShowSignIn(true);
          }}
        >
          <Text style={styles.buttonText}>Sign In as Driver</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => {
            setUserType('student');
            setShowSignIn(true);
          }}
        >
          <Text style={styles.buttonText}>Sign In as Student</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Authentication page
  if (showSignIn) {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/images/clg.png')} style={styles.logo} />
        <Text style={styles.title}>{isSignUp ? 'Sign Up' : 'Sign In'} as {userType}</Text>
        
        {error ? <Text style={styles.error}>{error}</Text> : null}
        
        {isSignUp && (
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            autoCapitalize="words"
            value={name}
            onChangeText={setName}
          />
        )}
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        
        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={isSignUp ? handleSignUp : handleSignIn}
          disabled={loading}
        >
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color="#ffffff" size="small" />
              <Text style={styles.buttonText}>Please wait...</Text>
            </View>
          ) : (
            <Text style={styles.buttonText}>
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.googleButton, loading && styles.buttonDisabled]} 
          onPress={handleGoogleSignIn}
          disabled={loading}
        >
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color="#1a1a1a" size="small" />
              <Text style={styles.googleButtonText}>Signing in...</Text>
            </View>
          ) : (
            <Text style={styles.googleButtonText}>Sign in with Google</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.switchButton} onPress={() => setIsSignUp(!isSignUp)}>
          <Text style={styles.switchButtonText}>
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.backButton} onPress={() => {
          setShowSignIn(false);
          setUserType(null);
        }}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f8',
    padding: 24,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 24,
    borderRadius: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#0057ff',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 12,
    width: 260,
    alignItems: 'center',
    elevation: Platform.OS === 'android' ? 2 : 0,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#e0e0e0',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
    width: 260,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButtonText: {
    color: '#1a1a1a',
    fontWeight: '600',
    fontSize: 16,
  },
  input: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#fff',
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    fontSize: 16,
  },
  error: {
    color: '#d32f2f',
    marginBottom: 12,
    fontSize: 14,
  },
  switchButton: {
    marginTop: 16,
  },
  switchButtonText: {
    color: '#0057ff',
    fontWeight: '600',
    fontSize: 15,
  },
  backButton: {
    marginTop: 16,
  },
  backButtonText: {
    color: '#888',
    fontSize: 15,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  forgotPasswordButton: {
    marginTop: 16,
  },
  forgotPasswordText: {
    color: '#0057ff',
    fontWeight: '600',
    fontSize: 15,
  },
});