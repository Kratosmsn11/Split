import * as React from 'react';
import {useState,useEffect} from 'react';
import {Text,View,StyleSheet,SafeAreaView,TouchableOpacity,FlatList,TextInput,Alert,Modal,Pressable,Image,TouchableWithoutFeedback,ActivityIndicator} from 'react-native';
import { BottomSheet } from 'react-native-btr';
import { useNavigation } from '@react-navigation/native';
import { AddButton, BottomBar, BottomLayer, Logo,ContinueButton } from '../components/Svgs';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { getTransactionTotal, getUserSpending, setTransactionTotal, setUserSpending, getUsers, getImageURI,getImageURL,getReceiptURL, setUsersData } from '../AppData';
import { getReceiptData } from '../backendFiles/firebaseFunctions';
import { ScrollView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { extractData } from '../backendFiles/TextParser';
const Create = () => {
    const navigation = useNavigation();

    // var data = [
    //     {name: 'Soda', price: 2.19, id: 20055, users: []},
    //     // { name: 'Coffee', price: 3.17, id: 20056, users: []},
    //     // { name: 'Water', price: 5.50, id: 20057, users: [] },
    //     // { name: 'Tea', price: 5.55, id: 20058, users: [] },
    // ];

    const [userData,setUserData] = useState("");
    const [currentUsers,setCurrentUsers] = useState("");
    const [canContinue,setCanContinue] = useState(false);
    
    const udata = [
      { uri: 'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg', name: 'Jane', id: 20055},
      { uri: 'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-2.jpg', name: 'Chloe', id: 20056},
      { uri: 'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-8.jpg', name: 'Bob', id: 20057},
    ];
    //function is called whenever user clicks on a user profile image to assign an item, either the user is
    //assigned or removed from the items user list
    function UserClick(itemId, userId,index) {
      console.log(itemId);
      console.log(userId);
      //the items id is passed in and is used to find the item
      var item = currentItem;
      console.log(item);
      // //save the items user list
      var itemUsers = item.users;
      console.log(itemUsers);
      // //attempt to locate the user as part of the items user list
      var userFound = itemUsers.find(user=>user.id === userId);
      // //if the user is not part of the items user list it should be added
      if(userFound==undefined){
        //the user is found via the userId passed in
        var user = userData[index];
        var itemIndex = itemData.findIndex(data => data.id === itemId);
        //the user is pushed along side it's index for assigning of expenses
        itemData[itemIndex].users.push(user);
        //the item data's state is changed to reflect the changes
        setItemData(itemData);
        let item = itemData[itemIndex];
        setCurrentItem(item);
        setCurrentUsers(item.users);
        SetRefresh(!refesh);
      }
      //if the user is part of the items user list it should be removed
      else{
        //the item and user indexes are found using the values passed in
        var itemIndex = itemData.findIndex(data=>data.id === itemId);
        var userIndex = index;
        //the items user list gets the user removed using splicing with the index found
        itemData[itemIndex].users.splice(userIndex,1);
        //item's data state is changed
        setItemData(itemData);
        let item = itemData.find(data=>data.id==itemId);
        setCurrentItem(item);
        SetRefresh(!refesh);
      }
      // console.log(itemData[itemIndex].users);
      // updateData();
      // SetRefresh(!refesh);
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

        setUserSpending(userSpending);
        console.log(getUserSpending());
        setTransactionTotal(total);
        setUsersData(userData);
        console.log(getTransactionTotal());
        navigation.navigate("PayingTransaction");
    }

    function EditItem(item){
        setCurrentItem(item);
        setName(item.name);
        setPrice(item.price.toString());
        setTransactionModalVisible(true);
    }

    function AddItem(){
      let item = {name:"",price:"",id:itemData.length,users:[]};
      itemData[itemData.length] = item;
      setItemData(itemData);
      setCurrentItem(item);
      setPrice("");
      setName("");
      setTransactionModalVisible(true);
    }

    function MakeItemChanges(){
      if(newPrice==0.00 || newPrice=="" || newName ==0.00){
        ClickAway();
        return;
      }
      let i = itemData.findIndex(data=>data.id==currentItem.id);
      itemData[i].name = newName;
      itemData[i].price = parseFloat(newPrice);
      setTransactionModalVisible(false);
      setItemData(itemData);
      if(itemData.length == 0){
        setTotal(newPrice.toFixed(2));
        setItemCount(1);
      }
      else{
        updateData();
      }
    }

    function updateData(){
      if(itemData.length>0){
        // calculateTotal(itemData);
        console.log(itemData);
        let total = itemData.map(item => item.price).reduce((prev, next) => prev + next);
        setTotal(total);
        setItemCount(itemData.length);
      }
      else{
        setTotal(0);
        setItemCount(0);
      }
 

      if(ValidFinish()){
        setCanContinue(true);
      }
      else{
        setCanContinue(false);
      }
    }


    function AddIndex(){
      var usersInGroup = getUsers();
      // var usersInGroup = [{
      //   "color": "#7e78cf",
      //   "email": "abraham@gmail.com",
      //   "groups":{
      //     "2VOh25VWeWwQNnuPtloP": true,
      //     "eU2gXJL4VQle1MXHvi8u": true,
      //     "xixKTent0lEFpjESKazl": true,
      //   },
      //   "id": "2qNCq7dHeJRA1uXTz6nr",
      //   "index": 0,
      //   "name": "Abraham",
      //   "password": "password",
      //   "phone": "567-7890",
      //   "picture": "none",
      //   "uid": "2qNCq7dHeJRA1uXTz6nr",
      // },
      //  {
      //   "color": "#fab6d9",
      //   "email": "joseph1234@gmail.com",
      //   "groups":{
      //     "MbJi6ZCsX0Iq9YziMbcz": true,
      //     "Pe2EQxUypwTp0MJLpkbe": true,
      //     "xixKTent0lEFpjESKazl": true,
      //   },
      //   "id": "No3n3K6b7EhzHhQIxU81I2Mibvg1",
      //   "index": 1,
      //   "name": "Joseph123",
      //   "password": "password",
      //   "phone": "123-123-67",
      //   "picture": "https://www.freepnglogos.com/uploads/camera-logo-png/black-camera-logo-icon-download-4.png",
      //   "uid": "No3n3K6b7EhzHhQIxU81I2Mibvg1",
      // },]

      for(var x = 0;x<usersInGroup.length;x++){
        usersInGroup[x].index = x;
      }
      return usersInGroup;
    }
    
    function ClickAway(){
      if(currentItem.name=="" || currentItem.price ==0.00){
        itemData.pop();
        setItemData(itemData);
        SetRefresh(!refesh);
      }
      setTransactionModalVisible(false);
    }

    
    const Item = ({ item }) => (

      <View style={{flexDirection:"row"}}>
        <TouchableOpacity onPress={() => EditItem(item)}>
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
              extraData={refesh}
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

    let row = [];
    let prevOpenedRow;
    const renderItem = ({ item, index }, onClick) => {
      //
      const closeRow = (index) => {
        console.log('closerow');
        if (prevOpenedRow && prevOpenedRow !== row[index]) {
          prevOpenedRow.close();
        }
        prevOpenedRow = row[index];
      };
  
      const renderRightActions = (progress, dragX, onClick) => {
        return (
          <View
            style={{
              alignContent: 'center',
              justifyContent: 'center',
              bottom:10,

            }}>
  
            <TouchableOpacity onPress={() => DeleteItem(index)} style={{alignItems:'center',alignContent:'center',alignSelf:'center',justifyContent:'center',backgroundColor:'red',width:60,height:40}}>
              <FontAwesome5
                    name={"trash-alt"}
                    color={"white"}
                    size={20}
              />
            </TouchableOpacity>
          </View>
        );
      };
  
      return (
        <Swipeable
          renderRightActions={(progress, dragX) =>
            renderRightActions(progress, dragX, onClick)
          }
          onSwipeableOpen={() => closeRow(index)}
          ref={(ref) => (row[index] = ref)}
          rightOpenValue={-100}>
      <View style={{flexDirection:"row"}}>
        <Pressable onLongPress={() => EditItem(item)} delayLongPress={100}>
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
              extraData={refesh}
              renderItem={({ item }) => <View><Image style = {styles.smallImage} source={{uri: item.uri}}/></View>}
              contentContainerStyle={{
                flexDirection:'row',
                flexWrap:'numColumns'
              }}
            /> */}
          {/* </View> */}
        </Pressable>
        {/* <TouchableOpacity style={styles.deleteButton} onPress={() => DeleteItem(item.id)}>
          <FontAwesome5
              name={"minus"}
              color={"#9E9E9E"}
              size={18}
          />
        </TouchableOpacity> */}
      </View>
        </Swipeable>
      );
    };
  

    //used when removing an item from a transaction, uses id passed to locate and remove item from list of items
    function DeleteItem(index) {
      if(itemData.length==1){
        setTotal(0);
      }
      //index is found using id
      var itemIndex = index;
      //using splice the item is removed
      itemData.splice(itemIndex,1);

      for(var x = 0;x<itemData.length;x++){
        itemData[x].id = x;
      }

      // the item count is also set using the new length of the data
      setItemCount(itemData.length);
      if(itemData.length>0){
        let total = itemData.map(item => item.price).reduce((prev, next) => parseFloat(prev) + parseFloat(next));
        setTotal(total.toFixed(2));
      }
      //the state is changed for items, this will update the flatlist
      setItemData(itemData);
      updateData();
    }
        

    const [itemData,setItemData] = useState([]);
    const [newName,setName] = useState([]);
    const [newPrice,setPrice] = useState([]);
    const [total,setTotal] = useState([]);
    const [itemCount,setItemCount] = useState("");
    const [transactionModal,setTransactionModalVisible] = useState("");
    const [currentItem,setCurrentItem] = useState("");
    const [refesh,SetRefresh] = useState("");
    const [isLoading,setisLoading] = useState(true);

    async function callGetReceiptData(){
      const data = await getReceiptData();

      setItemData(data.items);
      setItemCount(data.items.length)
      let total = 0;
      if(data.items.length>0){
        total = data.items.map(item => item.price).reduce((prev, next) => prev + next);
      }
      setTotal(total);
      setUserData(AddIndex());
      SetRefresh(!refesh);
      console.log(userData);
      setisLoading(false);
    }

    useEffect(() => {
      setisLoading(true);
      var data;
      data = getReceiptURL();
      console.log(data);
      if(data == undefined){
        data = [];
        data.items =[];
        setItemData(data.items);
        setItemCount(data.items.length)
        // const f  = ["Burger KING #14730", "4859 Gerrardstown Rd.", "Inwood, WV 25423",  "304-229-7992","ORDER 69", "Drive THRU", "DBL WHOPPER CHS 5.99", "No picles","Heavy mayo","BISC EGG CHS 2.59","LG COFFEE 1.79", "SUBTOTAL 10.37", "6.0% TAX","0.62","TOTAL 10.99", "CREDIT CARD 10.99","CHANGE 0.00","TOTAL CHARGE 10.99", "Visa","AcctNum: XXXXXXXXXX9028","Auth: 165997","RefNum: 010269","Merchant Id: 456163014990"]
        // const d = extractData(f);
        // setItemData(d.items);
        // setItemCount(d.items.length);
        setTotal(0);
        setUserData(AddIndex());
        SetRefresh(!refesh);
        setisLoading(false);
        return;
      }
      callGetReceiptData();

    }, [])

  return (
    <SafeAreaView>
      
      <BottomLayer/>
      <BottomBar/>

      <Logo></Logo>

      <Text style={styles.myGroup}>Add Expense</Text>

      {isLoading &&
        
        <ScrollView style={{height:400,bottom:0}}>
        <View style={{position:'absolute',justifyContent:'center',alignContent:'center',alignItems:'center',alignSelf:'center',top:200}}>
          <ActivityIndicator size="large" color="#4F555A" />
          </View>
          </ScrollView>

      
      }
      {!isLoading &&
      <View>
      {canContinue ? (
          <TouchableOpacity onPress={() => CalculateUserExpense()}>
            <ContinueButton/>
          </TouchableOpacity>
      ) : (
          <TouchableOpacity onPress={() => AddItem()}>
            <AddButton/>
          </TouchableOpacity>
      )}





      <View style = {styles.centeredView}>  
        {itemData.length == 0 ? (
            <View style={styles.wrapper}>
                <View style={{flex:1,justifyContent:'center'}}>
                    <Text style={styles.itemName}>No items yet</Text>
                </View>
              </View>
          ) : (
              <Text></Text>
          )}
          <FlatList data={itemData} extraData ={itemData}
          
          renderItem={(item,index) =>
            renderItem(item, () => {
              // DeleteItem(index);
            })
          }

          />
      </View>

      <View style={styles.extraInfoContainer}>
          <Text  style={styles.extraInfo}>Item count: {itemCount}</Text>
          <Text  style={styles.extraInfo}>Total: ${total.toFixed(2)}</Text>

      </View>

      <Modal
        animationType="slide"
        visible={transactionModal}
        presentationStyle='pageSheet'
        onRequestClose={() => {
          setTransactionModalVisible(false);
          ClickAway();
        }}>

        {/* <TouchableWithoutFeedback onPress={() => ClickAway()}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback> */}
        <View style={styles.centeredView}>
        <TouchableOpacity style={{justifyContent: 'center',alignSelf:'flex-start',left:35,bottom:30}} onPress ={()=>ClickAway()}>
          <Text style={{fontSize: 20, fontWeight: 'bold',textAlign:'center',color:'#00AEFF'}}>Cancel</Text>
        </TouchableOpacity>
          <View style={styles.modalView}>
            {/* <Text style={styles.modalText}>Edit Item</Text> */}
            <View style = {styles.modalContent}>

            <View style={{flexDirection:"row",justifyContent:'center',alignContent:'flex-start',alignSelf:'flex-start',alignItems:'flex-start',right:30}}>
              <View style={{marginHorizontal:10}}>
                {/* <TouchableOpacity onPress={() => AddAllUsers(currentItem.id)}>          
                    <FontAwesome5
                      name={"user-plus"}
                      color={"#9E9E9E"}
                      size={30}
                    />
                </TouchableOpacity>
              </View>
              <View style={{marginHorizontal:10}}>
                <TouchableOpacity onPress={() => RemoveAllUsers(currentItem.id)}>          
                    <FontAwesome5
                      name={"user-minus"}
                      color={"#9E9E9E"}
                      size={30}
                    />
                </TouchableOpacity> */}
              </View>
            </View>
              {/* <View style={{width:130,height:40,alignContent:'flex-end',alignSelf:'flex-end',alignItems:'flex-end',bottom:30,flex:1}}>                  
                  <FlatList
                    data={currentUsers}
                    extraData={refesh}
                    renderItem={({ item,index }) => <View style = {{marginHorizontal:5}}>
                      
                      <Image style = {styles.smallImage} source={{uri: item.picture}}/>
                    <View style={{
                        width:2500,
                        height:2500,
                        borderRadius:2500,
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
                    
                    </View>}
                    contentContainerStyle={{
                    flexDirection:'row',
                    }}
                  />
              </View> */}
                          <View style={{width:300,height:60,alignContent:'flex-end'}}>
            <FlatList
              contentContainerStyle={{
                alignSelf:'flex-end',
                justifyContent:'center',
                flexDirection:'row',
              }}
              data={currentItem.users}
              extraData={refesh}
              renderItem={({user,index}) => <View><View><TouchableOpacity><View>
                
                {currentItem.users[index].picture != "none" &&
                  <Image style = {styles.image} source={{uri: currentItem.users[index].picture}}/>
                } 
                
                {currentItem.users[index].picture == "none" &&
                <View style={{
                  width:40,
                  height:40,
                  borderRadius:40,
                  marginHorizontal:10,
                  backgroundColor:currentItem.users[index].color,
                  alignSelf:'flex-end',
                  alignContent:'center',
                  justifyContent:'center',
                }}>

                <Text style={{
                  fontSize:18,
                  color:'white',
                  textAlign:'center'
                }}>{currentItem.users[index].name[0].toUpperCase()}</Text>
                </View>
              }
              </View></TouchableOpacity></View></View>}
      
            />
            </View>


              <View style={{justifyContent:'center',bottom:5}}> 
                  <Text style={{fontSize:22,fontWeight:'bold',left:10}}>Name</Text>
                <TextInput placeholder ="Name"  placeholderTextColor='#9E9E9E' color='#4F555A' defaultValue={currentItem.name} style ={styles.input} onChangeText={newText => setName(newText)}></TextInput>
                <Text style={{fontSize:22,fontWeight:'bold',left:10}}>Price</Text>
                <TextInput placeholder = "0.00" placeholderTextColor='#9E9E9E' color='#4F555A' style ={styles.input} defaultValue={(currentItem.price==undefined ? '' :currentItem.price.toString())} onChangeText={newText => setPrice(newText)} keyboardType='numeric'></TextInput>
              </View>

              <Text style={{fontSize:22,fontWeight:'bold',left:10}}>Group Members</Text>

              {/* <View style={{justifyContent:'center',alignContent:'center',alignItems:'center'}}><TouchableOpacity style={styles.itemButton} onPress={()=>MakeItemChanges()}><Text style = {{color:'white'}}>Finish</Text></TouchableOpacity></View> */}
              {/* <TouchableOpacity style={{justifyContent: 'center',width:150,height:50,borderRadius:5,alignSelf:'center',backgroundColor:'#00AEFF'}} onPress ={()=>MakeItemChanges()}>
          <Text style={{fontSize: 15, fontWeight: 'bold',textAlign:'center',color:'white',fontSize:30,fontWeight:'300'}}>Submit</Text>
        </TouchableOpacity> */}

            <View style={{width:300,top:30,alignSelf:'center'}}>
            <FlatList
              contentContainerStyle={{
                
                flexDirection:'row',
                width:500,
                height:100
              }}
              data={userData}
              extraData={refesh}
              renderItem={({user,index}) => <View><View><TouchableOpacity onPress={()=>UserClick(currentItem.id,userData[index].id,index)}><View>
                {/* <Image style = {styles.image} source={{uri: userData[index].picture}}/> */}
                <View style={{
                  width:80,
                  height:80,
                  borderRadius:80,
                  marginHorizontal:10,
                  backgroundColor:userData[index].color,
                  alignContent:'center',
                  justifyContent:'center',
                }}>

                <Text style={{
                  fontSize:35,
                  color:'white',
                  textAlign:'center'
                }}>{userData[index].name[0].toUpperCase()}</Text>
                </View>
                <Text style={{
                alignSelf: 'center',
                color:'#4F555A',
                fontWeight:'bold'
              }}>{userData[index].name}</Text></View></TouchableOpacity></View></View>}
            />
            </View>
            <TouchableOpacity style={{justifyContent: 'center',borderWidth:2,width:120,height:60,borderRadius:5,borderColor:'#4461F2',alignSelf:'center',top:100,backgroundColor:'#4461F2',alignItems:'center'}} onPress ={()=>MakeItemChanges()}>
          {/* <Text style={{fontSize: 15, fontWeight: 'bold',textAlign:'center',color:'#00AEFF'}}>Finish</Text> */}

          <FontAwesome5
                      name={"check"}
                      color={'white'}
                      size={30}
                    />

        </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      </View>
      }


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
    alignSelf:'flex-end', justifyContent:'center',fontSize:20,right:30,color:'#4F555A',fontWeight:'bold'
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
    height:350,

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
    // top:20,
    // justifyContent:'center',
    // alignSelf:'center',
    // width:230,
    // height:410,
    // backgroundColor: 'white',
    // borderRadius: 20,
    // alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,

  },
  input: {
    height: 60,
    width:300,
    margin: 12,
    borderRadius:8,
    borderWidth:1,
    borderColor:'#EAF0F7',
    backgroundColor:'#EAF0F7',
    alignSelf:'center',
    borderWidth:15,
    fontSize:23
  },
  image:{
    width:40,
    height:40,
    borderRadius:40,
  },
  smallImage:{
    width:300,
    height:300,
    borderRadius:300,
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
    marginTop: 470,
    position:'absolute',
  },
  modalOverlay: {
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0,
    // backgroundColor: 'rgba(0,0,0,0.5)'
  },
  itemButton:{
    borderRadius:8,
    width:100,
    borderWidth:6,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    textAlign:'center',
    borderColor:'#4461F2',
    backgroundColor:'#4461F2',
    color:'#4461F2'
  }

});