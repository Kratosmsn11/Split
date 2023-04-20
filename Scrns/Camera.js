// import React from 'react';
// import {SafeAreaView, Text, TouchableOpacity, View,StyleSheet,Button,Alert} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import {useState, useEffect} from 'react';
// import {Camera} from 'expo-camera';
// import {firebase} from '../config/firebase';
// import { manipulateAsync } from 'expo-image-manipulator';
// import * as FileSystem from 'expo-file-system';
// import { extractData} from '../backendFiles/TextParser';
// import {getStorage,ref,uploadBytes,getDownloadURL} from 'firebase/storage';
// import { getReceiptURL, setReceiptData, setReceiptURL} from '../AppData';
// import {getReceiptInfo} from '../backendFiles/GoogleVision';
// import uuid from "uuid";
// const CameraScreen = () => {
//   const [hasCameraPermission, setHasCameraPermission] = useState(null);
//   const [camera, setCamera] = useState(null);
//   const [detectionText, setDetectionText] = useState("");
//   const [type, setType] = useState(Camera.Constants.Type.back);
//   const [imageURL, setImageURL] = useState(null);
//   useEffect(()=>{
//     (async ()=>{
//       const cameraStatus = await Camera.requestCameraPermissionsAsync();
//       setHasCameraPermission(cameraStatus.status==='granted');
//     });
//   });

//   const takePicture = async () => {
//     if(camera){
//       const data = await camera.takePictureAsync();
//       const manipResult = await manipulateAsync(
//       data.uri,
//       [{ resize: { width: 450, height: 600 } }],
//       { format: 'jpeg', base64:true }
//     );
//       // const firebaseURL = "https://firebasestorage.googleapis.com/v0/b/split-cst499.appspot.com/o/344f9a6d-cb75-4e30-893b-a1c7ee67053e?alt=media&token=597ec30d-b2fa-4035-a3f9-17aa324aefeb";
//       if(manipResult.uri!=undefined){
//         const firebaseURL = await uploadImageAsync(manipResult.uri);
//         setReceiptURL(firebaseURL);
//         console.log(getReceiptURL());
//         var imageData = await getReceiptInfo(firebaseURL);
//         console.log(imageData);
//         var extractedData = await extractData(imageData);
//         console.log(extractedData);
//         setReceiptData(extractedData);
//         navigation.navigate("CreateTransaction");
//       }
//     }
//     if(hasCameraPermission===false){
//       return<Text>No camera access</Text>
//     }
// }

//   // From: https://github.com/expo/examples/blob/master/with-firebase-storage-upload/App.js
//   async function uploadImageAsync(uri) {
//     const blob = await new Promise((resolve, reject) => {
//       const xhr = new XMLHttpRequest();
//       xhr.onload = function () {
//         resolve(xhr.response);
//       };
//       xhr.onerror = function (e) {
//         console.log(e);
//         reject(new TypeError("Network request failed"));
//       };
//       xhr.responseType = "blob";
//       xhr.open("GET", uri, true);
//       xhr.send(null);
//     });
  
//     const fileRef = ref(getStorage(), uuid.v4());
//     const result = await uploadBytes(fileRef, blob);
//     blob.close();
  
//     return await getDownloadURL(fileRef);
// }

// const navigation = useNavigation();
//   return (
//     <SafeAreaView>
//     <View>
//       <TouchableOpacity onPress={()=> navigation.navigate("TransactionOption")} style = {styles.button}><Text>Go back</Text></TouchableOpacity>
//     </View>
//     <Text>{"\n\n\n\n"}</Text>
//     <View style={styles.align}>
//      <View style = {styles.cameraContainer}>
//      <Camera ref = {ref => setCamera(ref)}
//      style={styles.fixedRatio}
//      type ={type}
//      ratio={'3:4'}
//      />
//     </View>
//     </View>
//     <Text>{"\n\n\n\n"}</Text>
//     <View style = {styles.align}>
//     {/* <TouchableOpacity onPress={()=> navigation.navigate("Transaction",{paramKey:DATA})} style = {styles.button}><Text>Take Picture</Text></TouchableOpacity> */}
//     <TouchableOpacity onPress={()=> takePicture()} style = {styles.button}><Text>Take Picture</Text></TouchableOpacity>
//     </View>
//     </SafeAreaView>
//   );
// };

// export default CameraScreen;


// const styles = StyleSheet.create({
//   headingContainer:{
//     top:50,
//     textAlign:'center',
//     position:'absolute',
//   },
//   heading:{
//     fontSize:30,

//     color:'black',
//   },
//   cameraContainer: {
//     width: 300,
//     height: 400,
//     flexDirection:'row'
//   },
//   fixedRatio:{
//     flex:1,
//     aspectRatio:3/4
//   },
//   textContainer:{
//     textAlign:'center',
//     flex:1,
//     aspectRatio:1,
//     fontSize:10
//   },
//   textHeading:{
//     textAlign:'center',
//     flex:1,
//     aspectRatio:1,
//     fontSize: 20,
//     fontWeight : 'bold' 
//   },
//   image:{
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 70,
//     height: 100,
//     position: 'absolute', 
//     bottom: 50
//   },
//   align:{
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   button: {
//     width:100,
//     alignItems: 'center',
//     backgroundColor: '#00bfff',
//     padding: 10,
//   },

//   center:{
//     justifyContent:'center',
//     alignContent:'center',
//   },
//   centering:{
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   }

