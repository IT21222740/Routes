import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { firebase } from '../config';

const Favourites = () => {
  const [favoriteData, setFavoriteData] = useState([]);

  useEffect(() => {
    // Reference to the "favorites" collection
    const favoritesRef = firebase.firestore().collection('favorites');

    // Fetch the data from the "favorites" collection
    favoritesRef.onSnapshot((querySnapshot) => {
      const favorites = [];
      querySnapshot.forEach((doc) => {
        const favoriteItem = doc.data();
        favorites.push(favoriteItem);
      });

      // Update the local state with the retrieved favorite data
      setFavoriteData(favorites);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Favourites</Text>
      <FlatList
        data={favoriteData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.favoriteItem}>
            <Text>{item.BusNumber}</Text>
            <Text>{item.From}-{item.To}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
  },
  favoriteItem: {
    backgroundColor: '#e5e5e5',
    padding: 16,
    margin: 8,
  },
});

export default Favourites;
