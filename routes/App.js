import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
import React,{useState,useEffect} from "react"
import {firebase} from  "./config"

import Dashboard from './screens/Dashboard'
import Login from './screens/Login'
import Header from "./coponents/Header"
import Registration from "./screens/Registration"

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
            options={{
              headerTitle: () => <Header/>,
              headerStyle:{
                height:50,
                backgroundColor: '#F2E9E4',
               
               
              }

            }}
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
            name="Dashboard"
            component={Dashboard}
            options={{
              headerTitle: () => <Header name="MyTickets"/>,
              headerStyle:{
                height:150,
                borderBottomLeftRadius:50,
                borderBottomRightRadius:50,
                backgroundColor: '#F2E9E4',
                shadowColor:'#000',
                elevation: 25
              }

            }}
        />
         {/* <Stack.Screen
            name="Scanner"
            component={Scanner}
            options={{
              headerTitle: () => <Header name="MyTickets"/>,
              headerStyle:{
                height:150,
                borderBottomLeftRadius:50,
                borderBottomRightRadius:50,
                backgroundColor: '#00e4d0',
                shadowColor:'#000',
                elevation: 25
              }

            }}
        /> */}
        
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



