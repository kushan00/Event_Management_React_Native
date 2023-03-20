import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { removeData } from './Screen/AsyncStorage/Storage';
import { useNavigation } from '@react-navigation/native';

//screens

import SplashScreen from './Screen/CommonScreens/SplashScreen';
import EventHomeScreen from './Screen/EventPlan_Management/EventHome';
import Detail from './Screen/UpdateToDoList';
import LoginScreen from "./Screen/Auth/Login";
import RegisterScreen from './Screen/Auth/Register';

//packages management
import PackageHomePage from './Screen/Packages_Management/PackageHomePage';

import AddPackages from './Screen/Packages_Management/AddPackges.js';

import ViewPackages from './Screen/Packages_Management/ViewPackages';




const Stack = createStackNavigator()

export default function App() {


  // const signOut = async (navigation ) => {
  //   await removeData("token");
  //   navigation.navigate('LoginScreen');
  // }

  const EventHeader = ({ navigation }) => {
    return (
      <View style={styles.appBar}>
        <Image source={require('./assets/favicon.png')} style={styles.logo} />
        <Text style={styles.appName}>Event Planner</Text>
        <TouchableOpacity style={styles.signOutButton} onPress={() => {
          removeData("token");
          // navigation.navigate('LoginScreen');
        }}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // const ViewPackegesHeader = ({navigation}) => {
  //   return (
  //     <View style={styles.appBar}>
  //       <Image source={require('./assets/favicon.png')} style={styles.logo} />
  //       <Text style={styles.appName}>Event Planner</Text>
  //       <TouchableOpacity style={styles.signOutButton} onPress={()=>{
  //         removeData("token");
  //         // navigation.navigate('LoginScreen');
  //       }}>
  //         <Text style={styles.signOutButtonText}>Sign Out</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Spalsh" >
        <Stack.Screen name='Spalsh' component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name='RegisterScreen' component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Home' component={EventHomeScreen} options={{ header: () => <EventHeader /> }} />
        <Stack.Screen name='Detail' component={Detail} />

        <Stack.Screen name='PackageHomePage' component={PackageHomePage} options={{ headerShown: true, title: "Package Home " }} />
        <Stack.Screen name='ViewPackages' component={ViewPackages} options={{ headerShown: true, title: "Packages View" }} />
        <Stack.Screen name='AddPackages' component={AddPackages} options={{ headerShown: true, title: "Add Packages" }} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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

});

