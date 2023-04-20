// import {
//   SafeAreaView,
//   StyleSheet,
//   View,
//   Dimensions,
//   Text,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// // import Clipboard from "@react-native-clipboard/clipboard";
// import * as Clipboard from 'expo-clipboard';
// import app from "..//Firebase";
// import { Input } from "react-native-elements";
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
// import React, { useEffect, useState } from "react";

// import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
// import PermissionPop from "../components/AlertModal";
// import * as ImagePicker from "expo-image-picker";
// import { BallIndicator } from "react-native-indicators";
// import {
//     getFirestore,
//     collection,
//     addDoc,
//     setDoc,
//     doc,
    
//   } from "firebase/firestore";
// import { Alert } from "react-native";
// const CreateGroup = ({ navigation }) => {
//   const [isShow, setisShow] = useState(false);
//   const [isLoading, setisLoading] = useState(false);
//   const [image, setimage] = useState(null);
//   const [GrouName, setGrouName] = useState("");
//   const [Pascode, setPascode] = useState("");
//   const [Name, setName] = useState("");
//   const [Friend, setFriend] = useState("");
//   const [FriendsList, setFriendsList] = useState([]);
//   const name = "Mike";
//   // const Auth = getAuth(app);
//   // const db = getFirestore(app);
//   useEffect(() => {
//     const randomId = Math.floor(10000000 + Math.random() * 90000000).toString();
//     setPascode(randomId);
//   }, []);
//   // console.log(Auth?.currentUser?.uid);

//   const onCreatGroup = async () => {

//     if (GrouName == "") {
//       Alert.alert("Alert!", "Enter Group name");
//     } else if (Pascode == "") {
//       Alert.alert("Alert!", "Enter Group Passcode");
//     } 
//     // else {
//     //   console.log(GrouName);
//     //   const userref = collection(db, "groups")
//     //   console.log(userref);
//     //   const uniqueId = Math.random().toString(36).substring(2) + Date.now().toString(36)
//     //   setDoc(doc(db, "groups", uniqueId), {
//     //     name: Name,
//     //     Pascode: Pascode,
//     //     GrouName: GrouName,
//     //     FriendsList: FriendsList,
//     //     authorEmail: Auth?.currentUser?.email,
//     //     authorID: Auth?.currentUser?.uid,
//     //     total:0,
//     //     uid:uniqueId
//     //   })
//     //     .then((docRef) => {
//     //         setFriend("")
//     //         setFriendsList([])
//     //         setGrouName("")
//     //         setName()
//     //       navigation.replace("Home");
//     //     })
//     //     .catch((error) => {
//     //       Alert.alert("Sorry!", "Some thing wrong");
//     //     });
//     // }
//   };
//   function copyToClipboard(){
//     Clipboard.setStringAsync(Pascode);
//     console.log("Copied!");
//   }  
//   return (
//     <SafeAreaView>
//       <BottomLayer/>
//       <BottomBar/>
//       <Logo/>
//       <TouchableOpacity onPress={() => onCreatGroup()}>
//         <ContinueButton/>
//       </TouchableOpacity>
//       <View>


//         <Text style={styles.myGroup}>Name your group</Text>
//         <View style={styles.MyGroupSpace}>
//           <Input
//             onChangeText={(e) => setGrouName(e)}
//             placeholder="Group name"
//             inputContainerStyle={{
//               borderBottomWidth: 0,
//               alignSelf: "center",
//               height: 20,
//               borderRadius: 10,
//               marginTop: 15,
//             }}
//             containerStyle={{
//               backgroundColor: "#dfe9e9",
//               borderRadius: 10,
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//             rightIcon={
//               <TouchableOpacity
//                 style={{
//                   height: 20,
//                   width: 20,
//                   borderWidth: 1,
//                   borderRadius: 20,
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <Text style={{ fontWeight: "bold" }}>X</Text>
//               </TouchableOpacity>
//             }
//           />

