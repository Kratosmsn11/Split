import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View,StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
const TransactionOption = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={()=>navigation.navigate("Create")} style = {styles.button}><Text>Empty transaction</Text></TouchableOpacity>
      <Text>{"\n\n\n\n"}OR{"\n\n\n\n"}</Text>
      <TouchableOpacity onPress={()=>navigation.navigate("Camera")} style = {styles.button}><Text>Scan receipt</Text></TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    width:100,
    alignItems: 'center',
    backgroundColor: '#00bfff',
    padding: 10,
  },

});

export default TransactionOption;