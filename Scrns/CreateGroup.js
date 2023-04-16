// import * as React from 'react';
// import { Text, View, StyleSheet, SafeAreaView, TextInput,TouchableOpacity,FlatList,Alert} from 'react-native';
// import Constants from 'expo-constants';
// import {useState,useEffect} from 'react';
// import {generateRandomPasscode} from '../backendFiles/firebaseFunctions';
// import { SvgUri } from 'react-native-svg';
// import { useFonts } from 'expo-font';
// import {SvgTest} from '../SvgFiles/SvgTest';
// import { SvgXml } from "react-native-svg";
// import * as Clipboard from 'expo-clipboard';
// import Logo from '../SvgFiles/Logo.svg';
// const clipboard = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//   <path d="M15 3H9C6.79086 3 5 4.79086 5 7V15" stroke="#33363F" stroke-width="2"/>
//   <path d="M9 11.5C9 10.304 9.00149 9.49062 9.0712 8.87226C9.13864 8.27406 9.25916 7.98334 9.41329 7.78248C9.51969 7.64381 9.64381 7.51969 9.78248 7.41329C9.98334 7.25916 10.2741 7.13864 10.8723 7.0712C11.4906 7.00149 12.304 7 13.5 7C14.696 7 15.5094 7.00149 16.1277 7.0712C16.7259 7.13864 17.0167 7.25916 17.2175 7.41329C17.3562 7.51969 17.4803 7.64381 17.5867 7.78248C17.7408 7.98334 17.8614 8.27406 17.9288 8.87226C17.9985 9.49062 18 10.304 18 11.5V15.5C18 16.696 17.9985 17.5094 17.9288 18.1277C17.8614 18.7259 17.7408 19.0167 17.5867 19.2175C17.4803 19.3562 17.3562 19.4803 17.2175 19.5867C17.0167 19.7408 16.7259 19.8614 16.1277 19.9288C15.5094 19.9985 14.696 20 13.5 20C12.304 20 11.4906 19.9985 10.8723 19.9288C10.2741 19.8614 9.98334 19.7408 9.78248 19.5867C9.64381 19.4803 9.51969 19.3562 9.41329 19.2175C9.25916 19.0167 9.13864 18.7259 9.0712 18.1277C9.00149 17.5094 9 16.696 9 15.5V11.5Z" stroke="#33363F" stroke-width="2"/>
//   </svg>`;

