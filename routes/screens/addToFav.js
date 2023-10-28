import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { firebase } from '../config';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AddToFav = () => {
  const [bus, setBus] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const busRef = firebase.firestore().collection('bus');
  const navigate = useNavigation();
  const [fav, setFav] = useState([]);
  const [goldStarItems, setGoldStarItems] = useState([]);

  useEffect(() => {
    const unsubscribe = busRef.onSnapshot((querySnapshot) => {
      const buses = [];
      querySnapshot.forEach((doc) => {
        const { BusNumber, From, To } = doc.data();
        buses.push({
          id: doc.id,
          BusNumber,
          From,
          To,
          isStarred: false,
        });
      });
      setBus(buses);
      setIsLoading(false);
    });

    const favoritesRef = firebase.firestore().collection('favorites');
    favoritesRef.onSnapshot((querySnapshot) => {
      const favItems = [];
      querySnapshot.forEach((doc) => {
        const favData = doc.data();
        favItems.push(favData);
      });

      // Update the local 'fav' state with the retrieved favorite items
      setFav(favItems);
    });

    return () => unsubscribe();
  }, []);

  const toggleStar = (itemId) => {
    const updatedBus = bus.map((item) => {
      if (item.id === itemId) {
        const isStarred = !item.isStarred;
        if (isStarred) {
          setFav([...fav, item]);
          addToFavoritesCollection(item);
        } else {
          setFav(fav.filter((favItem) => favItem.id !== item.id));
          removeFromFavoritesCollection(item.id);
        }
        return { ...item, isStarred };
      }
      return item;
    });

    setBus(updatedBus);

    const starredItems = updatedBus.filter((item) => item.isStarred);
    setGoldStarItems(starredItems);
  };

  const addToFavoritesCollection = async (favData) => {
    try {
      const collectionRef = firebase.firestore().collection('favorites');
      await collectionRef.add(favData);
      console.log('Favorite added to the collection successfully.');
    } catch (error) {
      console.error('Error adding favorite to the collection: ', error);
    }
  };

  const removeFromFavoritesCollection = async (itemId) => {
    try {
      const collectionRef = firebase.firestore().collection('favorites');
      const docToDelete = collectionRef.where('id', '==', itemId);
      docToDelete.get().then((snapshot) => {
        snapshot.forEach((doc) => {
          doc.ref.delete();
          console.log('Favorite removed from the collection successfully.');
        });
      });
    } catch (error) {
      console.error('Error removing favorite from the collection: ', error);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    if (text === '') {
      setIsLoading(true);
      busRef.onSnapshot((querySnapshot) => {
        const buses = [];
        querySnapshot.forEach((doc) => {
          const { BusNumber, From, To } = doc.data();
          buses.push({
            id: doc.id,
            BusNumber,
            From,
            To,
            isStarred: false,
          });
        });
        setBus(buses);
        setIsLoading(false);
      });
    } else {
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
    <View style={{ marginTop: 40 }}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          value={searchText}
          onChangeText={handleSearch}
        />
        <FontAwesome name="search" size={20} color="black" style={styles.searchIcon} />
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="gray" style={{ marginTop: 200 }} />
      ) : (
        <FlatList
          style={{ height: '80%' }}
          data={bus}
          numColumns={1}
          renderItem={({ item }) => (
            <Pressable style={styles.container}>
              <View style={styles.innerContainer}>
                <Text style={styles.itemHeading}>{item.BusNumber}</Text>
                <Text style={styles.FromTo}>{item.From}-{item.To}</Text>
                <View style={styles.starAndVerticalLine}>
                  <FontAwesome
                    name="star"
                    size={40}
                    color={fav.some((favItem) => favItem.id === item.id) ? 'gold' : 'black'}
                    onPress={() => toggleStar(item.id)}
                  />
                </View>
                <View style={styles.verticalLine} />
              </View>
            </Pressable>
          )}
        />
      )}
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
    flexDirection: 'column',
  },
  itemHeading: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  FromTo: {
    fontSize: 20,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 20,
    padding: 15,
    margin: 10,
  },
  starAndVerticalLine: {
    position: 'absolute',
    right: 7,
    paddingTop: 4,
  },
  verticalLine: {
    width: 1,
    height: '100%',
    backgroundColor: 'gray',
    position: 'absolute',
    right: 60,
  },
  searchBar: {
    flex: 1,
  },
  searchIcon: {
    marginHorizontal: 10,
  },
});

export default AddToFav;
