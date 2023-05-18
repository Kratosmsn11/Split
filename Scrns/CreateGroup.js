import * as React from 'react';
import { Text, View, StyleSheet, TextInput,FlatList,SafeAreaView,TouchableOpacity,Image,Alert } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useState,useEffect} from 'react';
import {Logo,BottomLayer,BottomBar,AddButton, ContinueButton} from "../components/Svgs";
import { generateRandomPasscode, getAllUsers, randomNumber } from '../backendFiles/firebaseFunctions';
import { createGroup } from '../backendFiles/firebaseFunctions';
import { useNavigation } from '@react-navigation/native';
import { getUserId } from '../AppData';
export default function App() {
  const navigation = useNavigation();

  const [searching, isSearching] = useState(false);
  const [groupName,setGroupName] = useState([]);
  const [passcode,setPasscode] = useState([]);
  const image = 'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg';
  const dummyData = [
  {name:"jOhnP18",color:randomNumber(),id:2,email:'huvafo_nane21@outlook.com',picture:'https://pbs.twimg.com/profile_images/1592134607926972416/yHCOnkwe_400x400.jpg'},
  {name:"iEntriAt",color:randomNumber(),id:3,email:'dozocik-oko94@mail.com',picture:'none'},
  {name:"XiCingEO",color:randomNumber(),id:4,email:'sarefa-tepi47@hotmail.com',picture:'none'},
  {name:"IumEtrON",color:randomNumber(),id:5,email:'juyez_ohuma36@outlook.com',picture:"https://www.localgrapher.com/wp-content/uploads/2019/06/Depositphotos_222091632_l-2015-1-400x400.jpg"},
  {name:"laTerbUi",color:randomNumber(),id:6,email:'celega_heya92@gmail.com',picture:"https://www.bobsonehourphoto.com/wp-content/uploads/2018/11/professional-headshots.jpg"},
  {name:"aAonq",color:randomNumber(),id:7,email:'huvafo_nane21@outlook.com',picture:'none'},
  {name:"bcHs89",color:randomNumber(),id:8,email:'dozocik-oko94@mail.com',picture:'https://pbs.twimg.com/profile_images/1576982151265927169/hgx_6u1V_400x400.jpg'},
  {name:"qdIn23",color:randomNumber(),id:9,email:'sarefa-tepi47@hotmail.com',picture:'https://www.libraryjournal.com/binaries/content/gallery/Jlibrary/lj-sponsored-images/penguinrandomhouse_credit_nina-subin_aup1_400_rev.jpg'},
  ]
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
       newUsers.push(...dummyData);
       const shuffled = newUsers.sort((a, b) => 0.5 - Math.random());
      setUserData(shuffled);
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
    setTimeout(GoHome,2000);
    
  }

  function GoHome(){
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


      <TouchableOpacity onPress={() => finish()} style={{zIndex:1}}>
        <ContinueButton/>
      </TouchableOpacity>


      {!searching &&
      <Logo/>
      }


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

      <View style={{left: 20,top:20,height:500}}>
        <FlatList
          data={searchData}
          extraData={refresh}
          showsVerticalScrollIndicator={true}
          renderItem={({ item, index }) => {
            return (
              <View>
              
              <TouchableOpacity style={{flex:1, flexDirection: 'row',paddingVertical:10,}} onPress ={()=>assignUserData(item)}>
              {item.picture==undefined || item.picture=="none" &&
                <View style={{justifyContent:'center',}}>
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
                }
                {item.picture!=undefined && item.picture!="none" &&
                    <Image style={styles.smallImage} source={{uri: item.picture}}/>
                }

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

      <View style={{height:180}}>

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
              {/* {index > 0 && users.length>1 &&
              <View style={{justifyContent:'center',left:6,}}>
                <TouchableOpacity onPress={()=>removeUser(index)}>
                <FontAwesome5 name={'minus'} size={15} color={'#4F555A'} />
                </TouchableOpacity>
              </View>
              } */}
            </View>
          );
        }}
        />
        </View>
    </View>
    }

    </View>

    <BottomLayer/>
      <BottomBar/>


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
    width:300,
    height:60,
    borderRadius:7
  },
  textInput:{
    color:'#4F555A',
    fontSize:20,
    left:20,
  },
  bg:{
    justifyContent:'center',
    alignContent:'center',
    top:20,
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
    marginHorizontal:10,
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