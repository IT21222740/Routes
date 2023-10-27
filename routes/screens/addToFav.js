import { View, Text,FlatList,StyleSheet,Pressable } from 'react-native'
import React,{useState,useEffect} from 'react'
import {firebase} from '../config'

const AddToFav = () => {

  const [bus,setBus]=useState([])
  const busRef=firebase.firestore().collection('bus')

  useEffect(async()=>{
    busRef.onSnapshot((querySnapshot) => {
      const bus = []; 
      querySnapshot.forEach((doc) => {
        const { BusNumber, From, To } = doc.data();
        bus.push({
          id: doc.id,
          BusNumber,
          From,
          To,
        });
      });
      setBus(bus);
    });
  }, []);



  return (
    <View style={{marginTop:100}}>
      <FlatList
        style={{height:'100%'}}
        data={bus}
        numColumns={1}
        renderItem={({item})=>(
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
  )
}

export default AddToFav

const styles=StyleSheet.create({
  container:{
    backgroundColor:'#e5e5e5',
    padding:15,
    borderRadius:15,
    margin:15,
    marginHorizontal:10
  },
  innerContainer:{
    alignItems:'center',
    flexDirection:'column'
  },
  itemHeading:{
    fontWeight:'bold'
  }
})