// });



import {SafeAreaView, Text, Image, TouchableOpacity, View,StyleSheet,Button,Alert,Dimensions} from 'react-native';
import React, { useEffect, useState, useRef } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {Logo,CameraIcon,BottomLayer,LeftArrow,HomeIcon,ProfileImage,BottomBar,ContinueButton} from '../components/Svgs';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Camera } from "expo-camera";
import { manipulateAsync } from "expo-image-manipulator";

import uuid from "uuid";
import { getReceiptInfo } from "../backendFiles/GoogleVision";
import { extractData } from "../backendFiles/TextParser";
import { useNavigation } from "@react-navigation/native";
import { getReceiptData, setReceiptData, setReceiptURL } from '../AppData';



const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const ScannedSlip = () => {
  const navigation = useNavigation();
  const [isLoading, setisLoading] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [TextReaded, setImageUrl] = useState("");
  const [ImageUrl, setTextReaded] = useState("");

  const [type, setType] = useState(Camera.Constants.Type.back);
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null);
  var takingPicture = false;

  const takePicture = async () => {
    if(!takingPicture){
      takingPicture = true;
      if (cameraRef.current) {
        console.log("Took a picture!");
        const data = await cameraRef.current.takePictureAsync();
        const manipResult = await manipulateAsync(
          data?.uri,
          [{ resize: { width: 800, height: 1200 } }],
          { format: "jpeg", base64: true }
        );
        setCapturedImage(manipResult.uri);
        takingPicture = false;
      }
    }
  };

  const submitPicture = async () => {
    if (capturedImage != undefined) {
      console.log("Image exists");
      const firebaseURL = await uploadImageAsync(capturedImage);
      setReceiptURL(firebaseURL);
      console.log(firebaseURL);
      var imageData = await getReceiptInfo(firebaseURL);
      console.log(imageData);
      var extractedData = await extractData(imageData);
      console.log(extractedData);
      if (extractedData) {
        setReceiptData(extractedData);
        console.log(getReceiptData());
        navigation.navigate("CreateTransaction");
      }
    }
  };



  async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    const fileRef = ref(getStorage(), uuid.v4());
    const result = await uploadBytes(fileRef, blob);
    blob.close();
    return await getDownloadURL(fileRef);
  }

  const resetCamera = async () => {
    setCapturedImage(undefined);
  };

  return (
    <SafeAreaView style ={{height:1000,}}>
      <Logo/>



        <BottomLayer/>
        <BottomBar/>

        {capturedImage!=undefined ? (
            <TouchableOpacity onPress={() => submitPicture()}>
              <ContinueButton/>
            </TouchableOpacity>
        ) : (
            <TouchableOpacity onPress={() => takePicture()}>
              <CameraIcon/>
            </TouchableOpacity>
        )}

        <View>
          <Text style={styles.myGroup}>Add expense</Text>
        </View>



        {capturedImage!=undefined && 
            <TouchableOpacity style={styles.retakePicture} onPress={() => resetCamera()}>
                <FontAwesome5
                          name={"redo"}
                          color={"#9E9E9E"}
                          size={30}
                />
            </TouchableOpacity>
         }
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <LeftArrow style={{ right: 100 }} />
          </TouchableOpacity>

        <View style={styles.image}>
            <Camera ref={cameraRef} style={styles.camera} type={type}></Camera>
        </View>


        {capturedImage!=undefined && 
          <Image
            source={{
              uri: capturedImage,
            }}
            style={styles.image}
          />
         }


    </SafeAreaView>
  );
};

export default ScannedSlip;

const styles = StyleSheet.create({
  myGroup: { color: "black", fontWeight: "bold", left: 40, fontSize: 20,top:60},
  PlusButton: {
    height: 80,
    width: 80,
    top:630,
    position:'absolute',
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#4461F2",
    alignSelf: "center",
    shadowColor: "#4461F2",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
  },
  retakePicture: {
    height: 80,
    width: 80,
    top:60,
    position:'absolute',
    alignSelf:'flex-end'
  },
  MyGroupSpace: {
    top:200,
    height:400,
    width:300,
    backgroundColor: "#EAF0F7",
    alignSelf: "center",
    position:'absolute',
  },
  camera: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  picture:{
    top:130,
    alignSelf: "center",
    position:'absolute',
    justifyContent: "center",
    alignItems: "center",
    height:400,
    width:300,
    backgroundColor: "#EAF0F7",
  },
  image:{
    position:'absolute',
    alignSelf:'center',
    top:140,
    width:300,
    height:500,
  },
});


// import * as React from 'react';
// import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
// import { BottomBar,BottomLayer,CameraIcon } from '../components/Svgs';
// export default function App() {
//   return (
//     <SafeAreaView>
//       <CameraIcon/>
//       <BottomLayer/>
//       <BottomBar/>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({

// });