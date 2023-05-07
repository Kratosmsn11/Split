import {SafeAreaView,StyleSheet,View,Dimensions,Text,TouchableOpacity,ScrollView,Image,FlatList,TouchableWithoutFeedback,Modal,Alert} from "react-native";
import React, { useEffect, useState,useCallback,useRef } from "react";
import {Logo,BottomLayer,LeftArrow,ProfileImage,User,OrderLight,CameraIcon, HomeIcon, AddButton, BottomBar} from '../components/Svgs';
import * as Clipboard from 'expo-clipboard';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { GetGroupDebts, GetGroupTransactions, getGroupUsers, randomNumber } from "../backendFiles/firebaseFunctions";
import { getGroupInfo, setGroupInfo, getGroupId,setUsers, setGroupDebtsAll, setGroupTransactionsAll } from "../AppData";
import { useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomSidebar from './CustomSidebar'
import BottomSheet , {BottomSheetView} from "@gorhom/bottom-sheet";
  const GroupDetail = () => {
    const navigation = useNavigation();
    const [isShow, setisShow] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [items, setitem] = useState(undefined);
    const [member, setmember] = useState([]);
    const [TextReaded, setTextReaded] = useState("");
    const [total, setTotal] = useState("");
    const [debts, setDebts] = useState("");
    const [transactions, setTransactions] = useState("");

    //hte max number of transactions and debts that will be shown
    const itemCount = 3;
    const [modalVisible, setModalVisible] = useState(false);
    const [gData,setgData] = useState("");
    const [groupMembers,setGroupMembers] = useState("");
    var groupId = getGroupInfo().id;
    // const [groupInfo,setGroupInfo] = useState("");
    const userData= [{name:"Joseph",email:"joarredondo@csumb.edu",picture:"none"},{name:"Joseph",email:"joarredondo@csumb.edu",picture:"none"},{name:"Joseph",email:"joarredondo@csumb.edu",picture:"none"},{name:"Joseph",email:"joarredondo@csumb.edu",picture:"none"},{name:"Joseph",email:"joarredondo@csumb.edu",picture:"none"},{name:"Joseph",email:"joarredondo@csumb.edu",picture:"none"},{name:"Joseph",email:"joarredondo@csumb.edu",picture:"none"},{name:"Joseph",email:"joarredondo@csumb.edu",picture:"none"},{name:"Joseph",email:"joarredondo@csumb.edu",picture:"none"}]

    async function deleteGroup(){

    }

    const getDebts = async () => {
      const debtData = await GetGroupDebts(groupId);
      console.log(debtData);
      setDebts(debtData);
      setGroupDebtsAll(debtData);
      // setDebts(dummyDebts);
    };

    const getTransactions = async () => {
      const transactionData = await GetGroupTransactions(groupId);
      console.log(transactionData);
      setTransactions(transactionData);
      setGroupTransactionsAll(transactionData);
      // setTransactions(dummyTransactions);
    };

    const getGroupData = async () => {
      const group = getGroupInfo();
      console.log(group);
      setgData(group);
      setTotal(group.total);
      // console.log("Group" + group);

    };

    const getGroupMembers = async () => {
      console.log(getGroupId());
      const users = await getGroupUsers(getGroupId());
      setUsers(users);
      setGroupMembers(users);

    };

    function getData(){
      // navigation.Add
      getGroupMembers();
      getDebts();
      getTransactions();
      getGroupData();
    }  
    useEffect(() => {
      navigation.addListener('focus', async () =>{
        getData();
      })
    })

    const Transaction = ({transaction}) => (
        <View style = {styles.flexContainer}>
            {/* <Image source={{uri: transaction.highestPayerPicture}} style={styles.image}></Image> */}
            <View style={{
                        width:25,
                        height:25,
                        borderRadius:25,
                        marginHorizontal:10,
                        marginVertical:5,
                        backgroundColor:transaction.highestPayerColor,
                        alignContent:'center',
                        justifyContent:'center',
                      }}>

                      <Text style={{
                        fontSize:10,
                        color:'white',
                        textAlign:'center'
                      }}>{transaction.highestPayerName[0].toUpperCase()}</Text>
            </View>
            <Text style={{color:'#4F555A'}}>{transaction.name}</Text>
            <View style={{flex: 1}}>
                <Text style={{textAlign: 'right',right:30,color:'#4F555A',fontWeight:'bold'}}>${transaction.total}</Text>
            </View>
        </View>
    );
  
    const Debt = ({debt}) => (
        <View style = {styles.flexContainer}>
            {/* <Image source={{uri: debt.owerPicture}} style={styles.image}></Image> */}

            <View style={{
                        width:25,
                        height:25,
                        borderRadius:25,
                        marginHorizontal:10,
                        backgroundColor:debt.owerColor,
                        alignContent:'center',
                        justifyContent:'center',
                      }}>

                      <Text style={{
                        fontSize:10,
                        color:'white',
                        textAlign:'center'
                      }}>{debt.owerName[0].toUpperCase()}</Text>
            </View>


            <Text>  {debt.owerName}    </Text>
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
                        backgroundColor:debt.lenderColor,
                        alignContent:'center',
                        justifyContent:'center',
                      }}>

                      <Text style={{
                        fontSize:10,
                        color:'white',
                        textAlign:'center'
                      }}>{debt.lenderName[0].toUpperCase()}</Text>
            </View>

            <Text style={{color:'#4F555A'}}>  {debt.lenderName}</Text>
            <View style={{flex: 1}}>
                <Text style={{textAlign: 'right',right:30,color:'#4F555A'}}>${debt.total}</Text>
            </View>
        </View>
    );

    const copyToClipboard = async () => {
      console.log("copied");
      await Clipboard.setStringAsync(gData.passcode);
    };

    const startTransaction = () => {
      // const members = Object.keys(gData.users).length;
      // console.log(members);
      // if(members==100){
      //   Alert.alert("You must add at least one member to create a transaction!");
      // }
      // else{
        navigation.navigate("NameTransaction");
      // }
    };

    function memberProfile(){
      setModalVisible(!modalVisible);
      navigation.navigate("UserProfile");
    }

    return (
      <SafeAreaView>
        <BottomLayer/>
        <BottomBar/>
        <TouchableOpacity onPress={() => startTransaction()}>
            <AddButton/>
        </TouchableOpacity>
        <Logo/>
            {/* <TouchableOpacity onPress={() => navigation.goBack()}>
              <LeftArrow style={{ right: 100 }} />
            </TouchableOpacity> */}
          <TouchableOpacity  onPress ={()=>setModalVisible(true)} style={{height:50,width:200}}>
            <Text style={styles.heading}>{gData.name}</Text>
          </TouchableOpacity>
          <View style={styles.MyGroupSpace}>
            <Text style={{ ...styles.myGroup, fontSize: 22,left:0}}>Transactions</Text>
            <TouchableOpacity onPress={() => navigation.navigate("AllTransactions")}>
            <View
              style={{
                height: 120,
                backgroundColor: "#EAF0F7",
                elevation: 1,
                borderRadius: 10,
                top: 20,
                justifyContent: "center",
                marginBottom:10,
              }}
            >
                {transactions.length == 0 &&
                  <Text style ={styles.emptyData}>Your group has no transactions.</Text>
                }
                <FlatList
                    style = {styles.list}
                    data={transactions.slice(0,itemCount)}
                    renderItem={({item}) => <Transaction transaction={item}/>}
                /> 

            </View>
            </TouchableOpacity>
  
            <Text style={{ ...styles.myGroup, fontSize: 22,left:0, marginTop: 0 }}>
              Settle Debts
            </Text>
            <View
              style={{
                height: 120,
                backgroundColor: "#EAF0F7",
                elevation: 1,
                borderRadius: 10,
                top: 20,
                justifyContent: "center",
                marginBottom:10,
              }}
            >
                {debts.length == 0 &&
                  <Text style ={styles.emptyData}>Your group has no debts.</Text>
                }

            <FlatList
                style = {styles.list}
                data={debts.slice(0,itemCount)}
                renderItem={({item}) => <Debt debt={item}/>}
            />

            </View>
  
            <Text style={{ ...styles.myGroup, fontSize: 22,left:0, marginTop: 5 }}>
              Total Expense
            </Text>
            <View
              style={{
                height: 50,
                backgroundColor: "#EAF0F7",
                elevation: 1,
                borderRadius: 10,
                top: 25,
                justifyContent: "center",
              }}
            >
              <Text style={{ left: 20 }}>
                ${total}
              </Text>
            </View>
          </View>

    <TouchableWithoutFeedback  onPress ={()=>setModalVisible(false)}>
      <Modal
        animationType="slide"
        visible={modalVisible}
        presentationStyle="fullScreen"
        onRequestClose={() => {
          setModalVisible(!modalVisible);
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

        <View style={styles.centeredView}>

          <TouchableWithoutFeedback>
          <View style={styles.modalView}>
          
          <Text style = {styles.passcodeHeader}>Passcode</Text>
          <TouchableOpacity onPress ={()=>copyToClipboard()}>
            <Text style = {styles.passcodeText}>{gData.passcode}128mdwi</Text>
          </TouchableOpacity>

          <View style={{justifyContent:'left',right:10,height:430,bottom:30}}>

         <FlatList
          data={userData}
          renderItem={({ item, index }) => {
            return (
              <View style = {{}}>
              
              <TouchableOpacity style={{flex:1, flexDirection: 'row',paddingVertical:10,}} onPress ={()=>memberProfile()}>

                {item.picture!="none" &&
                 <View style={{justifyContent:'center',}}>
                  <Image style={styles.smallImage} source={{uri: item.picture}}/>
                  </View>

                }

               {item.picture=="none" &&
            <View style={{
              width:50,
              height:50,
              borderRadius:50,
              marginHorizontal:10,
              backgroundColor:randomNumber(),
              alignContent:'center',
              justifyContent:'center',
            }}>

            <Text style={{
              fontSize:20,
              color:'white',
              textAlign:'center'
            }}>{item.name[0].toUpperCase()}</Text>
                </View>
          }
                <View style={styles.userContainer}>
                  <Text style={styles.text}>{item.name}</Text>
                  <Text style={styles.secondaryText}>{item.email}</Text>
                </View>
          
              </TouchableOpacity>
              <View style = {styles.lineSeperator}></View>
              </View>
            );
          }}
        />
        </View>
        {/* <View style={styles.deleteGroup} onPress ={()=>DeleteGroup()}>
        <TouchableOpacity><Text>Delete Group</Text></TouchableOpacity>
          </View> */}
          </View>
          
          </TouchableWithoutFeedback>
        </View>
      </Modal>
      </TouchableWithoutFeedback>


      </SafeAreaView>
    );
  };
  
  // export default GroupDetail;
  const Drawer = createDrawerNavigator();

  export default function GroupPage() {
    return (
        <Drawer.Navigator useLegacyImplementation initialRouteName="Home" screenOptions={{
          headerShown: true,headerTransparent:true,headerTitle:"",headerTintColor: 'black',
          drawerActiveTintColor:'white'
        }} drawerContent={(props) => <CustomSidebar {...props} />}>
          <Drawer.Screen name=" " component={GroupDetail} />
        </Drawer.Navigator>
    );
  }
  
  const styles = StyleSheet.create({
    Logo: {
      height: "10%",
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10,
      left:0,
      flexDirection: "row",
    },
    heading:{color: "black", fontWeight: "bold", left: 20, fontSize: 25,top:75},
    myGroup: { color: "black", fontWeight: "bold", left: 20, fontSize: 25,marginBottom:25,top:40,},
    MyGroupSpace: {
      top:40,
      height: 340,
      // backgroundColor: "#b0c4de",
      width: "90%",
      borderRadius: 20,
      alignSelf: "center",
    },
    image:{
        justifyContent:'center',
        width:40,
        height:40,
        borderRadius:40,
    },
    flexContainer:{
        left:10,
        alignItems: "center",
        flex:1,
        marginVertical:0,
        flexDirection: "row",
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
      padding: 8,
    },
    smallImage:{
      alignSelf:'center',
      justifyContent:'center',
      width:30,
      height:30,
      borderRadius:30,
      marginHorizontal:10,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 2,
    },
    modalView: {
      alignItems: 'center',
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    text:{
      fontSize:13,
      fontWeight:'bold',
    },
    secondaryText:{
      fontSize:13,
      color:'#4F555A',
    },
    passcodeHeader:{
      bottom:70,
      fontSize:13,
      fontWeight:'bold',
    },
    passcodeText:{
      bottom:70,
      fontSize:20,
      color:'#4F555A',
    },
    emptyData:{
      top:20,
      left:10,
      fontSize:15,
      color:'#4F555A',
    },
    deleteGroup:{
      backgroundColor:'#FF0000',
      width:80,
      height:40,
      borderRadius:8
    },
    lineSeperator:{
      height:2,
      justifyContent:'flex-end',
      width:300,
      left:60,
      backgroundColor:'#EAF0F7',
    }
  });
  