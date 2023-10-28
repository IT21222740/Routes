import React, { useState, useEffect } from 'react';
import { Linking, StyleSheet, Text, View, TouchableOpacity, Modal, Animated } from 'react-native';
import MapView from 'react-native-maps';
import { Entypo, AntDesign } from '@expo/vector-icons';
import CustomDrawer from './customDrawer';
import RequestRideType from '../components/RequestRideType';
import SelectRideType from '../components/SelectRideType';
import TouchIcon from '../components/TouchIcon';
import TouchText from '../components/TouchText';
import WhereTo from '../components/WhereTo';
import { colors, device, fonts, gStyle } from '../constants';
import * as Location from 'expo-location';

const { PROVIDER_GOOGLE } = MapView;

const types = {
  car: {
    image: 'carSm',
    imageLg: 'carLg',
    text: 'Ride'
  },
  bike: {
    image: 'bikeSm',
    imageLg: 'bikeLg',
    text: 'Bike'
  }
};

const HomeScreen = ({ navigation }) => {
  const [type, setType] = useState('car');
  const [selectType, setSelectType] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [coordinates, setCoords] = useState({ lat: null, lon: null });
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [selectedEmergencyLevel, setSelectedEmergencyLevel] = useState(null);
  const slideAnimation = new Animated.Value(300);

  useEffect(() => {
    const getLocation = async () => {
      const { status: existingStatus } = await Location.requestForegroundPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Location.requestForegroundPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync();

      setCoords({ lat: coords.latitude, lon: coords.longitude });
      setShowMap(true);
    };

    getLocation().catch(console.error);
  }, []);

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

  const toggleTypeModal = () => {
    setSelectType(!selectType);
  };

  const clearEmergencyLevel = () => {
    setSelectedEmergencyLevel(null);
  };

  return (
    <View style={gStyle.container}>
      {showMap && (
        <MapView
          followsUserLocation
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: coordinates.lat,
            longitude: coordinates.lon,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}
          showsUserLocation
          style={styles.map}
        />
      )}

      {!showMap && (
        <View style={styles.containerNoLocation}>
          <Text style={styles.textLocationNeeded}>
            We need your location data...
          </Text>
          <TouchText
            onPress={() => Linking.openURL('app-settings:')}
            style={styles.btnGoTo}
            styleText={styles.btnGoToText}
            text="Go To Permissions"
          />
        </View>
      )}

      {type === 'bike' && (
        <View style={styles.rightContainer}>
          <View style={styles.icons}>
            <TouchIcon
              icon={<SvgQRCode />}
              iconSize={20}
              onPress={() => navigation.navigate('ModalQRCode')}
              style={[styles.icon, styles.iconQRCode]}
            />
            <TouchIcon
              icon={<SvgCheckShield />}
              iconSize={20}
              onPress={() => navigation.navigate('ModalTutorialBike')}
              style={[styles.icon, styles.iconShield]}
            />
          </View>
        </View>
      )}

      <View style={styles.header}>
        <TouchIcon
          icon={<SvgMenu />}
          iconSize={32}
          onPress={() => navigation.toggleDrawer()}
        />
        <RequestRideType
          image={types[type].image}
          onPress={toggleTypeModal}
          text={types[type].text}
        />

        {type === 'car' && <View style={styles.placeholder} />}
        {type === 'bike' && (
          <TouchText
            onPress={() => navigation.navigate('ModalHelp')}
            style={styles.help}
            text="Help"
          />
        )}
      </View>

      <SelectRideType
        data={types}
        onClose={toggleTypeModal}
        onSelect={(selectedType) => setType(selectedType)}
        visible={selectType}
      />

      {type === 'car' && <WhereTo />}
      
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
