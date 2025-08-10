import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');
const SEAT_SIZE = (width - 80) / 7; // Increased spacing to accommodate gap

export default function SeatSelectionScreen() {
  const router = useRouter();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [availableSeats, setAvailableSeats] = useState({
    left: 2,
    right: 3
  });
  const [isAvailabilityModalVisible, setIsAvailabilityModalVisible] = useState(false);

  const renderSeats = () => {
    const seats = [];
    const totalRows = 6;
    const leftColumns = 2;
    const rightColumns = 3;

    for (let row = 0; row < totalRows; row++) {
      // Left side seats (2 columns)
      for (let col = 0; col < leftColumns; col++) {
        const seatIndex = row * (leftColumns + rightColumns + 1) + col;
        
        let seatStatus = row < 2 && availableSeats.left > 0 ? 'left' : 'unavailable';
        const isSelected = selectedSeats.includes(seatIndex);

        seats.push(
          <Pressable 
            key={`left-seat-${row}-${col}`}
            style={[
              styles.seat,
              seatStatus === 'left' && styles.leftSeat,
              seatStatus === 'unavailable' && styles.unavailableSeat,
              isSelected && styles.selectedSeat
            ]}
            onPress={() => handleSeatSelection(seatIndex, seatStatus)}
          >
            {isSelected && <Ionicons name="checkmark" size={16} color="white" />}
          </Pressable>
        );
      }

      // Spacer column
      seats.push(
        <View 
          key={`spacer-${row}`} 
          style={styles.spacerColumn}
        />
      );

      // Right side seats (3 columns)
      for (let col = 0; col < rightColumns; col++) {
        const seatIndex = row * (leftColumns + rightColumns + 1) + leftColumns + 1 + col;
        
        let seatStatus = row < 3 && availableSeats.right > 0 ? 'right' : 'unavailable';
        const isSelected = selectedSeats.includes(seatIndex);

        seats.push(
          <Pressable 
            key={`right-seat-${row}-${col}`}
            style={[
              styles.seat,
              seatStatus === 'right' && styles.rightSeat,
              seatStatus === 'unavailable' && styles.unavailableSeat,
              isSelected && styles.selectedSeat
            ]}
            onPress={() => handleSeatSelection(seatIndex, seatStatus)}
          >
            {isSelected && <Ionicons name="checkmark" size={16} color="white" />}
          </Pressable>
        );
      }
    }
    return seats;
  };

  const handleSeatSelection = (seatNumber: number, seatStatus: string) => {
    if (seatStatus === 'available') {
      setSelectedSeats(prev => 
        prev.includes(seatNumber) 
          ? prev.filter(seat => seat !== seatNumber)
          : [...prev, seatNumber]
      );
    }
  };

  const AvailabilityModal = () => {
    return (
      <Modal
        transparent={true}
        visible={isAvailabilityModalVisible}
        onRequestClose={() => setIsAvailabilityModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Set Available Seats</Text>
            
            <View style={styles.availabilityInputContainer}>
              <Text>Left Side Seats:</Text>
              <View style={styles.counterContainer}>
                <TouchableOpacity 
                  onPress={() => setAvailableSeats(prev => ({ ...prev, left: Math.max(0, prev.left - 1) }))}
                >
                  <Ionicons name="remove-circle" size={24} color="#EF4444" />
                </TouchableOpacity>
                <Text style={styles.counterText}>{availableSeats.left}</Text>
                <TouchableOpacity 
                  onPress={() => setAvailableSeats(prev => ({ ...prev, left: Math.min(2, prev.left + 1) }))}
                >
                  <Ionicons name="add-circle" size={24} color="#10B981" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.availabilityInputContainer}>
              <Text>Right Side Seats:</Text>
              <View style={styles.counterContainer}>
                <TouchableOpacity 
                  onPress={() => setAvailableSeats(prev => ({ ...prev, right: Math.max(0, prev.right - 1) }))}
                >
                  <Ionicons name="remove-circle" size={24} color="#EF4444" />
                </TouchableOpacity>
                <Text style={styles.counterText}>{availableSeats.right}</Text>
                <TouchableOpacity 
                  onPress={() => setAvailableSeats(prev => ({ ...prev, right: Math.min(3, prev.right + 1) }))}
                >
                  <Ionicons name="add-circle" size={24} color="#10B981" />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => setIsAvailabilityModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        
        <Text style={styles.headerTitle}>Select your seat</Text>
        
        <Pressable 
          style={styles.availabilityButton}
          onPress={() => setIsAvailabilityModalVisible(true)}
        >
          <Ionicons name="settings-outline" size={24} color="black" />
        </Pressable>
      </View>

      {/* Seat Availability Info */}
      <View style={styles.availabilityContainer}>
        <View style={styles.availabilitySection}>
          <Text style={styles.availabilityText}>Left Side</Text>
          <Text style={styles.availabilityCount}>{availableSeats.left} Seats</Text>
        </View>
        <View style={styles.availabilitySection}>
          <Text style={styles.availabilityText}>Right Side</Text>
          <Text style={styles.availabilityCount}>{availableSeats.right} Seats</Text>
        </View>
      </View>

      {/* Seat Layout */}
      <View style={styles.seatContainer}>
        {renderSeats()}
      </View>

      {/* Next Button */}
      <Pressable 
        style={styles.nextButton}
        onPress={() => {
          // Handle seat selection submission
          console.log('Selected Seats:', selectedSeats);
        }}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </Pressable>

      {/* Availability Modal */}
      <AvailabilityModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  availabilityButton: {
    padding: 10,
  },
  availabilityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  availabilitySection: {
    alignItems: 'center',
  },
  availabilityText: {
    color: '#6B7280',
    marginBottom: 5,
  },
  availabilityCount: {
    color: '#10B981',
    fontWeight: '600',
  },
  seatContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  seat: {
    width: SEAT_SIZE,
    height: SEAT_SIZE,
    backgroundColor: '#E5E7EB',
    margin: 5,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacerColumn: {
    width: SEAT_SIZE,
    height: SEAT_SIZE,
    margin: 5,
    backgroundColor: 'transparent',
  },
  leftSeat: {
    backgroundColor: '#EF4444', // Red for left side seats
  },
  rightSeat: {
    backgroundColor: '#3B82F6', // Blue for right side seats
  },
  unavailableSeat: {
    backgroundColor: '#E5E7EB', // Gray for unavailable seats
  },
  selectedSeat: {
    backgroundColor: '#10B981', // Green for selected seats
  },
  nextButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  nextButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  // Modal styles remain the same
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  availabilityInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  counterText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalCloseButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  modalCloseButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
});
