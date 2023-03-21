import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { firebase } from "../../config";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

const UpdateEvent = ({ route }) => {
  const  event  = route.params.event;
  const [eventName, setEventName] = useState(event.eventName);
  const [venue, setVenue] = useState(event.venue);
  const [description, setDescription] = useState(event.description);
  const [time, setTime] = useState(event.time);
  const [date, setDate] = useState(event.date);
  const [eventType, setEventType] = useState(event.eventType);

  console.log("event data");
  console.log(route);
  console.log("event data 2");
  console.log(event.eventName);

  const navigation = useNavigation();

  const handleUpdateEvent = () => {
    firebase
      .firestore()
      .collection("events")
      .doc(event.id)
      .update({
        eventName,
        venue,
        description,
        time,
        date,
        eventType,
      })
      .then(
        () => console.log("Event successfully updated!"),
        navigation.navigate("Home")
      )
      .catch((error) => console.log(error));
  };

  const cancel = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Event Name"
        onChangeText={(text) => setEventName(text)}
        value={eventName}
      />
      <TextInput
        style={styles.input}
        placeholder="Venue"
        onChangeText={(text) => setVenue(text)}
        value={venue}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        onChangeText={(text) => setDescription(text)}
        value={description}
      />
      <TextInput
        style={styles.input}
        placeholder="Time"
        onChangeText={(text) => setTime(text)}
        value={time}
      />
      <TextInput
        style={styles.input}
        placeholder="Date"
        onChangeText={(text) => setDate(text)}
        value={date}
      />
      <Picker
        style={styles.input}
        selectedValue={eventType}
        onValueChange={(itemValue) => setEventType(itemValue)}
      >
        <Picker.Item label="Select Event Type" value="" />
        <Picker.Item label="Concert" value="Concert" />
        <Picker.Item label="Sporting Event" value="Sporting Event" />
        <Picker.Item label="Conference" value="Conference" />
        <Picker.Item label="Party" value="Party" />
      </Picker>
      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={cancel} style={styles.button} />
        <Button
          title="Update Event"
          onPress={handleUpdateEvent}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "90%",
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  buttonContainer: {
    width: "40%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    marginLeft: 8,
    backgroundColor: "#6EB7C7",
  },
});

export default UpdateEvent;
