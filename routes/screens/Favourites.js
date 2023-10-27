import { View, Text, FlatList } from 'react-native';
import React from 'react';

const Favourites = ({ route }) => {
  // Extract goldStarItems from the route parameters
  const goldStarItems  = route.params;

  return (
    <View>
      <Text>Favourites</Text>
      {/* Render the goldStarItems in your Favourites component */}
      <FlatList
        data={goldStarItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.BusNumber}</Text>
            <Text>{item.From} - {item.To}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Favourites;
