import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
// import Clipboard from "@react-native-clipboard/clipboard";
import * as Clipboard from 'expo-clipboard';
import app from "..//Firebase";
import { Input } from "react-native-elements";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import React, { useEffect, useState } from "react";
import {Logo,BottomLayer,BottomBar,AddButton} from "../components/Svgs";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import PermissionPop from "../components/AlertModal";
import * as ImagePicker from "expo-image-picker";
import { BallIndicator } from "react-native-indicators";
import {
    getFirestore,
    collection,
    addDoc,
    setDoc,
    doc,
    
  } from "firebase/firestore";
import { Alert } from "react-native";
const CreateGroup = ({ navigation }) => {
  const [isShow, setisShow] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [image, setimage] = useState(null);
  const [GrouName, setGrouName] = useState("");
  const [Pascode, setPascode] = useState("");
  const [Name, setName] = useState("");
  const [Friend, setFriend] = useState("");
  const [FriendsList, setFriendsList] = useState([]);
  // const Auth = getAuth(app);
  // const db = getFirestore(app);
  useEffect(() => {
    const randomId = Math.floor(10000000 + Math.random() * 90000000).toString();
    setPascode(randomId);
  }, []);
  // console.log(Auth?.currentUser?.uid);

  const onCreatGroup = async () => {
    if (GrouName == "") {
      Alert.alert("Alert!", "Enter Group name");
    } else if (Pascode == "") {
      Alert.alert("Alert!", "Enter Group Passcode");
    } else {
      console.log(GrouName);
      const userref = collection(db, "groups")
      console.log(userref);
      const uniqueId = Math.random().toString(36).substring(2) + Date.now().toString(36)
      setDoc(doc(db, "groups", uniqueId), {
        name: Name,
        Pascode: Pascode,
        GrouName: GrouName,
        FriendsList: FriendsList,
        authorEmail: Auth?.currentUser?.email,
        authorID: Auth?.currentUser?.uid,
        total:0,
        uid:uniqueId
      })
        .then((docRef) => {
            setFriend("")
            setFriendsList([])
            setGrouName("")
            setName()
          navigation.replace("Home");
        })
        .catch((error) => {
          Alert.alert("Sorry!", "Some thing wrong");
        });
    }
  };
  function copyToClipboard(){
    Clipboard.setStringAsync(Pascode);
    console.log("Copied!");
  }

  console.log(FriendsList);
  
  return (
    <SafeAreaView>
      <BottomLayer/>
      <BottomBar/>
      <Logo/>
      <TouchableOpacity onPress={() => onCreatGroup()}>
        <AddButton/>
      </TouchableOpacity>
      <View>


        <Text style={styles.myGroup}>Name your group</Text>
        <View style={styles.MyGroupSpace}>
          <Input
            onChangeText={(e) => setGrouName(e)}
            placeholder="Group name"
            inputContainerStyle={{
              borderBottomWidth: 0,
              alignSelf: "center",
              height: 20,
              borderRadius: 10,
              marginTop: 15,
            }}
            containerStyle={{
              backgroundColor: "#dfe9e9",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
            rightIcon={
              <TouchableOpacity
                style={{
                  height: 20,
                  width: 20,
                  borderWidth: 1,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>X</Text>
              </TouchableOpacity>
            }
          />

          <Input
            //For now just keep at passcode
            editable={false}  
            onChangeText={(e) => setPascode(e.replace("Passcode",""))}
            placeholder="Passcode"
            color="#000" 
            value={`Pascode:${Pascode}`}
            inputContainerStyle={{
              borderBottomWidth: 0,
              alignSelf: "center",
              height: 20,
              borderRadius: 10,
              marginTop: 15,
            }}
            containerStyle={{
              backgroundColor: "#dfe9e9",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
            rightIcon={
              <TouchableOpacity onPress={()=>copyToClipboard()}>
                <FontAwesome5 name={"copy"} color={"#9E9E9E"} size={18} />
              </TouchableOpacity>
            }
          />

          <Input
            onChangeText={(e) => setName(e)}
            placeholder="Name"
            inputContainerStyle={{
              borderBottomWidth: 0,
              alignSelf: "center",
              height: 20,
              borderRadius: 10,
              marginTop: 15,
            }}
            containerStyle={{
              backgroundColor: "#dfe9e9",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
            rightIcon={
              <TouchableOpacity
                style={{
                  height: 20,
                  width: 20,
                  borderWidth: 1,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>X</Text>
              </TouchableOpacity>
            }
          />

          <View
            style={{
              height: 55,
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Input
              onChangeText={(e) => setFriend(e)}
              placeholder="Add a Friend with user ID"
              inputContainerStyle={{
                borderBottomWidth: 0,
                alignSelf: "center",
                height: 30,
                borderRadius: 10,
                marginTop: 20,
              }}
              containerStyle={{
                backgroundColor: "#dfe9e9",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                width: "90%",
              }}
              value={Friend}
              rightIcon={
                <TouchableOpacity
                  style={{
                    height: 20,
                    width: 20,
                    borderWidth: 1,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>X</Text>
                </TouchableOpacity>
              }
            />
            <TouchableOpacity
              style={{
                height: 30,
                width: 30,
                left: 10,
                top: 10,
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#dfe9e9",
              }}
              onPress={() => {
                setFriendsList([{...FriendsList,email:Friend}]);
                setFriend("");
              }}
            >
              <FontAwesome5 name="plus" />
            </TouchableOpacity>
          </View>
        </View>


        <View style={styles.bottomLayerConaner}>
        </View>
      </View>
      
      
    </SafeAreaView>
    
  );
};

export default CreateGroup;

const styles = StyleSheet.create({
  Logo: {
    height: "10%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  myGroup: { color: "black", fontWeight: "bold", left: 25, fontSize: 25,top:60, },
  PlusButton: {
    height: 60,
    width: 60,
    borderWidth: 3,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#4461F2",
    alignSelf: "center",
    top: 20,
    shadowColor: "#4461F2",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
  },
  MyGroupSpace: {
    top:80,
    height: "65%",
    width: "90%",
    alignSelf: "center",
    justifyContent: "space-around",
  },
  emptyContainer: {
    height: "36%",
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 20,
  },
  bottomLayerConaner: {
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
    bottom: 10,
  },
});
