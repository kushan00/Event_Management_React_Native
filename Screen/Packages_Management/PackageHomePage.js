import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';





const PackageHomePage = () => {

    const navigation = useNavigation();

    const AddPackages = () => {
        navigation.navigate("AddPackages");
    }

    const ViewPackages = () => {
        navigation.navigate("ViewPackages");
    }

    return (

        <View style={styles.container}>
           
            <Text style={styles.title}>Package Home Page</Text>

            <Image
                source={require('../../assets/music.png')}
                style={styles.image}
            />

            <TouchableOpacity style={styles.button} onPress={AddPackages}>
                <Text style={styles.buttonText}>Add new package</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={ViewPackages}>
                <Text style={styles.buttonText}>View packages</Text>
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
        backgroundColor: '#6EB7C7',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        width: 200,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default PackageHomePage;