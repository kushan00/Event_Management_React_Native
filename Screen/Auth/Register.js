import {FunctionComponent, useEffect, useState} from "react";
import {KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View , Image} from "react-native";
import { firebase ,auth} from '../../config';
import { useNavigation } from '@react-navigation/native';
import { getData, storeData } from '../AsyncStorage/Storage';

const  RegisterScreen = () => {

    const [email, setEmail] = useState('');
    const [name, setname] = useState('');
    const [mobile, setmobile] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const userRef = firebase.firestore().collection('users');

    const handleLoginPage = ()=>{
        navigation.navigate("LoginScreen");
    }

    const handleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCreds => {
                const user = userCreds.user;
                addUser(user);
                //console.log('ed with: ', user?.email);
            })
            .catch(error => alert(error.message))
    }


    const addUser = (user) => {
    console.log("user",user.email);
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const data = {
        heading: {
            email: user.email,
            name: name,
            mobile: mobile
        },
        createdAt: timestamp
    };
    userRef
        .add(data)
        .then(() => {
            // release keyboard              
            alert("New User Register Successfully ");
            navigation.navigate("LoginScreen");
        })
        .catch((error) => {
            // show an alert in case of error
            alert(error);
        })
    }


    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={'padding'}
        >
        <Image source={require('../../assets/logo-bgremove.png')} style={{
            width: 200,
            height: 200,
        }} />
            <View
                style={styles.inputContainer}
            >
                
                <TextInput
                    placeholder={'Name'}
                    style={styles.input}
                    value={name}
                    onChangeText={text => setname(text)}
                ></TextInput>
                <TextInput
                    placeholder={'Mobile'}
                    style={styles.input}
                    value={mobile}                
                    onChangeText={text => setmobile(text)}
                ></TextInput>
                <TextInput
                    placeholder={'Email'}
                    style={styles.input}
                    value={email}
                    onChangeText={text => setEmail(text)}
                ></TextInput>
                <TextInput
                    placeholder={'Password'}
                    style={styles.input}
                    value={password}
                    onChangeText={pwd => setPassword(pwd)}
                    secureTextEntry
                ></TextInput>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleSignUp}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText2}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleLoginPage}               
                >
                    <Text style={styles.buttonOutlineText}>Already have an account? Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
        );
}

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 20,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#000000',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: '#000000',
        marginTop: 5,
        borderColor: '#000000',
        borderWidth: 1,
    },
    buttonOutlineText: {
        top:40,
        color: 'black',
        fontWeight: '700',
        fontSize: 16,
        
    },
    buttonOutlineText2: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
        
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    }
});

