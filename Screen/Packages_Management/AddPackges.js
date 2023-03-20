import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Alert ,TouchableOpacity, Text} from 'react-native';
import { firebase } from '../../config';

const AddPackages = () => {
    const [packageName, setPackageName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleSave = async () => {
        try {
            await firebase.firestore().collection('packages').add({
                packageName,
                description,
                price,
            });
            Alert.alert('Success', 'Package details added successfully!');
            setPackageName('');
            setDescription('');
            setPrice('');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Package Name"
                value={packageName}
                onChangeText={setPackageName}
            />
            <TextInput
                style={styles.descriptionInput}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
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

export default AddPackages;
