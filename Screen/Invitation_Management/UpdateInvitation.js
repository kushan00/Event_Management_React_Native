import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { firebase } from "../../config";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

const UpdateInvitation = ({ route }) => {
  const  invitation  = route.params.invitation;
  const [invitationTitle, setinvitationTitle] = useState(invitation.invitationTitle);
  const [invitationDescription, setinvitationDescription] = useState(invitation.invitationDescription);
  const [invitationDate, setinvitationDate] = useState(invitation.invitationDate);
  const [invitationTime, setinvitationTime] = useState(invitation.invitationTime);
  const [invitationLocation, setinvitationLocation] = useState(invitation.invitationLocation);
  const [invitationType, setinvitationType] = useState(invitation.invitationType);
  const [invitationStatus, setinvitationStatus] = useState(invitation.invitationStatus);

  console.log("invitation data");
  console.log(route);


  const navigation = useNavigation();

  const handleUpdateInvitation = () => {
    firebase
      .firestore()
      .collection("invitations")
      .doc(invitation.id)
      .update({
        invitationTitle,
        invitationDescription,
        invitationDate,
        invitationTime,
        invitationLocation,
        invitationType,
        invitationStatus,
      })
      .then(
        () => alert("Event successfully updated!"),
        navigation.navigate("InvitationHome",{event:invitation})
      )
      .catch((error) => console.log(error));
  };

  const cancel = () => {
    navigation.navigate("InvitationHome",{event:invitation});
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
        selectedValue={invitationStatus}
        onValueChange={(itemValue) => setinvitationStatus(itemValue)}
      >
        <Picker.Item label="Select Event Type" value="" />
        <Picker.Item label="True" value="True" />
        <Picker.Item label="False" value="False" />
      </Picker>
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
      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={cancel} style={styles.button} />
        <Button
          title="Update Invitation"
          onPress={handleUpdateInvitation}
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
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    marginLeft: 8,
    backgroundColor: "#6EB7C7",
  },
});

export default UpdateInvitation;
