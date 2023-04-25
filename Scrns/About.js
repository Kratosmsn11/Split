import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import {Logo,BottomLayer,LeftArrow,ProfileImage,User,OrderLight,CameraIcon, HomeIcon, AddButton, BottomBar,BigLogo} from '../components/Svgs';
const about = "Split is a student led Capstone Project from CSUMB’s College of Computer Science......\n.....\n.....\n.....";
const help = "For further questions, send a message to splitquestions@realemail.com";
export default function App() {
  return (
    <SafeAreaView>
        <Logo/>
        <BigLogo/>
        <LeftArrow/>
    <View style={styles.container}>
    <Text style={styles.subheading}>About</Text>
    <Text>{about}</Text>

    <Text style={styles.subheading}>Help</Text>
    <Text>{help}</Text>

    <Text style={styles.subheading}>Developers</Text>

    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    top:200,
    justifyContent: 'center',
    alignContent:'center',
    padding: 20,
    width:400,
  },
  subheading:{
    textDecorationLine: 'underline'
  }
});