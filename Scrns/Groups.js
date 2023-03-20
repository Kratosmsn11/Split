import React, {useEffect,useState} from 'react';
import {Text, TouchableOpacity, View,StyleSheet,FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {setGroupId,setGroups,getGroupsData,setUserId,setGroupsData, getGroupData,setGroupInfo, getGroupInfo, setUsers, getUsers,setUsersIds,getGroupId} from '../AppData';
import { getGroups, getGroupUsers} from '../backendFiles/firebaseFunctions';
import { SafeAreaView } from 'react-native-safe-area-context';
const TransactionOption = () => {
  const navigation = useNavigation();

  const userId = "8dr7N2gI1k3Xk1oYXFGy";
  const itemCount = 3;
  const [groups,groupData] = useState("");

  useEffect(() => {
    async function setData() {
      setUserId(userId);
      const data = await (getGroups(userId));
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
    navigation.navigate("Transaction");
  }
  

  const Group = ({name,id}) => (
    <TouchableOpacity onPress={()=>[getData(id)]}><View style={styles.item}><Text style ={styles.groupName}>{name}</Text></View></TouchableOpacity>
  );
  return (
    <SafeAreaView>
      <View>
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