import { Picker } from "@react-native-picker/picker";
import React, { useState , useEffect} from "react";
import { View, Text, StyleSheet, TextInput, Button ,ScrollView , TouchableOpacity} from "react-native";
import { firebase } from "../../config";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';


const guestsCollection = firebase.firestore().collection('guests');

const AddInvitation = ({route}) => {
  const  event  = route.params.event;

  const [invitationTitle, setinvitationTitle] = useState("");
  const [invitationDescription, setinvitationDescription] = useState("");
  const [invitationDate, setinvitationDate] = useState("");
  const [invitationTime, setinvitationTime] = useState("");
  const [invitationLocation, setinvitationLocation] = useState("");
  const [invitationType, setinvitationType] = useState("");
  const [invitationStatus, setinvitationStatus] = useState("");
  const [selectedGuest, setselectedGuest] = useState("Select Guest");

  const navigation = useNavigation();

  const [guests, setGuests] = useState([]);

  useEffect(() => {
    const unsubscribe = guestsCollection.onSnapshot((snapshot) => {
      const guestList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setGuests(guestList);
    });
    return unsubscribe;
  }, []);

  const handleAddInvitation = async () => {
    console.log("UID : ", await AsyncStorage.getItem("uid"));
    console.log("event", event?.id);
    firebase
      .firestore()
      .collection("invitations")
      .add({
        invitationTitle,
        invitationDescription,
        invitationDate,
        invitationTime,
        invitationLocation,
        invitationType,
        invitationStatus:false,
        selectedGuest,
        eventID:event?.id,
        user_id: await AsyncStorage.getItem("uid") != null
          ? await AsyncStorage.getItem("uid")
          : "no user id",
      })
      .then(
        () => { 
          console.log("Invitation successfully added!");
          alert("Invitation successfully added!");
          navigation.navigate("InvitationHome" , {event:event});
      }
      ).catch((error) => console.log(error));
  };

  const cancel = () => {
    navigation.navigate("InvitationHome", {event:event});
  };



  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Invitation Title"
        onChangeText={(text) => setinvitationTitle(text)}
        value={invitationTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Invitation Description"
        onChangeText={(text) => setinvitationDescription(text)}
        value={invitationDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Invitation Date"
        onChangeText={(text) => setinvitationDate(text)}
        value={invitationDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Invitation Time"
        onChangeText={(text) => setinvitationTime(text)}
        value={invitationTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Invitation Location"
        onChangeText={(text) => setinvitationLocation(text)}
        value={invitationLocation}
      />
      <Picker
        style={styles.input}
        selectedValue={invitationType}
        onValueChange={(itemValue) => setinvitationType(itemValue)}
      >
        <Picker.Item label="Select Event Type" value="" />
        <Picker.Item label="Wedding" value="Wedding" />
        <Picker.Item label="Birthday" value="Birthday" />
        <Picker.Item label="Anniversary" value="Anniversary" />
        <Picker.Item label="Other" value="Other" />
      </Picker>

      <Picker
        style={styles.input}
        selectedValue={selectedGuest}
        onValueChange={(itemValue) => setselectedGuest(itemValue)}
      >
        <Picker.Item label="Select Guest" value="Select Guest" />
        {guests.map((guest)=>{
          return <Picker.Item label={guest.guestName} value={guest.guestName} />
        })}

      </Picker>
      
      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={cancel} style={styles.button} />
        <Button
          title="Add Invitation"
          onPress={handleAddInvitation}
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
  container2: {
    height:300,
    width:300 
  },
  input: {
    width: "90%",
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  buttonContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    margin: 10,
    backgroundColor: "#6EB7C7",
  },
});

export default AddInvitation;