//   const logo = `
//   <svg width="80" height="46" viewBox="0 0 80 46" fill="none" xmlns="http://www.w3.org/2000/svg">
//   <g filter="url(#filter0_d_8_32)">
//   <path d="M75 36.3291C75 38.3845 73.3338 40.0507 71.2785 40.0507H8.72152C6.66618 40.0507 5 38.3845 5 36.3291V20.3798H75V36.3291Z" fill="#76A5FF"/>
//   </g>
//   <path d="M5 3.72152C5 1.66618 6.66618 0 8.72152 0H71.2785C73.3338 0 75 1.66618 75 3.72152V19.6709H5V3.72152Z" fill="#76FFAD"/>
//   <path d="M15.7903 26.2823C14.9641 26.2823 14.2236 26.1482 13.569 25.8799C12.9144 25.6116 12.3886 25.2146 11.9916 24.6887C11.6052 24.1629 11.4013 23.5298 11.3799 22.7894H14.3095C14.3524 23.2079 14.4973 23.5298 14.7441 23.7551C14.9909 23.9698 15.3128 24.0771 15.7099 24.0771C16.1176 24.0771 16.4396 23.9859 16.6757 23.8034C16.9117 23.6103 17.0298 23.3474 17.0298 23.0147C17.0298 22.7357 16.9332 22.505 16.74 22.3226C16.5576 22.1401 16.3269 21.9899 16.0479 21.8718C15.7796 21.7538 15.3933 21.6197 14.8889 21.4694C14.1592 21.2441 13.5637 21.0187 13.1022 20.7934C12.6408 20.568 12.2437 20.2354 11.9111 19.7954C11.5784 19.3554 11.4121 18.7813 11.4121 18.0731C11.4121 17.0214 11.793 16.2005 12.5549 15.6103C13.3168 15.0093 14.3095 14.7089 15.5328 14.7089C16.7776 14.7089 17.781 15.0093 18.5429 15.6103C19.3048 16.2005 19.7126 17.0268 19.7662 18.0891H16.7883C16.7669 17.7243 16.6327 17.4399 16.3859 17.236C16.1391 17.0214 15.8225 16.9141 15.4362 16.9141C15.1036 16.9141 14.8353 17.0053 14.6314 17.1877C14.4275 17.3594 14.3256 17.6116 14.3256 17.9443C14.3256 18.3091 14.4973 18.5935 14.8406 18.7974C15.184 19.0013 15.7206 19.2213 16.4503 19.4574C17.18 19.7042 17.7702 19.9403 18.2209 20.1656C18.6824 20.391 19.0794 20.7183 19.4121 21.1475C19.7447 21.5767 19.9111 22.1294 19.9111 22.8054C19.9111 23.4493 19.7447 24.0342 19.4121 24.56C19.0901 25.0858 18.618 25.5043 17.9956 25.8155C17.3732 26.1267 16.6381 26.2823 15.7903 26.2823Z" fill="white"/>
//   <path d="M33.7579 18.5077C33.7579 19.1623 33.6077 19.7632 33.3072 20.3105C33.0067 20.847 32.5453 21.2816 31.9229 21.6143C31.3005 21.947 30.5279 22.1133 29.605 22.1133H27.8988V26.1696H25.1462V14.8698H29.605C30.5064 14.8698 31.2683 15.0254 31.8907 15.3366C32.5131 15.6478 32.9799 16.0771 33.2911 16.6244C33.6023 17.1716 33.7579 17.7994 33.7579 18.5077ZM29.3957 19.9242C29.9216 19.9242 30.3132 19.8008 30.5708 19.5539C30.8283 19.3071 30.9571 18.9584 30.9571 18.5077C30.9571 18.057 30.8283 17.7082 30.5708 17.4614C30.3132 17.2146 29.9216 17.0912 29.3957 17.0912H27.8988V19.9242H29.3957Z" fill="white"/>
//   <path d="M41.4847 24.0449H45.0903V26.1696H38.7321V14.8698H41.4847V24.0449Z" fill="white"/>
//   <path d="M52.6969 14.8698V26.1696H49.9444V14.8698H52.6969Z" fill="white"/>
//   <path d="M66.3617 14.8698V17.0751H63.3677V26.1696H60.6152V17.0751H57.6212V14.8698H66.3617Z" fill="white"/>
//   <defs>
//   <filter id="filter0_d_8_32" x="0.746836" y="16.8355" width="78.5063" height="28.1772" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
//   <feFlood flood-opacity="0" result="BackgroundImageFix"/>
//   <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
//   <feOffset dy="0.708861"/>
//   <feGaussianBlur stdDeviation="2.12658"/>
//   <feComposite in2="hardAlpha" operator="out"/>
//   <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
//   <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_8_32"/>
//   <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_8_32" result="shape"/>
//   </filter>
//   </defs>
//   </svg>`;

//   const xicon = `<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
//   <rect x="3.07937" y="3.32352" width="14.1429" height="14.1429" rx="7.07143" stroke="#667085" stroke-width="0.808163"/>
//   <path d="M12.1215 8.76416L8.27637 12.7258" stroke="#667085" stroke-width="0.808163" stroke-linecap="round" stroke-linejoin="round"/>
//   <path d="M12.1228 12.7275L8.27441 8.76172" stroke="#667085" stroke-width="0.808163" stroke-linecap="round" stroke-linejoin="round"/>
//   </svg>`;
// export default function App() {
// //     const [fontsLoaded] = useFonts({
// //     'Inter-Black': require('./assets/fonts/Roboto-Regular.ttf'),
// //   });
//   var currentUser = [{name:"Vighnesh",id:123}];
//   var data = [{name:"Vighnesh",id:1},{name:"Joshua",id:2},{name:"William",id:3},{name:"Bob",id:4},{name:"Johny",id:5},{name:"Abraham",id:6},{name:"Joseph",id:7},{name:"Juan",id:8},{name:"Dave",id:9}];
//   const [userData,setUserData] = useState([]);
//   const [users,setUsers] = useState([]);
//   const [groupName,setGroupName] = useState([]);
//   const [refresh,setRefresh] = useState([]);
//   const [passcode,setPasscode] = useState("");
//   const [searchData,setSearchData] = useState([]);
//   const [text,setText] = useState("");
//   const [searchIndex,setSearchIndex] = useState("");


