import { View, Text, FlatList, TextInput, StyleSheet, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { firebase } from '../config';

const AddToFav = () => {
  const [bus, setBus] = useState([]);
  const [searchText, setSearchText] = useState('');
  const busRef = firebase.firestore().collection('bus');

  useEffect(() => {
    busRef.onSnapshot((querySnapshot) => {
      const buses = [];
      querySnapshot.forEach((doc) => {
        const { BusNumber, From, To } = doc.data();
        buses.push({
          id: doc.id,
          BusNumber,
          From,
          To,
        });
      });
      setBus(buses);
    });
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    if (text === '') {
      // If search text is empty, reset the list to its original state
      busRef.onSnapshot((querySnapshot) => {
        const buses = [];
        querySnapshot.forEach((doc) => {
          const { BusNumber, From, To } = doc.data();
          buses.push({
            id: doc.id,
            BusNumber,
            From,
            To,
          });
        });
        setBus(buses);
      });
    } else {
      // Filter the 'bus' array based on the search text
      const filteredBuses = bus.filter((item) => {
        const busNumber = item.BusNumber ? item.BusNumber.toLowerCase() : '';
        const from = item.From ? item.From.toLowerCase() : '';
        const to = item.To ? item.To.toLowerCase() : '';

        return (
          busNumber.includes(text.toLowerCase()) ||
          from.includes(text.toLowerCase()) ||
          to.includes(text.toLowerCase())
        );
      });

      setBus(filteredBuses);
    }
  };

  return (
    <View style={{ marginTop: 10 }}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        style={{ height: '80%' }}
        data={bus}
        numColumns={1}
        renderItem={({ item }) => (
          <Pressable style={styles.container}>
            <View style={styles.innerContainer}>
              <Text style={styles.itemHeading}>{item.BusNumber}</Text>
              <Text style={styles.itemHeading}>{item.From}</Text>
              <Text style={styles.itemHeading}>{item.To}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e5e5e5',
    padding: 15,
    borderRadius: 15,
    margin: 15,
    marginHorizontal: 10,
  },
  innerContainer: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  itemHeading: {
    fontWeight: 'bold',
  },
  searchBar: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
});

export default AddToFav;
