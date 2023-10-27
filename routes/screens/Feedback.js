import { View, Text } from 'react-native'
import React from 'react'


const Feedback = ({route}) => {
    const busNumber = route.params?.data;
    console.log(busNumber)
  return (
    <View>
      <Text>{busNumber}</Text>
    </View>
  )
}

export default Feedback