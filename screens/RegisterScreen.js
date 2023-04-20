import React, { Component, useState } from 'react'
import { StyleSheet, View } from 'react-native';
import { Input, Button } from '@rneui/base';
import {auth} from '../firebase';

const RegisterScreen = ({navigation}) => {
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const[password,setPassword] = useState('');
    const [imageUrl,setImageUrl] = useState('');

  const register = () => auth.createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    user.updateProfile({
      displayName: name,
      photoURL: imageUrl ? image : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fdefault-profile-picture&psig=AOvVaw1iqn-3oDDkUSZq5V0opGBZ&ust=1681801252221000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCNj2rIOssP4CFQAAAAAdAAAAABAE"
    }).then(() => {
      // Update successful
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    });  
    // ...
    navigation.popToTop();
  })
  .catch((error) => {
    var errorMessage = error.message;
    alert(errorMessage);
    // ..
  });

  return (
    <View style={styles.container}>
        <Input
        placeholder="Enter your Name" 
        label="Name"
        leftIcon={{type: 'material', name: 'badge'}}
        value={name}
        onChangeText={text =>setName(text)}
        />
        <Input
        placeholder="Enter your Email" 
        label="Email"
        leftIcon={{type: 'material', name: 'email'}}
        value={email}
        onChangeText={text =>setEmail(text)}
        />
        <Input
        placeholder="Enter your password" 
        label="Password"
        leftIcon={{type: 'material', name: 'lock'}}
        value={password}
        onChangeText={text =>setPassword(text)}
        secureTextEntry
        />
        <Input
        placeholder="Enter your Image Url" 
        label="Profile Picture"
        leftIcon={{type: 'material', name: 'face'}}
        value={imageUrl}
        onChangeText={text =>setImageUrl(text)}
        />

        <Button title="Register" onPress={register} style={styles.button}/>
        
      </View>
  )
}

export default RegisterScreen
const styles = StyleSheet.create({
    button:{
        width:200,
        marginTop:10
    },
    container:{
        flex:1,
        alignItems:'center',
        padding:10
    }
})