//           <Input
//             //For now just keep at passcode
//             editable={false}  
//             onChangeText={(e) => setPascode(e)}
//             placeholder="Passcode"
//             color="#000" 
//             value={`Pascode : ${Pascode}`}
//             inputContainerStyle={{
//               borderBottomWidth: 0,
//               alignSelf: "center",
//               height: 20,
//               borderRadius: 10,
//               marginTop: 15,
//             }}
//             containerStyle={{
//               backgroundColor: "#dfe9e9",
//               borderRadius: 10,
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//             rightIcon={
//               <TouchableOpacity onPress={()=>copyToClipboard()}>
//                 <FontAwesome5 name={"copy"} color={"#9E9E9E"} size={18} />
//               </TouchableOpacity>
//             }
//           />

//           <Input
//             onChangeText={(e) => setName(e)}
//             placeholder={name}
//             editable={false}
//             inputContainerStyle={{
//               borderBottomWidth: 0,
//               alignSelf: "center",
//               height: 20,
//               borderRadius: 10,
//               marginTop: 15,
//             }}
//             containerStyle={{
//               backgroundColor: "#dfe9e9",
//               borderRadius: 10,
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           />

//           <View
//             style={{
//               height: 55,
//               width: "100%",
//               flexDirection: "row",
//               justifyContent: "space-between",
//             }}
//           >
//             <Input
//               onChangeText={(e) => setFriend(e)}
//               placeholder="Search for a friend"
//               inputContainerStyle={{
//                 borderBottomWidth: 0,
//                 alignSelf: "center",
//                 height: 30,
//                 borderRadius: 10,
//                 marginTop: 20,
//               }}
//               containerStyle={{
//                 backgroundColor: "#dfe9e9",
//                 borderRadius: 10,
//                 alignItems: "center",
//                 justifyContent: "center",
//                 width: "90%",
//               }}
//               value={Friend}
//               rightIcon={
//                 <TouchableOpacity
//                   style={{
//                     height: 20,
//                     width: 20,
//                     borderWidth: 1,
//                     borderRadius: 20,
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   <Text style={{ fontWeight: "bold" }}>X</Text>
//                 </TouchableOpacity>
//               }
//             />
//             <TouchableOpacity
//               style={{
//                 height: 30,
//                 width: 30,
//                 left: 10,
//                 top: 10,
//                 borderRadius: 30,
//                 alignItems: "center",
//                 justifyContent: "center",
//                 backgroundColor: "#dfe9e9",
//               }}
//               onPress={() => {
//                 setFriendsList([{...FriendsList,email:Friend}]);
//                 setFriend("");
//               }}
//             >
//               <FontAwesome5 name="plus" />
//             </TouchableOpacity>
//           </View>
//         </View>


//         <View style={styles.bottomLayerConaner}>
//         </View>
//       </View>
      
      
//     </SafeAreaView>
    
//   );
// };

// export default CreateGroup;

// const styles = StyleSheet.create({
//   Logo: {
//     height: "10%",
//     alignSelf: "center",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 30,
//   },
//   myGroup: { color: "black", fontWeight: "bold", left: 25, fontSize: 25,top:60, },
//   PlusButton: {
//     height: 60,
//     width: 60,
//     borderWidth: 3,
//     borderRadius: 30,
//     justifyContent: "center",
//     alignItems: "center",
//     borderColor: "#4461F2",
//     alignSelf: "center",
//     top: 20,
//     shadowColor: "#4461F2",
//     shadowOffset: { width: 2, height: 2 },
//     shadowOpacity: 0.9,
//     shadowRadius: 4,
//   },
//   MyGroupSpace: {
//     top:80,
//     height: "65%",
//     width: "90%",
//     alignSelf: "center",
//     justifyContent: "space-around",
//   },
//   emptyContainer: {
//     height: "36%",
//     width: "90%",
//     alignSelf: "center",
//     marginTop: 20,
//     borderRadius: 20,
//   },
//   bottomLayerConaner: {
//     height: "15%",
//     justifyContent: "center",
//     alignItems: "center",
//     bottom: 10,
//   },
// });


