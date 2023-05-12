import * as React from 'react';
import {useState,useEffect} from 'react';
import {Text,View,StyleSheet,SafeAreaView,TouchableOpacity,FlatList,TextInput,Alert,Modal,Pressable,Image,TouchableWithoutFeedback,Swipeable,ActivityIndicator} from 'react-native';
import { BottomSheet } from 'react-native-btr';
import { useNavigation } from '@react-navigation/native';
import { AddButton, BottomBar, BottomLayer, Logo,ContinueButton, LeftArrow } from '../components/Svgs';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { getTransactionTotal, getUserSpending, setTransactionTotal, setUserSpending, getUsers, getImageURI,getImageURL,getReceiptURL,setTransactionName,setTransactionDescription } from '../AppData';
import { getReceiptData } from '../backendFiles/firebaseFunctions';
import { ScrollView } from 'react-native-gesture-handler';
import { set } from 'firebase/database';

export default function App() {
  const[name,setName] = useState("");
  const[description,setDescription] = useState("");

  const navigation = useNavigation();

  function GoNextPage(){
    if(name.length <=0){
      Alert.alert("Add a name!");
      return;
    }
    if(description.length<=0){
      setDescription("No description.");
    }
    setTransactionName(name);
    setTransactionDescription(description);
    setName("");
    setDescription("");
    navigation.navigate("TransactionOption")
  }


  useEffect(() => {

  }, [])
  return (
    <SafeAreaView>
        <BottomLayer/>
        <BottomBar/>
        <View><LeftArrow></LeftArrow></View>
        <TouchableOpacity onPress={() => GoNextPage()}>
            <ContinueButton/>
        </TouchableOpacity>
        <Logo/>
        <View style ={{justifyContent:'center',alignContent:'center',alignItems:'center',alignSelf:'center',top:100}}>
          <Text style={{fontSize:20,fontWeight:'bold',alignSelf:'flex-start',paddingBottom:30,bottom:20}}>Start Transaction</Text>

        <View style ={{justifyContent:'center',backgroundColor:'#EAF0F7',borderRadius:10,height:40,width:260,borderWidth:10,borderColor:'#EAF0F7'}}>
                    <TextInput placeholder='Name' placeholderTextColor={'#4F555A'} style ={{fontSize:20,justifyContent:'center'}} onChangeText={setName}>
                    </TextInput>
        </View>

        <View style ={{backgroundColor:'#EAF0F7',borderRadius:10,height:35,width:260, height:180,borderWidth:10,borderColor:'#EAF0F7',top:40}}>
                    <TextInput placeholder='Description (optional)' placeholderTextColor={'#4F555A'} multiline={true} maxLength={100} style ={{fontSize:20}} onChangeText={setDescription} blurOnSubmit={true}>
                    </TextInput>
        </View>



        </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

});