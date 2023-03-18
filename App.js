import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { getData } from './Screen/AsyncStorage/Storage';

import Home from './Screen/CommonScreens/Home';
import EventHomeScreen from './Screen/EventPlan/EventHome';
import Detail from './Screen/UpdateToDoList';
import LoginScreen from "./Screen/Auth/Login";


const Stack = createStackNavigator()

export default function App() {

  const [Token] = useState(getData("token")  ? getData("token") : null);
  console.log("asdasd",Token._j);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>

        <Stack.Screen name='LoginScreen' component={Token._j == null ? LoginScreen : EventHomeScreen} /> 
        <Stack.Screen name='Home' component={EventHomeScreen} />   
        <Stack.Screen name='Detail'component={Detail} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

