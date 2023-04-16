import * as React from 'react';
import { View, Dimensions,StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TransactionOption from "./Scrns/TransactionOption"
import Camera from "./Scrns/Camera"
import CreateTransaction from './Scrns/CreateTransaction';
import Groups from './Scrns/Groups';
import Login from './Scrns/Login';
import AllTransactions from './Scrns/AllDebts';
import AllDebts from './Scrns/AllDebts';
import Create from './Scrns/Create';
import CreateGroup from './Scrns/CreateGroup';
import Home from './Scrns/Home';
import Signup from './Scrns/Signup';
import GroupPage from './Scrns/GroupPage';
import Profile from './Scrns/Profile';
import PayingTransaction from './Scrns/PayingTransaction';
const Stack = createNativeStackNavigator();

export default function App() {
  return (<>
  <StatusBar barStyle={"dark-content"} backgroundColor="white"/>
    <View style={{height:Dimensions.get("window").height}}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"
        screenOptions={{
          headerShown: false,}}
          >
            
        <Stack.Screen name="Signup" component={Signup}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Create" component={Create}/>
        <Stack.Screen name="GroupPage" component={GroupPage}/>
        <Stack.Screen name="CreateGroup" component={CreateGroup}/>
        <Stack.Screen name="AllDebts" component={AllDebts}/>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="Groups" component={Groups}/>
        <Stack.Screen name="TransactionOption" component={TransactionOption}/>
        <Stack.Screen name="Camera" component={Camera}/>
        <Stack.Screen name="CreateTransaction" component={CreateTransaction}/>
        <Stack.Screen name="PayingTransaction" component={PayingTransaction}/>
      </Stack.Navigator>
    </NavigationContainer>
    </View>
 </> );
}