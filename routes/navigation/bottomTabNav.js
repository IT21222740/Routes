import { View,Text } from "react-native";
import React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home,AddToFav,MyList} from "../screens/index"
import {Ionicons} from '@expo/vector-icons'

const Tab= createBottomTabNavigator()

const screenOptions={
    tabBarShowLabel:false,
    tabBarHideOnkeyboard:true,
    headerShown:false,
    tabBarStyle:{
        position:"absolute",
        bottom:0,
        right:0,
        left:0,
        elevation:0,
        height:90
    }
}


const BottomTabNav=()=>{
    return(
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen 
                name='Home' 
                component={Home}    
                options={{
                    tabBarIcon:({focused})=>{
                        return <Ionicons name={focused?"home":"home-outline"}
                        size={30}
                        color={focused? 'black':'gray'}/>
                    }
                }}
                />
                <Tab.Screen 
                    name='AddToFav' 
                    component={AddToFav}    
                    options={{
                        tabBarIcon:({focused})=>{
                            return <Ionicons name={focused?"star":"star-outline"}
                            size={30}
                            color={focused? 'black':'gray'}/>
                        }
                    }}
                />
                
                <Tab.Screen 
                    name='MyList' 
                    component={MyList}    
                    options={{
                        tabBarIcon:({focused})=>{
                            return <Ionicons name={focused?"person":"person-outline"}
                            size={30}
                            color={focused? 'black':'gray'}/>
                        }
                    }}
                />

        </Tab.Navigator>
    )
}

export default BottomTabNav