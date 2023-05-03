// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React from 'react';
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
import { useNavigation } from '@react-navigation/native';

import firebase from 'firebase/compat';

import { DrawerActions } from '@react-navigation/native';


const CustomSidebarMenu = (props) => {
  const navigation = useNavigation();
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
    console.log("Log out");
  


  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/*Top Large Image */}


      <DrawerContentScrollView {...props}>
      <TouchableOpacity
            onPress={() => {
              navigation.navigate("UserProfile");
            }}
            > 
      <View style={{height:100,width:200,backgroundColor:'#D9D9D9',alignSelf:'center',borderRadius:20,justifyContent:'center',paddingBottom:20}}>
      <View style={{height:60,width:60,backgroundColor:'#73FF33',alignSelf:'center',borderRadius:60,justifyContent:'center',alignContent:'center',alignItems:'center',shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.4,
                    shadowRadius: 4,

                    elevation: 5,}}>
      <FontAwesome5Icon
                  name={"user"}
                  color={"white"}
                  size={40}
            />
      </View>
      <Text style={{textAlign:'center',top:10,  textShadowColor: 'rgba(0, 0, 0, 0.45)',
  textShadowOffset: {width: -1, height: 0.7},
  textShadowRadius: 10}}>william@csumb.edu</Text>
      
      
      </View>
      </TouchableOpacity>
        <DrawerItemList {...props} />

        <View style={styles.customItem}>
          <Text
          style = {styles.sideBarOptions}
            onPress={() => {[navigation.dispatch(DrawerActions.closeDrawer()),navigation.navigate("Sidebar")]
            }}>
            Home
          </Text>

        </View>
        <TouchableOpacity onPress={() => {
              [navigation.dispatch(DrawerActions.closeDrawer()),navigation.navigate("UserProfile")]
            }}>
            <View style={styles.customItem}>
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
            <Text
              style = {styles.sideBarOptions}>
              About
            </Text>
          </View>
        </TouchableOpacity>
                      <View style={styles.customItem}>
          <Text
            style = {styles.sideBarOptions}
            onPress={() => {
              LogoutAlert();
            }}>
            Logout
          </Text>

        </View>
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
    alignItems: 'center',
  },
  sideBarOptions:{
      fontWeight:'bold',
  }
});

export default CustomSidebarMenu;