//   useEffect(() => {
//     setPasscode(generateRandomPasscode());
//     setSearchIndex(-1);
//     setUsers(currentUser);
//     setUserData(data);
//     setSearchData(data);
//   }, [])

//   function finish(){
//     if(groupName.length<=0){
//       Alert.alert("Enter a group name!");
//       return;
//     }
//     else if(groupName.length<5){
//       Alert.alert("Enter a group name of at least 5 characters!");
//       return;
//     }
//     console.log(groupName);

//     var newArray = users.filter(function (user) {
//      return user.id != -1;
//     });
//     console.log(newArray);
//     console.log(passcode);
//     var mesage = "";
//     mesage+="Group Name: " + groupName+"\n"+" Passcode:"+passcode+"\n";
//     for(var x = 0;x<newArray.length;x++){
//       mesage += "Member " + (parseInt(x)+1) + ": " + newArray[x].name + "\n";
//     }
//     Alert.alert(mesage);
//   }

//   function addUser(index,user,uData){
//     const data = {name:"Add a friend",id:-1};
//     users[index + 1] = data;
//     setUsers(users);
//     setRefresh(!refresh);
//   }

//   function assignUser(index,uData){
//     if(uData.name =="No results found"){setSearchIndex(-1);return;}
//       users[index] = uData;
//       var userIndex = userData.findIndex(v => v.id == uData.id);
//       console.log("User index:" + userIndex);
//       userData.splice(userIndex,1);
//       setUserData(userData);
//       console.log(userData);
//       setUsers(users);
//       setRefresh(!refresh);
//       setSearchIndex(-1);
//   }

//   function onType(text){
//     var newArray = userData.filter(function (el) {
//      return el.name.toLowerCase().includes(text.toLowerCase());
//     });
//     if(newArray.length==0){
//       newArray=[{name:"No results found"}];
//     }
//     if(text.length<=0){
//       newArray=[];
//     }
//     setSearchData(newArray);
//     setRefresh(!refresh);
//   }

//   function removeUser(index){
//     setSearchData([]);
//     console.log("Deleting !");
//     console.log(index);
//     userData.push(users[index]);
//     users.splice(index,1);
//     console.log(users);
//     setUsers(users);
//     setRefresh(!refresh);
//   }

//   function copyToClipboard(){
//     console.log("Copying");
//     Clipboard.setStringAsync(passcode);
//     Alert.alert("Copied to clipboard");
//   }

//   return (
//     <SafeAreaView>
//       <View style = {styles.center}>
//         <Logo/>
//       {/* <SvgXml xml = {logo} width='35%' height = '35%'/> */}
//       </View>
//       <Text style = {styles.heading}>Create Group</Text>
//     <View style = {styles.viewContainer}>
//       <View style={styles.container}>

//         <TextInput style={styles.text} placeholder="Group Name" placeholderTextColor="#4F555A" onChangeText={text => {setGroupName(text);}}></TextInput>
//         <SvgXml xml = {xicon} width='100%' height = '100%'/>
//       </View>

//       <View style={styles.container}>

//         <Text style={styles.text}>Passcode : {passcode}</Text>
//         <SvgXml xml = {clipboard} width='100%' height = '100%' onPress={()=>copyToClipboard()}/>
//       </View>

//       <View style={styles.text}>

//       <FlatList
//         data={users}
//         extraData={refresh}
//         renderItem={({ user, index }) => {
//           return (
//             <View>
//             <View style={styles.container}>
//             {index ==0 ? <Text placeholderTextColor="#4F555A"  style={styles.text}>{users[index].name} </Text> : <TextInput placeholderTextColor="#4F555A"  placeholder = {users[index].name } style={styles.text}                
//                  onChangeText={text => {
//                   setSearchIndex(index);
//                   onType(text);
//                 }}></TextInput>}
//             {index!=0 &&
//             <TouchableOpacity onPress={()=>removeUser(index)}>
//             <Text> x </Text>
//             </TouchableOpacity>
//             }
//             </View>
//             <View style ={styles.searchResults}> 

