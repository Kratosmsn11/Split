import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  Image,
  Alert,
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
import axios from "axios"

const Signup = ({navigation}) => {
  const [c, setc] = useState(false);
  const [name, setname] = useState('eye');
  const baseUrl = 'http://10.0.2.2:3000/';
  const [email, OnChangeEmail] = useState('');
  const [password, OnChangePassword] = useState('');
  const [passwordConfirm, OnChangeConfirm] = useState('');
  const [phone, OnChangePhone] = useState('');
  const [user, OnChangeUser] = useState('');


  const PressSignInButton = async () =>{
    //TODO
    //Validate if all fields are filled, character limits
    //check if passwords match, check if phone is valid format
    axios.post(`${baseUrl}signup`, {
      email: email,
      password: password,
      name : user,
      phone: phone,
    })
    .then(function (response) {
      //Network connection successful
      let message=""
      console.log(response.data);
      console.log(response.data['user']);
      let responseMessage = response.data['message'];
      if(responseMessage =="Success"){
        navigation.navigate("Test", {
          username: response.data['user'],
        });
      }
      else{
        if(responseMessage=="Failure"){
          message = "Email in use";
        }
        Alert.alert(  
          "Signup",  
          message,  
          [  
              {text: 'OK', onPress: () => console.log('OK Pressed')},  
          ]  
        );
      }
    })
    .catch(function (error) {
        console.log(error);
    });
  };


  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flex: 1,
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
          position: 'absolute',
        }}>
        <View style={{flex: 1}}>
          <View
            style={{
              height: '10%',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Logo />
          </View>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              width: '90%',
              alignSelf: 'center',
              fontSize: 18,
              marginTop: 10,
              textAlign: 'center',
            }}>
            Sign Up
          </Text>

          <View
            style={{
              height: 25,
              width: '90%',
              alignSelf: 'center',
              backgroundColor: '#FAFAFA',
              alignItems: 'center',
              borderRadius: 15,
              marginTop:30,
            }}>
            <Input
              onChangeText={OnChangeEmail}
              placeholder="Enter Email"
              inputContainerStyle={{
                borderWidth: 1,
                borderColor: '#EAF0F7',
                alignSelf: 'center',
                height: '100%',
              }}
              rightIcon={
                <TouchableOpacity
                  style={{
                    height: 20,
                    width: 20,
                    borderWidth: 1,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontWeight: 'bold'}}>X</Text>
                </TouchableOpacity>
              }
              containerStyle={{backgroundColor: '#EAF0F7', borderRadius: 10}}
            />
          </View>

          <View
            style={{
              height:25,
              width: '90%',
              alignSelf: 'center',
              backgroundColor: '#FAFAFA',
              alignItems: 'center',
              borderRadius: 15,
              marginTop:40,
            }}>
            <Input
              onChangeText={OnChangeUser}
              placeholder="Enter Name"
              inputContainerStyle={{
                borderWidth: 1,
                borderColor: '#EAF0F7',
                alignSelf: 'center',
                height: '100%',
              }}
              rightIcon={
                <TouchableOpacity
                  style={{
                    height: 20,
                    width: 20,
                    borderWidth: 1,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontWeight: 'bold'}}>X</Text>
                </TouchableOpacity>
              }
              containerStyle={{backgroundColor: '#EAF0F7', borderRadius: 10}}
            />
          </View>

          <View
            style={{
              height:25,
              width: '90%',
              alignSelf: 'center',
              backgroundColor: '#FAFAFA',
              alignItems: 'center',
              borderRadius: 15,
              marginTop: 40,
            }}>
            <Input
              onChangeText={OnChangePhone}
              placeholder="Phone"
              inputContainerStyle={{
                borderWidth: 1,
                borderColor: '#EAF0F7',
                alignSelf: 'center',
                height: '100%',
              }}
              containerStyle={{
                backgroundColor: '#EAF0F7',
                borderRadius: 10,
                alignItems: 'center',
              }}
              rightIcon={
                <FontAwesome5
                  name={"phone"}
                  size={18}
                
                />
              }
            />
          </View>

          <View
            style={{
              height:25,
              width: '90%',
              alignSelf: 'center',
              backgroundColor: '#FAFAFA',
              alignItems: 'center',
              borderRadius: 15,
              marginTop: 40,
            }}>
            <Input
              onChangeText={OnChangePassword}
              secureTextEntry={name == 'eye' ? false : true}
              placeholder="Password"
              inputContainerStyle={{
                borderWidth: 1,
                borderColor: '#EAF0F7',
                alignSelf: 'center',
                height: '100%',
              }}
              containerStyle={{
                backgroundColor: '#EAF0F7',
                borderRadius: 10,
                alignItems: 'center',
              }}
              rightIcon={
                <FontAwesome5
                  name={name}
                  color={'#9E9E9E'}
                  size={18}
                  onPress={() => {
                    if (name == 'eye') {
                      setname('eye-slash');
                    } else {
                      setname('eye');
                    }
                  }}
                />
              }
            />
          </View>
          <View
            style={{
              height:25,
              width: '90%',
              alignSelf: 'center',
              backgroundColor: '#FAFAFA',
              alignItems: 'center',
              borderRadius: 15,
              marginTop: 40,
            }}>
            <Input
              onChangeText={OnChangeConfirm}
              secureTextEntry={name == 'eye' ? false : true}
              placeholder="Confirm Password "
              inputContainerStyle={{
                borderWidth: 1,
                borderColor: '#EAF0F7',
                alignSelf: 'center',
                height: '100%',
              }}
              containerStyle={{
                backgroundColor: '#EAF0F7',
                borderRadius: 10,
                alignItems: 'center',
              }}
              rightIcon={
                <FontAwesome5
                  name={name}
                  color={'#9E9E9E'}
                  size={18}
                  onPress={() => {
                    if (name == 'eye') {
                      setname('eye-slash');
                    } else {
                      setname('eye');
                    }
                  }}
                />
              }
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              PressSignInButton();
            }}
            style={{
              height: '7%',
              width: '90%',
              alignSelf: 'center',
              backgroundColor: '#4461F2',
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 50,
            }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              Sign Up
            </Text>
          </TouchableOpacity>
         

          <View
            style={{
              height: '8%',
              width: '90%',
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
              alignItems: 'center',
            }}>
            <View
              style={{
                borderWidth: 1,
                width: '30%',
                borderColor: '#9E9E9E',
                height: 1,
              }}
            />
            <Text style={{color: '#616161', textAlign: 'center', fontSize: 15}}>
              or continue with
            </Text>
            <View
              style={{
                borderWidth: 1,
                width: '30%',
                borderColor: '#9E9E9E',
                height: 1,
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: '70%',
              alignSelf: 'center',
              height: '5%',
              justifyContent: 'space-around',
              marginTop: 35,
            }}>
            <TouchableOpacity
              style={{
                height: '100%',
                width: '25%',
                borderWidth: 0.4,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                borderColor: '#EEEEEE',
                elevation: 0.3,
              }}>
              <G />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                height: '100%',
                width: '25%',
                borderWidth: 0.4,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                borderColor: '#EEEEEE',
                elevation: 0.3,
              }}>
              <A />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({});
