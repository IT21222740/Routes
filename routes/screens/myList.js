import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { firebase } from '../config'; 
import { useNavigation } from '@react-navigation/native';
import {signOut} from '../services/FirebaseService'
import Styles from "../Styles/Styles";

const MyList = () => {
  const [userData, setUserData] = useState({});
  const navigation = useNavigation();
  const handleLogout = async () => {
    const success = await signOut();
    if (success) {
      navigation.navigate("Login");
    }
  };

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
        <View style={{ padding: 10, width: '100%', backgroundColor: '#F2E9E4', height: 150}}></View>
        <View style={{ alignItems: 'center', backgroundColor: '#F6F6F6'}} >
          <TouchableOpacity>
            <Image source={require('../assets/avatar.jpg')} style={{ width: 140, height: 140, borderRadius: 100, marginTop: -70}} />
          </TouchableOpacity>
          <Text style={{ fontSize: 35, fontWeight: 'bold', padding: 5 }}>{userData.name || 'Name'}</Text>
          <Text style={{ fontSize: 15, fontWeight: 'bold', padding: 5 }}>{userData.customerType || 'Customer Type'}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', padding: 10, marginTop: 10 }}>
        <View style={{ alignItems: 'center', backgroundColor: '#fff', width: '30%', padding: 10, borderRadius: 10, shadowOpacity: 80, elevation: 15 }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>My coins</Text>
          <Image source={require('../assets/icons8-coin-48.png')} />
          <Text style={{ fontSize: 22, padding: 10 }}>{userData.coins || '-'}</Text>
        </View>
        <View style={{ alignItems: 'center', backgroundColor: '#fff', width: '30%', padding: 10, borderRadius: 10, shadowOpacity: 80, elevation: 15 }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold',marginBottom:10 }}>Shares</Text>
          <Image source={require('../assets/icons8-share-52.png')} style={{width:40, height :40}} />
          <Text style={{ fontSize: 22, padding: 10 }}>{userData.share_counts||'-'}</Text>
        </View>
        <View style={{ alignItems: 'center', backgroundColor: '#fff', width: '30%', padding: 10, borderRadius: 10, shadowOpacity: 80, elevation: 15 }}>
        <TouchableOpacity onPress={handleLogout} >
        <Text style={{ fontSize: 14, fontWeight: 'bold',marginBottom:15 }}>Logout</Text>
          <Image source={require('../assets/icons8-logout-50.png')} style={{width:50, height :50}} /> 
          </TouchableOpacity>
        
        </View>
      </View>
      {userData.customerType === 'Passenger' && (
        <View>
           <TouchableOpacity style= {Styles.button}>
                 <Text style={{fontSize:25, color:'#FFF'}}>Share My experience</Text>
            </TouchableOpacity>
        </View>
              
      )}
          {userData.customerType === 'Driver' && (
               <TouchableOpacity onPress={navigateToDashboard}>
                 <Text style={{fontSize:25, color:'#FFF'}}>Navigate to Dashboard</Text>
               </TouchableOpacity>
            )}
        </View>
      </ScrollView>
    </View>
  );
}

export default MyList;
