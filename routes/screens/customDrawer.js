import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomDrawer = ({ onClose }) => {
  return (
    <View style={styles.drawerContent}>
      <Text>Hi there</Text>
      <Text>More content...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    backgroundColor: 'white',
    flex: 1,
    width: '-75%', // Fill 75% of the screen width
    padding: 10,
  },
});

export default CustomDrawer;
