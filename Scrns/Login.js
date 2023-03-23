import { StyleSheet, Text, View, Dimensions, SafeAreaView } from "react-native";
import React, { useState,useEffect } from "react";
import { Input } from "react-native-elements";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { TouchableOpacity } from "react-native";
import G from "../assets/G.svg";
import A from "../assets/A.svg";
import Logo from "../assets/Logo.svg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Alert } from "react-native";
import app from "..//Firebase";
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';
import * as ImageManipulator from 'expo-image-manipulator';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase/compat";
const Login = () => {
  const [name, setname] = useState("eye");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigation = useNavigation();

  const Login = () => {
    
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
     navigation.navigate('Groups');
    })
    .catch(() => {
     Alert.alert("Incorrect credentials");
    });

  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flex: 1,
          height: Dimensions.get("window").height,
          width: Dimensions.get("window").width,
          position: "absolute",
        }}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              height: "10%",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 30,
            }}
          >
          </View>
          <Text style={styles.Label}>Sign In</Text>
          <View
            style={{
              height: 35,
              width: "90%",
              alignSelf: "center",
              backgroundColor: "#FAFAFA",
              alignItems: "center",
              borderRadius: 15,
              marginTop: 30,
            }}
          >
            <Input
              onChangeText={(e) => setemail(e)}
              placeholder="Enter Email"
              inputContainerStyle={{
                borderWidth: 1,
                borderColor: "#EAF0F7",
                alignSelf: "center",
                height: "100%",
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
              containerStyle={{ backgroundColor: "#EAF0F7", borderRadius: 10 }}
            />
          </View>

          <View
            style={{
              height: 35,
              width: "90%",
              alignSelf: "center",
              backgroundColor: "#FAFAFA",
              alignItems: "center",
              borderRadius: 15,
              marginTop: 50,
            }}
          >
            <Input
              onChangeText={(e) => setpassword(e)}
              secureTextEntry={name == "eye" ? false : true}
              placeholder="Password"
              inputContainerStyle={{
                borderWidth: 1,
                borderColor: "#EAF0F7",
                alignSelf: "center",
                height: "100%",
              }}
              containerStyle={{
                backgroundColor: "#EAF0F7",
                borderRadius: 10,
                alignItems: "center",
              }}
              rightIcon={
                <FontAwesome5
                  name={name}
                  color={"#9E9E9E"}
                  size={18}
                  onPress={() => {
                    if (name == "eye") {
                      setname("eye-slash");
                    } else {
                      setname("eye");
                    }
                  }}
                />
              }
            />
          </View>

          <Text
            style={{
              top: 30,
              textAlign: "right",
              right: 20,
              fontWeight: "bold",
              marginTop: 5,
            }}
          >
            Recover Password ?
          </Text>

          <TouchableOpacity
            onPress={() => {
              Login();
            }}
            style={styles.LoginButton}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              top: 20,
              textAlign: "center",
              fontWeight: "bold",
              marginTop: 20,
            }}
          >
            Don't have an account?
            <Text
              onPress={() => {
                navigation.navigate("Signup");
              }}
              style={{ color: "#4461F2" }}
            >
              Click Here
            </Text>
          </Text>

          <View style={styles.SplitLineContainer}>
            <View
              style={{
                borderWidth: 1,
                width: "30%",
                borderColor: "#9E9E9E",
                height: 1,
              }}
            />
            <Text
              style={{ color: "#616161", textAlign: "center", fontSize: 15 }}
            >
              or continue with
            </Text>
            <View
              style={{
                borderWidth: 1,
                width: "30%",
                borderColor: "#9E9E9E",
                height: 1,
              }}
            />
          </View>

          <View style={styles.socialButtonContainer}>
            <TouchableOpacity style={styles.socialButton}>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  Label: {
    color: "black",
    fontWeight: "bold",
    width: "90%",
    alignSelf: "center",
    fontSize: 18,
    marginTop: 20,
    textAlign: "center",
  },
  socialButton: {
    height: "100%",
    width: "25%",
    borderWidth: 0.4,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderColor: "#EEEEEE",
    elevation: 0.3,
  },
  socialButtonContainer: {
    flexDirection: "row",
    width: "70%",
    alignSelf: "center",
    height: "5%",
    justifyContent: "space-around",
    marginTop: 35,
  },
  SplitLineContainer: {
    height: "8%",
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    alignItems: "center",
  },
  LoginButton: {
    height: "7%",
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#4461F2",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
});
