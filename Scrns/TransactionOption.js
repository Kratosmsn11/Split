import {SafeAreaView,StyleSheet,View,Dimensions,Text,TouchableOpacity,ScrollView,Image} from "react-native";
import Svg, { Path } from "react-native-svg"
import React, { useEffect, useState,useRef } from "react";
import { useNavigation } from '@react-navigation/native';
import {Logo,BottomLayer,LeftArrow,BottomBar} from "../components/Svgs";
import PermissionPop from '../components/AlertModal';
import ActionSheet from 'react-native-actionsheet';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync } from "expo-image-manipulator";
import { setImageURI, setReceiptURL } from "../AppData";
import {uploadImageAsync} from '../backendFiles/firebaseFunctions';
//Bottom action sheet referenced from :https://snack.expo.dev/embedded/@aboutreact/react-native-bottom-actionsheet?preview=true&platform=ios&iframeId=qn4os3zz2g&theme=dark

setReceiptURL(undefined);

const AddExpense = () => {
  const navigation = useNavigation();
  const [isShow,setIsShow] = useState(false);
  const[currentPicture,setPicture] = useState("");
  let actionSheet = useRef();
  var optionArray = ['Take a picture', 'Choose from gallery', 'Cancel'];

  function onCamera(){
    setIsShow(false);
    navigation.navigate("Camera");
  }

  function onGallary(){
    setIsShow(false);
  }

  const showActionSheet = () => {
    actionSheet.current.show();
  };

  function actionSheetPress(index){
    console.log(index);
    //take picture
    if(index == 0){
      console.log("Take a picture");
      navigation.navigate("Camera")
    }
    //gallery
    if(index == 1){
      pickImage();
      console.log("Open gallery");

    }
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPicture(result.assets[0].uri);

      const manipResult = await manipulateAsync(
        currentPicture,
        [{ resize: { width: 1024, height: 1024 } }],
        { format: "jpeg", base64: true }
      );
      // setPicture(manipResult.uri);
      // setImageURI(currentPicture);
      // console.log(currentPicture);
      const url = await uploadImageAsync(manipResult.uri);
      console.log(url);
      setReceiptURL(url);

      navigation.navigate("CreateTransaction");
    }
  };


  // async function uploadImageAsync(uri) {
  //   const blob = await new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.onload = function () {
  //       resolve(xhr.response);
  //     };
  //     xhr.onerror = function (e) {
  //       console.log(e);
  //       reject(new TypeError("Network request failed"));
  //     };
  //     xhr.responseType = "blob";
  //     xhr.open("GET", uri, true);
  //     xhr.send(null);
  //   });
  //   const fileRef = ref(getStorage(), uuid.v4());
  //   const result = await uploadBytes(fileRef, blob);
  //   blob.close();
  //   return await getDownloadURL(fileRef);
  // }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BottomLayer/>
      <BottomBar/>
      <View
        style={{
          height: Dimensions.get("window").height,
          width: Dimensions.get("window").width,
        }}
        
      >
        <LeftArrow/>
        <Logo/>
        <Text style={styles.myGroup}>Add Expense</Text>
        <View style={styles.MyGroupSpace}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CreateTransaction");
            }}
            style={{
              height: 50,
              width: "90%",
              backgroundColor: "#4461F2",
              alignSelf: "center",
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ textAlign: "center", color: "white" }}>
              Add manually
            </Text>
          </TouchableOpacity>
          <Text
            style={{ textAlign: "center", fontSize: 22, fontWeight: "bold" }}
          >
            OR
          </Text>
          <TouchableOpacity
            onPress={() => showActionSheet()}
            style={{
              height: 50,
              width: "90%",
              backgroundColor: "#4461F2",
              alignSelf: "center",
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ textAlign: "center", color: "white" }}>
              Scan a Receipt
            </Text>
          </TouchableOpacity>
        </View>

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
        </TouchableOpacity>
      </View>
      {/* <PermissionPop
        isOpen={isShow}
        onCamera={() => onCamera()}
        onGallary={() => onGallary()}
        onClose={() => {
          setIsShow(false);
        }}
      /> */}

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

export default AddExpense;

const styles = StyleSheet.create({
  Logo: {
    height: "10%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    flexDirection: "row",
  },
  myGroup: { color: "black", fontWeight: "bold", left: 25, fontSize: 25, top:60,},
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
    height: "68%",
    backgroundColor: "#EAF0F7",
    width: "90%",
    top:70,
    borderRadius: 20,
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
    height: "9%",
    justifyContent: "center",
    alignItems: "center",
    bottom: 10,
  },
});