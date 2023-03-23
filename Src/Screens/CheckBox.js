import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {CheckBox} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native';
const Check_Box = ({value, height, width, item, onChange, mleft,bocCol,selectedbgCol, selectediconCol}) => {
  const [name, setname] = useState(value ? 'check' : 'circle');
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:"flex-start",
        borderRadius: 5,
        borderColor:"#9E9E9E",
        padding: 5,
        marginLeft: mleft,
        
      }}>
      <TouchableOpacity
        onPress={() => onChange()}
        style={{
          backgroundColor:value==true?selectedbgCol:bocCol,
          height: 25,
          width: 25,
          borderRadius: 5,
          justifyContent: 'center',
          borderWidth:1,
          borderColor:"#4086F0"
        }}>
          {
            value==true? <FontAwesome5
            name={'check'}
            size={16}
            color={value==true?selectediconCol:"red"}
            style={{marginLeft: 5}}
          />:null
          }
       
      </TouchableOpacity>

      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        style={{
          color: "black",
          textAlign: 'left',
          fontSize: 14,
          textAlignVertical: 'center',
          left: 5,
        }}>
        {item}
      </Text>
    </View>
  );
};

export default Check_Box;

const styles = StyleSheet.create({});
