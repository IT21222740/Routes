import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';
import Styles from "../Styles/Styles";
const Registration = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [customerType, setCustomerType] = useState('local'); // Default to 'local'

    const registerUser = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);

            // Store additional user data in Firestore
            const db = firebase.firestore();
            const usersCollection = db.collection('users');

            // You can customize the data structure as needed
            usersCollection.doc(firebase.auth().currentUser.uid).set({
                name,
                email,
                customerType,
            });

            navigation.navigate('Dashboard'); // Redirect to the login page
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#F2E9E4' }}>
            <ScrollView contentContainerStyle = {{alignItems:"center", backgroundColor:"#F2E9E4", }}>
                <Text style={Styles.heading}>Registration</Text>

                <View style={Styles.inputContainer}>
                    <TextInput
                        style={Styles.textInput}
                        placeholder="Enter your name"
                        onChangeText={(text) => setName(text)}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>

                <View style={Styles.inputContainer}>
                    <TextInput
                        style={Styles.textInput}
                        placeholder="Email"
                        onChangeText={(text) => setEmail(text)}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>

                <View style={Styles.inputContainer}>
                    <TextInput
                        style={Styles.textInput}
                        placeholder="Password"
                        onChangeText={(text) => setPassword(text)}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                    />
                </View>

                <View style={Styles.inputContainer}>
                    <TextInput
                        style={Styles.textInput}
                        placeholder="Confirm Password"
                        onChangeText={(text) => setConfirmPassword(text)}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                    />
                </View>
                <View style={Styles. inputContainer}>
                    <Picker
                        selectedValue={customerType}
                        onValueChange={(value) => setCustomerType(value)}
                        style={Styles.picker}
                        itemStyle={Styles.pickerItem}
                    >
                        <Picker.Item label="Passenger" value="Passenger" />
                        <Picker.Item label="Driver" value="Driver" />
                    </Picker>
                </View>

                <TouchableOpacity onPress={registerUser} style={Styles.button}>
                    <Text style={Styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
        
    );
}


export default Registration;
