import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Alert ,TouchableOpacity, Text, ScrollView} from 'react-native';
import { firebase } from '../../config';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddGuestList = ({route}) => {
    const  event  = route.params.event;
    
    const [guestName, setGuestName] = useState('');
    const [guestEmail, setGuestEmail] = useState('');
    const [guestMobileNumber, setGuestMobileNumber] = useState('');
    const [guestAge, setGuestAge] = useState('');
    const [guestNic, setGuestNic] = useState('');
    const [guestGender, setGuestGender] = useState('');

    const navigation = useNavigation();

    const handleSave = async () => {
        console.log("event", event);
        try {
            await firebase.firestore().collection('guests').add({
                guestName,
                guestEmail,
                guestMobileNumber,
                guestAge,
                guestNic,
                guestGender,
                EventId: event?.id,   
                user_id: await AsyncStorage.getItem("uid") != null
                ? await AsyncStorage.getItem("uid")
                : "no user id",            
            });


            Alert.alert('Success', 'Guest details added successfully!');

            setGuestName('');
            setGuestEmail('');
            setGuestMobileNumber('');
            setGuestAge('');
            setGuestNic('');
            setGuestGender('');

            navigation.navigate("Home");
            
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
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        marginTop: 40,
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
        width: 350,
        alignItems: 'center',
        marginLeft: 10,
        },
       
});

export default AddGuestList;
