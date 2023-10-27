import { View, Text, StyleSheet, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { StatusBar } from "expo-status-bar";
import { firebase } from '../config';
import { useNavigation } from "@react-navigation/native";

const Scanner = () => {
const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(false);
  const [busNumber, setScanData] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleCodeScanned = ({ type, data }) => {
    setScanData(data);
    console.log(`Data: ${data}`);
    console.log(`Type: ${type}`);
    navigation.navigate('Feedback',{data})
  };


  
  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>Please grant camera permission to the app</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={busNumber ? undefined : handleCodeScanned}
      />
    
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Scanner;
