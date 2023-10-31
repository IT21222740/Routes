import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import CustomDrawer from './customDrawer';
import { Entypo } from '@expo/vector-icons';

const HomeScreen = () => {
   // State to control the visibility of the drawer
  const [isDrawerVisible, setDrawerVisible] = useState(false);
     // State to store the selected emergency level
  const [selectedEmergencyLevel, setSelectedEmergencyLevel] = useState(null);
     // Animation for sliding the drawer in and out
  const slideAnimation = new Animated.Value(300);

  useEffect(() => {
    if (isDrawerVisible) {
      Animated.timing(slideAnimation, {
        toValue: 120,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnimation, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isDrawerVisible]);

  const clearEmergencyLevel = () => {
    setSelectedEmergencyLevel(null);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setDrawerVisible(true)} style={styles.drawerButton}>
        {selectedEmergencyLevel ? (
          <Entypo name="circle-with-cross" size={40} color="black" onPress={clearEmergencyLevel} />
        ) : (
          <AntDesign name="exclamationcircleo" size={40} color="black" />
        )}
      </TouchableOpacity>

      <View style={styles.drawerReturnText}>
        {selectedEmergencyLevel && (
          <Text style={styles.emergencyText}>Emergency {selectedEmergencyLevel}</Text>
        )}
      </View>

      <Modal visible={isDrawerVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <Animated.View style={[styles.customDrawer, { transform: [{ translateX: slideAnimation }] }]}>
            <CustomDrawer onClose={(value) => {
              setSelectedEmergencyLevel(value);
              setDrawerVisible(false);
            }} />

            <TouchableOpacity
              style={styles.closeButtonContainer}
              onPress={() => setDrawerVisible(false)}
            >
              <Entypo name="circle-with-cross" size={40} color="black" />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerButton: {
    position: 'absolute',
    top: 60, // Adjust the top position of !
    right: 30, // Adjust the right position of !
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  customDrawer: {
    width: 300,
    backgroundColor: 'white',
  },
  closeButtonContainer: {
    flex: 1,
    position: 'absolute',
    top: 50, // Adjust the top position of !
    right: 250, // Adjust the right position of !
  },
  drawerReturnText: {
    position: 'absolute',
    top: 60, 
    right: 75,
    padding:10
  },
  emergencyText:{
    fontSize:20
  }
});

export default HomeScreen;
