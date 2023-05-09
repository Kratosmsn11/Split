import * as React from 'react';
import { Text, View, StyleSheet,TextInput, SafeAreaView,TouchableOpacity,Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Logo,BottomLayer,BottomBar,AddButton, ContinueButton, CheckmarkIcon, LeftArrow} from "../components/Svgs";
import { useState,useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { updateUserProfile} from '../backendFiles/firebaseFunctions';
import { getUserInfo,getUserData } from '../AppData';
import { manipulateAsync } from "expo-image-manipulator";
import {firebase} from "../config/firebase";
import { useNavigation } from '@react-navigation/native';
export default function App() {
  const[name,setUsername] = useState("");
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const[phone,setPhone] = useState("");
  const[change,setChanged] = useState(false);
  const[currentPicture,setPicture] = useState("none");
  const[user,setUser] = useState("");
  const [isOwner,setIsOwner] = useState(false);

  const navigation = useNavigation();
  const id = firebase.auth().currentUser.uid;


  // setData();

  function setData(){
    // const id = "No3n3K6b7EhzHhQIxU81I2Mibvg1";
    const data = getUserData();
    console.log(data);

    
    
    setUser(data);
    setPicture(user.picture);
    console.log(user);
    console.log(user.id);
    setIsOwner(user.id == id);
    setUsername(user.name);
    setEmail(user.email);
    setPassword(user.password);
    setPhone(user.phone);
    setPicture(getUserData().picture);
    if(user.picture=="none" || user.picture==undefined){
    setPicture("none");
    }
    else{
      setPicture(user.picture);
    }
  }


  useEffect(() => {
    setData();
    
  }, [])

  function checkChange(){
    console.log("check");
    if(user.name!=name || user.password!=password ||user.email!=email ||user.phone!=phone){
      setChanged(true);
    }
    else{
      setChanged(false);
    }
    if(user.picture!=currentPicture){
      setChanged(true);
    }
  }

  function UpdateAccount(){
    console.log("Hello");
    console.log(name+ password+ email);

    data = {
      name:name,
      password:password,
      email:email,
      picture:currentPicture,
    }
    updateUserProfile(data);
  }

  const pickImage = async () => {
    if(!isOwner){return;}
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setChanged(true);
      setPicture(result.assets[0].uri);

      const manipResult = await manipulateAsync(
        currentPicture,
        [{ resize: { width: 512, height: 512 } }],
        { format: "jpeg", base64: true }
      );
      setPicture(manipResult.uri);
    }
  };

  return (
    <SafeAreaView>
        <View>
        <LeftArrow/>
        </View>
        <BottomLayer/>
        <BottomBar/>

        {change &&
        <TouchableOpacity onPress={() => UpdateAccount()}>
            <CheckmarkIcon/>
        </TouchableOpacity>
        }

        <Logo/>

        
        <View style={styles.container}>
            <TouchableOpacity onPress={() => pickImage()}>
                {currentPicture=="none" &&
                <View style={{
                    width:100,
                    height:100,
                    borderRadius:100,
                    marginHorizontal:10,
                    backgroundColor:user.color,
                    alignContent:'center',
                    alignSelf:'center',
                    justifyContent:'center',
                    bottom:10,
                    shadowColor: '#171717',
                    shadowOffset: {width: 0, height: 4},
                    shadowOpacity: 0.4,
                    shadowRadius: 4,
                }}>
                <View style ={{justifyContent:'center',alignSelf:'center'}}>
                {/* <FontAwesome5 name={'user'}  size={75} color={'white'}/> */}
                <Text style={{
                        fontSize:55,
                        color:'white',
                        textAlign:'center'
                      }}>{name}</Text>
            
                </View>
            
                    </View>
            
                    }
                    {currentPicture!="none"&&
                    <View style={{justifyContent:'center',shadowColor: '#171717',
                    shadowOffset: {width: 0, height: 4},
                    shadowOpacity: 0.4,
                    shadowRadius: 4,}}>
                    
                    <Image source={{uri: currentPicture}} style={styles.image}></Image>
                    </View>
                    
                    }
                    
                    </TouchableOpacity>
              
            <Text style ={{textAlign:'center',textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: {width: 1, height: 1},
                textShadowRadius: 15,}}
            
            >{user.email}</Text>

        <View style ={{alignSelf:'center',justifyContent:'center',alignContent:'center',bottom:50,top:0}}>

            <View style ={{flexDirection:'row',marginVertical:30,justifyContent:'flex-start'}}>
            <View style={{}}>
                <Text style ={{fontSize:20,alignItems:'flex-start',justifyContent:'center',marginHorizontal:30,left:0}}>Username</Text>
            </View>
            <View  style ={{alignItems:'flex-end'}}>
                <View style ={{justifyContent:'center',backgroundColor:'#D9D9D9',borderRadius:10,height:35,width:160,borderWidth:10,borderColor:'#D9D9D9'}}>
                <TextInput style ={{}} onChangeText={(text) => { setUsername(text); checkChange(); } } defaultValue={user.name} editable={isOwner}>
                </TextInput>
                </View>
            </View>
            </View>

            <View style ={{flexDirection:'row',marginVertical:30,justifyContent:'flex-start'}}>
            <View style={{flex:1}}>
                <Text style ={{fontSize:20,alignItems:'flex-start',justifyContent:'center',marginHorizontal:30}}>E-mail</Text>
            </View>
            <View  style ={{flex:1,alignItems:'flex-end'}}>
                <View style ={{justifyContent:'center',backgroundColor:'#D9D9D9',borderRadius:10,height:35,width:160,borderWidth:10,borderColor:'#D9D9D9'}}>
                <TextInput  onChangeText={(text) => { setEmail(text); checkChange(); } }  defaultValue={user.email} editable={isOwner}>
                </TextInput>
                </View>
            </View>
            </View>
            {isOwner &&
              <View style ={{flexDirection:'row',marginVertical:30,justifyContent:'flex-start'}}>
              <View style={{flex:1}}>
                  <Text style ={{fontSize:20,alignItems:'flex-start',justifyContent:'center',marginHorizontal:30}}>Password</Text>
              </View>

                <View  style ={{flex:1,alignItems:'flex-end'}}>
                    <View style ={{justifyContent:'center',backgroundColor:'#D9D9D9',borderRadius:10,height:35,width:160,borderWidth:10,borderColor:'#D9D9D9'}}>
                    <TextInput defaultValue={user.password} style ={{}} onChangeText={(text) => { setPassword(text); checkChange(); } } secureTextEntry={true} editable={isOwner}>
                    </TextInput>
                    </View>
                </View>
              
              </View>
            }
            <View style ={{flexDirection:'row',marginVertical:30,justifyContent:'flex-start'}}>
            <View style={{flex:1}}>
                <Text style ={{fontSize:20,alignItems:'flex-start',justifyContent:'center',marginHorizontal:30}}>Phone</Text>
            </View>
            <View  style ={{flex:1,alignItems:'flex-end'}}>
                <View style ={{justifyContent:'center',backgroundColor:'#D9D9D9',borderRadius:10,height:35,width:160,borderWidth:10,borderColor:'#D9D9D9'}}>
                <TextInput defaultValue={user.phone} style ={{}} onChangeText={(text) => { setPhone(text); checkChange(); } } editable={isOwner}>
                </TextInput>
                </View>
            </View>
            </View>



        </View>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    top:70
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  picture: {
    height:130,
    width:130,
    backgroundColor:'#ecf0f1'
  },
  image:{
    height:130,
    width:130,
    borderRadius:130,
    alignSelf:'center',
    bottom:10,
  }
});