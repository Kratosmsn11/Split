import React ,{useState,useEffect} from 'react';
import {Text, TouchableOpacity, View,FlatList,StyleSheet,Modal,Pressable,TextInput,Alert,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {GetGroupData, GetGroupTransactions,GetGroupDebts, randomNumber,payDebt} from '../backendFiles/firebaseFunctions';
import { SafeAreaView } from 'react-native-safe-area-context';
import {getGroupId,getGroupInfo,setGroupId,getUserInfo, GetGroupDebtsAll,setGroupDebtsAll} from '../AppData';
import { useFocusEffect } from '@react-navigation/native';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import {Logo,BottomBar,BottomLayer, AddButton, LeftArrow} from "../components/Svgs";
import {firebase} from "../config/firebase";
import * as SMS from 'expo-sms';

const AllDebts = () => {
  const navigation = useNavigation();
  const [groupDebts,setGroupDebts] = useState("");
  const [paymentModal, setPaymentModalVisible] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("0.00");
  const [debt, setDebt] = useState("");
  const [smsAvailable, setSmsAvailable] = useState(false);
  const userId = firebase.auth().currentUser.uid;
  var dummyData = [{owerName:"Joseph",lenderName:"Joshua",total:5.55},{owerName:"Joshua",lenderName:"Vighnesh",total:10.17},{owerName:"Jack",lenderName:"Joshua",total:5.55},{owerName:"Joseph",lenderName:"Vighnesh",total:10.17},{owerName:"Joseph",lenderName:"Joshua",total:5.55},{owerName:"John",lenderName:"Vighnesh",total:10.17}]

  useEffect(() => {
    getData();
  }, [])

  const getData = async () =>{
    setGroupDebts(GetGroupDebtsAll());
    console.log(GetGroupDebtsAll());
    SMS.isAvailableAsync().then(setSmsAvailable);
  }

  async function settleDebt(debt){
    const message = debt.owerName + " has settled their debt of $" + debt.total;
    if(smsAvailable){
      const result = await SMS.sendSMSAsync(
        [debt.lenderNumber],
        message,
      );
      // console.log(result.result);
      if(result.result == 'sent'){
        console.log("Message sent");
        payDebt(debt.id);
        var newDebts = groupDebts.filter(function (item) {
          return item.id != debt.id;
        });
        setGroupDebts(newDebts);
        setGroupDebtsAll(newDebts);
      }
    }
    else{
    }


  }

  const Debt = ({debt,index}) => (
    <View style = {styles.flexContainer}>
    {debt.owerPicture =="none" &&
      <View style={{
                  width:65,
                  height:65,
                  borderRadius:65,
                  marginHorizontal:10,
                  backgroundColor:debt.owerColor,
                  alignContent:'center',
                  justifyContent:'center',
                  marginRight:30,
                }}>

                <Text style={{
                  fontSize:30,
                  top:10,
                  color:'white',
                  textAlign:'center',
                  justifyContent:'center',
                }}>{debt.owerName[0]}</Text>
            <Text style={{top:30,textAlign:'center',fontWeight:'400',fontSize:21,width:100,right:20}}>{debt.owerName.substring(0,7)}</Text>
      </View>
    }
    {debt.owerPicture !="none" &&
      <View>
      <Image source={{uri: debt.owerPicture}} style={styles.image}></Image>
      <Text style={{top:10,textAlign:'center',fontWeight:'400',fontSize:21,width:100,right:10}}>{debt.owerName.substring(0,7)}</Text>
      </View>
  }


    <FontAwesome5Icon
          name={"arrow-right"}
          color={'black'}
          size={28}
    />
    <Text>  </Text>
    {/* <Image source={{uri: debt.lenderPicture}} style={styles.image}></Image> */}
    {debt.lenderPicture =="none" &&
    <View style={{
                marginLeft:30,
                width:65,
                height:65,
                borderRadius:65,
                marginHorizontal:10,
                backgroundColor:debt.lenderColor,
                alignContent:'center',
                justifyContent:'center',
              }}>

              <Text style={{
                fontSize:30,
                top:10,
                color:'white',
                textAlign:'center',
                justifyContent:'center',
              }}>{debt.lenderName[0]}</Text>
          <Text style={{top:30,textAlign:'center',fontWeight:'400',fontSize:21,width:100,right:20}}>{debt.lenderName.substring(0,7)}</Text>
    </View>
    }

    {debt.lenderPicture !="none" &&
      <View>
      <Image source={{uri: debt.lenderPicture}} style={styles.image}></Image>
      <Text style={{top:10,textAlign:'center',fontWeight:'400',fontSize:21,width:100,right:10}}>{debt.lenderName.substring(0,7)}</Text>
      </View>
  }



</View>

    // <View style = {{flexDirection:'row'}}>
    //     <Text style={{color:'#4F555A'}}>nnj</Text>
    //     <View>
    //         <Text style={{textAlign: 'right',right:0,color:'#4F555A'}}>$78</Text>
    //     </View>
    //     <TouchableOpacity style={styles.button}><Text style={styles.pay}>Pay</Text></TouchableOpacity>
    // </View>
);


  
  return (
    <SafeAreaView>
      <Logo/>
      <BottomLayer/>
      <BottomBar/>
      <View>
      <LeftArrow></LeftArrow>
      </View>
      
      <TouchableOpacity><AddButton></AddButton></TouchableOpacity>
      <View style = {styles.align}>



        <FlatList
        style = {styles.list}
        data={groupDebts}
        renderItem={({item,index}) => 
        <View>
        <View>
        {index==0 &&
          <Text style ={styles.heading}>All debts</Text>
        }
        </View>
        
        <View style={{backgroundColor:'#EAF0F7',height:240,width:350,marginVertical:10,alignSelf:'center',borderRadius:10}}>
        <Text style={{color:'#4F555A',left:0,fontWeight:'bold',textAlign:'center',fontSize:35,marginTop:5}}>${item.total}</Text>
  
        <Debt debt={item} index={index}/>

        {userId == item.owerId &&
          <TouchableOpacity style={styles.button} onPress={()=>{settleDebt(item)}}>
                <FontAwesome5Icon
                      name={"dollar-sign"}
                      color={"white"}
                      size={28}
                />
          </TouchableOpacity>
        }
        </View>
        </View>
      
      }
      />
      </View>



      
 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  align:{
    top:50,
    height:550,
  },
  heading:{
    fontSize:25,
    left:30,
    fontWeight:'bold',
  },
  subheadings:{
    fontSize:20,
  },
  text:{
    textAlign:'center',
  },
  button:{
    width:90,
    height:50,
    marginTop:20,
    backgroundColor:'#47E100',
    borderWidth:4,
    borderColor:'#47E100',
    borderRadius:5,
    alignSelf:'center',
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
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
    alignItems: "center",
    justifyContent:'center',
    flexDirection: "row",
    height:100,
},
image:{
  width:65,
  height:65,
  borderRadius:65,
  marginHorizontal:10,
  marginTop:20,
  alignContent:'center',
  justifyContent:'center',
  marginRight:30,
}

});

export default AllDebts;