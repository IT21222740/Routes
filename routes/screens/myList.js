import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { firebase } from '../config'; 
import { useNavigation } from '@react-navigation/native';


const MyList = () => {
  const [userData, setUserData] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    // Get the currently authenticated user
    const user = firebase.auth().currentUser;

    if (user) {
      // Get a reference to the Realtime Database
      const database = firebase.database();
      const userId = user.uid;

      // Reference to the user's data in the database
      const usersRef = database.ref('users/' + userId);

      // Listen for changes in the data
      usersRef.on('value', (snapshot) => {
        // Retrieve the user's data
        const data = snapshot.val();

        if (data) {
          // Update the state with the retrieved data
          setUserData(data);
        }
      });
    }
  }, []);

  const navigateToDashboard = () => {
    navigation.navigate('Dashboard'); 
  };

  return (
    <View>
      <ScrollView>
        <View style={{ padding: 10, width: '100%', backgroundColor: '#F2E9E4', height: 250}}></View>
        <View style={{ alignItems: 'center', backgroundColor: '#F6F6F6'}}>
          <TouchableOpacity>
            <Image source={require('../assets/avatar.jpg')} style={{ width: 140, height: 140, borderRadius: 100, marginTop: -70}} />
          </TouchableOpacity>
          <Text style={{ fontSize: 25, fontWeight: 'bold', padding: 10 }}>{userData.name || 'Name'}</Text>
          <Text style={{ fontSize: 15, fontWeight: 'bold', padding: 10 }}>{userData.customerType || 'Customer Type'}</Text>
          <View style={{ alignSelf: 'center', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#fff', width: '90%', padding: 10, paddingBottom: 22, borderRadius: 10, shadowOpacity: 80, elevation: 15, marginTop: 20 }}>
            <Text>Share experience</Text>
          </View>
          {userData.customerType === 'Driver' && (
               <TouchableOpacity onPress={navigateToDashboard}>
                 <Text>Navigate to Dashboard</Text>
               </TouchableOpacity>
            )}
        </View>
      </ScrollView>
    </View>
  );
}

export default MyList;
