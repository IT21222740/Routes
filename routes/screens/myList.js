import { View, Text,ScrollView,TouchableOpacity,Image} from 'react-native'
import React from 'react'

const MyList = () => {
  return (
    <View>
      <ScrollView>
        <View style ={{padding:10, width:'100%',backgroundColor:'#000',height:200}}>
  
        </View>
        <View style = {{alignItems:'center'}}>
          <TouchableOpacity>
              <Image source={require('../assets/icon.png')} style ={{width:140,height:140,borderRadius:100,marginTop:-70}}/>

          </TouchableOpacity>

        </View>
       

      </ScrollView>
    </View>
  )
}

export default MyList