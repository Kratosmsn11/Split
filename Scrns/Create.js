import * as React from 'react';
import {useState,useEffect} from 'react';
import {Text,View,StyleSheet,SafeAreaView,TouchableOpacity,FlatList,TextInput,Alert,Modal,Pressable,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function App() {
  const navigation = useNavigation();

    var data = [
        {name: 'Soda', price: 2.19, id: 20055, users: []},
        { name: 'Burger', price: 3.17, id: 20056, users: []},
        { name: 'Chicken', price: 5.55, id: 20057, users: [] },
        { name: 'Fries', price: 5.55, id: 20058, users: [] },
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
        var itemIndex = itemData.findIndex(data=>data.id==itemId);
        //the user is pushed along side it's index for assigning of expenses
        itemData[itemIndex].users.push({...user,index:userIndex});
        //the item data's state is changed to reflect the changes
        setItemData(itemData);
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
      }
    }
    
    //used when removing an item from a transaction, uses id passed to locate and remove item from list of items
    function DeleteItem(id) {
      //index is found using id
      var itemIndex = itemData.findIndex(e => e.id == id);
      //using splice the item is removed
      itemData.splice(itemIndex,1);
      //the state is changed for items, this will update the flatlist
      setItemData(itemData);
      // the item count is also set using the new length of the data
      setItemCount(itemData.length);
    }
    
    function AddAllUsers(itemId) {
        var newData = itemData.map(item => {
          if (item.id === itemId) {
            return {
              ...item,
              users: userData
            };
          }
          return item;
        });
        setItemData(newData);
    }
    
    function RemoveAllUsers(itemId) {
      var newData = itemData.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            users: []
          };
        }
        return item;
      });
      setItemData(newData);
    }
    
    function ValidFinish() {
      //if false the finish is valid, all items has at least one user assigned
      if(itemData.length==0){
        Alert.alert("At least one item must be added!");
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
        if(!ValidFinish()){
            return;
        }
        //create an array that will reflect each users spending
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
          console.log(userData[z].name + " spent: $" + userSpending[z]);
        }

        navigation.navigate("FinishTransaction");
    }

    function EditItem(item){
        setCurrentItem(item);
        setTransactionModalVisible(true);
    }
    
    const Item = ({ item }) => (
      <View>
        <TouchableOpacity onPress={() => EditItem(item)}>
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text>${item.price}</Text>
    
            <FlatList
              data={item.users}
              renderItem={({ item }) => <View><Image style = {styles.smallImage} source={{uri: item.uri}}/></View>}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => DeleteItem(item.id)}>
          <Text>X</Text>
        </TouchableOpacity>
      </View>
    );

    const [itemData,setItemData] = useState([]);
    const [itemCount,setItemCount] = useState("");
    const [transactionModal,setTransactionModalVisible] = useState("");
    const [currentItem,setCurrentItem] = useState("");
    var userData = [
    { uri: 'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg', name: 'Jane', id: 20055 },
    { uri: 'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-2.jpg', name: 'Chloe', id: 20056 },
    { uri: 'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-8.jpg', name: 'Bob', id: 20057 },
    ];

    useEffect(() => {
        setItemData(data);
        setItemCount(data.length)
    }, [])

  return (
    <SafeAreaView>
      <View>
        <Text style={styles.title}>Create transaction</Text>
        <FlatList data={itemData} extraData ={itemData}renderItem={({ item }) => <Item item={item} />} />
        <Text style={styles.title}>Item count: {itemCount}</Text>
        <TouchableOpacity onPress={() => CalculateUserExpense()}>
          <Text>Finish</Text>
        </TouchableOpacity>
      </View>


      <Modal
        animationType="fade"
        transparent={true}
        visible={transactionModal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setTransactionModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Edit Item</Text>
            <View style = {styles.modalContent}>
            <FlatList
              data={currentItem.users}
              renderItem={({item}) => <View style ={styles.pictures}><Image style = {styles.smallImage} source={{uri: item.uri}}/></View>}
            />
            <TextInput defaultValue={currentItem.name} style ={styles.input}></TextInput>
            <TextInput defaultValue={currentItem.price+""} style ={styles.input}></TextInput>
            <Text style ={styles.subheading}>Group Members</Text>
            <TouchableOpacity onPress={() => AddAllUsers(currentItem.id)}><Text>Add all</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => RemoveAllUsers(currentItem.id)}><Text>Remove all</Text></TouchableOpacity>
            <FlatList
              data={userData}
              renderItem={({item}) => <TouchableOpacity onPress={()=>UserClick(currentItem.id,item.id)}><View><Image style = {styles.image} source={{uri: item.uri}}/><Text>{item.name}{"\n\n"}</Text></View></TouchableOpacity>}
            />
            </View>
            <Pressable
              style={[styles.button2, styles.buttonClose]}
              onPress={() => setTransactionModalVisible(false)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 16,
    paddingVertical: 8,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  item: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  imageContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  pictures: {
    flex: 1,
    flexDirection:'columns'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalContent:{
    left:30,
  },
  modalView: {
    width:300,
    height:400,
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
  input: {
    height: 40,
    width:200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
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
});