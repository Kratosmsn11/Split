import {SafeAreaView,StyleSheet,View,Dimensions,Text,TouchableOpacity,ScrollView,Image,FlatList} from "react-native";
import React, { useEffect, useState } from "react";
import {Logo,BottomLayer,LeftArrow,ProfileImage,User,OrderLight,CameraIcon, HomeIcon, AddButton, BottomBar} from '../components/Svgs';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { GetGroupDebts, GetGroupTransactions } from "../backendFiles/firebaseFunctions";
  
  const GroupDetail = ({ navigation, route }) => {
    const [isShow, setisShow] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [items, setitem] = useState(undefined);
    const [member, setmember] = useState([]);
    const [TextReaded, setTextReaded] = useState("");
    const [total, setTotal] = useState("");
    const [debts, setDebts] = useState("");
    const [transactions, setTransactions] = useState("");
    const groupId = "8Z02wZ8mVHnoCFIFbQm4";
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

    const getDebts = async () => {
      const debtData = await GetGroupDebts(groupId);
      console.log(debtData);
      setDebts(debtData);
    };

    const getTransactions = async () => {
      const transactionData = await GetGroupTransactions(groupId);
      console.log(transactionData);
      setTransactions(transactionData);
    };

    function getData(){
      getDebts();
      getTransactions();
    }
  
    // const getItem = async () => {
    //   const docRef = doc(db, "Item", route?.params?.GrouName);
    //   const docSnap = await getDoc(docRef);
    //   return docSnap.data();
    // };
  
    // const getMember = async () => {
    //   const docRef = doc(db, "Permission", route?.params?.GrouName);
    //   const docSnap = await getDoc(docRef);
    //   return docSnap.data();
    // };
  
    useEffect(() => {
      getData();
      // getItem().then((res) => {
      //   setitem(res);
      // });
      // getMember().then((res) => {
      //   setmember(res?.users);
      // });
    }, []);
  
    let permember=0
     if(items==undefined){
  permember=0
    }else{
      permember=items?.price / member?.length;
    } 

    const Transaction = ({transaction}) => (
        <View style = {styles.flexContainer}>
            <Image source={{uri: transaction.highestPayerURI}} style={styles.image}></Image>
            <Text style={{color:'#4F555A'}}>{transaction.name}</Text>
            <View style={{flex: 1}}>
                <Text style={{textAlign: 'right',right:30,color:'#4F555A'}}>${transaction.amount}</Text>
            </View>
        </View>
    );
  
    const Debt = ({debt}) => (
        <View style = {styles.flexContainer}>
            <Image source={{uri: debt.owerURI}} style={styles.image}></Image>
            <Text>{debt.owerName}</Text>
            <Text>{"----->"}</Text>
            <Image source={{uri: debt.lenderURI}} style={styles.image}></Image>
            <Text style={{color:'#4F555A'}}>{debt.lenderName}</Text>
            <View style={{flex: 1}}>
                <Text style={{textAlign: 'right',right:30,color:'#4F555A'}}>${debt.amount}</Text>
            </View>
        </View>
    );

    return (
      <SafeAreaView>
        

        <BottomLayer/>
        <BottomBar/>

        <TouchableOpacity onPress={() => navigation.navigate("TransactionOption")}>
            <AddButton/>
        </TouchableOpacity>

        <Logo/>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <LeftArrow style={{ right: 100 }} />
            </TouchableOpacity>
          <Text style={styles.heading}>Split - CST499</Text>
          <View style={styles.MyGroupSpace}>
            <Text style={{ ...styles.myGroup, fontSize: 22,left:0}}>Transactions</Text>
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
                <FlatList
                    style = {styles.list}
                    data={transactions.slice(0,itemCount)}
                    renderItem={({item}) => <Transaction transaction={item}/>}
                /> 
            </View>
  
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
                {"$100"}
              </Text>
            </View>
          </View>

      </SafeAreaView>
    );
  };
  
  export default GroupDetail;
  
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
    }
  });
  