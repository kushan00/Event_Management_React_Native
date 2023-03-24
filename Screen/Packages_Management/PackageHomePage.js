import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PackageDetails from './PackageDetails';



const PackageHomePage = () => {

    const navigation = useNavigation();

    const AddPackages = () => {
        navigation.navigate("AddPackages");
    }

    const ViewPackages = () => {
        navigation.navigate("ViewPackages");
    }

    const PackageDetails = () => {
        navigation.navigate("PackageDetails");
    }

    const ViewPayment = () => {
        navigation.navigate("ViewPayment");
    }


    // const EventHeader = ({ navigation }) => {
    //     return (
    //       <View style={styles.appBar}>
    //         <Image source={require('../../assets/logo.png')} style={styles.logo} />
    //         <Text style={styles.appName}>Event Planner</Text>
    //         <TouchableOpacity style={styles.signOutButton} onPress={() => {
    //           removeData("token");
    //           // navigation.navigate('LoginScreen');
    //         }}>
    //           <Text style={styles.signOutButtonText}>Sign Out</Text>
    //         </TouchableOpacity>
    //       </View>
    //     );
    //   };

    return (

        <View style={styles.container} >
            <ImageBackground

                source={require('../../assets/music01.png')}
                style={styles.container}

            >
                {/* <Text style={styles.title}>ENTERTAINMENT PACKAGES</Text> */}

                {/* <Image
                    source={require('../../assets/music.png')}
                    style={styles.image}
                /> */}

                <TouchableOpacity style={styles.button} onPress={AddPackages}>
                    <Text style={styles.buttonText}>Add new package details</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={ViewPackages}>
                    <Text style={styles.buttonText}>View packages detials</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={PackageDetails}>
                    <Text style={styles.buttonText}>Add Payment Details</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={ViewPayment}>
                    <Text style={styles.buttonText}>View Payment Details</Text>
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

    appBar: {
        backgroundColor: '#4285F4',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 56,
        top: 50
    },
    logo: {
        width: 24,
        height: 24,
    },
    appName: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 16,
    },
    signOutButton: {
        backgroundColor: '#DB4437',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    signOutButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    signOutButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },

    image: {
        width: 400,
        height: 400,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 50,
        color: 'white',
        fontFamily: 'sans-serif',
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
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default PackageHomePage;
