import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet,TouchableOpacity,Alert} from 'react-native';
import { firebase } from '../../config';

const MoreDetails = () => {
    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [eventName, setEventName] = useState('');
    const [requiredDetail, setRequiredDetail] = useState('');

    const handleSave = async () => {
        try {
            await firebase.firestore().collection('moredetails').add({
                name,
                mobileNumber,
                eventName,
                requiredDetail,
            });
            Alert.alert('Success', 'Inquiry successfull');
            setName('');
            setMobileNumber('');
            setEventName('');
            setRequiredDetail('');

        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
             <Text style={styles.topic}>Package inquiry</Text>
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
                style={styles.input}
                value={mobileNumber}
                onChangeText={setMobileNumber}
            />
            <Text style={styles.label}>Event Name</Text>
            <TextInput
                style={styles.input}
                value={eventName}
                onChangeText={setEventName}
            />
            <Text style={styles.label}>Your Inquiry</Text>
            <TextInput
                style={styles.detailInput}
                value={requiredDetail}
                onChangeText={setRequiredDetail}
            />

            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>

        </View>
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
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
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
        height: 60,
    },

    detailInput: {
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 5,
        marginTop: 5,
        marginBottom: 16,
        backgroundColor: 'white',
        height: 100,
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

    topic: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
        marginBottom: 10,
        width: 300,
        alignItems: 'center',
        marginLeft: 80,

        },
});

export default MoreDetails;