//             {index == searchIndex &&
//             <FlatList
//               data={searchData}
//               extraData={refresh}
//               renderItem={({ item}) => {
//                 return (
//                   <View style={styles.searchItem}>
//                     <TouchableOpacity onPress={()=>assignUser(index,item)}>
//                     <Text placeholderTextColor="#4F555A"  style={styles.text}>{item.name}</Text>
//                     </TouchableOpacity>
//                   </View>
//                 );
//               }}
//             />
//             }
//             <View>
//             {index == users.length -1 ? <TouchableOpacity style={styles.addButton} onPress={()=>addUser(index)}>
//               <Text> + </Text>
//               </TouchableOpacity> : <Text></Text> 
//             }
//             </View>

//             </View>
//             </View>
            
//           );
//         }}
//         />

//         </View>



//         </View>
//         </SafeAreaView>
//         );
// }

// const styles = StyleSheet.create({
//   text:{
//     fontSize:15,
//     color:'#4F555A',
//     placeholderTextColor:'#4F555A',
//   },
//   heading:{
//     marginBottom:100,
//     marginTop:0,
//     left:40,
//     fontWeight: 'bold',
//     fontSize:25,
//     color:'#202020'
//   },
//   container: {
//     flexDirection:'row',
//     borderRadius:8,
//     alignItems: 'center',
//     backgroundColor: '#EAF0F7',
//     width:320,
//     padding: 8,
//     marginBottom:50,
//   },
//   usersContainer: {
//     position:'absolute',
//     justifyContent: 'center',
//     borderRadius:8,
//     height:200,
//     padding: 8,
//   },
//   viewContainer:{
//     flex: 1,
//     justifyContent:'center',
//     alignItems: 'center',
//   },
//   searchItem: {
//     left:25,
//     backgroundColor: '#EAF0F7',
//     width:250,
//   },
//   searchResults:{
//     marginTop:40,
//     position:'absolute',
//     height:200,
//   },
//   button: {
//     textAlign:'center',
//     justifyContent:'center',
//     alignItems: 'center',
//     backgroundColor: '#DDDDDD',
//     width:100,
//     padding: 10,
//   },
//   center:{
//     justifyContent:'center',
//     alignItems: 'center',
//   },
//   addButton:{
//     height:20,
//     width:20,
//     borderRadius:20,
//     color:'##7E869E40',
//     backgroundColor:'#7E869E40'
//   }
// });

import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
// import Clipboard from "@react-native-clipboard/clipboard";
import * as Clipboard from 'expo-clipboard';
import app from "..//Firebase";
import { Input } from "react-native-elements";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import React, { useEffect, useState } from "react";
import {Logo,BottomLayer,BottomBar,AddButton} from "../components/Svgs";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import PermissionPop from "../components/AlertModal";
import * as ImagePicker from "expo-image-picker";
import { BallIndicator } from "react-native-indicators";
import {
    getFirestore,
    collection,
    addDoc,
    setDoc,
    doc,
    
  } from "firebase/firestore";
