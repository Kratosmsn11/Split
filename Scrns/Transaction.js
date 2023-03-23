import React ,{useState,useEffect} from 'react';
import {Text, TouchableOpacity, View,FlatList,StyleSheet,Modal,Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {GetGroupData, GetGroupTransactions,GetGroupDebts} from '../backendFiles/firebaseFunctions';
import { SafeAreaView } from 'react-native-safe-area-context';
import {getGroupId,getGroupInfo,setGroupId,getUserInfo} from '../AppData';
import { useFocusEffect } from '@react-navigation/native';
const Transaction = () => {
  const navigation = useNavigation();
  const [groupName,setGroupName] = useState("");
  const [userName,setUserName] = useState("");
  const [groupTotal,setGroupTotal] = useState("");
  const [groupTransactions,setGroupTransactions] = useState("");
  const [groupDebts,setGroupDebts] = useState("");
  const [transactionModal, setTransactionModalVisible] = useState(false);
  const [settleDebtsModel, setSettleDebtsModalVisible] = useState(false);
  const itemCount = 3;

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    return unsubscribe;
  }, []);
  // useEffect(() => {
  //   getData();
  // }, [])

  const getData = async () =>{
    const groupId = getGroupId();
    var data = await GetGroupData(groupId);
    setGroupName(data['name']);
    setGroupTotal(data['total']);
    setGroupId(groupId);
    setGroupTransactions(await GetGroupTransactions(groupId));
    setGroupDebts(await GetGroupDebts(groupId));
    setUserName(getUserInfo()['name']);
  }


  
  return (
    <SafeAreaView style = {styles.align}>
    <View style = {styles.align}>
    <TouchableOpacity style = {styles.buttonNormal} onPress={()=>[navigation.navigate("Groups")] }><View><Text>Home</Text></View></TouchableOpacity>
    <Text>User: {userName}</Text>
    <Text>{"\n\n"}</Text>
      <View style = {styles.contentBoxes}>
      <Text style = {styles.heading}>{groupName}</Text> 
      <Text>{"\n\n"}</Text>
      <Text style = {styles.subheadings}>Transactions</Text>

      <TouchableOpacity onPress={()=>setTransactionModalVisible(true)}>
      <FlatList
        style = {styles.list}
        data={groupTransactions.slice(0,itemCount)}
        renderItem={({item}) => <View><Text>{item.name}   ${item.total}</Text></View>}
      />
      </TouchableOpacity>
      </View>
      
      <View style = {styles.contentBoxes}>
      <Text style = {styles.subheadings}>Settle Debts</Text>
      <TouchableOpacity onPress={()=>setSettleDebtsModalVisible(true)}>
      <FlatList
        style = {styles.list}
        data={groupDebts.slice(0,itemCount)}
        renderItem={({item}) => <View style = {styles.text}><Text>{item.owerName} {"- ->"} {item.lenderName}  ${item.total}</Text></View>}
      />
      </TouchableOpacity>
      </View>
      <View style = {styles.contentBoxes}>
      <Text style = {styles.subheadings}>Total Expense</Text>
      <Text>${groupTotal}</Text>
      </View>
      <View style = {styles.alignButton}>
        <TouchableOpacity style = {styles.button} onPress={()=>[navigation.navigate("TransactionOption")] }><Text></Text></TouchableOpacity>
      </View>
    </View>

    <Modal
        animationType="fade"
        transparent={true}
        visible={transactionModal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setTransactionModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>All transactions</Text>
            <View style = {styles.modalContent}>
            <FlatList
              style = {styles.list}
              data={groupTransactions}
              renderItem={({item}) => <View><Text>{item.name}  ${item.total}</Text></View>}
            />
            </View>
            <Pressable
              style={[styles.button2, styles.buttonClose]}
              onPress={() => setTransactionModalVisible(false)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>


      <Modal
        animationType="fade"
        transparent={true}
        visible={settleDebtsModel}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setSettleDebtsModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>All debts</Text>

            <View style = {styles.modalContent}>
            <FlatList
              style = {styles.list}
              data={groupDebts}
              renderItem={({item}) => <View style = {styles.text}><Text>{item.owerName} {"-->"} {item.lenderName}  ${item.total}</Text></View>}
            />
            </View>
            <Pressable
              style={[styles.button2, styles.buttonClose]}
              onPress={() => setSettleDebtsModalVisible(false)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonNormal: {
    width:100,
    alignItems: 'center',
    backgroundColor: '#00bfff',
    padding: 10,
  },
  list:{
    width:300,
    height:100
  },
  align:{
    bottom:20,
    left:30,
    flex: 1,
    justifyContent:'center',
    alignContent:'center',
    textAlign:'center',
    height:100,
  },
  alignButton:{
    justifyContent:'center',
    alignContent:'center',
    top:60,
    left:80,
  },
  contentBoxes:{
    justifyContent:'center',
    alignContent:'center',
    textAlign:'center',
    height:150,
  },
  heading:{
    fontSize:25,
  },
  subheadings:{
    fontSize:20,
  },
  text:{
    textAlign:'center',
  },
  button:{
    width:100,
    height:100,
    // backgroundColor:'#4461F2',
    borderWidth:10,
    borderColor:'#4461F2',
    borderRadius:100,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width:300,
    height:400,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button2: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalContent:{
    left:30,
  }

});

export default Transaction;