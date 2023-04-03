import * as React from 'react';
import { Text, View, StyleSheet,FlatList,TextInput,TouchableOpacity,Alert,SafeAreaView,Image} from 'react-native';
import {useState,useEffect} from 'react';


export default function App() {
  const payment = 42.34;
  const users = 3;
  const [inputs, setInputs] = useState([]);
  const [total, setTotal] = useState(0.00);
  var userPaying = Array(users).fill(0);
  const [valid, setValid] = useState(false);


  var userData = [
    { uri: 'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg', name: 'Jane', id: 20055 },
    { uri: 'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-2.jpg', name: 'Chloe', id: 20056 },
    { uri: 'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-8.jpg', name: 'Bob', id: 20057 },
  ];


  useEffect(() => {
    setInputs(userPaying);
  }, [])


  function displayTextInput(){
    var con = "";
    for(var x = 0; x < userPaying.length;x++){
      if(inputs[x]==undefined){
        inputs[x]=0.0;
      }
      con+="This is person" + x +"'s payment:" + inputs[x] +"\n";
    }
    var sum = inputs.reduce(function(a, b) { return parseFloat(a) + parseFloat(b); }, 0);
    con +="\n" +"The sum is:" + sum;

    if(sum==payment){
        Alert.alert("Finish!");
    }
    else{
        Alert.alert("Payment must equal total!");
    }
    console.log(inputs);
    // Alert.alert(con);
  }

  function resetPayments(){
    for(var x = 0; x < inputs.length;x++){
      
      inputs[x]=0.00;
    }
    setTotal(0);
    setInputs(Array(users).fill(undefined))
  }


  function changeTotal(newInput){
    var sum = 0;
    for(var x = 0; x < userPaying.length;x++){
      if(isNaN(newInput[x])){
        sum+=0;
      }
      else{
        sum += parseFloat(newInput[x]);
      }
    }
    if(isNaN(sum)){
        sum = 0;
    }
    // console.log(sum);
    // if(sum == payment){
    //   setValid(true)
    // }
    setTotal(sum);
  }
  
  
  return (
    <SafeAreaView style={styles.bg}>
    <View style={styles.bg}>
    <Text style={styles.title}>Payments</Text>
      <FlatList
        data={userPaying}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                alignSelf: 'center',
                flex:1,
                flexDirection:'row'
              }}
            >
              <Image style = {styles.smallImage} source={{uri: userData[index].uri}}></Image>
              <TextInput
                style = {styles.input}
                keyboardType = 'numeric'
                placeholder="0.00"
                onChangeText={text => {
                  const newInputs = [...inputs];
                  newInputs[index] = text;
                  setInputs(newInputs);
                  changeTotal(newInputs);
                }}
                value={inputs[index]}
              />
            </View>
          );
        }}
      />
      <View style = {styles.container}>
      <Text style={styles.functionality}>Total ${payment}</Text>
      <Text style={[styles.invalid, (valid ? styles.valid : null)]}>${total.toFixed(2)}</Text>

      <TouchableOpacity onPress={()=>displayTextInput()} style={styles.button}><Text style={styles.functionality}>Submit</Text></TouchableOpacity>
      <Text></Text>
      <TouchableOpacity onPress={()=>resetPayments()} style={styles.button}><Text style={styles.functionality}>Reset</Text></TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 16,
    paddingVertical: 8,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  functionality:{
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  button: {
    width:130,
    borderRadius:10,
    backgroundColor: '#3393FF',
    top:50,
    bottom:30,
  },
  container: {
    alignItems:'center'
  },

  invalid: {
    //other styles
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color:'#fff'
  },
  valid: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color:'#ddd'
  },
  input: {
    height: 40,
    width:200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  smallImage:{
    width:50,
    height:50,
    borderRadius:50,
  },
  bg: {
    backgroundColor:'#7CA1D6'
  },
});