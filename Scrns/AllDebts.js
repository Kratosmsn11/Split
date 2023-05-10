import React ,{useState,useEffect} from 'react';
import {Text, TouchableOpacity, View,FlatList,StyleSheet,Modal,Pressable,TextInput,Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {GetGroupData, GetGroupTransactions,GetGroupDebts, randomNumber} from '../backendFiles/firebaseFunctions';
import { SafeAreaView } from 'react-native-safe-area-context';
import {getGroupId,getGroupInfo,setGroupId,getUserInfo, GetGroupDebtsAll} from '../AppData';
import { useFocusEffect } from '@react-navigation/native';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import {Logo,BottomBar,BottomLayer, AddButton} from "../components/Svgs";
const AllDebts = () => {
  const navigation = useNavigation();
  const [groupDebts,setGroupDebts] = useState("");
  const [paymentModal, setPaymentModalVisible] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("0.00");
  const [debt, setDebt] = useState("");
  const presetName = "Joseph";
  var dummyData = [{owerName:"Joseph",lenderName:"Joshua",total:5.55},{owerName:"Juan",lenderName:"Vighnesh",total:10.17},{owerName:"Jack",lenderName:"Joshua",total:5.55},{owerName:"Joseph",lenderName:"Vighnesh",total:10.17},{owerName:"Joseph",lenderName:"Joshua",total:5.55},{owerName:"John",lenderName:"Vighnesh",total:10.17}]

  useEffect(() => {
    getData();
  }, [])

  const getData = async () =>{
    setGroupDebts(GetGroupDebtsAll());
    setGroupDebts(dummyData);
    // setGroupDebts(dummyData);
    console.log(GetGroupDebtsAll());
  }

  const Debt = ({debt,index}) => (
    <View style = {styles.flexContainer}>
    <View style={{
                width:65,
                height:65,
                borderRadius:65,
                marginHorizontal:10,
                backgroundColor:randomNumber(),
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
          <Text style={{top:30,textAlign:'center',fontWeight:'400',fontSize:21,width:100,right:20}}>{debt.owerName}</Text>
    </View>


    <FontAwesome5Icon
          name={"arrow-right"}
          color={'black'}
          size={28}
    />
    <Text>  </Text>
    {/* <Image source={{uri: debt.lenderPicture}} style={styles.image}></Image> */}

    <View style={{
                marginLeft:30,
                width:65,
                height:65,
                borderRadius:65,
                marginHorizontal:10,
                backgroundColor:randomNumber(),
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
          <Text style={{top:30,textAlign:'center',fontWeight:'400',fontSize:21,width:100,right:20}}>{debt.lenderName}</Text>
    </View>



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

        {presetName == item.owerName &&
          <TouchableOpacity style={styles.button}>
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

});

export default AllDebts;