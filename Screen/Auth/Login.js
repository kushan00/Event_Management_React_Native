import { useState} from "react";
import {KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View , Image} from "react-native";
import { firebase ,auth} from '../../config';
import { useNavigation } from '@react-navigation/native';
import { storeData } from '../AsyncStorage/Storage';

const  LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const userRef = firebase.firestore().collection('users');

 
    const handleRegisterPage = () => {
        navigation.navigate("RegisterScreen");
    }

    const handleLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCrds => {
                const user = userCrds.user;
                console.log('Logged user: ', user?.uid);
                userRef
                    .orderBy('createdAt', 'desc')
                    .onSnapshot( 
                        querySnapshot => {
                        querySnapshot.forEach((doc) => {
                            const {heading} = doc.data()
                            const user2 = heading;
                            console.log("user details",user2.email , user?.email);
                            if(user2.email == user?.email)
                            {
                                storeData("token", user?.email);
                                storeData("uid",user?.uid);
                                navigation.navigate("Home");
                            }
                        })
                    })        
            })
            .catch(error => alert(error.message))
    };




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
                    onPress={handleLogin}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleRegisterPage}                  
                >
                    <Text style={styles.buttonOutlineText}>Dont  have an account? Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
        );
}

export default LoginScreen;

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
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    }
});

