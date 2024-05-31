import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import Modal from 'react-native-modal';
  // import AsyncStorage from '@react-native-async-storage/async-storage';
  import {useFocusEffect} from '@react-navigation/native';
  // import heigh
  const PermissionPop = ({
    isOpen,
    onClose,
    onCamera,
    onGallary
  }) => {
    const [title, setTiyle] = useState('');
    const [contentUri, setUri] = useState('');
    const [isTest, setisTest] = useState('');
  
    return (
      <View>
        <Modal
          isVisible={isOpen}
          animationIn="slideInUp"
          swipeDirection="left"
          backdropOpacity={0.5}
          useNativeDriver={true}
          animationOutTiming={200}
          animationInTiming={200}>
          <View
            style={{
              ...styles.container,
              height: Dimensions.get('screen').height / 2.5,
              width: Dimensions.get('screen').width - 50,
            }}>
              <Text style={{...styles.Tittle,height:"20%",color:"blue",fontSize:20}}>Select Option</Text>
              
            <TouchableOpacity
            onPress={onCamera}
              style={{
                height: 40,
                width: '80%',
                borderWidth: 1,
                alignSelf: 'center',
                borderRadius: 10,
                // top: 20,
              }}>
              <Text style={styles.Tittle}>Open Camera</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
            onPress={onGallary}
  
              style={{
                height: 40,
                width: '80%',
                borderWidth: 1,
                alignSelf: 'center',
                borderRadius: 10,
                // bottom: 20,
              }}>
              <Text style={styles.Tittle}>Open Gallary</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
            onPress={onClose}
  
              style={{
                height: 40,
                width: '80%',
                borderWidth: 1,
                alignSelf: 'center',
                borderRadius: 10,
                // bottom: 20,
              }}>
              <Text style={styles.Tittle}>Cancel</Text>
            </TouchableOpacity>
  
          </View>
        </Modal>
      </View>
    );
  };
  
  export default PermissionPop;
  
  export const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      alignSelf: 'center',
      borderRadius: 20,
      justifyContent: 'space-around',
    },
    Tittle: {
      width: '100%',
      height: '100%',
      textAlignVertical: 'center',
      textAlign: 'center',
      fontSize: 16,
      color: 'black',
      fontWeight: 'bold',
    },
    btnView: {
      width: '100%',
      height: '30%',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    btnText: {
      textAlign: 'center',
      // height: '100%',
      // textAlignVertical: 'center',
      fontSize: 18,
      color: 'blue',
      fontWeight: '900',
      letterSpacing: 2,
      // padding:15
    },
  });
  