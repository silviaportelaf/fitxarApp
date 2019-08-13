import AsyncStorage from '@react-native-community/async-storage'
import NavigatorService from '../services/navigatorService'


//FUNCIONES ASINCRONAS
export async function removeData (){
    try {
      await AsyncStorage.removeItem('id');
      return true;
    } catch (error) {
      return false;
    }
  };

  export async function storeData (value) {
    try {
      await AsyncStorage.setItem('id', value);
    } catch (error) {
      // Error saving data
    }
  };

 

  export async function retrieveData(){
    try {
      const value = await AsyncStorage.getItem('id');
      if (value !== null) {
        return value;
      
      }
     
    } catch (error) {
      return null;
    }
  };

  
  


  //NO ASINCRONAS
  // export default storeData = async (value) => {
  //   try {
  //     await AsyncStorage.setItem('id', value);
  //   } catch (error) {
  //     // Error saving data
  //   }
  // };

  // export default retrieveData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('id');
  //     if (value !== null) {
  //      NavigatorService.navigate('Entrarsalir', {
  //         user: value,
  //      })
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //   }
  // };


  export async function storeUser (value) {
    try {
      await AsyncStorage.setItem('user', value);
    } catch (error) {
    }
  };

  export async function getUser () {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        return value;
      }
    } catch (error) {
    }
  };

  export async function removeUser (){
    try {
      await AsyncStorage.removeItem('user');
      return true;
    } catch (error) {
      return false;
    }
  };