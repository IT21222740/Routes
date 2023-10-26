import React, { useState } from 'react';
import { View, Text, Button, Modal } from 'react-native'
import CustomDrawer from './customDrawer'; 

const HomeScreen = () => {
  const [isDrawerVisible, setDrawerVisible] = useState(false);

  return (
    <View>
      <Text>Your home screen content</Text>
      <Button title="Open Drawer" onPress={() => setDrawerVisible(true)} />

      <Modal
        visible={isDrawerVisible}
        animationType="slide"
        transparent={true}
      >
        <CustomDrawer />
        <Button title="Close Drawer" onPress={() => setDrawerVisible(false)} />
      </Modal>
    </View>
  );
};

export default HomeScreen;