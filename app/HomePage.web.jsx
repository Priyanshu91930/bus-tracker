import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import UserProfile from './components/UserProfile';

// Web-specific version without react-native-maps
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// List of unique bus stop locations
const BUS_STOP_LOCATIONS = [
    "Clock Tower" ,
    "Darshanlal Chowk",
    "Saharanpur Chowk",
    "ISBT",
    "Geu",
    "Asley Hall",
    "Matawala Bagh",
    "Daudwala",
    "Mathurawala",
    "Vishnupuram",
    "Bangali Kothi",
    "Kargi Chowk",
    "Raipur Chowk",
    "Dobhal Chowk",
    "6 No. Pulia",
    "Ring Road",
    "Post Office Nehru Gram",
    "Jogiwala",
    "Rispana",
    "Gehu",
    "Ranipokhri",
    "Doiwala",
    "Lachiwala",
    "Kuanwala",
    "Harawala",
    "Miawala",
    "Mokampur",
    "Gujraunwala",
    "Hathibadkala",
    "Garhi Cant",
    "Vijay Coloney",
    "Chir Bagh",
    "CM House",
    "ONGC Chowk",
    "Ballupur Chowk",
    "GMS Road",
    "Rajender Nagar",
    "Yamuna Coloney",
    "Bindal Pul",
    "Kishan Nagar",
    "Blood Bank",
    "Supply",
    "IT Park",
    "Nala Paani Chowk",
    "Shastdhara Crossing",
    "Ladpur",
    "Fountain Chowk",
    "Nehru Colony",
    "Nakrounda More",
    "Mokampur",
    "Kulhal",
    "VikasNagar",
    "Tehsil",
    "Harbatpur Chowk",
    "Langa Road",
    "Shaspur",
    "Selaqui",
    "Sudhowala",
    "Nanda Ki Chowki",
    "Premnagar",
    "Panditwari",
    "Vasant Vihar",
    "Baliwala Chowk",
    "Badowala",
    "Telpur",
    "Mehuwala",
    "Race Course",
    "Dharampur",
    "Mata Mandir",
    "Araghar",
    "Survey Chowk",
    "Dwarka Store",
    "Nanni Bakery",
    "Dilaram Bazar",
    "Great Value",
    "Prem Nagar",
    "Balliwalachowk"
];

// Mock data: Map bus stop to a bus number and driver location (for demo)
const BUS_STOP_DATA = {
  "Clock Tower": { busNumber: 18, driverLocation: { latitude: 30.3256, longitude: 78.0437 } },
  "Darshanlal Chowk": { busNumber: 24, driverLocation: { latitude: 30.3242, longitude: 78.0431 } },
  "Saharanpur Chowk": { busNumber: 42, driverLocation: { latitude: 30.3200, longitude: 78.0400 } },
  "ISBT": { busNumber: 11, driverLocation: { latitude: 30.3150, longitude: 78.0320 } },
  "Geu": { busNumber: 9, driverLocation: { latitude: 30.3100, longitude: 78.0300 } },
};

export default function HomePage() {
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState(BUS_STOP_LOCATIONS);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Request location permission on mount
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionStatus(status);
    })();
  }, []);

  // Update suggestions as user types
  useEffect(() => {
    if (input === '') {
      setSuggestions(BUS_STOP_LOCATIONS);
    } else {
      setSuggestions(
        BUS_STOP_LOCATIONS.filter(stop =>
          stop.toLowerCase().includes(input.toLowerCase())
        )
      );
    }
  }, [input]);

  const handleLocationPress = (location) => {
    setSelectedLocation(location);
  };

  // Get bus and driver info for selected location
  const busData = selectedLocation ? BUS_STOP_DATA[selectedLocation] : null;

  // Helper for Google Maps iframe URL
  const getGoogleMapsEmbedUrl = (lat, lng) =>
    `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  return (
    <View style={styles.mainContainer}>
      <UserProfile />
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
        <Text style={styles.title}>Find Your Bus Stop</Text>
        <Text style={styles.subtitle}>Enter your stop location below. Suggestions will appear as you type. Tap a location to view it on the map.</Text>
        <TextInput
          placeholder="Type your stop..."
          value={input}
          onChangeText={setInput}
          style={styles.input}
          placeholderTextColor="#888"
        />
        <Text style={styles.suggestionsTitle}>Location Suggestions:</Text>
        <FlatList
          data={suggestions}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.locationCard} onPress={() => handleLocationPress(item)}>
              <Text style={styles.locationName}>{item}</Text>
            </TouchableOpacity>
          )}
          style={styles.suggestionsList}
        />
        {selectedLocation && busData && (
          <View style={styles.mapContainer}>
            <View style={styles.mapHeader}>
              <View style={{ flex: 1 }} />
              <View style={styles.driverInfo}>
                <Text style={styles.busNumberText}>Bus #{busData.busNumber}</Text>
              </View>
            </View>
            <View style={styles.webMapWrapper}>
              <iframe
                title="Bus Location Map"
                width="100%"
                height="220"
                frameBorder="0"
                style={{ border: 0, borderRadius: 16 }}
                src={getGoogleMapsEmbedUrl(busData.driverLocation.latitude, busData.driverLocation.longitude)}
                allowFullScreen
              />
            </View>
          </View>
        )}
        {permissionStatus !== 'granted' && (
          <Text style={styles.permissionWarning}>
            Location permission is required to suggest the nearest stop.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f7f7f8',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f7f7f8',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0057ff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#444',
    marginBottom: 18,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    backgroundColor: '#fff',
    fontSize: 17,
    color: '#222',
  },
  suggestionsTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 17,
    color: '#222',
  },
  suggestionsList: {
    marginBottom: 10,
  },
  locationCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  locationName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0057ff',
    marginBottom: 4,
  },
  mapContainer: {
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  mapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f7f7f8',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  busNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0057ff',
  },
  webMapWrapper: {
    width: '100%',
    height: 220,
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#eee',
    marginBottom: 0,
  },
  permissionWarning: {
    color: 'red',
    marginTop: 20,
    fontSize: 15,
    textAlign: 'center',
  },
}); 