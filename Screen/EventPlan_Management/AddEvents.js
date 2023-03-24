import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { firebase } from "../../config";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddEvent = () => {
  const [eventName, setEventName] = useState("");
  const [venue, setVenue] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [eventType, setEventType] = useState("");

  const navigation = useNavigation();

  const handleAddEvent = async () => {
    console.log("UID : ", await AsyncStorage.getItem("uid"));
    firebase
      .firestore()
      .collection("events")
      .add({
        eventName,
        venue,
        user_id:
          (await AsyncStorage.getItem("uid")) != null
            ? await AsyncStorage.getItem("uid")
            : "no user id",
        description,
        time,
        date,
        eventType,
      })
      .then(() => {
        console.log("Event successfully added!");
        alert("Event successfully added!");
        navigation.navigate("Home");
      })
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
        <TouchableOpacity style={styles.cancelButton} onPress={cancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddEvent}
        >
          <Text style={styles.buttonText}>Add Event</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  addButton: {
    backgroundColor: "#6EB7C7",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default AddEvent;
