import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, ImageBackground, View ,ScrollView, TouchableOpacity} from 'react-native';
import { Button, IconButton, Text, TextInput } from 'react-native-paper';
import { firebase } from '../../config';
import { Picker } from "@react-native-picker/picker";
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
      Alert.alert('Guest details updated successfully!');
    }
  };

  // Define the styles for the components
  const styles = StyleSheet.create({
    container: {
      padding: 16,
      borderWidth: 3,
      borderColor: 'black',
      backgroundColor: 'white',
      borderRadius: 8,
      elevation: 4,
    },
    guestListBox: {
      backgroundColor: '#CFC9E1',
      padding: 10,
      marginBottom: 16,
      borderRadius: 8,
      borderColor: 'black',
      borderWidth: 1,
      elevation: 4,
    },
    guestListBoxselected: {
      backgroundColor: 'pink',
      padding: 10,
      marginBottom: 16,
      borderRadius: 8,
      borderColor: 'black',
      borderWidth: 1,
      elevation: 4,
    },
    fieldContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    fieldLabel: {
      width: 100,
      fontWeight: 'bold',
    },
    guestData: {
      flex: 1,
      marginLeft: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 16,
    },
    button: {
      backgroundColor: '#6EB7C7',
      borderRadius: 10,
      padding: 10,
      marginBottom: 20,
      width: 300,
      alignItems: 'center',
      marginLeft: 18,
      borderWidth: 1,
      borderColor: 'black',
    },
    modalContainer: {
      margin: 16,
      backgroundColor: 'white',
      padding: 16,
      borderRadius: 8,
      elevation: 4,
      marginTop: 20,
      borderWidth: 3,
      borderColor: 'black',
      alignContent: 'center',
    },

    label: {
      marginRight: 10,
      fontSize: 12,
      fontWeight: 'bold',
      color: '#333',
    },

    input: {
      borderWidth: 2,
      borderColor: '#ccc',
      borderRadius: 5,
      marginBottom: 5,
      marginTop: 5,
      marginBottom: 16,
      backgroundColor: 'white',
      height: 50,
    },
    descriptionInput: {
      marginBottom: 16,
      backgroundColor: 'white',
      height: 250,
    },
    updateheader: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
    }
  });

  return (
    <View style={styles.container}>
        <ImageBackground

source={require('../../assets/music01.png')}
style={styles.container}

>
      <ScrollView>
      {guests.map((guest) => (
        <View
          key={guest.id}
          style={[styles.guestListBox,            
              selectedGuest && selectedGuest.guestName == guest.guestName  ?  styles.guestListBoxselected : null]}
          onTouchEnd={() => setSelectedGuest(guest)}
        >
         <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Name:</Text>
          <Text style={styles.guestData}>{guest.guestName}</Text>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Email:</Text>
          <Text style={styles.guestData}>{guest.guestEmail}</Text>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Mobile Number:</Text>
          <Text style={styles.guestData}>{guest.guestMobileNumber}</Text>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Age:</Text>
          <Text style={styles.guestData}>{guest.guestAge}</Text>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>NIC:</Text>
          <Text style={styles.guestData}>{guest.guestNic}</Text>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Gender:</Text>
          <Text style={styles.guestData}>{guest.guestGender}</Text>
        </View>

          <View style={styles.buttonContainer}>
            <IconButton
              icon="delete"
              color="red"
              size={24}
              onPress={handleDeleteGuest}
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
          <Text style={styles.updateheader}>Edit {selectedGuest?.guestName}</Text>
          {/* <TextInput
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
            /> */}

            <Text style={styles.label}>Name:</Text>
            <TextInput
                placeholder="Name"
                value={guestName}
                onChangeText={setGuestName}
                style={styles.input}
                />
                <Text style={styles.label}>Email</Text>
                <TextInput
                placeholder="Email"
                value={guestEmail}
                onChangeText={setGuestEmail}
                style={styles.input}
                />
                <Text style={styles.label}>Mobile Number</Text>
                <TextInput
                placeholder="Mobile Number"
                value={guestMobileNumber}
                onChangeText={setGuestMobileNumber}
                keyboardType='numeric'
                style={styles.input}
                />
                <Text style={styles.label}>Age</Text>
                <TextInput
                placeholder="Age"
                value={guestAge}
                keyboardType='numeric'
                onChangeText={setGuestAge}
                style={styles.input}
                />
                <Text style={styles.label}>NIC</Text>
                <TextInput
                placeholder="NIC"
                value={guestNic}
                onChangeText={setGuestNic}
                style={styles.input}
                />         

            <Picker
            style={styles.input}
            selectedValue={guestGender}
            onValueChange={(itemValue) => setGuestGender(itemValue)}
            >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Other" value="Other" />

            </Picker>

          {/* <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={() => setModalVisible(false)} style={styles.button}>
              Cancel
            </Button>
            <Button mode="contained" onPress={handleUpdateGuest} style={styles.button}>
              Update
            </Button>
          </View> */}

            <TouchableOpacity style={styles.button} onPress={handleUpdateGuest}>
                <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>


        </View>
        
        </ScrollView>
        
      </Modal>
      {/* <Button mode="contained" icon="plus" onPress={() => setModalVisible(true)} style={{ position: 'absolute', bottom: 30, right: 30, top: 30 }}>
        Add Guest
      </Button> */}
      {/* <IconButton
        icon="delete"
        color="red"
        size={24}
        // disabled={!selectedGuest}
        onPress={handleDeleteGuest}
        style={{ position: 'absolute', bottom: 16, right: 16 }}
      /> */}
      </ImageBackground>
    </View>
  );
};

export default ViewGuestList;

