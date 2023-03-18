import {FunctionComponent, useEffect, useState} from "react";
import {KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import { firebase ,auth} from '../../config';
import { useNavigation } from '@react-navigation/native';
import { getData, storeData } from '../AsyncStorage/Storage';

const  LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const userRef = firebase.firestore().collection('users');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation("Home")
            }
        })

        return unsubscribe
    }, [])

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

    const handleLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCrds => {
                const user = userCrds.user;
                console.log('Logged user: ', user);
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
                                navigation.navigate("Home");
                            }
                            else
                            {
                                alert("User Not Found");
                            }
                        })
                    })        
            })
            .catch(error => alert(error.message))
    };

    const addUser = (user) => {
    console.log("user",user.email);
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const data = {
        heading: {
            email: user.email,
            name:user.email.substring(0,email.length - 8)
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
             <Text style={{
        fontSize: 40,
        fontWeight: "600",
        textAlign: "center",
        color: "#000000",
        marginTop: "35%",
        marginBottom: "5%"
      }}>
        ToDo App
      </Text>
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
                    onPress={handleSignUp}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Register</Text>
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

