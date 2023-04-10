import * as React from 'react';
import { View, Dimensions,StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TransactionOption from "./Scrns/TransactionOption"
import Transaction from "./Scrns/Transaction";
import Camera from "./Scrns/Camera"
import CreateTransaction from './Scrns/CreateTransaction';
import Groups from './Scrns/Groups';
import Login from './Scrns/Login';
import AllTransactions from './Scrns/AllDebts';
import AllDebts from './Scrns/AllDebts';
import Create from './Scrns/Create';
import FinishTransaction from './Scrns/FinishTransaction'
import CreateGroup from './Scrns/CreateGroup';
const Stack = createNativeStackNavigator();

export default function App() {
  return (<>
  <StatusBar barStyle={"dark-content"} backgroundColor="white"/>
    <View style={{height:Dimensions.get("window").height}}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CreateGroup"
        screenOptions={{
          headerShown: false,}}>
        <Stack.Screen name="Create" component={Create}/>
        <Stack.Screen name="CreateGroup" component={CreateGroup}/>
        <Stack.Screen name="FinishTransaction" component={FinishTransaction}/>
        <Stack.Screen name="AllDebts" component={AllDebts}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Groups" component={Groups}/>
        <Stack.Screen name="TransactionOption" component={TransactionOption}/>
        <Stack.Screen name="Transaction" component={Transaction}/>
        <Stack.Screen name="Camera" component={Camera}/>
        <Stack.Screen name="CreateTransaction" component={CreateTransaction}/>
      </Stack.Navigator>
    </NavigationContainer>
    </View>
 </> );
}