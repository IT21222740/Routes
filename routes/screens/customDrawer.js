import React, { useState } from 'react';
import { View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Slider, Text, Icon } from '@rneui/themed';
import call from 'react-native-phone-call'
import { Feather } from '@expo/vector-icons';

const CustomDrawer = ({ onClose }) => {
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
    const selectedValue = emergencyLabels[value];

    // Call the onClose function and pass the selectedValue
    onClose(selectedValue);
  };

  const handleCancel = () => {
    setValue(0);
  };

  const makeCall = (passedNumber) => {
    const args = {
      number: passedNumber,
      prompt: true
    }
    call(args).catch(console.error)
  }

  return (
    <View style={styles.drawer}>
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

          <View style={styles.callBox}>
            <Text style={styles.callBoxLabel}>Emergency Call:</Text>
          </View>
          
          <View style={{ textAlign: 'left', paddingTop: 35, flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => makeCall('119')}>
              <View style={{ backgroundColor: '#9A8C98', flexDirection: 'row', alignItems: 'center',height:50,width:270 }}>
                <View style={{ backgroundColor: 'white', padding: 5 }}>
                  <Feather name="phone-call" size={40} color="black" />
                </View>
                <Text style={styles.callNumber}>119-Emergency Police</Text>
              </View>
            </TouchableOpacity>
          </View>

          
          <View style={{ textAlign: 'left', paddingTop: 35, flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => makeCall('110')}>
              <View style={{ backgroundColor: '#9A8C98', flexDirection: 'row', alignItems: 'center',height:50,width:270 }}>
                <View style={{ backgroundColor: 'white', padding: 5 }}>
                  <Feather name="phone-call" size={40} color="black" />
                </View>
                <Text style={styles.callNumber}>110-Fire Brigade</Text>
              </View>
            </TouchableOpacity>
          </View>
          
          <View style={{ textAlign: 'left', paddingTop: 35, flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => makeCall('114')}>
              <View style={{ backgroundColor: '#9A8C98', flexDirection: 'row', alignItems: 'center',height:53,width:272 }}>
                <View style={{ backgroundColor: 'white', padding: 5,height:53 }}>
                  <Feather name="phone-call" size={40} color="black" />
                </View>
                <Text style={styles.callNumber}>114-Reporting Information on Explosives</Text>
              </View>
            </TouchableOpacity>
          </View>
          
          <View style={{ textAlign: 'left', paddingTop: 35, flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => makeCall('1929')}>
              <View style={{ backgroundColor: '#9A8C98', flexDirection: 'row', alignItems: 'center',height:50,width:270 }}>
                <View style={{ backgroundColor: 'white', padding: 5 }}>
                  <Feather name="phone-call" size={40} color="black" />
                </View>
                <Text style={styles.callNumber}>1929-Child Protection</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{padding:30}}>
          </View>
        </View>
      </View>
    </View>
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
    backgroundColor: '#9A8C98',
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
  callBox: {
    alignItems: 'center',
  },
  callBoxLabel: {
    paddingTop: 30,
    fontSize: 30,
    fontWeight: 'bold',
    textDecorationStyle: 'double',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  callNumber: {
    fontSize: 20,
    color: 'blue',
    marginBottom: 5,
  },
  drawer:{
    backgroundColor:'#E9D9D0'
  }

});

export default CustomDrawer;
