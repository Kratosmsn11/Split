import {SafeAreaView,StyleSheet,View,Dimensions,Text,TouchableOpacity,ScrollView,Image,FlatList,TouchableWithoutFeedback,Modal,Alert} from "react-native";
import React, { useEffect, useState } from "react";
import {Logo,BottomLayer,LeftArrow,ProfileImage,User,OrderLight,CameraIcon, HomeIcon, AddButton, BottomBar} from '../components/Svgs';
import * as Clipboard from 'expo-clipboard';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { GetGroupDebts, GetGroupTransactions, getGroupUsers, randomNumber } from "../backendFiles/firebaseFunctions";
import { getGroupInfo, setGroupInfo, getGroupId,setUsers, setGroupDebtsAll, setGroupTransactionsAll } from "../AppData";
import { useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomSidebar from './CustomSidebar'

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
    // const db = getFirestore(app);
    const dummyDebts = [
        {owerName:"Joseph",lenderName:"Bob", amount:5.99, owerURI:"https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg",lenderURI:"https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-2.jpg"},
        {owerName:"John",lenderName:"Jack", amount:1.99,owerURI:"https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg",lenderURI:"https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg"},
        {owerName:"Alex",lenderName:"Rick", amount:7.99,owerURI:"https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-2.jpg",lenderURI:"https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-8.jpg"}
    ]

    const dummyTransactions = [
        {highestPayerName:"Joseph", amount:65.33, highestPayerURI:"https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg",name:"Dinner at 5 star restaurant"},
        {highestPayerName:"Jake", amount:21.67, highestPayerURI:"https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg",name:"Lunch at bad restaurant"},
        {highestPayerName:"Frank", amount:33.97, highestPayerURI:"https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-8.jpg",name:"Coffee at Starbucks"}
    ]

    const dummyData = [{username:"Joseph123", name:"Joseph Arredondo",uri:"https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=ejx13G9ZroRrcg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-young-user-icon-2400.png&ehk=NNF6zZUBr0n5i%2fx0Bh3AMRDRDrzslPXB0ANabkkPyv0%3d&risl=&pid=ImgRaw&r=0"},{username:"Jos56", name:"John Sean",uri:"https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=ejx13G9ZroRrcg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-young-user-icon-2400.png&ehk=NNF6zZUBr0n5i%2fx0Bh3AMRDRDrzslPXB0ANabkkPyv0%3d&risl=&pid=ImgRaw&r=0",id:2},{username:"Bob123", name:"Joseph Arredondo",uri:"https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=ejx13G9ZroRrcg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-young-user-icon-2400.png&ehk=NNF6zZUBr0n5i%2fx0Bh3AMRDRDrzslPXB0ANabkkPyv0%3d&risl=&pid=ImgRaw&r=0"},{username:"Jos56", name:"John Sean",uri:"https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=ejx13G9ZroRrcg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-young-user-icon-2400.png&ehk=NNF6zZUBr0n5i%2fx0Bh3AMRDRDrzslPXB0ANabkkPyv0%3d&risl=&pid=ImgRaw&r=0",id:3},{username:"Jake123", name:"Joseph Arredondo",uri:"https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=ejx13G9ZroRrcg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-young-user-icon-2400.png&ehk=NNF6zZUBr0n5i%2fx0Bh3AMRDRDrzslPXB0ANabkkPyv0%3d&risl=&pid=ImgRaw&r=0"},{username:"Jos56", name:"John Sean",uri:"https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=ejx13G9ZroRrcg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-young-user-icon-2400.png&ehk=NNF6zZUBr0n5i%2fx0Bh3AMRDRDrzslPXB0ANabkkPyv0%3d&risl=&pid=ImgRaw&r=0",id:4}];
    const [modalVisible, setModalVisible] = useState(false);
    const [gData,setgData] = useState("");
    const [groupMembers,setGroupMembers] = useState("");
    var groupId = getGroupInfo().id;
    // const [groupInfo,setGroupInfo] = useState("");

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
      navigation.Add
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
                <Text style={{textAlign: 'right',right:30,color:'#4F555A'}}>${transaction.total}</Text>
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
      const members = Object.keys(gData.users).length;
      console.log(members);
      if(members==100){
        Alert.alert("You must add at least one member to create a transaction!");
      }
      else{
        navigation.navigate("TransactionOption");
      }
    };

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
          <TouchableOpacity onPress={() => setModalVisible(true)}>
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
                    data={transactions.slice(0,20)}
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
                data={debts.slice(0,20)}
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
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>

        <View style={styles.centeredView}>
          <TouchableWithoutFeedback>
          <View style={styles.modalView}>
          
          <Text style = {styles.passcodeHeader}>Passcode</Text>
          <TouchableOpacity onPress ={()=>copyToClipboard()}>
            <Text style = {styles.passcodeText}>{gData.passcode}</Text>
          </TouchableOpacity>

          <View style={{justifyContent:'left',right:30,height:300}}>

         <FlatList
          data={groupMembers}
          renderItem={({ item, index }) => {
            return (
              <View style = {{top:30}}>
              
              <TouchableOpacity style={{flex:1, flexDirection: 'row',paddingVertical:10,}}>

                {item.picture!="none" &&
                 <View style={{justifyContent:'center',}}>
                  <Image style={styles.smallImage} source={{uri: item.picture}}/>
                  </View>

                }

               {item.picture=="none" &&
            <View style={{
              width:25,
              height:25,
              borderRadius:25,
              marginHorizontal:10,
              backgroundColor:item.color,
              alignContent:'center',
              justifyContent:'center',
            }}>

            <Text style={{
              fontSize:10,
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
        <TouchableOpacity onPress ={()=>setModalVisible(!modalVisible)}><Text>Close</Text></TouchableOpacity>
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
      marginTop: 22,
    },
    modalView: {
      width:300,
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 10,
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
      fontSize:13,
      fontWeight:'bold',
    },
    passcodeText:{
      fontSize:25,
      color:'#4F555A',
    },
    emptyData:{
      top:20,
      left:10,
      fontSize:15,
      color:'#4F555A',
    }
  });
  