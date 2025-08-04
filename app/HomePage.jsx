import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useAuth } from './context/AuthContext';

// List of unique bus stop locations
const BUS_STOP_LOCATIONS = [
    "Clock Tower",
    "Darshanlal Chowk",
    "Saharanpur Chowk",
    "ISBT",
    "Geu",
    "Asley Hall",
    "Matawala Bagh",
    "Daudwala",
    "Mathurawala",
    "Railway Station",
    "Bus Stand",
    "College Gate",
    "Market Square",
    "Hospital",
    "Police Station",
    "Post Office",
    "Bank",
    "School",
    "Temple",
    "Park",
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

const DRIVER_ICON = require('../assets/images/clg.png');
const BUS_ICON = require('../assets/images/pngfind.com-bus-image-png-6424101.png');

export default function HomePage() {
  const navigation = useNavigation();
  const { user, signOut } = useAuth();
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState(BUS_STOP_LOCATIONS);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);

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
    navigation.navigate('MapView', { selectedStop: location });
  };

  // Get bus and driver info for selected location
  const busData = selectedLocation ? BUS_STOP_DATA[selectedLocation] : null;

  // Handle Sign Out
  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  };

  return (
    <View style={styles.mainContainer}>
      {/* Header with Profile Button */}
      <View style={styles.header}>
        <Text style={styles.title}>Bus Tracker</Text>
        <TouchableOpacity 
          style={styles.profileButton} 
          onPress={() => setIsProfileModalVisible(true)}
        >
          <Text style={styles.profileButtonText}>
            {user?.name?.charAt(0).toUpperCase() || 'P'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollContainer} 
        contentContainerStyle={styles.container}
      >
        <Text style={styles.subtitle}>Welcome to your bus tracking dashboard</Text>
        
        {/* Removed navigation button to BusStopFinder */}
        
        <Text style={styles.sectionTitle}>Quick Search:</Text>
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
            <TouchableOpacity 
              style={styles.locationCard} 
              onPress={() => handleLocationPress(item)}
            >
              <Text style={styles.locationName}>{item}</Text>
            </TouchableOpacity>
          )}
          style={styles.suggestionsList}
        />
      </ScrollView>

      {/* Profile Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isProfileModalVisible}
        onRequestClose={() => setIsProfileModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Profile</Text>
            <Text style={styles.modalEmail}>{user?.email || 'No email'}</Text>
            <Text style={styles.modalName}>{user?.name || 'No name'}</Text>
            
            <TouchableOpacity 
              style={styles.signOutButton} 
              onPress={handleSignOut}
            >
              <Text style={styles.signOutButtonText}>Sign Out</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.closeModalButton}
              onPress={() => setIsProfileModalVisible(false)}
            >
              <Text style={styles.closeModalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {permissionStatus !== 'granted' && (
        <Text style={styles.permissionWarning}>
          Location permission is required to suggest the nearest stop.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f7f7f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0057ff',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0057ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 15,
    color: '#444',
    marginBottom: 18,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
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
  permissionWarning: {
    color: 'red',
    marginTop: 20,
    fontSize: 15,
    textAlign: 'center',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#0057ff'
  },
  modalEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10
  },
  modalName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333'
  },
  signOutButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center'
  },
  signOutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  closeModalButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center'
  },
  closeModalButtonText: {
    color: '#333',
    fontSize: 16
  }
}); 