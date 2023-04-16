// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View,Button,Image,Alert,TouchableOpacity,ScrollView,SafeAreaView,FlatList,Modal,Pressable,TextInput} from 'react-native';
// import React, {useState, useEffect} from 'react';
// import {Camera, CameraType} from 'expo-camera';
// import { useNavigation } from '@react-navigation/native';
// import { createTransaction } from '../backendFiles/firebaseFunctions';
// import {getUsers,getGroupId,getReceiptData,getGroupInfo, getUsersIds,getUserInfo} from '../AppData';
// import {calculateDebts} from '../backendFiles/SplittingAlgorithm';

// const CreateTransaction = () => {
//   const navigation = useNavigation();
//   const [users,setUsers] = useState("");
//   const [groupId,setGroupId] = useState("");
//   const [itemData,setItemData] = useState("");
//   const [userData,setUserData] = useState("");
//   const [total,setTotal] = useState("");
//   const [userSpending,setUserSpending] = useState("");
//   const [userPaying,setUserPaying] = useState("");
//   const [transactionName,setTransactionName] = useState("");
//   useEffect(() => {
//     setUserData(getUsers());
//     const data = getReceiptData();
//     setTotal(data['total']);
//     setItemData(data['items']);
//     console.log(getUsersIds());
//   }, [])


//   function submitTransaction(){
//     const userBill = total/userData.length;
//     if(itemData.length<=0){
//       Alert.alert("Need at least one item");
//     }
//     else{
//       // Alert.alert("Transaction created");
//     }
//     var spending = [];
//     for(var x = 0; x < userData.length;x++){
//       spending[x] = userBill;
//     }
//     var paying = [];
//     paying[0] = parseFloat(total);
//     for(var x = 1; x < userData.length;x++){
//       paying[x] = 0;
//     }
//     var ids = getUsersIds();
//     console.log(ids);

//     //move the users id to the front, in the simple case
//     //person creating transaction will pay this correlates to current user id
//     const userId = getUserInfo()['id'];
//     console.log(userId);
//     const foundIndex = ids.findIndex(el => el == userId);
//     ids.splice(foundIndex, 1);
//     ids.unshift(userId);

//     var debts = calculateDebts(spending,paying,ids);
//     console.log(debts);
    
//     console.log(getGroupId());

//     var currentTotal = getGroupInfo()['total'];
//     console.log("Current total:" + currentTotal);

//     createTransaction(transactionName,total,getGroupId(),debts,currentTotal)
//     navigation.navigate("Transaction");
//   }

//   const Item = ({name,price}) => (
//     <TouchableOpacity><View style={styles.item}><Text>{name}</Text><Text>${price}</Text></View></TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.center}>
//       <TextInput placeholder='Enter name' style={styles.input} onChangeText={setTransactionName}></TextInput>
//         <Text style={styles.headers}>Expenses</Text>
//       <FlatList
//       style={styles.FlatList}
//         data={itemData}
//         renderItem={({item}) =><Item name={item.name} price ={item.price}  />}
//       />
//       <View>
//       <Text style={styles.headers}>Total:{total}</Text>
//       </View>
//       <View style={styles.center}>
//       <Text>{"\n\n\n\n\n\n\n\n"}</Text>
      
//       <View style={styles.centerButton}>
//         <TouchableOpacity style={styles.button}  onPress={()=> submitTransaction()}>
//           <Text style={styles.text}>Finish</Text>
//         </TouchableOpacity>
//       </View>
//       </View>
//       </View>
//   </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   button: {
//     width:100,
//     alignItems: 'center',
//     backgroundColor: '#00bfff',
//     padding: 10,
//   },
//   item: {
//     backgroundColor: '#D9D9D9',
//     padding: 20,
//     marginVertical: 6,
//     marginHorizontal: 20,
//   },
//   text:{
//     fontSize:20,
//     textAlign:'center'
//   },
//   center:{
//     justifyContent:'center',
//     alignContent:'center',
//     position: 'relative',
//   },
//   centerButton:{
//     justifyContent:'center',
//     alignContent:'center',
//     position: 'relative',
//   },
//   headers:{
//     textAlign:'center',
//     fontSize:20,
//     fontWeight:'bold'
//   },
//   input: {
//     height: 40,
//     margin: 12,
//     borderWidth: 1,
//     padding: 10,
//   },
//   FlatList:{
//     height:300,
//   }
// });

// export default CreateTransaction;

