// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions,StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '/Users/vighneshprabhu/Desktop/splitv1/assets/splash.png';
import Login from '/Users/vighneshprabhu/Desktop/splitv1/screens/Login.js';
// import Signup from './Src/Screens/Signup';
// import Home from './Src/Screens/Home';
import app from "/Users/vighneshprabhu/Desktop/splitv1/Firebase.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import Scanning from './Src/Screens/Scanning';
export default function App() {
  const [loading, setisloading] = useState(true);
  const [user, setUser] = useState(null);
  const Stack = createNativeStackNavigator();
const auth = getAuth(app);
useEffect(()=>{
setTimeout(() => {
  setisloading(false)
}, 4000);
},[]);
function onAuthStateChanged(user) {
  setUser(user);
  // if (loading) setisloading(false);
}
useEffect(() => {
  const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
  return subscriber; // unsubscribe on unmount
}, []);
console.log(user?.email);
  if (loading) return <Splash/>
  return (
   <>
   <StatusBar barStyle={'dark-content'} backgroundColor="white" />
      <View style={{height: Dimensions.get('window').height}}>
        <NavigationContainer>
          <Stack.Navigator
            // initialRouteName={user?.email?"Home":"Login"}
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
   </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});