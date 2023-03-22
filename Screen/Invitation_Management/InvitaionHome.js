import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../config";
import "firebase/firestore";
import { IconButton } from "react-native-paper";


// Define the Firebase Firestore collection where the invitations data is stored
const invitationsCollection = firebase.firestore().collection("invitations");

const InvitationHome = () => {
  const [invitations, setInvitations] = useState([]);
  const [selectedInvitation, setSelectedInvitation] = useState(null);
  const navigation = useNavigation();

  //Load invitation data from firebase firestore
  useEffect(() => {
    const unsubscribe = invitationsCollection.onSnapshot((snapshot) => {
      const invitationList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInvitations(invitationList);
    });
    return unsubscribe;
  }, []);



  const handleInvitationPress = (invitation) => {
    setSelectedInvitation(invitation);
    //navigation.navigate('invitationDetails', { invitation });
    // navigation.navigate("Addinvitations");
  };

  const handleDeleteinvitation = () => {
    if (selectedInvitation) {
      Alert.alert(
        `Delete ${selectedInvitation.invitationName}`,
        `Are you sure you want to delete ${selectedInvitation.invitationName}?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              await invitationsCollection.doc(selectedInvitation.id).delete();
              setSelectedInvitation(null);
            },
          },
        ]
      );
    }
  };

  //update the selected invitation
  const handleUpdateinvitation = () => {
    if (selectedInvitation) {
      setSelectedInvitation(selectedInvitation);
      console.log(selectedInvitation);
      navigation.navigate("UpdateInvitation", { invitation: selectedInvitation });
      setSelectedInvitation(null);
    }
  };

  const addInvitation = () => {
    navigation.navigate("AddInvitation");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={addInvitation}
        style={styles.addButton}
      >
        <Text style={styles.invitationTitle}>Add Invitation</Text>
      </TouchableOpacity>
      <View style={styles.invitationContainer}>
        <ScrollView>
          
          {invitations.length == 0 ? 
          <View style={styles.invitation2}>
            <Text style={styles.invitationTitle2}>No invitations</Text>
          </View>
          :
          invitations.map((invitation) => (
            <View
              key={invitation.id}
              style={[
                styles.invitation,
                selectedInvitation && selectedInvitation.id === invitation.id
                  ? styles.selectedInvitation
                  : null,
              ]}
              onTouchEnd={() => handleInvitationPress(invitation)}
            >
              <Text style={styles.invitationTitle}>{invitation.invitationName}</Text>
              <Text style={styles.invitationDate}>{invitation.date}</Text>
              <View style={styles.invitationExpanded}>
                <Text>More details about the Invitation</Text>
              </View>
              <View style={styles.buttonContainer}>
                <IconButton
                  icon="delete"
                  color="red"
                  size={24}
                  onPress={handleDeleteinvitation}
                />
                <IconButton
                  icon="pencil"
                  color="blue"
                  size={24}
                  onPress={() => {
                    setSelectedInvitation(invitation);
                    handleUpdateinvitation();
                  }}
                />
              </View>
              <View style={styles.invitationButtons}>
                <TouchableOpacity style={styles.invitationButton1}>
                  <Text>Invitation</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  invitationContainer: {
    backgroundColor: "#fff",
    padding: 20,
    margin: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    height: 600,
  },
  invitationTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  invitationDetails: {
    marginBottom: 10,
  },
  invitationExpanded: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    marginTop: 10,
  },
  invitationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  invitationButton1: {
    backgroundColor: "#f1f518",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 2,
    alignItems: "center",
  },
  invitationButton2: {
    backgroundColor: "#f518ed",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 2,
    alignItems: "center",
  },
  invitationButton3: {
    backgroundColor: "#18f541",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 2,
    alignItems: "center",
  },
  addButton: {
    marginTop: 10,
    backgroundColor: "#AB87FF",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 2,
    alignItems: "center",
    marginBottom: 10,
  },
  invitation: {
    margin: 20,
    padding: 5,
  },
  invitation2: {
    padding: 100,
  },
  invitationTitle2: {
    fontWeight: "bold",
    fontSize: 20,
  },
  selectedInvitation: {
    backgroundColor: "#a7e8fc",
    margin: 20,
    padding: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
});

export default InvitationHome;
