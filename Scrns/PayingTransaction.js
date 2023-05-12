import * as React from 'react';
import { Text, View, StyleSheet,FlatList,TextInput,TouchableOpacity,Alert,SafeAreaView,Image,KeyboardAvoidingView} from 'react-native';
import {useState,useEffect} from 'react';
import { Logo,BottomBar,BottomLayer,ContinueButton,LeftArrow} from '../components/Svgs';
import { useNavigation,useIsFocused } from '@react-navigation/native';
import { createTransaction } from '../backendFiles/firebaseFunctions';
import { calculateDebts } from '../backendFiles/SplittingAlgorithm';
import { getTransactionTotal, getUserSpending, getUsers, getUsersIds,getGroupId, getTransactionName, getTransactionDescription, getUserData} from '../AppData';
export default function App() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  //the list that will contain each user's input
  const [inputs, setInputs] = useState([]);
  const [total, setTotal] = useState(0.00);
  const [refresh, setRefresh] = useState("");
  const [groupTotal,setGroupTotal] = useState(0.00);
  const [spending, setUserSpending] = useState([]);
  var payment = parseFloat(getTransactionTotal());

  //   var userData = [
  //   { picture: 'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg', name: 'Jane', id: 20055 },
  //   { picture: 'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-2.jpg', name: 'Chloe', id: 20056 },
  //   { picture: 'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-8.jpg', name: 'Bob', id: 20057 },
  //   { picture: 'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-8.jpg', name: 'Bobby', id: 20058 },
  // ];
  var userData = getUserData();
  // var usersIds=[20055,20056,20057];
  var usersIds = getUsersIds();
  var defaultPaying = Array(userData.length).fill(undefined);
  const [valid, setValid] = useState(false);

  function setData(){
    setInputs(defaultPaying);
    // console.log(getTransactionTotal());
    setGroupTotal(getTransactionTotal());
    setUserSpending(getUserSpending());

  }


  useEffect(() => {isFocused && setData()},[isFocused]);


  function submitPayments(){
    for(var x = 0; x < inputs.length;x++){
      if(inputs[x]==undefined || inputs[x]==null){
        inputs[x]=0.0;
      }
      else{
        inputs[x]=parseFloat(inputs[x]);
      }
    }
    if(!valid){
      Alert.alert("Payment must equal total!");
      return;
    }
    console.log(inputs);
    console.log(spending);
    console.log(usersIds);
    var highestPayer = usersIds[spending.indexOf(Math.max(...spending))];
    const debts = calculateDebts(spending,inputs,usersIds);
    console.log(debts);
    var transactionName = getTransactionName();
    var transactionDescription = getTransactionDescription();
    createTransaction(transactionName,transactionDescription,payment,getGroupId(),debts,highestPayer);
    navigation.replace("GroupPage");
  }

  //reseting to the original values
  function resetPayments(){
    for(var x = 0; x < inputs.length;x++){
      inputs[x] = 0.00;
    }
    setTotal(0);
    setInputs(defaultPaying);
    setRefresh(!refresh);
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
    if(sum.toFixed(2) == payment.toFixed(2)){
      setValid(true);
    }
    else{
      setValid(false);
    }
    setTotal(sum);
  }
  
  
  return (
    <SafeAreaView style={styles.bg}>
    <Logo/>
    <BottomLayer/>
        <BottomBar/>

    <View style={{zIndex:1}}><LeftArrow/></View>

        <TouchableOpacity onPress={() => submitPayments()}>
            <ContinueButton/>
        </TouchableOpacity>
    {/* <Text style={styles.title}>Payments</Text> */}
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >

    <Text style={styles.total}>Total: ${payment}</Text>
      <Text style={[styles.invalid, (valid ? styles.valid : null)]}>${total.toFixed(2)}</Text>

    <View style = {styles.inputsContainer}>
      <FlatList
        data={defaultPaying}
        extraData={refresh}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                alignSelf: 'flex-start',
                flexDirection:'row',
                marginVertical:10,
                right:40,
              }}
            >
              <View>
                {userData[index].picture!="none" &&
                  <Image style = {styles.smallImage} source={{uri: userData[index].picture}}></Image>
                }

                
                
                
                {userData[index].picture=="none" &&
                <View style={{
                  width:80,
                  height:80,
                  borderRadius:80,
                  marginHorizontal:50,
                  alignSelf: 'flex-start',
                  justifyContent: 'center', //Centered horizontally
                  backgroundColor:userData[index].color,

                  }}>

                  <Text style={{
                    fontSize:30,
                    color:'white',
                    textAlign:'center'
                  }}>{userData[index].name[0]}</Text>
                </View>
        }
        <Text style={{fontSize:20,fontWeight:'bold',textAlign:'center'}}>{userData[index].name.substring(0,7)}</Text>
        <Text style={{
                    fontSize:19,
                    color:'black',
                    alignSelf:'center',
                  }}>${parseFloat(spending[index]).toFixed(2)}</Text>

        
              </View>


              
              <View style = {styles.textView}>

              <TextInput
                placeholderTextColor="#4F555A"
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
              <View
              style={{
                height:60
              }}
              ></View>
            </View>

          );
        }}
      />
      </View>

      <View style = {styles.container}>

      <TouchableOpacity onPress={()=>submitPayments()}>

      </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>

    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo:{
    alignSelf:'center',
    height:100,
    width:80,
    resizeMode:'center'
  },
  inputsContainer:{
    top:20,
    height:370,
    left:30,
  },
  title: {
    left:70,
    marginTop: 80,
    paddingVertical: 8,
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
  },
  total:{
    marginTop:70,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    top:110,
    bottom:0,
    alignSelf:'center',
    height:100,
    width:100,
  },
  container: {
    top:20,
    alignItems:'center',
  },
  bottomContainer: {
    top:40,
    alignItems:'center',
    alignSelf:'center',
  },
  invalid: {
    //other styles
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color:'#FF6B6B',
  },
  valid: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color:'#6BEBFF'
  },
  input: {
    height: 100,
    width:170,
    left:10,
    fontSize:25,
    alignSelf:'flex-start',
    color:'#4F555A',
  },
  smallImage:{
    width:80,
    height:80,
    borderRadius:80,
    marginHorizontal:50,
    alignSelf: 'flex-start',
    justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
  },
  textView: {
    top:15,
    right:40,
    alignItems: 'flex-start',
    alignSelf:'flex-start',
    justifyContent:'center',
    borderRadius:8,
    backgroundColor: '#EAF0F7',
    height:70,
    width:200,
  },
  bg:{

  },
  container: {
  },
});