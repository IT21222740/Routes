import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView ,Image} from "react-native";
import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from '../services/FirebaseService'; 
import Styles from "../Styles/Styles";

 // Function to handle the login process
const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async () => {
    const error = await signInWithEmailAndPassword(email, password);

    if (error) {
      setErrorMessage(error);
    } else {
      setErrorMessage(null); // Clear the error message on successful login
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F2E9E4' }}>
      <ScrollView contentContainerStyle = {{alignItems:"center", backgroundColor:"#F2E9E4", }}>
       
        <Image style={{ height: 300, width: 300 }} source={require('../assets/Routes.png')}/>
        <View style={Styles.inputContainer}>
          <TextInput
            style={Styles.textInput}
            placeholder="Enter your Email"
            onChangeText={(email) => setEmail(email)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={Styles.inputContainer}>
          <TextInput
            style={Styles.textInput}
            placeholder="Enter your Password"
            onChangeText={(password) => setPassword(password)}
            autoCapitalize="none"
            autoCorrect={false}
            
          />
        </View>
        {errorMessage && (
          <Text style={{ color: 'red', fontSize: 16, marginBottom: 10 }}>{errorMessage}</Text>
        )}
        <TouchableOpacity onPress={handleLogin} style={Styles.button}>
          <Text style={{ fontSize: 22, fontWeight: 'bold',color:"#FFFFFF" }}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Registration')} style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
          Don't have an account? Register now
        </Text>
      </TouchableOpacity>
        
      </ScrollView>
    </View>
  );
}

export default Login;
