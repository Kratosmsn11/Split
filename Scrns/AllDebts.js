import React ,{useState,useEffect} from 'react';
import {Text, TouchableOpacity, View,FlatList,StyleSheet,Modal,Pressable,TextInput,Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {GetGroupData, GetGroupTransactions,GetGroupDebts} from '../backendFiles/firebaseFunctions';
import { SafeAreaView } from 'react-native-safe-area-context';
import {getGroupId,getGroupInfo,setGroupId,getUserInfo, GetGroupDebtsAll} from '../AppData';
import { useFocusEffect } from '@react-navigation/native';
const AllDebts = () => {
  const navigation = useNavigation();
  const [groupDebts,setGroupDebts] = useState("");
  const [paymentModal, setPaymentModalVisible] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("0.00");
  const [debt, setDebt] = useState("");
  var dummyData = [{owerName:"Joseph",lenderName:"Joshua",total:5.55},{owerName:"Joseph",lenderName:"Vighnesh",total:10.17}]

  useEffect(() => {
    getData();
  }, [])

  const getData = async () =>{
    setGroupDebts(GetGroupDebtsAll());
    console.log(GetGroupDebtsAll());
  }

  const pay = ()=>{
    console.log("You payed" + paymentAmount);
    console.log("For the debt from" + debt.owerName + "to" + debt.lenderName);
    var newPayment = (debt.total - paymentAmount).toFixed(2);
    if(newPayment<0){
      Alert.alert("Payment unsuccessful, exceeds charges");
    }
    else if(newPayment==0){
      Alert.alert("Debt settled!");
    }
    else{
      Alert.alert("Payment made, you now owe " + debt.lenderName +  " $" + newPayment)
    }
    setPaymentModalVisible(false);
    setPaymentAmount("0.00");
  }

  const setModal = (debt)=>{
    setDebt(debt);
    setPaymentModalVisible(true)
  }
  
  return (
    <SafeAreaView style = {styles.align}>
      <View style = {styles.align}>
        <Text>{"\n\n"}</Text>

        <Text>All transactions</Text>
        <Text>{"\n\n"}</Text>

        <FlatList
        style = {styles.list}
        data={dummyData}
        renderItem={({item}) => <View style ={styles.item}><Text>{item.owerName} {"- ->"} {item.lenderName} ${item.total}</Text><TouchableOpacity onPress={()=>setModal(item)}><Text>Pay</Text></TouchableOpacity></View>}
      />
      </View>


      <Modal
        animationType="fade"
        transparent={true}
        visible={paymentModal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setPaymentModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Make a payment</Text>
            <Text>You owe {debt.lenderName} {"\n"} ${debt.total}</Text>
            <View style = {styles.modalContent}>
                <TextInput style={styles.input} onChangeText={setPaymentAmount} placeholder="0.00"placeholderTextColor="black"></TextInput>
            </View>
            <Pressable
              style={[styles.button2, styles.buttonClose]}
              onPress={() => pay()}>
              <Text style={styles.textStyle}>Pay</Text>
            </Pressable>
            <Pressable
              style={[styles.button2, styles.buttonClose]}
              onPress={() => setPaymentModalVisible(false)}>
              <Text style={styles.textStyle}>Cancel</Text>
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
    height:260,
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
  },
  input: {
    height: 40,
    width:200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  item: {
    backgroundColor: '#D9D9D9',
    padding: 20,
    marginVertical: 6,
    marginHorizontal: 20,
    width:500,
  },

});

export default AllDebts;