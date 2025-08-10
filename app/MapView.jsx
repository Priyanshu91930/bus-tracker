import { useNavigation, useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import {
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

// Bus stop location data
const BUS_STOP_DATA = {
  "Clock Tower": { 
    busNumber: 18, 
    driverLocation: { latitude: 30.3256, longitude: 78.0437 },
    description: "Central location in the city"
  },
  "Darshanlal Chowk": { 
    busNumber: 24, 
    driverLocation: { latitude: 30.3242, longitude: 78.0431 },
    description: "Busy intersection near market area"
  },
  "Saharanpur Chowk": { 
    busNumber: 42, 
    driverLocation: { latitude: 30.3200, longitude: 78.0400 },
    description: "Major bus stop on Saharanpur road"
  },
  "ISBT": { 
    busNumber: 11, 
    driverLocation: { latitude: 30.3150, longitude: 78.0320 },
    description: "Inter-State Bus Terminal"
  },
  "Geu": { 
    busNumber: 9, 
    driverLocation: { latitude: 30.3100, longitude: 78.0300 },
    description: "Near educational institution"
  }
};

const BUS_ICON = require('../assets/images/pngfind.com-bus-image-png-6424101.png');
const USER_ICON = require('../assets/images/clg.png');

export default function MapView() {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedStop } = route.params || { selectedStop: 'Unknown Location' };
  
  // State for user's location
  const [userLocation, setUserLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);

  // Get bus stop details
  const busStopDetails = BUS_STOP_DATA[selectedStop] || {
    busNumber: 'N/A',
    driverLocation: { latitude: 30.3753, longitude: 77.7821 },
    description: 'Location details not available'
  };

  // Request location permission and get current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status);

      if (status === 'granted') {
        try {
          let location = await Location.getCurrentPositionAsync({});
          setUserLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          });
        } catch (error) {
          console.error('Error getting location:', error);
        }
      }
    })();
  }, []);

  // Helper for Google Maps iframe URL
  const getGoogleMapsEmbedUrl = (userLat, userLng, stopLat, stopLng) =>
    `https://maps.google.com/maps?q=${userLat},${userLng}+to+${stopLat},${stopLng}&z=13&output=embed`;

  const handleGetDirections = () => {
    if (userLocation) {
      const { latitude: userLat, longitude: userLng } = userLocation;
      const { latitude: stopLat, longitude: stopLng } = busStopDetails.driverLocation;
      const url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${stopLat},${stopLng}`;
      window.open(url, '_blank');
    } else {
      alert('Please enable location permissions to get directions.');
    }
  };

  const handleViewBusRoutes = () => {
    // TODO: Implement view bus routes functionality
    alert('Bus routes feature coming soon!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Map View</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Location Details */}
      <View style={styles.locationContainer}>
        <Text style={styles.locationTitle}>{selectedStop}</Text>
        <Text style={styles.locationDescription}>
          {busStopDetails.description}
        </Text>
        <View style={styles.busInfoContainer}>
          <Image source={BUS_ICON} style={styles.busIcon} />
          <Text style={styles.busNumberText}>Bus #{busStopDetails.busNumber}</Text>
        </View>
      </View>

      {/* Map Container */}
      <View style={styles.mapContainer}>
        <View style={styles.webMapWrapper}>
          {userLocation ? (
            <iframe
              title="Bus Location Map"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0, borderRadius: 16 }}
              src={getGoogleMapsEmbedUrl(
                userLocation.latitude, 
                userLocation.longitude,
                busStopDetails.driverLocation.latitude, 
                busStopDetails.driverLocation.longitude
              )}
              allowFullScreen
            />
          ) : (
            <View style={styles.locationPlaceholder}>
              <Text style={styles.locationPlaceholderText}>
                {locationPermission === 'granted' 
                  ? 'Loading location...' 
                  : 'Location permissions required'}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleGetDirections}
        >
          <Text style={styles.actionButtonText}>Get Directions</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.secondaryButton]}
          onPress={handleViewBusRoutes}
        >
          <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>
            View Bus Routes
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#ffffff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  backButtonText: {
    fontSize: 16,
    color: '#0057ff',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 60,
  },
  locationContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f8f9fa',
  },
  locationTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0057ff',
    marginBottom: 8,
  },
  locationDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  busInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  busIcon: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  busNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  mapContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  webMapWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
  },
  locationPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  locationPlaceholderText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  actionContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#0057ff',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#0057ff',
  },
  secondaryButtonText: {
    color: '#0057ff',
  },
}); 