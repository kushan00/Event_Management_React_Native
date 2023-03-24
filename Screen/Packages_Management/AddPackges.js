import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Alert, TouchableOpacity, Text } from 'react-native';
import { firebase } from '../../config';
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

const AddPackages = () => {
    const [packageName, setPackageName] = useState('');
    const [packageDescription, setPackageDescription] = useState('');
    const [packagePrice, setPackagePrice] = useState('');
    //const [eventPackage, setEventPackage] = useState("");


    const navigation = useNavigation();

    const handleSave = async () => {
        try {
            await firebase.firestore().collection('packages').add({
                packageName,
                packageDescription,
                packagePrice,
            });
            Alert.alert('Success', 'Package details added successfully!');
            setPackageName('');
            setPackageDescription('');
            setPackagePrice('');

            navigation.navigate("PackageHomePage");
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (

        <View style={styles.container}>
            <Text style={styles.newpackage}>New Package Deatils</Text>
            <Text>Enter Package Type</Text>
            {/* <TextInput
                style={styles.input}
                placeholder="Package Name"
                value={packageName}
                onChangeText={setPackageName}
            /> */}
            <Picker
                style={styles.input}
                selectedValue={packageName}
                onValueChange={(itemValue) => setPackageName(itemValue)}
            >
                {/* <Picker.Item label="Select Package Type" value="" /> */}

                <Picker.Item label="Select Package Type" value="" />
                <Picker.Item label="Jwellery and Dressing package" value="Jwellery and Dressing package" />
                <Picker.Item label="Food and beverages package" value="Food and beverages package" />
                <Picker.Item label="Music package" value="Music package" />
                <Picker.Item label="Dancing groups package" value="Dancing Groups package" />
                <Picker.Item label="Decoration package" value="Conference" />
                <Picker.Item label="Games package" value="Games package" />
                <Picker.Item label="Photography package" value="Photography package" />
                <Picker.Item label="Catering package" value="Catering package" />
                <Picker.Item label="Venue package" value="Venue package" />
                <Picker.Item label="Magician and Comedians package" value="Magician and Comedians package" />
                <Picker.Item label="Other" value="Other" />
            </Picker>
            <Text>Enter Package Description</Text>
            <TextInput
                style={styles.descriptionInput}
                placeholder="Description"
                value={packageDescription}
                onChangeText={setPackageDescription}
            />
            <Text>Enter Package Price</Text>
            <TextInput
                style={styles.input}
                placeholder="Price"
                keyboardType="numeric"
                value={packagePrice}
                onChangeText={setPackagePrice}
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
        padding: 16,
        borderWidth: 3,
        borderColor: 'black',
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 4,
        marginTop: 30,
        marginTop: 60,

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
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        marginTop: 5,
        marginBottom: 12,
        backgroundColor: 'white',
        height: 200,
    },
    button: {
        backgroundColor: '#AD91D9',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        width: 300,
        alignItems: 'center',
        marginLeft: 18,
        borderWidth: 1,
        borderColor: 'black',

    },

    newpackage: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
        marginBottom: 10,
        width: 300,
        alignItems: 'center',
        marginLeft: 55,

    },

});

export default AddPackages;
