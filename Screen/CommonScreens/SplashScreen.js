import React, { Component , useEffect , useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { getData } from '../AsyncStorage/Storage';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const  SplashScreen = ()=> {

  //const [Token, setToken] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    //setToken(AsyncStorage.getItem("token") !== null ? AsyncStorage.getItem("token") : null);
    
    setTimeout( async () => {
      console.log("Token", await AsyncStorage.getItem("token") == null ? "true" : "false");
        await AsyncStorage.getItem("token") == null 
        ? 
        navigation.navigate('LoginScreen') 
        :
        navigation.navigate('Home');
      }, 3000);
  }, [])

  
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.image}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 350,
    height: 350,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
});

export default SplashScreen;
