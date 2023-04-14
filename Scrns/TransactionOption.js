// import React, {useEffect} from 'react';
// import {Text, TouchableOpacity, View,StyleSheet} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// const TransactionOption = () => {
//   const navigation = useNavigation();
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}>
//       <TouchableOpacity onPress={()=>navigation.navigate("Create")} style = {styles.button}><Text>Empty transaction</Text></TouchableOpacity>
//       <Text>{"\n\n\n\n"}OR{"\n\n\n\n"}</Text>
//       <TouchableOpacity onPress={()=>navigation.navigate("Camera")} style = {styles.button}><Text>Scan receipt</Text></TouchableOpacity>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   button: {
//     width:100,
//     alignItems: 'center',
//     backgroundColor: '#00bfff',
//     padding: 10,
//   },

// });

// export default TransactionOption;


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
import { useNavigation } from '@react-navigation/native';

const AddExpense = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          height: Dimensions.get("window").height,
          width: Dimensions.get("window").width,
        }}
      >
        <View style={styles.Logo}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
          </TouchableOpacity>
        </View>
        <Text style={styles.myGroup}>Add Expense</Text>
        <View style={styles.MyGroupSpace}>
          <TouchableOpacity
            onPress={() => {
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
            onPress={() => {
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
              Scan a Receipt
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomLayerConaner}>

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
    height: "68%",
    backgroundColor: "#EAF0F7",
    width: "90%",
    marginTop: 15,
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