import { Alert } from "react-native";
const CreateGroup = ({ navigation }) => {
  const [isShow, setisShow] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [image, setimage] = useState(null);
  const [GrouName, setGrouName] = useState("");
  const [Pascode, setPascode] = useState("");
  const [Name, setName] = useState("");
  const [Friend, setFriend] = useState("");
  const [FriendsList, setFriendsList] = useState([]);
  // const Auth = getAuth(app);
  // const db = getFirestore(app);
  useEffect(() => {
    const randomId = Math.floor(10000000 + Math.random() * 90000000).toString();
    setPascode(randomId);
  }, []);
  // console.log(Auth?.currentUser?.uid);

  const onCreatGroup = async () => {
    if (GrouName == "") {
      Alert.alert("Alert!", "Enter Group name");
    } else if (Pascode == "") {
      Alert.alert("Alert!", "Enter Group Passcode");
    } else {
      console.log(GrouName);
      // const userref = collection(db, "groups")
      // console.log(userref);
      // const uniqueId = Math.random().toString(36).substring(2) + Date.now().toString(36)
      // setDoc(doc(db, "groups", uniqueId), {
      //   name: Name,
      //   Pascode: Pascode,
      //   GrouName: GrouName,
      //   FriendsList: FriendsList,
      //   authorEmail: Auth?.currentUser?.email,
      //   authorID: Auth?.currentUser?.uid,
      //   total:0,
      //   uid:uniqueId
      // })
      //   .then((docRef) => {
      //       setFriend("")
      //       setFriendsList([])
      //       setGrouName("")
      //       setName()
      //     navigation.replace("Home");
      //   })
      //   .catch((error) => {
      //     Alert.alert("Sorry!", "Some thing wrong");
      //   });
    }
  };
  function copyToClipboard(){
    Clipboard.setStringAsync(Pascode);
    console.log("Copied!");
  }

  console.log(FriendsList);
  
  return (
    <SafeAreaView>
      <BottomLayer/>
      <BottomBar/>
      <Logo/>
      <TouchableOpacity onPress={() => onCreatGroup()}>
        <AddButton/>
      </TouchableOpacity>
      <View>


        <Text style={styles.myGroup}>Name your group</Text>
        <View style={styles.MyGroupSpace}>
          <Input
            onChangeText={(e) => setGrouName(e)}
            placeholder="Group name"
            inputContainerStyle={{
              borderBottomWidth: 0,
              alignSelf: "center",
              height: 20,
              borderRadius: 10,
              marginTop: 15,
            }}
            containerStyle={{
              backgroundColor: "#dfe9e9",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
            rightIcon={
              <TouchableOpacity
                style={{
                  height: 20,
                  width: 20,
                  borderWidth: 1,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>X</Text>
              </TouchableOpacity>
            }
          />

          <Input
            //For now just keep at passcode
            editable={false}  
            onChangeText={(e) => setPascode(e.replace("Passcode",""))}
            placeholder="Passcode"
            color="#000" 
            value={`Pascode:${Pascode}`}
            inputContainerStyle={{
              borderBottomWidth: 0,
              alignSelf: "center",
              height: 20,
              borderRadius: 10,
              marginTop: 15,
            }}
            containerStyle={{
              backgroundColor: "#dfe9e9",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
            rightIcon={
              <TouchableOpacity onPress={()=>copyToClipboard()}>
                <FontAwesome5 name={"copy"} color={"#9E9E9E"} size={18} />
              </TouchableOpacity>
            }
          />

          <Input
            onChangeText={(e) => setName(e)}
            placeholder="Name"
            inputContainerStyle={{
              borderBottomWidth: 0,
              alignSelf: "center",
              height: 20,
              borderRadius: 10,
              marginTop: 15,
            }}
            containerStyle={{
              backgroundColor: "#dfe9e9",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
            rightIcon={
              <TouchableOpacity
                style={{
                  height: 20,
                  width: 20,
                  borderWidth: 1,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>X</Text>
              </TouchableOpacity>
            }
          />

          <View
            style={{
              height: 55,
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Input
              onChangeText={(e) => setFriend(e)}
              placeholder="Add a Friend with user ID"
              inputContainerStyle={{
                borderBottomWidth: 0,
                alignSelf: "center",
                height: 30,
                borderRadius: 10,
                marginTop: 20,
              }}
              containerStyle={{
                backgroundColor: "#dfe9e9",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                width: "90%",
              }}
              value={Friend}
              rightIcon={
                <TouchableOpacity
                  style={{
                    height: 20,
                    width: 20,
                    borderWidth: 1,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>X</Text>
                </TouchableOpacity>
              }
            />
            <TouchableOpacity
              style={{
                height: 30,
                width: 30,
                left: 10,
                top: 10,
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#dfe9e9",
              }}
              onPress={() => {
                setFriendsList([{...FriendsList,email:Friend}]);
                setFriend("");
              }}
            >
              <FontAwesome5 name="plus" />
            </TouchableOpacity>
          </View>
        </View>


        <View style={styles.bottomLayerConaner}>
        </View>
      </View>
      
      
    </SafeAreaView>
    
  );
};

export default CreateGroup;

const styles = StyleSheet.create({
  Logo: {
    height: "10%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  myGroup: { color: "black", fontWeight: "bold", left: 25, fontSize: 25,top:60, },
  PlusButton: {
    height: 60,
    width: 60,
    borderWidth: 3,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#4461F2",
    alignSelf: "center",
    top: 20,
    shadowColor: "#4461F2",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
  },
  MyGroupSpace: {
    top:80,
    height: "65%",
    width: "90%",
    alignSelf: "center",
    justifyContent: "space-around",
  },
  emptyContainer: {
    height: "36%",
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 20,
  },
  bottomLayerConaner: {
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
    bottom: 10,
  },
});
