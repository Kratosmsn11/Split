import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
// import BottomLayer from "..//Assets/BottomLayer.svg";
import Logo from "../Assets/Logo.svg";
// import HomeImage from "../Assets/HomeImage.svg";
// import ProfileImage from "../Assets/ProfileImage.svg";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
// import PermissionPop from "../Components/AlertModal";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { BallIndicator } from "react-native-indicators";
import { Alert } from "react-native";
import app from "..//Firebase";

import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { FlatList } from "react-native";

const Home = ({ navigation }) => {
  const db = getFirestore(app);  
  const [text, setText] = useState('');

  const [inputs, setInputs] = useState([{ key: '', value: '' }]);
  const addHandler = () => {
    if(inputs.length <3){

    const addinputs = [...inputs];
    addinputs.push({ key: '', value: '' });
    setInputs(addinputs);
    }
  };
  const inputHandler = (text, key) => {
    const _inputs = [...inputs];
    _inputs[key].value = text;
    _inputs[key].key = key;
    setInputs(_inputs);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          height: Dimensions.get("window").height,
          width: Dimensions.get("window").width,
          backgroundColor: "#EAF0F7",
        }}
      >
        <View style={styles.Logo}>
          <Logo />
        </View>
        <Text style={styles.myGroup}>Add Group</Text>
        <View style={styles.addGroup}>



          <View
            style={{
              backgroundColor: '#ebf0f7',
              height: 40,
              margin: 12,
              borderWidth: 1,
              padding: 0
            }}>
            <TextInput
              style={{height: 40}}
              placeholder="  Group Name:"
              onChangeText={newText => setText(newText)}
              defaultValue={text}
            />
          </View>

          <View
            style={{
              backgroundColor: '#ebf0f7',
              height: 40,
              margin: 12,
              borderWidth: 1,
              padding: 0
            }}>
            <TextInput
              style={{height: 40}}
              placeholder="  Password:"
              onChangeText={newText => setText(newText)}
              defaultValue={text}
            />
          </View>

          <View
            style={{
              backgroundColor: '#ebf0f7',
              height: 40,
              margin: 12,
              borderWidth: 1,
              padding: 0
            }}>
            <TextInput
              style={{height: 40}}
              placeholder="  Member Name:"
              onChangeText={newText => setText(newText)}
              defaultValue={text}
            />
          </View>

          <View
            style={{
              backgroundColor: '#ebf0f7',
              height: 40,
              margin: 12,
              borderWidth: 1,
              padding: 0
            }}>
            <TextInput
              style={{height: 40}}
              placeholder="  Add a friend:"
              onChangeText={newText => setText(newText)}
              defaultValue={text}
            />
          </View>

          <View>
            <TouchableOpacity
              onPress={() => addHandler}
              style={styles.PlusButton}
              title="+"
            >
            </TouchableOpacity>
          </View>

        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateGroup")}
          style={styles.PlusButton}
        >
          <FontAwesome5Icon name="plus" size={25} color={"#4461F2"} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  Logo: {
    height: "10%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  myGroup: { color: "black", fontWeight: "bold", left: 25, fontSize: 25 },
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
  addGroup: {
    height: "63%",
    // backgroundColor: "#b0c4de",
    width: "90%",
    marginTop: 15,
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
