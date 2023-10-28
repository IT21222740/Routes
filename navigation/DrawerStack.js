import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

// screens
import HomeScreen from '../screens/home';

// components
import CustomDrawerContent from '../components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default () => (
  <Drawer.Navigator
    drawerContent={CustomDrawerContent}
    screenOptions={{ headerShown: false }}
  >
    <Drawer.Screen name="HomeScreen" component={HomeScreen} />
  </Drawer.Navigator>
);