import * as React from 'react';
import {useState,useEffect} from 'react';
import {Text,View,StyleSheet,SafeAreaView,TouchableOpacity,FlatList,TextInput,Alert,Modal,Pressable,Image} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { AddButton, BottomBar, BottomLayer, Logo,ContinueButton } from '../components/Svgs';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
const Create = () => {
    const navigation = useNavigation();

    var data = [
        {name: 'Soda', price: 2.19, id: 20055, users: []},
        { name: 'Coffee', price: 3.17, id: 20056, users: []},
        { name: 'Water', price: 5.50, id: 20057, users: [] },
        { name: 'Tea', price: 5.55, id: 20058, users: [] },
    ];

    const [userData,setUserData] = useState("");
    const [canContinue,setCanContinue] = useState(false);
    
    var udata = [
    { uri: 'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg', name: 'Jane', id: 20055},
    { uri: 'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-2.jpg', name: 'Chloe', id: 20056},
    { uri: 'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-8.jpg', name: 'Bob', id: 20057},
    { uri: 'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg', name: 'Jane', id: 20058},
    { uri: 'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-2.jpg', name: 'Chloe', id: 20059},
    { uri: 'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-8.jpg', name: 'Bob', id: 20060},
    ];
    //function is called whenever user clicks on a user profile image to assign an item, either the user is
    //assigned or removed from the items user list
    function UserClick(itemId, userId) {
      //the items id is passed in and is used to find the item
      var item = itemData.find(data=>data.id==itemId);
      //save the items user list
      var itemUsers = item.users;
      //attempt to locate the user as part of the items user list
      var userFound = itemUsers.find(user=>user.id ===userId);
      //if the user is not part of the items user list it should be added
      if(userFound==undefined){
        //the user is found via the userId passed in
        var user = userData.find(item => item.id === userId);
        //the index is saved so it can be used to add to the user object that will be added to the items user list
        var userIndex = userData.findIndex(item => item.id === userId);
        //next the items index is found so the right item gets the user pushed to it's list
        var itemIndex = itemData.findIndex(data => data.id === itemId);
        //the user is pushed along side it's index for assigning of expenses
        itemData[itemIndex].users.push(user);
        //the item data's state is changed to reflect the changes
        setItemData(itemData);
        let item = itemData.find(data=>data.id==itemId);
        setCurrentItem(item);
        SetRefresh(!refesh);
      }
      //if the user is part of the items user list it should be removed
      else{
        //the item and user indexes are found using the values passed in
        var itemIndex = itemData.findIndex(data=>data.id === itemId);
        var userIndex = itemUsers.findIndex(user=>user.id === userId);
        //the items user list gets the user removed using splicing with the index found
        itemData[itemIndex].users.splice(userIndex,1);
        //item's data state is changed
        setItemData(itemData);
        let item = itemData.find(data=>data.id==itemId);
        setCurrentItem(item);
        SetRefresh(!refesh);
      }
    }
    
    //used when removing an item from a transaction, uses id passed to locate and remove item from list of items
    function DeleteItem(id) {
      if(itemData.length==1){
        setTotal(0);
      }
      //index is found using id
      var itemIndex = itemData.findIndex(e => e.id == id);
      //using splice the item is removed
      itemData.splice(itemIndex,1);
      // the item count is also set using the new length of the data
      setItemCount(itemData.length);
      if(itemData.length>1){
        let total = itemData.map(item => item.price).reduce((prev, next) => parseFloat(prev) + parseFloat(next));
        setTotal(total.toFixed(2));
      }
      //the state is changed for items, this will update the flatlist
      setItemData(itemData);
    }
    
    function AddAllUsers(itemId) {
        var itemIndex = itemData.findIndex(e=>e.id === itemId);
        itemData[itemIndex].users = userData;
        setItemData(itemData);
        var item = itemData.find(data=>data.id==itemId);
        setCurrentItem(item);
        SetRefresh(!refesh);
    }
    
    function RemoveAllUsers(itemId) {
      var itemIndex = itemData.findIndex(data=>data.id==itemId);
      itemData[itemIndex].users = [];
      setItemData(itemData);
      var item = itemData[itemIndex];
      setCurrentItem(item);
      SetRefresh(!refesh);
    }
    
    function ValidFinish() {
      //if false the finish is valid, all items has at least one user assigned
      if(itemData.length === 0){
        // Alert.alert("At least one item must be added!");
        return false;
      }
      //checks through every items user list, if one is found without a user this is invalid
      const anyEmpty = itemData.some(itemData => itemData.users.length <= 0);
      if(anyEmpty===false){
        return true;
      }
      else{
        Alert.alert("All item's must be assigned a user!");
        return false;
      }
    }

    function CalculateUserExpense(){
        //call valid finish before calculating
        // if(!ValidFinish()){
        //     return;
        // }
        //create an array that will reflect each users spending
        console.log(userData);
        let userSpending = new Array(userData.length).fill(0);
        //loop through the items
        for(var x = 0; x < itemData.length;x++){
            //the price that each user will pay for the item will be equal to the items price divided by the number of users
            var priceSplit = itemData[x].price/itemData[x].users.length;
            //loop through that items users
            for(var y = 0; y < itemData[x].users.length;y++){
              //add the value to the array that was created at the index of each user that was assigned
              userSpending[itemData[x].users[y].index] = userSpending[itemData[x].users[y].index] + parseFloat(priceSplit);
            }
        }
        //log to test the result
        for(var z = 0;z < userSpending.length;z++){
          console.log(userData[z].name + " spent: $" + userSpending[z].toFixed(2));
        }

        navigation.navigate("PayingTransaction");
    }

    function EditItem(item){
        setCurrentItem(item);
        setName(item.name);
        setPrice(item.price);
        setTransactionModalVisible(true);
    }

    function AddItem(){
      let item = {name:"",price:null,id:itemData.length,users:[]};
      itemData[itemData.length] = item;
      setItemData(itemData);
      setCurrentItem(item);
      setTransactionModalVisible(true);
    }

    function MakeItemChanges(){
      // let i = itemData.findIndex(data=>data.id==currentItem.id);
      // itemData[i].name = newName;
      // itemData[i].price = newPrice;
      setTransactionModalVisible(false);
      // setItemData(itemData);
      // if(itemData.length == 0){
      //   setTotal(newPrice.toFixed(2));
      //   setItemCount(1);
      // }
      // else{
      //   updateData();
      // }
    }

    function updateData(){
      let total = itemData.map(item => item.price).reduce((prev, next) => parseFloat(prev) + parseFloat(next));
      setTotal(total.toFixed(2));
      setItemCount(itemData.length);

      if(ValidFinish()){
        setCanContinue(true);
      }
      else{
        setCanContinue(false);
      }
    }


    function AddIndex(){
      for(var x = 0;x<udata.length;x++){
        udata[x].index = x;
      }
      return udata;
    }
    
    const Item = ({ item }) => (
      <View style={{flexDirection:"row"}}>


        <TouchableOpacity onPress={() => EditItem(item)}>

          {/* <View style={styles.item}>
            <Text style={{alignSelf:'flex-start', justifyContent:'center',fontSize:20,flex:1}}>{item.name}</Text>
            <Text style={{alignSelf:'flex-end',justifyContent:'center',fontSize:20,flex:1}}>${item.price}</Text> */}

            <View style={styles.wrapper}>
  
                <View style={{flexDirection:"row"}}>
                    <View style={{flex:1}}>
                        <Text style={styles.itemName}>{item.name}</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={styles.itemPrice}>${item.price}</Text>
                    </View>
                </View>

        </View>
    
            {/* <FlatList
              data={item.users}
              renderItem={({ item }) => <View><Image style = {styles.smallImage} source={{uri: item.uri}}/></View>}
              contentContainerStyle={{
                flexDirection:'row',
                flexWrap:'numColumns'
              }}
            /> */}
          {/* </View> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => DeleteItem(item.id)}>
          <FontAwesome5
              name={"minus"}
              color={"#9E9E9E"}
              size={18}
          />
        </TouchableOpacity>
      </View>
    );

    const [itemData,setItemData] = useState([]);
    const [newName,setName] = useState([]);
    const [newPrice,setPrice] = useState([]);
    const [total,setTotal] = useState([]);
    const [itemCount,setItemCount] = useState("");
    const [transactionModal,setTransactionModalVisible] = useState("");
    const [currentItem,setCurrentItem] = useState("");
    const [refesh,SetRefresh] = useState("");

    useEffect(() => {
        setItemData(data);
        setItemCount(data.length)
        let total = 0;
        if(data.length>0){
          total = data.map(item => item.price).reduce((prev, next) => prev + next);
        }
        setTotal(total);
        setUserData(AddIndex());
    }, [])

  return (
    <SafeAreaView>
      <Logo/>
      <BottomLayer/>
      <BottomBar/>
      
      {canContinue ? (
          <TouchableOpacity onPress={() => CalculateUserExpense()}>
            <ContinueButton/>
          </TouchableOpacity>
      ) : (
          <TouchableOpacity onPress={() => AddItem()}>
            <AddButton/>
          </TouchableOpacity>
      )}


      <Text style={styles.myGroup}>Add Expense</Text>
      <View style = {styles.centeredView}>  
        {itemData.length == 0 ? (
            <View style={styles.wrapper}>
                <View style={{flex:1}}>
                    <Text style={styles.itemName}>No items yet</Text>
                </View>
              </View>
          ) : (
              <Text></Text>
          )}
          <FlatList data={itemData} extraData ={itemData}renderItem={({ item }) => <Item item={item} />} />
      </View>

      <View style={styles.extraInfoContainer}>
          <Text  style={styles.extraInfo}>Item count: {itemCount}</Text>
          <Text  style={styles.extraInfo}>Subtotal: {total}</Text>

      </View>


      <Modal
        animationType="slide"
        transparent={true}
        visible={transactionModal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setTransactionModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Text style={styles.modalText}>Edit Item</Text> */}
            <View style = {styles.modalContent}>
              <View style={{width:100,height:100}}>
                  <FlatList
                    contentContainerStyle={{
                      flexDirection:'row',
                    }}
                    data={currentItem.users}
                    extraData ={refesh}
                    renderItem={({item}) => <View style={{flexDirection:"row"}}><View style ={styles.pictures}><Image style = {styles.smallImage} source={{uri: item.uri}}/></View></View>}
                  />
              </View>


              <View style={{justifyContent:'center'}}> 
                <TextInput placeholder ="Name" defaultValue={currentItem.name} style ={styles.input} onChangeText={newText => setName(newText)}></TextInput>
                <TextInput placeholder = "0.00" defaultValue={currentItem.price} style ={styles.input} onChangeText={newText => setPrice(newText)}></TextInput>
              </View>

            <View style={{flexDirection:"row",justifyContent:'center'}}>
              <TouchableOpacity onPress={() => AddAllUsers(currentItem.id)}>          
                  <FontAwesome5
                    name={"user-plus"}
                    color={"#9E9E9E"}
                    size={30}
                  />
            </TouchableOpacity>
              <TouchableOpacity onPress={() => RemoveAllUsers(currentItem.id)}>
                  <FontAwesome5
                    name={"user-minus"}
                    color={"#9E9E9E"}
                    size={30}
                  />
              </TouchableOpacity>
            </View>

            <View style={{flexDirection:"row",width:250,}}>
            <FlatList
              contentContainerStyle={{
                flexDirection:'row',
              }}
              data={userData}
              extraData ={userData}
              renderItem={({item}) => <View><View><TouchableOpacity onPress={()=>UserClick(currentItem.id,item.id)}><View><Image style = {styles.image} source={{uri: item.uri}}/><Text style={{
                alignSelf: 'center',
              }}>{item.name}{"\n\n"}</Text></View></TouchableOpacity></View></View>}
            />
            </View>
            </View>

            <TouchableOpacity onPress={() => MakeItemChanges()}><Text>Finish</Text></TouchableOpacity>

          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

export default Create;

const styles = StyleSheet.create({
  myGroup: { color: "black", fontWeight: "bold", left: 25, fontSize: 25, top:60,},
  wrapper: {
    width:300,
    height:50,
    backgroundColor: '#EAF0F7',
    marginBottom:20,
    justifyContent:'center',
    
  },
  itemName:{
    alignSelf:'flex-start', justifyContent:'center',fontSize:20,left:30,color:'#4F555A'
  },
  itemPrice:{
    alignSelf:'flex-end', justifyContent:'center',fontSize:20,right:30,color:'#4F555A'
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  item: {
    flex:1,
    flexDirection:'row',
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#EAF0F7',
    marginBottom:50,
    height:50,
    borderRadius:8,
    width:300
  },
  imageContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    height:300,
  },
  pictures: {
        alignSelf: 'center',
        flex:1,
        flexDirection:'row'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalContent:{
    justifyContent:'center',
    alignContent:'center',
  },
  modalView: {
    top:300,
    justifyContent:'center',
    alignSelf:'center',
    width:500,
    height:500,
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
  input: {
    left:15,
    height: 40,
    width:200,
    margin: 12,
    borderWidth: 1,
  },
  image:{
    width:80,
    height:80,
    borderRadius:80,
  },
  smallImage:{
    flex: 1,
    width:30,
    height:30,
    borderRadius:30,
  },
  subheading: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },


  deleteButton: {
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    backgroundColor: '#DDDDDD',
    height:30,
    width:30,
    borderRadius:20,
    bottom:10,
  },

  finishButton: {
    alignItems: 'center',
    flex:1,
    justifyContent:'center',
    backgroundColor: '#DDDDDD',
    height:50,
    width:200,
    padding: 10
  },
  extraInfo: {
    paddingVertical: 8,
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
  },
  extraInfoContainer:{
    alignSelf:'center',
    marginTop: 550,
    position:'absolute',
  }

});