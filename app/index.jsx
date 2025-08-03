import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import clgLogo from '../assets/images/clg.png';
import shapeBg1 from '../assets/images/Ellipse 18.png';
import shapeBg2 from '../assets/images/Ellipse 19.png';
import shapeBg3 from '../assets/images/Ellipse 20.png';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const phoneWidth = Math.min(screenWidth * 0.9, 360);
const phoneHeight = Math.min(screenHeight * 0.95, 800);

const CARD_ASPECT_RATIO = 320 / 370; // width/height, adjust to match your main card PNG
const CARD_WIDTH = phoneWidth * 0.92;
const CARD_HEIGHT = CARD_WIDTH / CARD_ASPECT_RATIO;
const CARD_TOP = (phoneHeight - CARD_HEIGHT) / 2;
const CARD_LEFT = (phoneWidth - CARD_WIDTH) / 2;

const SHADOW_WIDTH = CARD_WIDTH * 1.04;
const SHADOW_HEIGHT = CARD_HEIGHT * 1.04;
const SHADOW_TOP = CARD_TOP - (SHADOW_HEIGHT - CARD_HEIGHT) / 2 + 8;
const SHADOW_LEFT = CARD_LEFT - (SHADOW_WIDTH - CARD_WIDTH) / 2 + 2;

const FLOAT_WIDTH = CARD_WIDTH * 0.32;
const FLOAT_TOP = CARD_TOP - FLOAT_WIDTH * 0.25;
const FLOAT_LEFT = CARD_LEFT + CARD_WIDTH - FLOAT_WIDTH * 0.4;

// Splash Content Component
const SplashContent = () => {
  return (
    <View style={styles.contentContainer}>
      <Image source={clgLogo} style={styles.clgLogo} resizeMode="contain" />
      <Text style={styles.title}>
        BUS TRACKER
      </Text>
    </View>
  );
};

// Main Splash Screen Component
const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.phoneContainer}>
        <View style={[styles.backgroundContainer, styles.shapeClipper]}>
          {/* Main card shadow (Ellipse 18) */}
          <Image source={shapeBg1} style={{ position: 'absolute', top: 123, left: 0, width: '100%', height: '69%', zIndex: -4 }} resizeMode="stretch" />
          {/* Main card (Ellipse 19) */}
          <Image source={shapeBg2} style={{ position: 'absolute', top: 175, left: 0, width: '100%', height: '52%', zIndex: 1 }} resizeMode="stretch" />
          {/* Floating shape (Ellipse 20) */}
          <Image source={shapeBg3} style={{ position: 'absolute', top: 20.352, left: 284.256, width: 99.36, height: 99.36, zIndex: 3 }} resizeMode="contain" />
        </View>
        {/* <Image source={busImage} style={styles.busImage} resizeMode="contain" /> */}
        <View style={styles.centerContent}>
          <SplashContent />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0c4a6e', // changed from #f5f5f5 to blue
  },
  phoneContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#0c4a6e',
    borderRadius: 0,
    borderWidth: 0,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    overflow: 'hidden',
    position: 'relative',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  shapeClipper: {
    borderRadius: 0,
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  },
  decorativeShape1: {
    position: 'absolute',
    top: '30%',
    left: '5%',
    right: '5%',
    height: '25%',
    backgroundColor: 'white',
    borderRadius: 50,
    opacity: 0.9,
    transform: [{ rotate: '-15deg' }],
  },
  decorativeShape2: {
    position: 'absolute',
    top: '20%',
    left: '10%',
    right: '10%',
    height: '35%',
    backgroundColor: '#eeeeee',
    borderRadius: 60,
    opacity: 0.8,
    transform: [{ rotate: '10deg' }],
  },
  decorativeShape3: {
    position: 'absolute',
    top: '15%',
    right: '20%',
    width: 80,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 40,
    opacity: 0.9,
  },
  centerContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    transform: [{ rotate: '0deg' }],
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logo: {
    width: screenWidth > 400 ? 186 : screenWidth > 350 ? 160 : 140,
    height: screenWidth > 400 ? 81 : screenWidth > 350 ? 70 : 60,
  },
  title: {
    fontSize: screenWidth > 400 ? 24 : screenWidth > 350 ? 24 : 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    letterSpacing: 0,
    lineHeight: screenWidth > 400 ? 28 : screenWidth > 350 ? 28 : 22,
    paddingHorizontal: screenWidth <= 350 ? 20 : 0,
    fontFamily: 'System', // Use system font as fallback for Montserrat
    marginTop: 0,
  },
  clgLogo: {
    width: screenWidth > 400 ? 120 : screenWidth > 350 ? 100 : 80,
    height: screenWidth > 400 ? 120 : screenWidth > 350 ? 100 : 80,
    marginBottom: 16,
    alignSelf: 'center',
    marginTop: 0,
  },
  busImage: {
    position: 'absolute',
    width: 150,
    height: 180,
    top: 80, // adjust as needed
    left: 50, // adjust as needed
    zIndex: 200,
  },
  cardShadow: {
    position: 'absolute',
    top: '7%',
    left: '2%',
    width: '96%',
    height: '86%',
    zIndex: 1,
  },
  cardMain: {
    position: 'absolute',
    top: '10%',
    left: '5%',
    width: '90%',
    height: '80%',
    zIndex: 2,
  },
  floatingShape: {
    position: 'absolute',
    top: '2%',
    right: '5%',
    width: '22%',
    height: undefined,
    aspectRatio: 1,
    zIndex: 3,
  },
});

export default SplashScreen;
