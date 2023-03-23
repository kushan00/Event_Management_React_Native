import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ImageBackground
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../config";
import "firebase/firestore";
import { IconButton } from "react-native-paper";

// const events = [
//     { id: 1, title: 'Event 1', date: 'April 1, 2023' },
//     { id: 2, title: 'Event 2', date: 'April 15, 2023' },
//     { id: 3, title: 'Event 3', date: 'May 1, 2023' },
//     { id: 4, title: 'Event 4', date: 'May 15, 2023' },
//     { id: 5, title: 'Event 5', date: 'June 1, 2023' },
//     { id: 6, title: 'Event 6', date: 'June 15, 2023' },
//     { id: 7, title: 'Event 7', date: 'July 1, 2023' },
//     { id: 8, title: 'Event 8', date: 'July 15, 2023' },
//     { id: 9, title: 'Event 9', date: 'August 1, 2023' },
//     { id: 10, title: 'Event 10', date: 'August 15, 2023' },
//     { id: 11, title: 'Event 11', date: 'April 1, 2023' },
//     { id: 12, title: 'Event 12', date: 'April 15, 2023' },
//     { id: 13, title: 'Event 13', date: 'May 1, 2023' },
//     { id: 14, title: 'Event 14', date: 'May 15, 2023' },
//     { id: 15, title: 'Event 15', date: 'June 1, 2023' },
//     { id: 16, title: 'Event 16', date: 'June 15, 2023' },
//     { id: 17, title: 'Event 17', date: 'July 1, 2023' },
//     { id: 18, title: 'Event 18', date: 'July 15, 2023' },
//     { id: 19, title: 'Event 19', date: 'August 1, 2023' },
//     { id: 20, title: 'Event 20', date: 'August 15, 2023' },
//   ];

// Define the Firebase Firestore collection where the events data is stored
const eventsCollection = firebase.firestore().collection("events");

const EventHomeScreen = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigation = useNavigation();

  //Load event data from firebase firestore
  useEffect(() => {
    const unsubscribe = eventsCollection.onSnapshot((snapshot) => {
      const eventList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventList);
    });
    return unsubscribe;
  }, []);

  const invitationViewPage = () => {
    navigation.navigate("InvitationHome");
  };

  const GuestListHome = () => {
    navigation.navigate("GuestListHome");
  };
  const PackageHomePage = () => {
    navigation.navigate("PackageHomePage");
  };

  const handleEventPress = (event) => {
    setSelectedEvent(event);
    //navigation.navigate('EventDetails', { event });
    // navigation.navigate("AddEvents");
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      Alert.alert(
        `Delete ${selectedEvent.eventName}`,
        `Are you sure you want to delete ${selectedEvent.eventName}?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              await eventsCollection.doc(selectedEvent.id).delete();
              setSelectedEvent(null);
            },
          },
        ]
      );
    }
  };

  //update the selected event
  const handleUpdateEvent = () => {
    if (selectedEvent) {
      setSelectedEvent(selectedEvent);
      console.log(selectedEvent);
      navigation.navigate("UpdateEvent", { event: selectedEvent });
      setSelectedEvent(null);
    }
  };

  const addEvent = () => {
    navigation.navigate("AddEvents");
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity
        onPress={addEvent}
        style={styles.addButton}
      >
        <Text style={{ color: 'white' }}>Add Event</Text>
      </TouchableOpacity>
      <View style={styles.eventContainer}>
        <ImageBackground

          source={require('../../assets/music01.png')}
          style={styles.container}

        >
          <ScrollView>

            {events.length == 0 ?
              <View style={styles.event2}>
                <Text style={styles.eventTitle2}>No Events</Text>
              </View>
              :
              events.map((event) => (
                <View
                  key={event.id}
                  style={[
                    styles.event,
                    selectedEvent && selectedEvent.id === event.id
                      ? styles.selectedEvent
                      : null,
                  ]}
                  onTouchEnd={() => handleEventPress(event)}
                >
                  <Text style={styles.eventTitle}>{event.eventName}</Text>
                  <Text style={styles.eventDate}>{event.date}</Text>
                  <View style={styles.eventExpanded}>
                    <Text>More details about the event</Text>
                  </View>
                  <View style={styles.buttonContainer}>
                    <IconButton
                      icon="delete"
                      color="red"
                      size={24}
                      onPress={handleDeleteEvent}
                    />
                    <IconButton
                      icon="pencil"
                      color="blue"
                      size={24}
                      onPress={() => {
                        setSelectedEvent(event);
                        handleUpdateEvent();
                      }}
                    />
                  </View>
                  <View style={styles.eventButtons}>
                    <TouchableOpacity style={styles.eventButton1} onPress={invitationViewPage}>
                      <Text style={{ color: 'white' }}>Invitation</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={PackageHomePage}
                      style={styles.eventButton2}
                    >
                      <Text style={{ color: 'white' }}>Packages</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={GuestListHome}
                      style={styles.eventButton3}
                    >
                      <Text style={{ color: 'white' }}>Guests</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
          </ScrollView>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    top: 50,
  },
  mainContainer: {
    flex: 1,
    top: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  eventContainer: {
    // backgroundColor: "#AD91D9",
    padding: 20,
    //margin: 20,
    // borderRadius: 5,
    // borderWidth: 1,
    borderColor: "black",
    height: 650,
    marginTop: -50,

  },
  eventTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  eventDetails: {
    marginBottom: 10,
  },
  eventExpanded: {
    backgroundColor: "#eee",
    padding: 10,
    marginTop: 10,
  },
  eventButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  eventButton1: {
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 2,
    alignItems: "center",
    flex: 1,
    borderWidth: 1,
    borderColor: 'white',
  },
  eventButton2: {
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 2,
    alignItems: "center",
    flex: 1,
    borderWidth: 1,
    borderColor: 'white',
  },
  eventButton3: {
    // backgroundColor: "#18f541",
    // padding: 10,
    // borderRadius: 10,
    // flex: 1,
    // marginHorizontal: 2,
    // alignItems: "center",
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 2,
    alignItems: "center",
    flex: 1,
    borderWidth: 1,
    borderColor: 'white',
  },
  addButton: {
    marginTop: 10,
    // backgroundColor: "#AB87FF",
    borderRadius: 10,
    marginHorizontal: 2,
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 2,
    alignItems: "center",
    borderWidth: 1,
    borderColor: 'white',
  },
  event: {
    margin: 20,
    padding: 5,
    backgroundColor: "#F4EEF9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  event2: {
    padding: 100,
  },
  eventTitle2: {
    fontWeight: "bold",
    fontSize: 20,
    // color: "white",
  },
  selectedEvent: {
    backgroundColor: "#B27BDB",
    margin: 20,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
});

export default EventHomeScreen;
