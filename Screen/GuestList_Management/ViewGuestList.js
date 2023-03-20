import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, View ,ScrollView} from 'react-native';
import { Button, IconButton, Text, TextInput } from 'react-native-paper';
import { firebase } from '../../config';
import 'firebase/firestore';

// Define the Firebase Firestore collection where the guests data is stored
const guestsCollection = firebase.firestore().collection('guests');

const ViewGuestList = () => {
  const [guests, setGuests] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestMobileNumber, setGuestMobileNumber] = useState('');
  const [guestAge, setGuestAge] = useState('');
  const [guestNic, setGuestNic] = useState('');
  const [guestGender, setGuestGender] = useState('');

  // Load the guests data from Firestore on component mount
  useEffect(() => {
    const unsubscribe = guestsCollection.onSnapshot((snapshot) => {
      const guestList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setGuests(guestList);
    });
    return unsubscribe;
  }, []);

  // Delete the selected guest from Firestore and reset the selected guests state
const handleDeleteGuest = () => {
  if (selectedGuest) {
    Alert.alert(
      `Delete ${selectedGuest.guestName}`,
      `Are you sure you want to delete ${selectedGuest.guestName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await guestsCollection.doc(selectedGuest.id).delete();
            setSelectedGuest(null);
          },
        },
      ]
    );
  }
};


  // Update the selected guest with the new values in Firestore and reset the selected guest state
  const handleUpdateGuest = async () => {
    if (selectedGuest) {
      await guestsCollection.doc(selectedGuest.id).update({
        guestName,
        guestEmail,
        guestMobileNumber,
        guestAge,
        guestNic,
        guestGender,
  
      });
      setModalVisible(false);
      setSelectedGuest(null);
      Alert.alert('Guest updated successfully');
    }
  };

  // Define the styles for the components
  const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    packageBox: {
      backgroundColor: '#6EB7C7',
      padding: 10,
      marginBottom: 16,
      borderRadius: 8,
      elevation: 4,
      marginTop: 46,
    },
    packageName: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    packageDescription: {
      fontSize: 16,
      marginBottom: 8,
    },
    packagePrice: {
      fontSize: 18,
      fontWeight: 'bold',
      // textAlign: 'right',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 16,
    },
    button: {
      marginLeft: 8,
      backgroundColor: '#6EB7C7',
    },
    modalContainer: {
      backgroundColor: '#AFB4B4',
      padding: 16,
      borderRadius: 8,
      elevation: 4,
      marginTop: 90,
      alignContent: 'center',
      
     
    },
    input: {
      marginBottom: 16,
      backgroundColor: 'white',
      height: 80,
    },
    descriptionInput: {
      marginBottom: 16,
      backgroundColor: 'white',
      height: 250,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView>
      {guests.map((guest) => (
        <View
          key={guest.id}
          style={styles.packageBox}
          onTouchEnd={() => setSelectedGuest(guest)}
        >
          <Text style={styles.packageName}>{guest.guestName}</Text>
          <Text style={styles.packageDescription}>{guest.guestEmail}</Text>
          <Text style={styles.packagePrice}>Rs. {guest.guestMobileNumber}</Text>
          <Text style={styles.packageName}>{guest.guestAge}</Text>
          <Text style={styles.packageDescription}>{guest.guestNic}</Text>
          <Text style={styles.packagePrice}>Rs. {guest.guestGender}</Text>

          <View style={styles.buttonContainer}>
            <IconButton
              icon="delete"
              color="red"
              size={24}
              onPress={() => setSelectedGuest(guest)}
            />
            <IconButton
              icon="pencil"
              color="blue"
              size={24}
              onPress={() => {
                setSelectedGuest(guest);
                setGuestName(guest.guestName);
                setGuestEmail(guest.guestEmail);
                setGuestMobileNumber(guest.guestMobileNumber);
                setGuestAge(guest.guestAge);
                setGuestNic(guest.guestNic);
                setGuestGender(guest.guestGender);               
                setModalVisible(true);
              }}
            />
          </View>
        </View>
      ))}
      </ScrollView>
      <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
      <ScrollView>
        <View style={styles.modalContainer}>
          <Text style={styles.guestName}>{selectedGuest?.guestName}</Text>
          {/* <Text style={styles.packageDescription}>{selectedPackage?.packageDescription}</Text>
          <Text style={styles.packagePrice}> {selectedPackage?.packagePrice}</Text> */}
          <TextInput
            label="Guest Name"
            value={guestName}
            onChangeText={setGuestName}
            style={styles.input}
          />
            <TextInput
            label="Guest Email"
            value={guestEmail}
            onChangeText={setGuestEmail}
            style={styles.input}
            />
            <TextInput
            label="Guest Mobile Number"
            value={guestMobileNumber}
            onChangeText={setGuestMobileNumber}
            style={styles.input}
            />
            <TextInput
            label="Guest Age"
            value={guestAge}
            onChangeText={setGuestAge}
            style={styles.input}
            />
            <TextInput
            label="Guest NIC"
            value={guestNic}
            onChangeText={setGuestNic}
            style={styles.input}
            />
            <TextInput
            label="Guest Gender"
            value={guestGender}
            onChangeText={setGuestGender}
            style={styles.input}
            />

          <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={() => setModalVisible(false)} style={styles.button}>
              Cancel
            </Button>
            <Button mode="contained" onPress={handleUpdateGuest} style={styles.button}>
              Update
            </Button>
          </View>
        </View>
        </ScrollView>
      </Modal>
      <Button mode="contained" icon="plus" onPress={() => setModalVisible(true)} style={{ position: 'absolute', bottom: 30, right: 30, top: 30 }}>
        Add Guest
      </Button>
      {/* <IconButton
        icon="delete"
        color="red"
        size={24}
        // disabled={!selectedGuest}
        onPress={handleDeleteGuest}
        style={{ position: 'absolute', bottom: 16, right: 16 }}
      /> */}
    </View>
  );
};

export default ViewGuestList;

