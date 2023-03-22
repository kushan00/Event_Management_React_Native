import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Alert ,TouchableOpacity, Text, ScrollView} from 'react-native';
import { firebase } from '../../config';

const AddGuestList = ({navigation}) => {

    const [guestName, setGuestName] = useState('');
    const [guestEmail, setGuestEmail] = useState('');
    const [guestMobileNumber, setGuestMobileNumber] = useState('');
    const [guestAge, setGuestAge] = useState('');
    const [guestNic, setGuestNic] = useState('');
    const [guestGender, setGuestGender] = useState('');


    const handleSave = async () => {
        try {
            await firebase.firestore().collection('guests').add({
                guestName,
                guestEmail,
                guestMobileNumber,
                guestAge,
                guestNic,
                guestGender,
                // EventId,               
            });


            Alert.alert('Success', 'Guest details added successfully!');

            setGuestName('');
            setGuestEmail('');
            setGuestMobileNumber('');
            setGuestAge('');
            setGuestNic('');
            setGuestGender('');
            // setEventId('');

            navigation.navigate("PackageHomePage");
            
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <ScrollView>       
            <View style={styles.container}>
            <TextInput
                placeholder="Guest Name"
                value={guestName}
                onChangeText={setGuestName}
                style={styles.input}
                />
                <TextInput
                placeholder="Guest Email"
                value={guestEmail}
                onChangeText={setGuestEmail}
                style={styles.input}
                />
                <TextInput
                placeholder="Guest Mobile Number"
                value={guestMobileNumber}
                onChangeText={setGuestMobileNumber}
                style={styles.input}
                />
                <TextInput
                placeholder="Guest Age"
                value={guestAge}
                onChangeText={setGuestAge}
                style={styles.input}
                />
                <TextInput
                placeholder="Guest NIC"
                value={guestNic}
                onChangeText={setGuestNic}
                style={styles.input}
                />
                <TextInput
                placeholder="Guest Gender"
                value={guestGender}
                onChangeText={setGuestGender}
                style={styles.input}
                />
                {/* <Button title="Save" style={styles.button} onPress={handleSave} />
                <Button title="Back" style={styles.backbutton} onPress={handleSave} /> */}

                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>

            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 20,
        padding: 16,
      borderWidth: 3,
      borderColor: 'black',
      backgroundColor: 'white',
      borderRadius: 8,
      elevation: 4,
      marginTop: 10,
    },
    input: {
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 5,
        marginTop: 5,
        marginBottom: 16,
        backgroundColor: 'white',
        height: 80,
    },
    descriptionInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        marginTop: 40,
        marginBottom: 16,
        backgroundColor: 'white',
        height: 200,
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
       
});

export default AddGuestList;
