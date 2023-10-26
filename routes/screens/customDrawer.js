import React, { useState } from 'react';
import { View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Slider, Text, Icon } from '@rneui/themed';

const CustomDrawer = () => {
  const [value, setValue] = useState(0);

  const interpolate = (start, end) => {
    let k = (value - 0) / 3;
    return Math.ceil((1 - k) * end + k * start) % 256;
  };

  const color = () => {
    let r = interpolate(255, 0);
    let g = interpolate(0, 255);
    let b = interpolate(0, 0);
    return `rgb(${r},${g},${b})`;
  };

  const emergencyLabels = ['None', 'Normal', 'Intermediate', 'High'];

  const handleSave = () => {
    // Implement the logic to save the Emergency level value
    // You can use AsyncStorage, state management, or any other method to store the value
    // For this example, we'll just print the value
    console.log(`Emergency level saved: ${emergencyLabels[value]}`);
  };

  const handleCancel = () => {
    setValue(0);
  };

  return (
    <>
      <View>
        <Text style={styles.Header}>THIS IS FOR EMERGENCY</Text>
      </View>
      <View style={styles.slider}>
        <Text style={styles.subHeader}>Rate your Emergency</Text>
        <View style={styles.contentView}>
          <Slider
            value={value}
            onValueChange={setValue}
            maximumValue={3}
            minimumValue={0}
            step={1}
            allowTouchTrack
            trackStyle={{ height: 5, backgroundColor: 'transparent' }}
            thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
            thumbProps={{
              children: (
                <Icon
                  name="heartbeat"
                  type="font-awesome"
                  size={20}
                  reverse
                  containerStyle={{ bottom: 20, right: 20 }}
                  color={color()}
                />
              ),
            }}
          />
          <Text style={{ paddingTop: 20, fontSize: 16 }}>Emergency Level: {emergencyLabels[value]}</Text>
          <TouchableOpacity onPress={handleSave}>
            <View style={styles.buttonContainer} >
              <Button color="green" title="Save" style={styles.button} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancel}>
            <View style={styles.buttonContainer} >
              <Button color="#ff5c5c" title="Cancel" style={styles.button} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contentView: {
    padding: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  subHeader: {
    backgroundColor: '#2089dc',
    color: 'white',
    textAlign: 'center',
    paddingVertical: 5,
    marginBottom: 10,
    fontSize: 20,
  },
  slider: {
    marginTop: 20,
    position: 'relative',
  },
  Header: {
    marginTop: 100,
    textAlign: 'center',
    fontSize: 22,
    textDecorationStyle: 'double',
    textDecorationLine: 'underline',
    fontWeight: '800',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#22223B',
    marginTop: 20,
  },
  button: {
    color: 'white',
  },
});

export default CustomDrawer;
