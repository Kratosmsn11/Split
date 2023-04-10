import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, TextInput,TouchableOpacity,FlatList,Clipboard,Alert} from 'react-native';
import Constants from 'expo-constants';
import {useState,useEffect} from 'react';
import {generateRandomPasscode} from '../backendFiles/firebaseFunctions';
import { SvgUri } from 'react-native-svg';
import { useFonts } from 'expo-font';
import {SvgTest} from '../SvgFiles/SvgTest';
import { SvgXml } from "react-native-svg";

const clipboard = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 3H9C6.79086 3 5 4.79086 5 7V15" stroke="#33363F" stroke-width="2"/>
  <path d="M9 11.5C9 10.304 9.00149 9.49062 9.0712 8.87226C9.13864 8.27406 9.25916 7.98334 9.41329 7.78248C9.51969 7.64381 9.64381 7.51969 9.78248 7.41329C9.98334 7.25916 10.2741 7.13864 10.8723 7.0712C11.4906 7.00149 12.304 7 13.5 7C14.696 7 15.5094 7.00149 16.1277 7.0712C16.7259 7.13864 17.0167 7.25916 17.2175 7.41329C17.3562 7.51969 17.4803 7.64381 17.5867 7.78248C17.7408 7.98334 17.8614 8.27406 17.9288 8.87226C17.9985 9.49062 18 10.304 18 11.5V15.5C18 16.696 17.9985 17.5094 17.9288 18.1277C17.8614 18.7259 17.7408 19.0167 17.5867 19.2175C17.4803 19.3562 17.3562 19.4803 17.2175 19.5867C17.0167 19.7408 16.7259 19.8614 16.1277 19.9288C15.5094 19.9985 14.696 20 13.5 20C12.304 20 11.4906 19.9985 10.8723 19.9288C10.2741 19.8614 9.98334 19.7408 9.78248 19.5867C9.64381 19.4803 9.51969 19.3562 9.41329 19.2175C9.25916 19.0167 9.13864 18.7259 9.0712 18.1277C9.00149 17.5094 9 16.696 9 15.5V11.5Z" stroke="#33363F" stroke-width="2"/>
  </svg>`;
export default function App() {
//     const [fontsLoaded] = useFonts({
//     'Inter-Black': require('./assets/fonts/Roboto-Regular.ttf'),
//   });
  var currentUser = [{name:"Vighnesh",id:123}];
  var data = [{name:"Vighnesh",id:1},{name:"Joshua",id:2},{name:"William",id:3},{name:"Bob",id:4},{name:"Johny",id:5},{name:"Abraham",id:6},{name:"Joseph",id:7},{name:"Juan",id:8},{name:"Dave",id:9}];
  const [userData,setUserData] = useState([]);
  const [users,setUsers] = useState([]);
  const [groupName,setGroupName] = useState([]);
  const [refresh,setRefresh] = useState([]);
  const [passcode,setPasscode] = useState("");
  const [searchData,setSearchData] = useState([]);
  const [text,setText] = useState("");
  const [searchIndex,setSearchIndex] = useState("");


  useEffect(() => {
    setPasscode(generateRandomPasscode());
    setSearchIndex(-1);
    setUsers(currentUser);
    setUserData(data);
    setSearchData(data);
  }, [])

  function finish(){
    if(groupName.length<=0){
      Alert.alert("Enter a group name!");
      return;
    }
    else if(groupName.length<5){
      Alert.alert("Enter a group name of at least 5 characters!");
      return;
    }
    console.log(groupName);

    var newArray = users.filter(function (user) {
     return user.id != -1;
    });
    console.log(newArray);
    console.log(passcode);
    var mesage = "";
    mesage+="Group Name: " + groupName+"\n"+" Passcode:"+passcode+"\n";
    for(var x = 0;x<newArray.length;x++){
      mesage += "Member " + (parseInt(x)+1) + ": " + newArray[x].name + "\n";
    }
    Alert.alert(mesage);
  }

  function addUser(index,user,uData){
    const data = {name:"Add a friend",id:-1};
    users[index + 1] = data;
    setUsers(users);
    setRefresh(!refresh);
  }

  function assignUser(index,uData){
    if(uData.name =="No results found"){setSearchIndex(-1);return;}
      users[index] = uData;
      var userIndex = userData.findIndex(v => v.id == uData.id);
      console.log("User index:" + userIndex);
      userData.splice(userIndex,1);
      setUserData(userData);
      console.log(userData);
      setUsers(users);
      setRefresh(!refresh);
      setSearchIndex(-1);
  }

  function onType(text){
    var newArray = userData.filter(function (el) {
     return el.name.toLowerCase().includes(text.toLowerCase());
    });
    if(newArray.length==0){
      newArray=[{name:"No results found"}];
    }
    if(text.length<=0){
      newArray=[];
    }
    setSearchData(newArray);
    setRefresh(!refresh);
  }

  function removeUser(index){
    setSearchData([]);
    console.log("Deleting !");
    console.log(index);
    userData.push(users[index]);
    users.splice(index,1);
    console.log(users);
    setUsers(users);
    setRefresh(!refresh);
  }

  function copyToClipboard(){
    Clipboard.setString(passcode);
  }

  return (
    <SafeAreaView>
      <Text style = {styles.heading}>Create Group</Text>
    <View style = {styles.viewContainer}>
      <View style={styles.container}>
      <SvgXml xml = {clipboard} width='50%' height = '50%'/>

        <TextInput style={styles.text} placeholder="Group Name" placeholderTextColor="#4F555A" onChangeText={text => {setGroupName(text);}}></TextInput>
      </View>

      <View style={styles.container}>

        <Text style={styles.text}>Passcode: {passcode}</Text>
      </View>

       <FlatList
        data={users}
        extraData={refresh}
        renderItem={({ user, index }) => {
          return (
            <View>
            <View style={styles.container}>
            {index ==0 ? <Text style={styles.text}>{users[index].name}</Text> : <TextInput placeholder = {users[index].name } style={styles.text}                
                 onChangeText={text => {
                  setSearchIndex(index);
                  onType(text);
                }}></TextInput>}
            {index!=0 &&
            <TouchableOpacity onPress={()=>removeUser(index)}>
            <Text> x </Text>
            </TouchableOpacity>
            }
            </View>
            <View> 

            {index == searchIndex &&
            <FlatList
              data={searchData}
              extraData={refresh}
              renderItem={({ item}) => {
                return (
                  <View style={styles.searchItem}>
                    <TouchableOpacity onPress={()=>assignUser(index,item)}>
                    <Text style={styles.text}>{item.name}</Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
            }
            {index == users.length -1 ? <TouchableOpacity onPress={()=>addUser(index)}>
              <Text> + </Text>
              </TouchableOpacity> : <Text></Text> 
            }

            </View>
            </View>
            
          );
        }}
        />


        </View>
        </SafeAreaView>
        );
}

const styles = StyleSheet.create({
  text:{
    fontSize:15,
    color:'#4F555A',
    placeholderTextColor:'#4F555A',
  },
  heading:{
    marginBottom:200,
    marginTop:100,
    left:40,
    fontWeight: 'bold',
    fontSize:25,
    color:'#202020'
  },
  container: {
    justifyContent: 'center',
    borderRadius:8,
    backgroundColor: '#EAF0F7',
    height:50,
    width:320,
    padding: 8,
    marginBottom:50,
  },
  viewContainer:{
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
  },
  searchItem: {
    left:25,
    backgroundColor: '#EAF0F7',
    width:250,

  },
  button: {
    textAlign:'center',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    width:100,
    padding: 10,
  },
});