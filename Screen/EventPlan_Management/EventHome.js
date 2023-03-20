import React, { useState } from 'react';
import { View, Text,ScrollView, TouchableOpacity, StyleSheet , Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const events = [
    { id: 1, title: 'Event 1', date: 'April 1, 2023' },
    { id: 2, title: 'Event 2', date: 'April 15, 2023' },
    { id: 3, title: 'Event 3', date: 'May 1, 2023' },
    { id: 4, title: 'Event 4', date: 'May 15, 2023' },
    { id: 5, title: 'Event 5', date: 'June 1, 2023' },
    { id: 6, title: 'Event 6', date: 'June 15, 2023' },
    { id: 7, title: 'Event 7', date: 'July 1, 2023' },
    { id: 8, title: 'Event 8', date: 'July 15, 2023' },
    { id: 9, title: 'Event 9', date: 'August 1, 2023' },
    { id: 10, title: 'Event 10', date: 'August 15, 2023' },
    { id: 11, title: 'Event 11', date: 'April 1, 2023' },
    { id: 12, title: 'Event 12', date: 'April 15, 2023' },
    { id: 13, title: 'Event 13', date: 'May 1, 2023' },
    { id: 14, title: 'Event 14', date: 'May 15, 2023' },
    { id: 15, title: 'Event 15', date: 'June 1, 2023' },
    { id: 16, title: 'Event 16', date: 'June 15, 2023' },
    { id: 17, title: 'Event 17', date: 'July 1, 2023' },
    { id: 18, title: 'Event 18', date: 'July 15, 2023' },
    { id: 19, title: 'Event 19', date: 'August 1, 2023' },
    { id: 20, title: 'Event 20', date: 'August 15, 2023' },
  ];



const EventHomeScreen = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const navigation = useNavigation();

    const packageViewPage = ()=>{
      navigation.navigate("ViewPackages");
    }

    const guestListViewPage = ()=>{
      navigation.navigate("ViewGuestList");
    }

    const handleEventPress = (event) => {
      setSelectedEvent(event);
      //navigation.navigate('EventDetails', { event });
    };

  return (
    <View style={styles.container}>
    <View style={styles.eventContainer}>
      <ScrollView>
        {events.map((event) => (
          <TouchableOpacity
            key={event.id}
            style={[
              styles.event,
              selectedEvent && selectedEvent.id === event.id ? styles.selectedEvent : null,
            ]}
            onPress={() => handleEventPress(event)}
          >
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventDate}>{event.date}</Text>
            <View style={styles.eventExpanded}>
                <Text>More details about the event</Text>
            </View>
            <View style={styles.eventButtons}>
                <TouchableOpacity style={styles.eventButton1}>
                <Text>Invitation</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={packageViewPage} style={styles.eventButton2}>
                <Text>Packages</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={guestListViewPage} style={styles.eventButton3}>
                <Text>Guests</Text>
                </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
          top:50
        },
        mainContainer: {
            flex: 1,
            top: 70,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5FCFF',
        },
        eventContainer: {
            backgroundColor: '#fff',
            padding: 20,
            margin: 20,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#ccc',
            height:600,
        },
        eventTitle: {
            fontWeight: 'bold',
            fontSize: 18,
            marginBottom: 10,
        },
        eventDetails: {
            marginBottom: 10,
        },
        eventExpanded: {
            backgroundColor: '#f2f2f2',
            padding: 10,
            marginTop: 10,
        },
        eventButtons: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
        },
        eventButton1: {
            backgroundColor: '#f1f518',
            padding: 10,
            borderRadius: 10,
            flex: 1,
            marginHorizontal: 2,
            alignItems: 'center',
        },
        eventButton2: {
            backgroundColor: '#f518ed',
            padding: 10,
            borderRadius: 10,
            flex: 1,
            marginHorizontal: 2,
            alignItems: 'center',
        },
        eventButton3: {
            backgroundColor: '#18f541',
            padding: 10,
            borderRadius: 10,
            flex: 1,
            marginHorizontal: 2,
            alignItems: 'center',
        },
        event:{
            margin:20,
            padding:5,
        },
        selectedEvent:{
            backgroundColor:'#a7e8fc',
            margin:20,
            padding:5,
        }
});

export default EventHomeScreen;
