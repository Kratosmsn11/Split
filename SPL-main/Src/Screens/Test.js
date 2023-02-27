import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {Input} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import Check_Box from './CheckBox';
import {TouchableOpacity} from 'react-native';
import F from '../Assets/F.svg';
import G from '../Assets/G.svg';
import A from '../Assets/A.svg';
import Logo from '../Assets/Logo.svg';

const Test = ({navigation,route}) => {
  const { username } = route.params;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View>
        <Text>Hello,{JSON.stringify(username)}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Test;

const styles = StyleSheet.create({});
