import React, {useEffect,useState} from 'react';
import {Text, TouchableOpacity, View,StyleSheet,FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {setGroupId,setGroups,getGroupsData,setUserId,setGroupsData, getGroupData,setGroupInfo, getGroupInfo, setUsers, getUsers,setUsersIds,getGroupId,setUserInfo} from '../AppData';
import { getGroups, getGroupUsers, getUser, getUserId} from '../backendFiles/firebaseFunctions';
import { SafeAreaView } from 'react-native-safe-area-context';
import firebase from 'firebase/compat';
const TransactionOption = () => {
  const navigation = useNavigation();
  const [groups,groupData] = useState("");
  const uid = "8Z02wZ8mVHnoCFIFbQm4";

  useEffect(() => {
    async function setData() {
      // const userId = await getUserId(uid);
      setUserId(uid);
      console.log(uid);
      const data = await getGroups(uid);
      console.log(data);
      setGroupsData(data);
      groupData(getGroupData());
    }
    setData();
  }, [])

  const getData = async (id) =>{
    setGroupInfo(id);
    setUsers(await getGroupUsers(getGroupInfo()['id']));
    setGroupId(getGroupInfo()['id']);
    setUsersIds(getUsers());
    setUserInfo();
    navigation.navigate("Transaction");
  }

  function goHome(){
    navigation.navigate("Login");
  }
  

  const Group = ({name,id}) => (
    <TouchableOpacity onPress={()=>[getData(id)]}><View style={styles.item}><Text style ={styles.groupName}>{name}</Text></View></TouchableOpacity>
  );
  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity style={styles.button} onPress={()=>goHome()}><Text>Logout</Text></TouchableOpacity>
        <Text style={styles.heading}>Groups</Text>

        <FlatList
        data={groups}
        renderItem={({item}) =><Group name={item.name} id ={item.id}  />}
        keyExtractor={item => item.id}
      />

      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  button: {
    width:100,
    alignItems: 'center',
    backgroundColor: '#00bfff',
    padding: 10,
  },
  heading:{
    textAlign:'center',
    fontSize:30,
    fontWeight:'bold'
  },
  groupName:{
    textAlign:'center',
    fontSize:20,
  },
  item: {
    backgroundColor: '#D9D9D9',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width:300,
    height:150,
    borderRadius:10
  },

});

export default TransactionOption;