import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Alert ,TouchableOpacity, Text, ScrollView} from 'react-native';
import { firebase } from '../../config';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from "@react-native-picker/picker";

const AddGuestList = () => {
    //const  event  = route.params.event;
    
    const [guestName, setGuestName] = useState('');
    const [guestEmail, setGuestEmail] = useState('');
    const [guestMobileNumber, setGuestMobileNumber] = useState('');
    const [guestAge, setGuestAge] = useState('');
    const [guestNic, setGuestNic] = useState('');
    const [guestGender, setGuestGender] = useState("");

    const navigation = useNavigation();

    const handleSave = async () => {
        //console.log("event", event);
        try {
            await firebase.firestore().collection('guests').add({
                guestName,
                guestEmail,
                guestMobileNumber,
                guestAge,
                guestNic,
                guestGender,
                //EventId: event?.id,   
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
                {/* <TextInput
                placeholder="Guest Gender"
                value={guestGender}
                onChangeText={setGuestGender}
                style={styles.input}
                /> */}
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
        height: 50,
    },

    label: {
        marginRight: 10,
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
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
