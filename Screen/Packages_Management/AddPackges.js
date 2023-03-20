// import React, { useState } from 'react';
// import { View, TextInput, StyleSheet, Button, Alert } from 'react-native';
// import { firebase} from '../../config';

// const AddPackageDetails = () => {
//   const [packageName, setPackageName] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState('');

//   const handleSave = async () => {
//     try {
//       await firebase.firestore().collection('packages').add({
//         packageName,
//         description,
//         price,
//       });
//       Alert.alert('Success', 'Package details added successfully!');
//       setPackageName('');
//       setDescription('');
//       setPrice('');
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Package Name"
//         value={packageName}
//         onChangeText={setPackageName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Description"
//         value={description}
//         onChangeText={setDescription}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Price"
//         keyboardType="numeric"
//         value={price}
//         onChangeText={setPrice}
//       />
//       <Button title="Save" onPress={handleSave} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     margin: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//     marginTop: 40,
//   },
// });

// export default AddPackageDetails;
