import AsyncStorage from '@react-native-async-storage/async-storage';

// Storing data in local storage
export async function storeData(key, value){
  try {
    await AsyncStorage.setItem(key, value);
    console.log(`Data with key '${key}' successfully saved.`);
  } catch (error) {
    console.log(`Error saving data with key '${key}': ${error}`);
  }
};

// Retrieving data from local storage
export async function getData(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log(`Data with key '${key}' successfully retrieved. ${value}`);
      return value;
    } else {
      console.log(`No data found with key '${key}' ${value}.`);
      return null;
    }
  } catch (error) {
    console.log(`Error retrieving data with key '${key}': ${error}`);
    return null;
  }
};

// Removing data from local storage
export async function removeData(key){
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Data with key '${key}' successfully removed.`);
  } catch (error) {
    console.log(`Error removing data with key '${key}': ${error}`);
  }
};


