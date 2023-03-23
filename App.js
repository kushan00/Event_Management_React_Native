import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { removeData } from './Screen/AsyncStorage/Storage';
import { useNavigation } from '@react-navigation/native';

//screens

import SplashScreen from './Screen/CommonScreens/SplashScreen';
import EventHomeScreen from './Screen/EventPlan_Management/EventHome';
//import Detail from './Screen/UpdateToDoList';
import LoginScreen from "./Screen/Auth/Login";
import RegisterScreen from './Screen/Auth/Register';

//packages management
import PackageHomePage from './Screen/Packages_Management/PackageHomePage';

import AddPackages from './Screen/Packages_Management/AddPackges.js';

import ViewPackages from './Screen/Packages_Management/ViewPackages';

import MoreDetails from './Screen/Packages_Management/MoreDetails';


//guest list management
import ViewGuestList from './Screen/GuestList_Management/ViewGuestList';
import GuestListHome from './Screen/GuestList_Management/GuestListHome';
import AddGuestList from './Screen/GuestList_Management/AddGuestList';

//event management
import AddEvents from './Screen/EventPlan_Management/AddEvents';
import UpdateEvent from './Screen/EventPlan_Management/UpdateEvent';
import InvitationHome from './Screen/Invitation_Management/InvitaionHome';
import AddInvitation from './Screen/Invitation_Management/AddInvitation';
import UpdateInvitation from './Screen/Invitation_Management/UpdateInvitation';

const Stack = createStackNavigator()

export default function App() {


  // const signOut = async (navigation ) => {
  //   await removeData("token");
  //   navigation.navigate('LoginScreen');
  // }

  const EventHeader = ({ navigation }) => {
    return (
      <View style={styles.appBar}>
        <Image source={require('./assets/logo-bgremove.png')} style={styles.logo} />
        <Text style={styles.appName}>Event-Mate Planning</Text>
        <TouchableOpacity style={styles.signOutButton} onPress={() => {
          removeData("token");
          removeData("uid");
          //navigation.navigate('LoginScreen');
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

        {/* <Stack.Screen name='Detail' component={Detail} /> */}

        <Stack.Screen name='PackageHomePage' component={PackageHomePage} options={{ header: () => <EventHeader /> }} />
        <Stack.Screen name='ViewPackages' component={ViewPackages}  options={{ header: () => <EventHeader /> }}  />
        <Stack.Screen name='AddPackages' component={AddPackages} options={{ header: () => <EventHeader /> }} />
        <Stack.Screen name='MoreDetails' component={MoreDetails} options={{ headerShown: true, title: "More Details" }} />


        {/* <Stack.Screen name='ViewPackages'component={ViewPackages} options={{ headerShown: true , title:"Packages Home" }}/> */}

        <Stack.Screen name='ViewGuestList'component={ViewGuestList} options={{ headerShown: true , title:"Guest List Home" }}/>
        <Stack.Screen name='GuestListHome'component={GuestListHome} options={{ headerShown: true , title:"Guest List Home" }}/>
        <Stack.Screen name='AddGuestList'component={AddGuestList} options={{ headerShown: true , title:"Add Guest List" }}/>

        <Stack.Screen name='Home' component={EventHomeScreen} options={{ header: () => <EventHeader /> }} />
        <Stack.Screen name='AddEvents'component={AddEvents} options={{ headerShown: true , title:"Add Events" }}/>
        <Stack.Screen name='UpdateEvent'component={UpdateEvent} options={{ headerShown: true , title:"Update Events" }}/>

        <Stack.Screen name='InvitationHome' component={InvitationHome} options={{ headerShown: true , title:"My Invitations" }} />
        <Stack.Screen name='AddInvitation'component={AddInvitation} options={{ headerShown: true , title:"Add Invitation" }}/>
        <Stack.Screen name='UpdateInvitation'component={UpdateInvitation} options={{ headerShown: true , title:"Update Invitation" }}/>

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
    backgroundColor: '#CFC9E1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    //borderWidth: 1,
    height: 56,
    top: 50
  },
  logo: {
    width: 100,
    height: 50,
    marginLeft: -25,
  },
  appName: {
    color: '#5B1655',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 28,
    
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

