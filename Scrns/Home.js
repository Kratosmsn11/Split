import {SafeAreaView,StyleSheet,View,Dimensions,Text,TouchableOpacity,ScrollView,Image,FlatList,Alert,ActivityIndicator,RefreshControl} from "react-native";
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState,useRef } from "react";
import { SvgXml } from "react-native-svg";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { getGroups, getUserData, randomNumber } from "../backendFiles/firebaseFunctions";
import {Logo,BottomBar,BottomLayer, AddButton} from "../components/Svgs";
import { setGroupId, setGroupInfo, setGroupsData, setUsersData, setUserId } from "../AppData";
import ActionSheet from 'react-native-actionsheet';
import {firebase} from "../config/firebase";
  export const Home = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [isShow, setisShow] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    const [allGroups, setallGroups] = useState([]);
    const [image, setimage] = useState(null);
    const [TextReaded, setTextReaded] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    let actionSheet = useRef();
    var optionArray = ['Create a group', 'Join a group','Cancel'];

    const colors = [
    ];
    const images = [
      "https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=ejx13G9ZroRrcg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-young-user-icon-2400.png&ehk=NNF6zZUBr0n5i%2fx0Bh3AMRDRDrzslPXB0ANabkkPyv0%3d&risl=&pid=ImgRaw&r=0",
      "https://th.bing.com/th/id/R.eb6bc833d264d2e9f695d736836bb564?rik=g0KjEGcDgo30Hw&riu=http%3a%2f%2fgetdrawings.com%2ffree-icon%2fgeneric-avatar-icon-51.png&ehk=i3OIOsf6xtx%2bqaCLmwGi7hN4eDntLu%2f%2b9WxFbSVRYRo%3d&risl=&pid=ImgRaw&r=0",
      "https://th.bing.com/th/id/R.de2135625ce46525e09320ba02e86032?rik=03qOiI9B0N9KfA&pid=ImgRaw&r=0",
      "https://th.bing.com/th/id/R.8ecb8e1845f04b543161e388bef36334?rik=tXj9313wlJX5Tw&pid=ImgRaw&r=0",
    ];

    const showActionSheet = () => {
      actionSheet.current.show();
    };
  
    async function getGroupData(){
      // const userId = firebase.auth().currentUser.uid;
      const userId = "No3n3K6b7EhzHhQIxU81I2Mibvg1";
      setUserId(userId);
      const groups = await getGroups(userId);
      console.log(groups);
      setGroupsData(groups);
      await setUsersData(await getUserData(userId));
      setallGroups(groups);
      setisLoading(false);
    }
    useEffect(() => {isFocused && getGroupData() },[isFocused]);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
        getGroupData();
      }, 2000);
    }, []);
  

   const onGroupPress=(item)=>{
        setGroupInfo(item.id);
        setGroupId(item.id);
        navigation.navigate("GroupPage");
   }

   function actionSheetPress(index){
    console.log(index);
    //take picture
    if(index == 0){
      console.log("Create a group");
      navigation.navigate("CreateGroup");
    }
    //gallery
    if(index == 1){
      console.log("Join a group");
      navigation.navigate("JoinGroup");

    }
  }
  
    return (
      <SafeAreaView style={{ flex: 1 }}>

            <BottomLayer/>
            
            <TouchableOpacity
            onPress={() => showActionSheet()}>
                <AddButton/>
            </TouchableOpacity>
            <BottomBar/>
            
            <TouchableOpacity>
              <Logo/>
          </TouchableOpacity>
          <View>
          <Text style={styles.myGroup}>My Groups</Text>
          <View style={styles.MyGroupSpace}>
            {allGroups.length==0 && !isLoading &&
              <ScrollView style={{backgroundColor:'#EAF0F7',height:10}}>
                <Text style={{color:'#4F555A',left:10,top:10}}>You have no groups. Create or join a group to get started.</Text>
              </ScrollView>
              
            }
            <FlatList
              showsVerticalScrollIndicator={false}
              data={allGroups}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
              renderItem={({ item }) => {
                const randomIndex = Math.floor(Math.random() * colors.length);
                const randomColor = colors[randomIndex];
                const randomImage = images[randomIndex];
                console.log(item?.name);
                return (
                  <TouchableOpacity
  
                  onPress={()=>{
                   onGroupPress(item)
                  }}
                    style={{
                      height: 160,
                      width: "90%",
                      alignSelf: "center",
                      borderRadius: 10,
                      backgroundColor: item.color,
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 60,
                        alignSelf: "center",
                        bottom: 10,
                        backgroundColor: "white",
                        padding: 5,
                      }}
                      source={{ uri: randomImage }}
                    />
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 16,
                        fontWeight: "bold",
                        color:'white'
                      }}
                    >
                      {item?.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>

        </View>
        {isLoading && 
        <View style={{position:'absolute',justifyContent:'center',alignContent:'center',alignItems:'center',alignSelf:'center',top:200}}>
          <ActivityIndicator size="large" color="#4F555A" />
          </View>
        }

        <ActionSheet
          ref={actionSheet}
          options={optionArray}
          cancelButtonIndex={2}
          onPress={(index) => {
            actionSheetPress(index);
          }}
        />
        
        
       
      </SafeAreaView>
    );
  };
  
  export default Home;
  
  const styles = StyleSheet.create({
    Logo: {
      position:'absolute',
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
    },
    myGroup: { color: "black", fontWeight: "bold", left: 40, fontSize: 25,top:70 },
    PlusButton: {
      height: 60,
      width: 60,
      borderWidth: 3,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      borderColor: "#4461F2",
      alignSelf: "center",
      top: 10,
      shadowColor: "#4461F2",
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.9,
      shadowRadius: 4,
    },
    MyGroupSpace: {
      height: "72%",
      // backgroundColor: "#b0c4de",
      width: "90%",
      marginTop: 80,
      borderRadius: 20,
      alignSelf: "center",
    },
    emptyContainer: {
      height: "36%",
      width: "90%",
      alignSelf: "center",
      marginTop: 20,
      borderRadius: 20,
    },
    bottomLayerConaner: {
      height: "9%",
      justifyContent: "center",
      alignItems: "center",
      bottom: 10,
    },
  });
