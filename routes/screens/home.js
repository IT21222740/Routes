import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import CustomDrawer from './customDrawer';
import { Entypo } from '@expo/vector-icons';

const HomeScreen = () => {
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const slideAnimation = new Animated.Value(300);

  useEffect(() => {
    if (isDrawerVisible) {
      Animated.timing(slideAnimation, {
        toValue: 120,
        duration: 300,
        useNativeDriver: true, // Set this to true if possible for performance
      }).start();
    } else {
      Animated.timing(slideAnimation, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true, // Set this to true if possible for performance
      }).start();
    }
  }, [isDrawerVisible]);

  return (
    <View style={styles.container}>
      <Text>Your home screen content</Text>
      <TouchableOpacity onPress={() => setDrawerVisible(true)}>
        <View style={styles.button}>
          <AntDesign name="exclamationcircleo" size={24} color="black" />
          <Text>Open Drawer</Text>
        </View>
      </TouchableOpacity>

      <Modal visible={isDrawerVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <Animated.View style={[styles.customDrawer, { transform: [{ translateX: slideAnimation }] }]}>
            <CustomDrawer onClose={() => setDrawerVisible(false)} />
          </Animated.View>
          <TouchableOpacity
            style={styles.closeButtonContainer}
            onPress={() => setDrawerVisible(false)}
          >
            <Entypo name="circle-with-cross" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default HomeScreen;
