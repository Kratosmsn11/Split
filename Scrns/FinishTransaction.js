import * as React from 'react';
import { Text, View, StyleSheet,FlatList,TextInput,TouchableOpacity,Alert,SafeAreaView,Image} from 'react-native';
import {useState,useEffect} from 'react';
import { getUsers } from '../AppData';


export default function App() {
  const payment = 42.34;
  const users = 3;
  //the list that will contain each user's input
  const [inputs, setInputs] = useState([]);
  const [total, setTotal] = useState(0.00);
  //this
  var defaultPaying = Array(users).fill(undefined);
  const [valid, setValid] = useState(false);
  const [userData, setUserData] = useState(0.00);

  // var userData = [
  //   { uri: 'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg', name: 'Jane', id: 20055 },
  //   { uri: 'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-2.jpg', name: 'Chloe', id: 20056 },
  //   { uri: 'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-8.jpg', name: 'Bob', id: 20057 },
  // ];


  useEffect(() => {
    setUserData(getUsers())
    setInputs(defaultPaying);
  }, [])


  function submitPayments(){
    //fix input to be float values
    for(var x = 0; x < inputs.length;x++){
      if(inputs[x]==undefined || inputs[x]==null){
        inputs[x]=0.0;
      }
      else{
        inputs[x]=parseFloat(inputs[x]);
      }
    }
    //calculate the sum
    var sum = inputs.reduce(function(a, b) { return parseFloat(a) + parseFloat(b); }, 0);
    sum = sum.toFixed(2);

    //checks if the users payment is equal 
    if(sum==payment){
        console.log("Finish!");
    }
    else{
        console.log("Payment must equal total!");
    }
    console.log(inputs);
  }

  //reseting to the original values
  function resetPayments(){
    for(var x = 0; x < inputs.length;x++){
      inputs[x] = 0.00;
    }
    setTotal(0);
    setInputs(defaultPaying)
  }

  //called anytime an input box is changed sums to get the total and changes state to display
  function changeTotal(newInput){
    var sum = 0;
    for(var x = 0; x < inputs.length;x++){
      let pay = newInput[x];
      if(isNaN(parseFloat(pay))){
        sum+=0;
      }
      else{
        sum += parseFloat(newInput[x]);
      }
    }
    if(sum == payment){
      setValid(true)
    }
    setTotal(sum);
  }
  
  
  return (
    <SafeAreaView style={styles.bg}>
    <View style={styles.bg}>
    <Text style={styles.title}>Payments</Text>
      <FlatList
        data={defaultPaying}
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
                  if(text.length>0){
                    text = text.replace(/[^0-9.]/g, '');
                    if(isNaN(text)){
                      return;
                    }
                  }
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

      <TouchableOpacity onPress={()=>submitPayments()} style={styles.button}><Text style={styles.functionality}>Submit</Text></TouchableOpacity>
      <Text>{"\n"}</Text>
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