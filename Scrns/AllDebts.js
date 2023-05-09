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
  var dummyData = [{owerName:"Joseph",lenderName:"Joshua",total:5.55},{owerName:"Joseph",lenderName:"Vighnesh",total:10.17},{owerName:"Joseph",lenderName:"Joshua",total:5.55},{owerName:"Joseph",lenderName:"Vighnesh",total:10.17},{owerName:"Joseph",lenderName:"Joshua",total:5.55},{owerName:"Joseph",lenderName:"Vighnesh",total:10.17}]

  useEffect(() => {
    getData();
  }, [])

  const getData = async () =>{
    setGroupDebts(GetGroupDebtsAll());
    console.log(GetGroupDebtsAll());
  }

  const Debt = ({debt,index}) => (



    
    <View style = {styles.flexContainer}>
      

    <View style={{
                width:25,
                height:25,
                borderRadius:25,
                marginHorizontal:10,
                backgroundColor:randomNumber(),
                alignContent:'center',
                justifyContent:'center',
              }}>

              <Text style={{
                fontSize:10,
                color:'white',
                textAlign:'center'
              }}>F</Text>
    </View>


    <Text> John   </Text>
    <FontAwesome5Icon
          name={"arrow-right"}
          color={"#9E9E9E"}
          size={18}
    />
    <Text>  </Text>
    {/* <Image source={{uri: debt.lenderPicture}} style={styles.image}></Image> */}

    <View style={{
                width:25,
                height:25,
                borderRadius:25,
                marginHorizontal:10,
                marginVertical:30,
                backgroundColor:randomNumber(),
                alignContent:'center',
                justifyContent:'center',
              }}>

              <Text style={{
                fontSize:10,
                color:'white',
                textAlign:'center'
              }}>J</Text>
    </View>

    <Text style={{color:'#4F555A'}}>  Joseph</Text>
    <View style={{flex: 1}}>
        <Text style={{color:'#4F555A',left:20,fontWeight:'bold'}}>$7.88</Text>
    </View>
    <TouchableOpacity style={styles.button}><Text style={styles.pay}>Pay</Text></TouchableOpacity>
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
    <SafeAreaView style = {styles.align}>
      <Logo/>
      <BottomLayer/>
      <BottomBar/>
      <View style = {styles.align}>



        <FlatList
        style = {styles.list}
        data={dummyData}
        renderItem={({item,index}) => 
        <View>
        <View>
        {index==0 &&
          <Text style ={styles.heading}>All debts</Text>
        }
        </View>
        
        
        <Debt debt={item} index={index}/>
        </View>
      
      }
      />
      </View>



      
 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    left:10,
    alignItems: "center",
    flex:1,
    marginVertical:0,
    flexDirection: "row",
},

});

export default AllDebts;