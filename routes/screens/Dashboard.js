import { View,Text } from "react-native";
import React from "react";

//header
const Header = (props)=> {
    return(
        <View style = {{marginLeft:15}}>
            <Text style = {{fontWeight:'bold',fontSize : 28,marginTop:50}}>Dashboard</Text>
        </View>
    )
}

export default Header;
