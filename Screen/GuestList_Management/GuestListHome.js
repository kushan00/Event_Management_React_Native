import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GuestListHome = ({route}) => {
    const  event  = route.params.event;
    const navigation = useNavigation();

    const AddGuests= () => {
        navigation.navigate("AddGuestList" , { event: event });
    }

    const ViewGuests = () => {
        navigation.navigate("ViewGuestList" , { event: event });
    }

    return (

        <View style={styles.container}>

            <ImageBackground

                source={require('../../assets/music01.png')}
                style={styles.container}

            >

                {/* <Text style={styles.title}>Guest Home Page</Text> */}

                {/* <Image
                source={require('../../assets/music.png')}
                style={styles.image}
            /> */}

                <TouchableOpacity style={styles.button} onPress={AddGuests}>
                    <Text style={styles.buttonText}>Add Guest</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={ViewGuests}>
                    <Text style={styles.buttonText}>View Guests</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#B4CCCC',
        backgroundImage: 'url(../../assets/music01.png)',
        width: '100%',
    },
    image: {
        width: 400,
        height: 400,
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
