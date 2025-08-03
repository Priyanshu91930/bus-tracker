import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { testConnection } from './config/appwrite';
import { useAuth } from './context/AuthContext';

export default function LoginPage() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('');
  
  const { signIn, signUp, signInWithGoogle, loading, clearError } = useAuth();
  const navigation = useNavigation();

  // Test Appwrite connection
  const handleTestConnection = async () => {
    setConnectionStatus('Testing connection...');
    const result = await testConnection();
    if (result.success) {
      setConnectionStatus('✅ Connected to Appwrite!');
      setError('');
    } else {
      setConnectionStatus('❌ Connection failed: ' + result.error);
      setError(result.error);
    }
  };

  // Handle email/password sign in
  const handleSignIn = async () => {
    clearError();
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    const result = await signIn(email, password);
    if (result.success) {
      navigation.navigate('Home');
    } else {
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

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    const result = await signUp(email, password, name);
    if (result.success) {
      navigation.navigate('Home');
    } else {
      setError(result.error || 'Sign up failed');
    }
  };

  // Handle Google sign in
  const handleGoogleSignIn = async () => {
    clearError();
    const result = await signInWithGoogle();
    if (result.success) {
      navigation.navigate('Home');
    } else {
      setError(result.error || 'Google sign in failed');
    }
  };

  if (showSignIn) {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/images/clg.png')} style={styles.logo} />
        <Text style={styles.title}>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>
        
        {/* Connection Test Button */}
        <TouchableOpacity style={styles.testButton} onPress={handleTestConnection}>
          <Text style={styles.testButtonText}>Test Appwrite Connection</Text>
        </TouchableOpacity>
        
        {connectionStatus ? (
          <Text style={[styles.statusText, connectionStatus.includes('✅') ? styles.successText : styles.errorText]}>
            {connectionStatus}
          </Text>
        ) : null}
        
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
          <Text style={styles.buttonText}>
            {loading ? 'Please wait...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.googleButton, loading && styles.buttonDisabled]} 
          onPress={handleGoogleSignIn}
          disabled={loading}
        >
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.switchButton} onPress={() => setIsSignUp(!isSignUp)}>
          <Text style={styles.switchButtonText}>
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.backButton} onPress={() => setShowSignIn(false)}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/clg.png')} style={styles.logo} />
      <Text style={styles.title}>Sign in</Text>
      
      {/* Connection Test Button */}
      <TouchableOpacity style={styles.testButton} onPress={handleTestConnection}>
        <Text style={styles.testButtonText}>Test Appwrite Connection</Text>
      </TouchableOpacity>
      
      {connectionStatus ? (
        <Text style={[styles.statusText, connectionStatus.includes('✅') ? styles.successText : styles.errorText]}>
          {connectionStatus}
        </Text>
      ) : null}
      
      <TouchableOpacity style={styles.button} onPress={() => setShowSignIn(true)}>
        <Text style={styles.buttonText}>Sign in as Student</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setShowSignIn(true)}>
        <Text style={styles.buttonText}>Sign in as Driver</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {/* TEMPORARY: Go to HomePage button */}
      <TouchableOpacity style={[styles.button, { backgroundColor: '#888' }]} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Go to HomePage</Text>
      </TouchableOpacity>
    </View>
  );
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
  testButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
    width: 260,
    alignItems: 'center',
  },
  testButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  statusText: {
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  successText: {
    color: '#28a745',
  },
  errorText: {
    color: '#dc3545',
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
});