import * as React from 'react';
import { Text, View, StyleSheet,TextInput,SafeAreaView, TouchableOpacity, Alert} from 'react-native';
import { BottomBar, BottomLayer,Logo,CheckmarkIcon } from '../components/Svgs';
import { useEffect, useState } from "react";
import { joinGroup } from '../backendFiles/firebaseFunctions';
import { useNavigation } from '@react-navigation/native';
export default function App() {
  const navigation = useNavigation();
  const [passcode,setPasscode] = useState("");
  const passcodeLength = 6;
  const userId = "No3n3K6b7EhzHhQIxU81I2Mibvg1";
  async function Join(){
    console.log(passcode);
    if(passcode.length > passcodeLength){
        Alert.alert("Passcode invalid!");
    }
    else{
        var x = await joinGroup(passcode, userId);
        if(x==0){
            Alert.alert("You are already in the group!");
        }
        else if(x==1){
            navigation.navigate("Home");
            // Alert.alert("You have joined the group!");
        }
        else if(x==2){
            Alert.alert("Group does not exist!");
        }
    }
  }
  return (
    <SafeAreaView>
        <Logo/>
        <BottomLayer/>
        <BottomBar/>
        <View>
            <TouchableOpacity onPress={() => Join()}>
                <CheckmarkIcon/>
            </TouchableOpacity>
        </View>
        <View style={{alignSelf:'flex-start'}}><Text style={styles.header}>Join a group</Text></View>
        <View style={styles.inputContainer}>
        <TextInput placeholder="Group code" style={styles.input} maxLength={6} onChangeText={setPasscode} value={passcode}></TextInput>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    top:300,
    justifyContent: 'center',
    alignItems:'center',
  },
  header:{
    fontSize:20,
    top:80,
    fontWeight:'bold',
    left:60
  },
  inputContainer:{
    top:250,
    justifyContent: 'center',
    alignSelf:'center',
    alignItems:'center',
    width:275,
    height:60,
    backgroundColor:'#EAF0F7',
    borderColor:'#EAF0F7',
    borderWidth:10,
    borderRadius:10,
  },
  input:{
    color:'#4F555A',
    fontSize:30,
  },
});