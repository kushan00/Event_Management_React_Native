import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { firebase } from "../../config";
import { useNavigation } from "@react-navigation/native";

const AddEvent = () => {
  const [eventName, setEventName] = useState("");
  const [venue, setVenue] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [eventType, setEventType] = useState("");

  const navigation = useNavigation();

  const handleAddEvent = () => {
    firebase
      .firestore()
      .collection("events")
      .add({
        eventName,
        venue,
        user_id: firebase.auth().currentUser.uid
          ? firebase.auth().currentUser.uid
          : "no user id",
        description,
        time, 
        date,
        eventType,
      })
      .then(
        () => console.log("Event successfully added!"),
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
          title="Add Event"
          onPress={handleAddEvent}
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

export default AddEvent;
