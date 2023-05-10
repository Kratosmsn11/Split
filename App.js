import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Dimensions,StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TransactionOption from "./Scrns/TransactionOption"
import Camera from "./Scrns/Camera"
import CreateTransaction from './Scrns/CreateTransaction';
import Login from './Scrns/Login';
import AllDebts from './Scrns/AllDebts';
import Create from './Scrns/Create';
import CreateGroup from './Scrns/CreateGroup';
import Home from './Scrns/Home';
import Signup from './Scrns/Signup';
import GroupPage from './Scrns/GroupPage';
import Profile from './Scrns/Profile';
import PayingTransaction from './Scrns/PayingTransaction';
import JoinGroup from './Scrns/JoinGroup';
import GroupOption from './Scrns/GroupOption';
import UserProfile  from './Scrns/UserProfile';
import About from './Scrns/About';
import Sidebar from './Scrns/Sidebar';
import Summary from './Scrns/Summary';
import AllTransactions from './Scrns/AllTransactions';
import BottomSheetTest from './Scrns/BottomSheetTest';
import NameTransaction from './Scrns/NameTransaction';

const Stack = createNativeStackNavigator();

export default function App() {
  return (<>
  <StatusBar barStyle={"dark-content"} backgroundColor="white"/>
    <View style={{height:Dimensions.get("window").height}}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AllDebts"
        screenOptions={{
          headerShown: false,gestureEnabled:false}
          
        }
      >
            
        <Stack.Screen name="Signup" component={Signup}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Create" component={Create}/>
        <Stack.Screen name="GroupPage" component={GroupPage}/>
        <Stack.Screen name="CreateGroup" component={CreateGroup}/>
        <Stack.Screen name="AllDebts" component={AllDebts}/>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="TransactionOption" component={TransactionOption}/>
        <Stack.Screen name="Camera" component={Camera}/>
        <Stack.Screen name="CreateTransaction" component={CreateTransaction}/>
        <Stack.Screen name="PayingTransaction" component={PayingTransaction}/>
        <Stack.Screen name="JoinGroup" component={JoinGroup}/>
        <Stack.Screen name="GroupOption" component={GroupOption}/>
        <Stack.Screen name="UserProfile" component={UserProfile}/>
        <Stack.Screen name="About" component={About}/>
        <Stack.Screen name="Sidebar" component={Sidebar}/>
        <Stack.Screen name="Summary" component={Summary}/>
        <Stack.Screen name="AllTransactions" component={AllTransactions}/>
        <Stack.Screen name="BottomSheetTest" component={BottomSheetTest}/>
        <Stack.Screen name="NameTransaction" component={NameTransaction}/>
      </Stack.Navigator>
    </NavigationContainer>
    </View>
 </> );
}