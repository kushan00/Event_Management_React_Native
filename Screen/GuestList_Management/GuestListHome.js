import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GuestListHome = () => {

    const navigation = useNavigation();

    const AddGuests= () => {
        navigation.navigate("AddGuestList");
    }

    const ViewGuests = () => {
        navigation.navigate("ViewGuestList");
    }

    return (

        <View style={styles.container}>
           
            <Text style={styles.title}>Guest Home Page</Text>

            <Image
                source={require('../../assets/music.png')}
                style={styles.image}
            />

            <TouchableOpacity style={styles.button} onPress={AddGuests}>
                <Text style={styles.buttonText}>Add Guest</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={ViewGuests}>
                <Text style={styles.buttonText}>View Guests</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B4CCCC',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'black',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        width: 250,
        borderWidth: 1,
        borderColor: 'white',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default GuestListHome;
