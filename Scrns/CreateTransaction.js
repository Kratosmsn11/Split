import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button,Image,Alert,TouchableOpacity,ScrollView,SafeAreaView,FlatList,Modal,Pressable,TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Camera, CameraType} from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { createTransaction } from '../backendFiles/firebaseFunctions';
import {getUsers,getGroupId,getReceiptData,getGroupInfo, getUsersIds} from '../AppData';
import {calculateDebts} from '../backendFiles/SplittingAlgorithm';

const CreateTransaction = () => {
  const navigation = useNavigation();
  const [users,setUsers] = useState("");
  const [groupId,setGroupId] = useState("");
  const [itemData,setItemData] = useState("");
  const [userData,setUserData] = useState("");
  const [total,setTotal] = useState("");
  const [userSpending,setUserSpending] = useState("");
  const [userPaying,setUserPaying] = useState("");
  const [transactionName,setTransactionName] = useState("");
  useEffect(() => {
    setUserData(getUsers());
    const data = getReceiptData();
    setTotal(data['total']);
    setItemData(data['items']);
    console.log(getUsersIds());
  }, [])


  function submitTransaction(){
    const userBill = total/userData.length;
    if(itemData.length<=0){
      Alert.alert("Need at least one item");
    }
    else{
      Alert.alert("Transaction created");
    }
    var spending = [];
    for(var x = 0; x < userData.length;x++){
      spending[x] = userBill;
    }
    var paying = [];
    paying[0] = parseFloat(total);
    for(var x = 1; x < userData.length;x++){
      paying[x] = 0;
    }
    var debts = calculateDebts(spending,paying,getUsersIds());
    console.log(debts);
    
    console.log(getGroupId());

    var currentTotal = getGroupInfo()['total'];
    console.log("Current total:" + currentTotal);

    createTransaction(transactionName,total,getGroupId(),debts,currentTotal)
    navigation.navigate("Transaction");
  }

  const Item = ({name,price}) => (
    <TouchableOpacity><View style={styles.item}><Text>{name}</Text><Text>${price}</Text></View></TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.headers}>Expenses</Text>
      <FlatList
      style={styles.FlatList}
        data={itemData}
        renderItem={({item}) =><Item name={item.name} price ={item.price}  />}
      />
      <View>
      <Text style={styles.headers}>Total:{total}</Text>
      </View>
      <View style={styles.center}>
      <Text>{"\n\n\n\n\n\n\n\n"}</Text>
      
      <View style={styles.centerButton}>
        <TextInput placeholder='Enter name' style={styles.input} onChangeText={setTransactionName}></TextInput>
        <TouchableOpacity style={styles.button}  onPress={()=> submitTransaction()}>
          <Text style={styles.text}>Finish</Text>
        </TouchableOpacity>
      </View>
      </View>
      </View>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    width:100,
    alignItems: 'center',
    backgroundColor: '#00bfff',
    padding: 10,
  },
  item: {
    backgroundColor: '#D9D9D9',
    padding: 20,
    marginVertical: 6,
    marginHorizontal: 20,
  },
  text:{
    fontSize:20,
    textAlign:'center'
  },
  center:{
    justifyContent:'center',
    alignContent:'center',
    position: 'relative',
  },
  centerButton:{
    justifyContent:'center',
    alignContent:'center',
    position: 'relative',
  },
  headers:{
    textAlign:'center',
    fontSize:20,
    fontWeight:'bold'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  FlatList:{
    height:300,
  }
});

export default CreateTransaction;