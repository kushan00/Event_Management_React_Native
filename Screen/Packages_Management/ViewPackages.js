import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, View ,ScrollView} from 'react-native';
import { Button, IconButton, Text, TextInput } from 'react-native-paper';
import { firebase } from '../../config';
import 'firebase/firestore';

// Define the Firebase Firestore collection where the packages data is stored
const packagesCollection = firebase.firestore().collection('packages');

const ViewPackages = () => {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [packageName, setPackageName] = useState('');
  const [packageDescription, setPackageDescription] = useState('');
  const [packagePrice, setPackagePrice] = useState('');

  // Load the packages data from Firestore on component mount
  useEffect(() => {
    const unsubscribe = packagesCollection.onSnapshot((snapshot) => {
      const newPackages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPackages(newPackages);
    });
    return unsubscribe;
  }, []);

  

  // Delete the selected package from Firestore and reset the selectedPackage state
const handleDeletePackage = () => {
  if (selectedPackage) {
    Alert.alert(
      `Delete ${selectedPackage.packageName}`,
      `Are you sure you want to delete ${selectedPackage.packageName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await packagesCollection.doc(selectedPackage.id).delete();
            setSelectedPackage(null);
          },
        },
      ]
    );
  }
};


  // Update the selected package with the new values in Firestore and reset the selectedPackage state
  const handleUpdatePackage = async () => {
    if (selectedPackage) {
      await packagesCollection.doc(selectedPackage.id).update({
        packageName,
        packageDescription,
        packagePrice,
      });
      setModalVisible(false);
      setSelectedPackage(null);
      Alert.alert('Package updated successfully');
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
      {packages.map((pkg) => (
        <View
          key={pkg.id}
          style={styles.packageBox}
          onTouchEnd={() => setSelectedPackage(pkg)}
        >
          <Text style={styles.packageName}>{pkg.packageName}</Text>
          <Text style={styles.packageDescription}>{pkg.packageDescription}</Text>
          <Text style={styles.packagePrice}>Rs. {pkg.packagePrice}</Text>
          <View style={styles.buttonContainer}>
            <IconButton
              icon="delete"
              color="red"
              size={24}
              onPress={() => setSelectedPackage(pkg)}
            />
            <IconButton
              icon="pencil"
              color="blue"
              size={24}
              onPress={() => {
                setSelectedPackage(pkg);
                setPackageName(pkg.packageName);
                setPackageDescription(pkg.packageDescription);
                setPackagePrice(pkg.packagePrice);
                setModalVisible(true);
              }}
            />
          </View>
        </View>
      ))}
      </ScrollView>
      <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.packageName}>{selectedPackage?.packageName}</Text>
          {/* <Text style={styles.packageDescription}>{selectedPackage?.packageDescription}</Text>
          <Text style={styles.packagePrice}> {selectedPackage?.packagePrice}</Text> */}
          <TextInput
            label="Package Name"
            value={packageName}
            onChangeText={setPackageName}
            style={styles.input}
          />
          <TextInput
            label="Package Description"
            value={packageDescription}
            onChangeText={setPackageDescription}
            style={styles.descriptionInput}
          />
          <TextInput
            label="Package Price"
            value={packagePrice}
            onChangeText={setPackagePrice}
            keyboardType="numeric"
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={() => setModalVisible(false)} style={styles.button}>
              Cancel
            </Button>
            <Button mode="contained" onPress={handleUpdatePackage} style={styles.button}>
              Update
            </Button>
          </View>
        </View>
      </Modal>
      {/* <Button mode="contained" icon="plus" onPress={() => setModalVisible(true)} style={{ position: 'absolute', bottom: 30, right: 30 }}>
        Add Package
      </Button> */}
      {/* <IconButton
        icon="delete"
        color="red"
        size={24}
        // disabled={!selectedPackage}
        onPress={handleDeletePackage}
        style={{ position: 'absolute', bottom: 16, right: 16 }}
      /> */}
    </View>
  );
};

export default ViewPackages;

