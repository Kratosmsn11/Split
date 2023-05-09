import * as React from 'react';
import { Button, View,Text, Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {Home} from '../Scrns/Home';
import About from '../Scrns/About';
import CustomSidebar from './CustomSidebar'

const Drawer = createDrawerNavigator();


export default function App() {

  return (
      <Drawer.Navigator useLegacyImplementation initialRouteName="Home" screenOptions={{
        headerShown: true,headerTransparent:true,headerTitle:"",headerTintColor: 'black',
        drawerActiveTintColor:'white'
        
      }} drawerContent={(props) => <CustomSidebar {...props} />}>

        
        <Drawer.Screen name=" " component={Home} />
        
      </Drawer.Navigator>

  );
}