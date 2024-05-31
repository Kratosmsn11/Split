// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React, {useEffect,useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,

  Alert
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation,useFocusEffect } from '@react-navigation/native';

import firebase from 'firebase/compat';

import { DrawerActions } from '@react-navigation/native';
import { getUserInfo,setUsersData,setCurrentProfileView} from '../AppData';
import { getUserData } from '../backendFiles/firebaseFunctions';



const CustomSidebarMenu = (props) => {
  const navigation = useNavigation();
  const [userData,setUserData] = useState("");
  const[currentPicture,setPicture] = useState("none");
  const[email,setEmail] = useState("");
  const[name,setName] = useState("");


  
  function LogoutAlert(){
      Alert.alert('Are you sure you want to log out?', '', [
      {
      text: 'Yes',
        onPress: () => signOutUser()
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  }

  signOutUser = async () => {
      try {
          await firebase.auth().signOut();
      } catch (e) {
          console.log(e);
      }
      navigation.navigate("Login");
  }

  async function setData(){
    const id = firebase.auth().currentUser.uid;
    // console.log(data);
    var defaultData={name:"Default",email:"email@default",color:'red',picture:'none'}
    // setUsersData(data);
    setUserData(defaultData);
    // var data = await getUserData(id);
    await setUserData(await getUserData(id))

    // setEmail(userData.email);
    // setPicture(userData.picture);
    // setName(userData.name);
    // var data = await getUserData(id);
    // console.log(data);
    // setUsersData(data);
    // setUserData(data);
    // setEmail(userData.email);
    // setPicture(userData.picture);
    // setName(userData.name);
    // var data = await getUserData(id);
    // console.log(data);
    // setUsersData(data);
    // setUserData(data);
    // setEmail(userData.email);
    // setPicture(userData.picture);
    // setName(userData.name);
  }


  // useEffect(() => {
  //   setData();
    
  // }, [])

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true

      setData();

      return () => {
        isActive = false
      }
    }, []),
  )

  async function clickProfile(){
    setCurrentProfileView(await getUserData(firebase.auth().currentUser.uid));
    navigation.navigate("UserProfile");
  }


  


  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/*Top Large Image */}


      <DrawerContentScrollView {...props}>
      <TouchableOpacity
            onPress={() => {
              clickProfile();
            }}
            > 
      
      <View style={{height:140,width:250,backgroundColor:'#D9D9D9',alignSelf:'center',borderRadius:20,justifyContent:'center',paddingBottom:20}}>

      {userData.picture=="none" &&
      
      <View style={{height:80,width:80,backgroundColor:userData.color,alignSelf:'center',borderRadius:80,justifyContent:'center',alignContent:'center',alignItems:'center',shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.4,
                    shadowRadius: 4,

                    elevation: 5,}}>
                      <Text style ={{fontSize:30,color:'white'}}>{userData.name == undefined ?'F':userData.name[0]}</Text>
      {/* <FontAwesome5Icon
                  name={"user-alt"}
                  color={"white"}
                  size={40}
            /> */}
      
      </View>
       }

      {userData.picture!="none" &&
          <Image style = {styles.smallImage} source={{uri: userData.picture}}></Image>

      }
      <Text style={{textAlign:'center',top:10,  textShadowColor: 'rgba(0, 0, 0, 0.45)',
  textShadowOffset: {width: -1, height: 0.7},
  textShadowRadius: 10}}>{userData.email}</Text>
      
      
      </View>
      </TouchableOpacity>
        <DrawerItemList {...props} />
        <TouchableOpacity onPress={() => {[navigation.dispatch(DrawerActions.closeDrawer()),navigation.navigate("Sidebar")]
            }}>

        <View style={styles.customItem}>
          <View style={{marginRight:5}}>
          <FontAwesome5Icon
                  name={"home"}
                  color={"black"}
                  size={24}
          />

          </View>

          <View>
          <Text style = {styles.sideBarOptions}>
            Home
          </Text>
          </View>
          

        </View>
        </TouchableOpacity>
        

        <TouchableOpacity onPress={() => {
              [navigation.dispatch(DrawerActions.closeDrawer()),navigation.navigate("UserProfile")]
            }}>
            <View style={styles.customItem}>
            <View style={{marginRight:5}}>
          <FontAwesome5Icon
                  name={"user-alt"}
                  color={"black"}
                  size={24}
          />
          </View>
          <Text
          style = {styles.sideBarOptions}
>
            Profile
          </Text>

        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          [navigation.dispatch(DrawerActions.closeDrawer()),navigation.navigate("About")]
        }}>
          <View style={styles.customItem}>
          <View style={{marginLeft:5,marginRight:13}}>
          <FontAwesome5Icon
                  name={"info"}
                  color={"black"}
                  size={24}
          />
          </View>
            <Text
              style = {styles.sideBarOptions}>
              About
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          [LogoutAlert()]}}>
        <View style={styles.customItem}>
        <View style={{marginLeft:0,marginRight:5}}>
          <FontAwesome5Icon
                  name={"sign-out-alt"}
                  color={"black"}
                  size={24}
          />
          </View>
          <Text style = {styles.sideBarOptions}>
            Logout
          </Text>
        </View>
        </TouchableOpacity>
      </DrawerContentScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    width:400,
    alignItems: 'center',
  },
  sideBarOptions:{
      fontWeight:'bold',
      fontSize:20
  },
  smallImage:{
    width:100,
    height:100,
    borderRadius:100,
    alignSelf: 'center',
    justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
  },
});

export default CustomSidebarMenu;