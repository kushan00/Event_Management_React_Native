import { Picker } from "@react-native-picker/picker";
import React, { useState , useEffect} from "react";
import { View, Text, StyleSheet, TextInput, Button ,ScrollView , TouchableOpacity} from "react-native";
import { firebase } from "../../config";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MultipleSelectPicker } from 'react-native-multi-select-picker'

// Define the Firebase Firestore collection where the guests data is stored
const guestsCollection = firebase.firestore().collection('guests');

const AddInvitation = ({route}) => {
  const  event  = route.params.event;

  const [invitationName, setinvitationName] = useState("");
  const [invitationGuestList, setinvitationGuestList] = useState([]);
  const [isShownPicker, setisShownPicker] = useState(false);

  const navigation = useNavigation();

  const [guests, setGuests] = useState([]);
  const [guestListForDropDown, setguestListForDropDown] = useState([]);

   const makeDropDownList = async () => {
    var array= [];
    guests.map((item,index)=>{
      array.push({id: item.id, label: item.guestName , value:index+1})
    });
    setguestListForDropDown(array);
  }

    // Define the function to load the guests data from Firestore
    // const loadGuests = async () => {
    //   console.log("event", event?.id);
    //   console.log("UID : ", await AsyncStorage.getItem("uid"));
    //   firebase.firestore().collection('guests').where("user_id", "==", await AsyncStorage.getItem("uid")).where("EventId", "==", event?.id).then((snapshot) => {
    //     const guestList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    //     setGuests(guestList);
    //   }).catch((error)=>console.log(error));
    // }


    // Load the guests data from Firestore on component mount
    useEffect(() => {
      //loadGuests();
      const unsubscribe = guestsCollection.onSnapshot((snapshot) => {
        const guestList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setGuests(guestList);
        makeDropDownList();
      });
      return unsubscribe;
    }, []);

  const handleAddInvitation = async () => {
    console.log("UID : ", await AsyncStorage.getItem("uid"));
    firebase
      .firestore()
      .collection("invitations")
      .add({
        invitationName,
        eventID:event?.id,
        user_id: await AsyncStorage.getItem("uid") != null
          ? await AsyncStorage.getItem("uid")
          : "no user id",
        invitationGuestList,
      })
      .then(
        () => { 
          console.log("Invitation successfully added!");
          alert("Invitation successfully added!");
          navigation.navigate("InvitationHome");
      }
      ).catch((error) => console.log(error));
  };

  const cancel = () => {
    navigation.navigate("InvitationHome");
  };



  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Event Name"
        onChangeText={(text) => setinvitationName(text)}
        value={invitationName}
      />
      {/* <Picker
        style={styles.input}
        selectedValue={invitationGuestList}
        onValueChange={(itemValue) => setinvitationGuestList(itemValue)}
      >
        <Picker.Item label="Select Event Type" value="" />
        {guests.map((guest)=>{
          return <Picker.Item key={guest.id} label={guest.guestName} value={guest} />
        })}
      </Picker> */}
      <View style={styles.container2}>
          <ScrollView>
                <TouchableOpacity
                    onPress={() => {
                      isShownPicker ? 
                      setisShownPicker(false) 
                      :
                      setisShownPicker(true);
                    }}
                    style={{ height: 50, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#dadde3' }}
                >
                    <Text>Select Guests</Text>
                </TouchableOpacity>
                {isShownPicker ? <MultipleSelectPicker
                    items={guestListForDropDown}
                    onSelectionsChange={(ele) => { setinvitationGuestList(ele) }}
                    selectedItems={invitationGuestList}
                    buttonStyle={{ height: 100, justifyContent: 'center', alignItems: 'center' }}
                    buttonText='hello'
                    checkboxStyle={{ height: 20, width: 20 }}
                />
                    : null
                }
 
                {invitationGuestList.map((item, index) => {
                    return <Text key={index}>
                        {item.label}
                    </Text>
                })}
 
            </ScrollView >
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={cancel} style={styles.button} />
        <Button
          title="Add Event"
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
    width: "50%",
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
