import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'expo-image';
import logo from './assets/splash.png';
import { db } from './config/firebase';
import {getFirestore, doc,addDoc, collection,deleteDoc,setDoc,query,getDocs,getDoc,Timestamp,updateDoc,where,orderBy} from 'firebase/firestore';
import React from 'react';

// const transactionCollection = collection(db,'transaction');
// const debtCollection = collection(db,'debt');
const userCollection = collection(db,'userprofiles');
const groupCollection = collection(db,'group');

async function CreateGroup(addedUsers,userId,groupName) {
  var users = {}; // add multiple users
  var groupId;    
  //adding self to group as well
  addedUsers.push(userId);

  // initial data before adding users
  const startingData ={
    name:groupName,
    total:0.00,
   }

  // grabs the groupId
  const r = await addDoc(groupCollection, startingData)
  .then(docRef => {
    groupId = docRef.id;
  })
  .catch(error => {
    console.log(error);
  })

  // adds the user based on their userID
  for(var i = 0;i < addedUsers.length;i++){
    var id = addedUsers[i];
    users[id] = true;
    //reference to the user
    const userRef = doc(userCollection,id);
    //get the document
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists) {
      console.log('Not a user!');
    } else {
      var groups = userDoc.data()['groups'];
      groups[groupId] = true;
      //updating the users document
      updateDoc(userRef,{groups});
    }
  }
  const data ={
    users
  }
  //group updated
  var groupRef = doc(groupCollection,groupId);
  const res = await updateDoc(groupRef,data);
}

function HomeScreen() {

  const [groupName, onChangeGroupName] = React.useState('Group Name'); 
  const [addFriend, onChangeAddFriend] = React.useState('Add a friend');


  var currentUserId = '1L0sVRI9cdGm2kk5e30J';
  var userList = ['8dr7N2gI1k3Xk1oYXFGy', 'SAVKwlEjR1BQ69mDzVPq'];


  const [inputs, setInputs] = React.useState([{key: '', value: ''}]); 
  const addHandler = ()=>{
    const _inputs = [...inputs];
    _inputs.push({key: '', value: ''});
    setInputs(_inputs);
  }
  
  const deleteHandler = (key)=>{
    const _inputs = inputs.filter((input,index) => index != key);
    setInputs(_inputs);
  }

  const inputHandler = (text, key)=>{
    const _inputs = [...inputs];
    _inputs[key].value = text;
    _inputs[key].key   = key;
    setInputs(_inputs);
    
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* logo image will go here */}
        <Image
        source={logo}
        />
        <Text> Name your group </Text>
        <TextInput 
        placeholder = {groupName}
        onChangeText={onChangeGroupName}
        style = {styles.input}
        />
        <Text style = {styles.input}> Passcode: abcd </Text>
        {/* <TextInput 
        placeholder = {addFriend}
        onChangeText={onChangeAddFriend}
        style = {styles.input}
        /> */}

        {/* Starts here */}
        <View>
      <ScrollView>
      {inputs.map((input, key)=>(
        <View>
          <TextInput placeholder={"Enter Name"} value={input.value}  onChangeText={(text)=>inputHandler(text,key)}/>
          <TouchableOpacity onPress = {()=> deleteHandler(key)}>
            <Text>Delete</Text>
          </TouchableOpacity> 
        </View>
      ))}
      </ScrollView>
      <Button title="Add" onPress={addHandler} />
    </View>

    {/* ends here */}
        <Button
        title="Press me"
        onPress={() => CreateGroup(userList,currentUserId,groupName)}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='HomeScreen'
      screenOptions={{
        headerShow: false,
      }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* <Stack.Screen name ="CreateGroup" component={CreateGroup}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 250,
    height: 44,
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#e8e8e8'
  },
});

// import { StatusBar } from 'expo-status-bar';
// import React, {useEffect, useState} from 'react';
// import {View, Text, Dimensions,StyleSheet} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Splash from '/Users/vighneshprabhu/Desktop/splitv1/assets/splash.png';
// import Login from '/Users/vighneshprabhu/Desktop/splitv1/screens/Login.js';
// // import Signup from './Src/Screens/Signup';
// // import Home from './Src/Screens/Home';
// import app from "/Users/vighneshprabhu/Desktop/splitv1/Firebase.js";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// // import Scanning from './Src/Screens/Scanning';
// export default function App() {
//   const [loading, setisloading] = useState(true);
//   const [user, setUser] = useState(null);
//   const Stack = createNativeStackNavigator();
// const auth = getAuth(app);
// useEffect(()=>{
// setTimeout(() => {
//   setisloading(false)
// }, 4000);
// },[]);
// function onAuthStateChanged(user) {
//   setUser(user);
//   // if (loading) setisloading(false);
// }
// useEffect(() => {
//   const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
//   return subscriber; // unsubscribe on unmount
// }, []);
// console.log(user?.email);
//   if (loading) return <Splash/>
//   return (
//    <>
//    <StatusBar barStyle={'dark-content'} backgroundColor="white" />
//       <View style={{height: Dimensions.get('window').height}}>
//         <NavigationContainer>
//           <Stack.Navigator
//             screenOptions={{
//               headerShown: false,
//             }}>
//             <Stack.Screen name="Login" component={Login} />
//             <Stack.Screen name="Signup" component={Signup} />
//             <Stack.Screen name="Home" component={Home} />
//           </Stack.Navigator>
//         </NavigationContainer>
//       </View>
//    </>
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