import { View, Text,ScrollView,TouchableOpacity,Image} from 'react-native'
import React from 'react'

const MyList = () => {
  return (
    <View >
      <ScrollView>
        <View style ={{padding:10, width:'100%',backgroundColor:'#F2E9E4',height:250}}>
  
        </View>
        <View style = {{alignItems:'center', backgroundColor:'#F6F6F6'}}>
          <TouchableOpacity>
              <Image source={require('../assets/avatar.jpg')} style ={{width:140,height:140,borderRadius:100,marginTop:-70}}/>
          </TouchableOpacity>
          <Text style={{fontSize:25,fontWeight:'bold',padding:10}}>
            Tharusha Thejan
          </Text>
          <Text style={{fontSize:15,fontWeight:'bold',padding:10}}>
           Passenger
          </Text>
          <View style={{alignSelf:'center',flexDirection:'row',justifyContent:'center',backgroundColor:'#fff',width:'90%',padding:10,paddingBottom:22,borderRadius:10,shadowOpacity:80,elevation:15,marginTop:20}}>
            <Text>Share experience</Text>

          </View>

        </View>
       

      </ScrollView>
    </View>
  )
}

export default MyList