import * as React from 'react';
import { Text, View, StyleSheet, TextInput,FlatList,SafeAreaView,TouchableOpacity,Image,Alert } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useState,useEffect} from 'react';
import {Logo,BottomLayer,BottomBar,AddButton, ContinueButton} from "../components/Svgs";
import { generateRandomPasscode, getAllUsers } from '../backendFiles/firebaseFunctions';
import { createGroup } from '../backendFiles/firebaseFunctions';
import { useNavigation } from '@react-navigation/native';
import { getUserId } from '../AppData';
export default function App() {
  const navigation = useNavigation();

  const [searching, isSearching] = useState(false);
  const [groupName,setGroupName] = useState([]);
  const [passcode,setPasscode] = useState([]);
  const image = 'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg';
  const dummyData = [{username:"Joseph123", name:"Joseph Arredondo",uri:"https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=ejx13G9ZroRrcg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-young-user-icon-2400.png&ehk=NNF6zZUBr0n5i%2fx0Bh3AMRDRDrzslPXB0ANabkkPyv0%3d&risl=&pid=ImgRaw&r=0",id:1},{username:"Seos56", name:"Bob Young",uri:"https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=ejx13G9ZroRrcg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-young-user-icon-2400.png&ehk=NNF6zZUBr0n5i%2fx0Bh3AMRDRDrzslPXB0ANabkkPyv0%3d&risl=&pid=ImgRaw&r=0",id:2},{username:"quiop462", name:"Quentin Smith",uri:"https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=ejx13G9ZroRrcg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-young-user-icon-2400.png&ehk=NNF6zZUBr0n5i%2fx0Bh3AMRDRDrzslPXB0ANabkkPyv0%3d&risl=&pid=ImgRaw&r=0",id:7},{username:"pytr300", name:"John Sean",uri:"https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=ejx13G9ZroRrcg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-young-user-icon-2400.png&ehk=NNF6zZUBr0n5i%2fx0Bh3AMRDRDrzslPXB0ANabkkPyv0%3d&risl=&pid=ImgRaw&r=0",id:3},{username:"wumi123", name:"Dylan Egan",uri:"https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=ejx13G9ZroRrcg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-young-user-icon-2400.png&ehk=NNF6zZUBr0n5i%2fx0Bh3AMRDRDrzslPXB0ANabkkPyv0%3d&risl=&pid=ImgRaw&r=0",id:9},{username:"onys89", name:"John Sean",uri:"https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=ejx13G9ZroRrcg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-young-user-icon-2400.png&ehk=NNF6zZUBr0n5i%2fx0Bh3AMRDRDrzslPXB0ANabkkPyv0%3d&risl=&pid=ImgRaw&r=0",id:4}];
  const [users,setUsers] = useState([]);

  const [userData,setUserData] = useState([]);
  const [searchData,setSearchData] = useState([]);
  const [refresh,setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const userLimit = 5;
  
  const [searchIndex,setSearchIndex] = useState(-1);
  var currentUser = [{username:"Add friend", name:"Add friend ",uri:"https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=ejx13G9ZroRrcg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-young-user-icon-2400.png&ehk=NNF6zZUBr0n5i%2fx0Bh3AMRDRDrzslPXB0ANabkkPyv0%3d&risl=&pid=ImgRaw&r=0",id:-1}];


    async function fetchUsers(){
      setPasscode(generateRandomPasscode())
      setUsers(currentUser);
      var usersInApp = await getAllUsers();

      var newUsers = usersInApp.filter(function (user) {
        return user.id != getUserId();
       });
      setUserData(newUsers);
    }

    useEffect(() => {
      navigation.addListener('focus', async () =>{
        fetchUsers();
      })
      
    }, [])


  //user is added to list, actual user data not assigned yet
  function addUser(index){
    //insert one value to be displayed, id -1 to filter if user creates group without assigning user
    const data = {username:"Add a friend",id:-1};
    //creates a new user assigning the data
    users[index + 1] = data;
    //update the user list
    setUsers(users);
    //refreshes the list
    setRefresh(!refresh);
  }

  //user removed from the list
  function removeUser(index){
    //remove the user, put user back to possible member list if a valid user
    if(users[index].id > 0){
      userData.push(users[index]);
    }
    //remove from users list
    users.splice(index,1);
    //update and refresh screen
    setUsers(users);
    setRefresh(!refresh);
  }

  //assigning actual data
  function assignUserData(uData){
    if(uData.id == -1){setSearchIndex(-1);return;}
      //if the user spot already has a user assigned need to add it back to possible user list
      if(users[searchIndex].id > 0){
        userData.push(users[searchIndex]);
      }
      // assign the data to the user
      users[searchIndex] = uData;
      //update user list
      setUsers(users);
      //find the user in the possible user array that matches the user and remove it since they are already part of the group
      var uIndex = userData.findIndex(item => item.id === uData.id);
      userData.splice(uIndex,1);
      //shows other screen
      changeSearch()
      setSearchIndex(-1);
      setSearchTerm("");
  }

  function finish(){
    if(groupName.length<=0){
      Alert.alert("Enter a group name!");
      return;
    }
    else if(groupName.length<5){
      Alert.alert("Enter a group name of at least 5 characters!");
      return;
    }
    var newArray = users.filter(function (user) {
     return user.id != -1;
    });
    console.log(newArray);
    var ids = [];

    for(var x = 0;x<newArray.length;x++){
      ids[x] = newArray[x].id;
    }
    console.log(passcode);
    console.log(ids);
    // var mesage = "";
    // mesage+="Group Name: " + groupName+"\n"+" Passcode:"+passcode+"\n";
    // for(var x = 0;x<newArray.length;x++){
    //   mesage += "Member " + (parseInt(x)+1) + ": " + newArray[x].name + "\n";
    // }
    // Alert.alert(mesage);

    createGroup(ids,getUserId(),groupName,passcode);

    navigation.navigate("Home");
  }

  

  function onType(text){
    setSearchTerm(text);
    console.log(text);
    if(text.length==0){
      setSearchData(userData);
      return;
    }
    var newArray = userData.filter(function (el) {
     return el.name.toLowerCase().includes(text.toLowerCase());
    });
    if(newArray.length<=0){
      newArray=[];
    }
    console.log(newArray);
    setSearchData(newArray);
    // setRefresh(!refresh);
  }

  function changeSearch(index){
    setSearchTerm("");
    setSearchData(userData);
    setSearchIndex(index);
    isSearching(!searching);
  }

  return (
    <SafeAreaView>
          <BottomLayer/>
      <BottomBar/>
      <Logo/>
      <TouchableOpacity onPress={() => finish()}>
        <ContinueButton/>
      </TouchableOpacity>
    <View>
    {searching &&
      <View style={styles.bg}>
      <View style={styles.inputContainer}>
        <View style={{justifyContent: 'center', paddingHorizontal: 20}}>
          <FontAwesome5 name={'search'} size={15} color={'#4F555A'} />
        </View>
        <View>
          <TextInput value ={searchTerm} placeholder="Search" style={styles.input} maxLength={100} placeholderTextColor='#4F555A' 
          onChangeText={(text) => { onType(text)} }/>
        </View>
        <TouchableOpacity style={{justifyContent: 'center', paddingHorizontal: 60}} onPress ={()=>changeSearch()}>
          <Text style={{fontSize: 15, fontWeight: 'bold',}}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <View style = {styles.line}></View>

      <View style={{left: 20,top:20,height:700}}>
        <FlatList
          data={searchData}
          extraData={refresh}
          renderItem={({ item, index }) => {
            return (
              <View>
              
              <TouchableOpacity style={{flex:1, flexDirection: 'row',paddingVertical:10,}} onPress ={()=>assignUserData(item)}>
                <View style={{justifyContent:'center',}}>
                  {/* <Image style={styles.smallImage} source={{uri: item.picture}}/> */}
                  <View style={{
                    width:60,
                    height:60,
                    borderRadius:60,
                    marginHorizontal:10,
                    backgroundColor:item.color,
                    alignContent:'center',
                    justifyContent:'center',
                  }}>

                  <Text style={{
                    fontSize:20,
                    color:'white',
                    textAlign:'center'
                  }}>{item.name[0].toUpperCase()}</Text>
                </View>
                </View>
                <View style={styles.userContainer}>
                  <Text style={styles.text}>{item.name}</Text>
                  <Text style={styles.secondaryText}>{item.email}</Text>
                </View>
                
              </TouchableOpacity>
              <View style = {styles.lineSeperator}></View>
              </View>
              
              
            );
          }}
        />
      </View>
    </View>
    }

    {!searching &&
    
      <View style={{left:35,top:100}}>
      <Text style={styles.header}>Create group</Text>

      <View style={styles.container}>
        <TextInput style={styles.textInput} placeholder="Group name" placeholderTextColor='#4F555A' onChangeText={text => {setGroupName(text);}}></TextInput>
      </View>


      <TouchableOpacity>
      <View style={styles.container}>
        <TextInput style={styles.textInput} placeholder="Passcode:123446" value={"Passcode: "+passcode} editable={false}></TextInput>
      </View>
      </TouchableOpacity>

      <TouchableOpacity>
      <View style={styles.container}>
        <TextInput value="Joseph" style={styles.textInput} editable={false}></TextInput>
      </View>
      </TouchableOpacity>

      <View style={{height:250}}>

        <FlatList
        data={users}
        extraData={refresh}
        renderItem={({ user, index }) => {
          return (
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity onPress ={()=>changeSearch(index)}>
              <View style={styles.container}>
                <TextInput placeholder="Add new friend" editable={false} style={styles.textInput}><Text style={styles.textInput}>{users[index].name}</Text></TextInput>
              </View>
              </TouchableOpacity>
              {index == users.length-1 && index<=4 &&
              <View style={{justifyContent:'center',left:6,marginRight:7}}>
                <TouchableOpacity onPress={()=>addUser(index)}>
                <FontAwesome5 name={'plus'} size={15} color={'#4F555A'} />
                </TouchableOpacity>
              </View>
              }
              {index > 0 && users.length>1 &&
              <View style={{justifyContent:'center',left:6,}}>
                <TouchableOpacity onPress={()=>removeUser(index)}>
                <FontAwesome5 name={'minus'} size={15} color={'#4F555A'} />
                </TouchableOpacity>
              </View>
              }
            </View>
          );
        }}
        />
        </View>
    </View>
    }

    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header:{
    fontWeight:'bold',
    fontSize:20,
    bottom:30
  },
  container:{
    justifyContent:'center',
    alignContent:'center',
    backgroundColor:'#EAF0F7',
    marginVertical:15,
    width:250,
    height:40,
    borderRadius:7
  },
  textInput:{
    color:'#4F555A',
    left:20,
  },
  bg:{
    justifyContent:'center',
    alignContent:'center',
    top:60,
  },
  userContainer:{
    left:10,
    bottom:7,
    justifyContent:'center',
    height:50,
    width:500,
  },
  inputContainer:{
    left:20,
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal: 10,
    width:240,
    height:30,
    backgroundColor:'#EAF0F7',
    borderRadius:5,
  },
  input:{
    width:150,
    color:'#4F555A',
    fontSize:15,
  },
  text:{
    fontSize:13,
    fontWeight:'bold',
  },
  secondaryText:{
    fontSize:13,
    color:'#4F555A',
  },

  smallImage:{
    alignSelf:'center',
    justifyContent:'center',
    width:60,
    height:60,
    borderRadius:560,
  },
  line:{
    height:2,
    width:500,
    top:18,
    backgroundColor:'#EAF0F7',
  },
  lineSeperator:{
    height:2,
    justifyContent:'flex-end',
    width:300,
    left:60,
    marginVertical:-3,
    backgroundColor:'#EAF0F7',
  }

});