import React ,{useState,useEffect} from 'react';
import {Text, TouchableOpacity, View,FlatList,StyleSheet,Modal,Pressable,TextInput,Alert,ScrollView,TouchableWithoutFeedback,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {GetGroupData, GetGroupTransactions,GetGroupDebts, randomNumber} from '../backendFiles/firebaseFunctions';
import { SafeAreaView } from 'react-native-safe-area-context';
import {getGroupId,getGroupInfo,setGroupId,getUserInfo, GetGroupDebtsAll, GetGroupTransactionsAll} from '../AppData';
import { useFocusEffect } from '@react-navigation/native';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import {Logo,BottomBar,BottomLayer, AddButton, LeftArrow, A} from "../components/Svgs";
import { FadeIn } from 'react-native-reanimated';
const AllTransactions = () => {
  const navigation = useNavigation();
  const [groupTransactiions,setGroupTransactions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(false);
  var dummyData = [{owerName:"Joseph",lenderName:"Joshua",total:5.55},{owerName:"Joseph",lenderName:"Vighnesh",total:10.17},{owerName:"Joseph",lenderName:"Joshua",total:5.55},{owerName:"Joseph",lenderName:"Vighnesh",total:10.17},{owerName:"Joseph",lenderName:"Joshua",total:5.55},{owerName:"Joseph",lenderName:"Vighnesh",total:10.17}]


  useEffect(() => {
    getData();
  }, [])

  const getData = async () =>{
    setGroupTransactions(GetGroupTransactionsAll());
    console.log(groupTransactiions);
  }

  const Transaction = ({transaction,index}) => (
    <View style = {styles.flexContainer}>
    {transaction.highestPayerPicture=="none" &&
    <View style={{
                width:55,
                height:55,
                borderRadius:55,
                marginHorizontal:10,
                backgroundColor:transaction.highestPayerColor,
                alignContent:'center',
                justifyContent:'center',
              }}>

              <Text style={{
                fontSize:30,
                color:'white',
                textAlign:'center'
              }}>{transaction.highestPayerName[0]}</Text>
    </View>
    }

    {transaction.highestPayerPicture!="none" &&

        <Image source={{uri: transaction.highestPayerPicture}} style={styles.image}></Image>

    }


    <View style={{}}>
    <Text style={{color:'#4F555A'}}>{transaction.name}</Text>
        <Text style={{color:'#4F555A',left:50,fontWeight:'bold',fontSize:20}}>${parseFloat(transaction.total).toFixed(2)}</Text>
    </View>
</View>

);

function ClickAway(){

  setModalVisible(false);
}

function clickItem(item){
  setModalVisible(true);
  console.log(item.date);
  item.date = convertDate(item.date);
  setCurrentItem(item);
}

function convertDate(time) {
  return new Date(time.seconds * 1000).toDateString();
  }


const TransactionModal = ({}) => (
  <Modal
  animationType="slide"
  visible={modalVisible}
  presentationStyle='fullScreen'
  onRequestClose={() => {
    Alert.alert('Modal has been closed.');
    setModalVisible(false);
  }}>

<TouchableOpacity onPress ={()=>setModalVisible(!modalVisible)}>
          <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',alignSelf:'center',top:30,right:140,width:200,height:100}}>
        <FontAwesome5Icon
                  name={"angle-down"}
                  color={"#9E9E9E"}
                  size={40}
        />
        </View>
        </TouchableOpacity>

  <TouchableWithoutFeedback onPress={() => ClickAway()}>
    <View style={styles.modalOverlay} />
  </TouchableWithoutFeedback>
  <View style={styles.centeredView}>
    <View style={styles.modalView}>
      <View style = {styles.modalContent}>

      <Text style={{textAlign:'right',alignSelf:'flex-end',fontWeight:'bold',color:'#4F555A'}}>{currentItem.date}</Text>
        <Text style={{fontWeight:'bold',fontSize:17,marginBottom:20}}>{currentItem.name}</Text>
       
        <View style={{height:80,width:300,backgroundColor:'#EAF0F7',alignSelf:'flex-start',marginBottom:50,padding:20}}>
          <Text style={{color:'#4F555A',left:0,top:0}}>{currentItem.description =="" ? "No description added.":currentItem.description}</Text>
        </View>
        {currentItem.receipt != "Manual transaction" &&
          <Image source={{uri:currentItem.receipt}} style={styles.receiptImage} resizeMode='stretch'></Image>
        }

        {currentItem.receipt == "Manual transaction" &&
          <View style={styles.emptyImage}>
            <Text style={{width:200,color:'#4F555A',textAlign:'center'}}>No receipt. Transaction was created manually.</Text>
          </View>
        }
        <View  style={{backgroundColor:'#EAF0F7',alignContent:'center',justifyContent:'center',alignItems:'center',width:130,top:40,height:60,borderRadius:10}}>
          <Text style={{fontWeight:'bold',fontSize:30,alignSelf:'center',justifyContent:'center'}}>${parseFloat(currentItem.total).toFixed(2)}</Text>
        </View>
        

        
      </View>
    </View>
  </View>
</Modal>

);


  
  return (
    <SafeAreaView>
      <Logo/>
      <BottomLayer/>
      <BottomBar/>
      <View><LeftArrow></LeftArrow></View>
      <TouchableOpacity onPress={() => navigation.navigate("TransactionOption")}>
          <AddButton></AddButton>
      </TouchableOpacity>
      <View style = {styles.align}>





        <FlatList
        style = {styles.list}
        data={groupTransactiions}
        renderItem={({item,index}) => 
        <View>
        <View>
        {index==0 &&
          <Text style ={styles.heading}>All transactions</Text>
        }
        </View>
        
        
        <TouchableOpacity onPress={() => clickItem(item)}>
          <Transaction transaction={item} index={index}/>
        </TouchableOpacity>
        <TransactionModal/>
        </View>

      
      }
      />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  receiptImage:{
    height:400,
    width:300,
  },
  emptyImage:{
    height:400,
    backgroundColor:'#EAF0F7',
    width:300,
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center'
  },
  heading:{
    fontSize:20,
    fontWeight:'bold',
    left:50
  },
  subheadings:{
    fontSize:20,
  },
  text:{
    textAlign:'center',
  },
  align:{
    top:60,
    height:520
  },
  button:{
    width:50,
    height:25,
    backgroundColor:'#76FFAD',
    borderWidth:4,
    borderColor:'#76FFAD',
    borderRadius:5,
    right:30
  },
  item: {
    backgroundColor: '#D9D9D9',
    padding: 20,
    marginVertical: 6,
    marginHorizontal: 20,
    width:500,
  },
  pay:{
    color:'#FFFFFF',
    fontWeight:'bold',
    textAlign:'center'
  },
  flexContainer:{
    left:30,
    alignItems: "center",
    flex:1,
    backgroundColor:'#EAF0F7',
    borderRadius:5,
    padding:10,
    marginVertical:20,
    width:300,
    flexDirection: "row",
},
modalOverlay: {
  // position: 'absolute',
  // top: 0,
  // bottom: 0,
  // left: 0,
  // right: 0,
  marginBottom:-70,
  backgroundColor: 'white'
},
modalText: {
  marginBottom: 15,
  textAlign: 'center',
},
modalContent:{
  justifyContent:'center',
  alignContent:'center',
  alignItems:'center',
  bottom:30,
  marginHorizontal:50
},
modalView: {

  justifyContent:'center',
  alignSelf:'center',
  alignItems: 'center',
  // width:330,
  // height:470,
  // backgroundColor: 'white',
  // borderRadius: 20,
  // shadowColor: '#000',
  // shadowOffset: {
  //   width: 0,
  //   height: 2,
  // },
  // shadowOpacity: 0.25,
  // shadowRadius: 4,
  // elevation: 5,
},

centeredView: {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 200,
  height:400,
},
image:{
  width:55,
  height:55,
  borderRadius:55,
  marginHorizontal:10,
  alignContent:'center',
  justifyContent:'center',
}

});

export default AllTransactions;