import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
import React,{useState,useEffect} from "react"
import {firebase} from  "./config"


import Header from "./coponents/Header"
import BottomTabNav from './navigation/bottomTabNav';
import {Login,Registration} from './screens/index'
import Dashboard from './screens/Dashboard'

const Stack = createStackNavigator();


function App(){
  const [initalizing, setinitializing] = useState(true);
  const [user,SetUser] = useState();

  //Handle user state changes
  function onAuthStateChanged(user){
    SetUser(user);
    if(initalizing) setinitializing(false);
  }

  useEffect(()=>{
    const subscirber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscirber;
  },[]);

  if (initalizing) return null;
  
  if(!user){
    return(
      <Stack.Navigator>
        <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown:false}}
        />
         <Stack.Screen
            name="Registration"
            component={Registration}
            options={{
              headerTitle: () => <Header/>,
              headerStyle:{
                height:80,
                backgroundColor: '#F2E9E4',              
               
              }

            }}
           
        />

      </Stack.Navigator>
    );
  }
  return(
    <Stack.Navigator>
      <Stack.Screen
        name="Bottom Navigation"
        component={BottomTabNav}
        options={{headerShown:false}}
      />
       <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{headerShown:false}}
        />
    </Stack.Navigator>
  
  );
}


export default () =>{
  return(
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}



