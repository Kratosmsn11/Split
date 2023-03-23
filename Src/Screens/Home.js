import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import BottomLayer from "..//Assets/BottomLayer.svg";
import Logo from "../Assets/Logo.svg";
import HomeImage from "../Assets/HomeImage.svg";
import ProfileImage from "../Assets/ProfileImage.svg";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import PermissionPop from "../Components/AlertModal";
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
  const [isShow, setisShow] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [allGroups, setallGroups] = useState([]);
  const [image, setimage] = useState(null);
  const [TextReaded, setTextReaded] = useState("");
  const db = getFirestore(app);
  const Auth = getAuth(app);
  const colors = [
    { bg: "red", textColor: "white" },
    { bg: "green", textColor: "white" },
    { bg: "blue", textColor: "white" },
    { bg: "yellow", textColor: "black" },
    { bg: "orange", textColor: "black" },
    { bg: "purple", textColor: "black" },
  ];
  const images = [
    "https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=ejx13G9ZroRrcg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-young-user-icon-2400.png&ehk=NNF6zZUBr0n5i%2fx0Bh3AMRDRDrzslPXB0ANabkkPyv0%3d&risl=&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/R.eb6bc833d264d2e9f695d736836bb564?rik=g0KjEGcDgo30Hw&riu=http%3a%2f%2fgetdrawings.com%2ffree-icon%2fgeneric-avatar-icon-51.png&ehk=i3OIOsf6xtx%2bqaCLmwGi7hN4eDntLu%2f%2b9WxFbSVRYRo%3d&risl=&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/R.de2135625ce46525e09320ba02e86032?rik=03qOiI9B0N9KfA&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/R.8ecb8e1845f04b543161e388bef36334?rik=tXj9313wlJX5Tw&pid=ImgRaw&r=0",
  ];
  const onCamera = async () => {
    setisShow(false);
    setTimeout(async () => {
      setTimeout(async () => {
        ImagePicker.launchCameraAsync({}).then(async (response) => {
          if (response.canceled) {
          } else {
            setimage(response);
          }
        });
      });
    }, 1000);
  };

  useEffect(() => {
    const q = query(collection(db, "groups"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const groups = [];
      querySnapshot.forEach((doc) => {
        groups.push(doc.data());
      });
      setallGroups(groups);
    });
  }, []);

  const onGallary = async () => {
    setisShow(false);
    setTimeout(async () => {
      ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      }).then(async (response) => {
        if (response.canceled) {
        } else {
          setimage(response);
        }
      });
    }, 1000);
  };

  console.log(image?.assets[0]);
  const ScannedImage = async () => {
    const formData = new FormData();
    formData.append("image", {
      uri: image?.assets[0].uri,
      type: "image/jpg",
      name: "test.jpg",
    });
    setisLoading(true);
    try {
      const response = await fetch("https://tecnorn.online/api/V1/report/ocr", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
        body: formData,
      });

      const result = await response.json();
      if (result?.ErrorMessage) {
        Alert.alert("Sorry", result?.ErrorMessage[0]);
        setisLoading(false);
        setimage(null);
      } else {
        setTextReaded(result);
        setisLoading(false);
        setimage(null);
      }
    } catch (error) {
      setisLoading(false);
      // alert("Something wrong tryagain");
      console.error(error, "......");
    }
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
        <Text style={styles.myGroup}>My Group</Text>
        <View style={styles.MyGroupSpace}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={allGroups}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            renderItem={({ item }) => {
              const randomIndex = Math.floor(Math.random() * colors.length);
              const randomColor = colors[randomIndex];
              const randomImage = images[randomIndex];
              console.log(item);
              return (
                <TouchableOpacity

                onPress={()=>{
                  navigation.navigate("GroupDetail",item)
                }}
                  style={{
                    height: 160,
                    width: "90%",
                    alignSelf: "center",
                    borderRadius: 10,
                    backgroundColor: randomColor.bg,
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
                      color: randomColor.textColor,
                    }}
                  >
                    {item?.GrouName}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("CreateGroup")}
          style={styles.PlusButton}
        >
          <FontAwesome5Icon name="plus" size={25} color={"#4461F2"} />
        </TouchableOpacity>
        <View style={styles.bottomLayerConaner}>
          <BottomLayer />
        </View>
      </View>
      <View
        style={{
          height: 80,
          width: "100%",
          position: "absolute",
          bottom: -1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            height: "80%",
            width: "25%",
            left: 5,
            top: 4,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <HomeImage />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: "80%",
            width: "25%",
            left: -5,
            top: 4,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ProfileImage />
        </TouchableOpacity>
      </View>
      <PermissionPop
        isOpen={isShow}
        onCamera={() => onCamera()}
        onGallary={() => onGallary()}
        onClose={() => {
          setisShow(false);
        }}
      />
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
  MyGroupSpace: {
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
