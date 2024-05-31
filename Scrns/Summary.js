import React from 'react';
import {SafeAreaView,View,FlatList,StyleSheet,Text,StatusBar,Image,} from 'react-native';
import {useState,useEffect} from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import {Logo,BottomBar,BottomLayer, ContinueButton, LeftArrow} from "../components/Svgs";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
    const header = ['Member', 'Spent', 'Payed','Net']
    const DATA = [
        ['Joseph', '10.00', '0.00','-10.00'],
        ['William', '10.00', '25.00','15.00'],
        ['Joshua', '10.00', '5.00','-5.00']
    ]
    const data = [
    { uri: 'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg', name: 'Jane', id: 20055},
    { uri: 'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-2.jpg', name: 'Chloe', id: 20056},
    { uri: 'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-8.jpg', name: 'Bob', id: 20057},
    { uri: 'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-8.jpg', name: 'Bob', id: 20057},
    { uri: 'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-8.jpg', name: 'Bob', id: 20057},
    ];


    const HeadTable= ['Head1', 'Head2', 'Head3', 'Head4', 'Head5'];
    const DataTable= [
        ['1', '2', '3', '4', '5'],
        ['a', 'b', 'c', 'd', 'e'],
        ['1', '2', '3', '4', '5'],
        ['a', 'b', 'c', 'd', 'e'],
        ['1', '2', '3', '4', '5']
      ];

    const debts = [
    {ower:0,lender:1,amount:3.44},
    {ower:1,lender:2,amount:2.19},
    {ower:0,lender:2,amount:7.56},
        {ower:0,lender:1,amount:3.44},
    {ower:1,lender:2,amount:2.19},
    {ower:0,lender:2,amount:7.56},
  ]
    // DATA.unshift(header);



const Debt = ({item,index}) => (
  <View style={{marginVertical:15}}>
  <View style = {styles.itemContainer}>
  <View style = {{}}>
  <Image style = {styles.debtImage} source={{uri: data[0].uri}}/>
  <Text style={styles.pictureText}>Joseph</Text>
  </View>
  <FontAwesome5 name={'arrow-right'}  size={20} color={'black'} style={{justifyContent:'center',alignSelf:'center',paddingLeft:30,paddingRight:30}}/>
  <View>
  <Image style = {styles.debtImage} source={{uri: data[0].uri}}/>
  <Text style={styles.pictureText}>Joseph</Text>
  </View>
  </View>
  <Text style={styles.debtText}>$5.66</Text>
  </View>
);


const App = () => {
  return (
    <SafeAreaView style={styles.container}>
        <Logo/>
        
        <BottomLayer/>
        <BottomBar/>
        <View>
            <LeftArrow/>
            <ContinueButton/>
        </View>
    
    
        <View style={{top:70,height:500}}>
      <FlatList
        data={debts}
        renderItem={({ item, index }) => {
          return (
            <View>
            {index==0 &&
        <View style={styles.container}>
        <Text style={styles.title}>Summary</Text>
        <Table borderStyle={{borderWidth: 1, borderColor:'#4F555A'}}>
          <Row data={header} style={{backgroundColor: '#F0F8FF',height: 35,width:330,textAlign:'center' }}/>
          <Rows data={DATA} style={{backgroundColor: '#ffffff',height:50,width:330,textAlign:'center'}}/>
        </Table>
      </View>
            
            }
            <Debt/>
            </View>
          );
        }}
      />
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf:'center'
  },
  pictureText:{
    fontWeight:'bold',
    fontSize:20,
    color:'#4F555A',
    justifyContent:'center',alignSelf:'center'
  },

  itemContainer: {
    alignSelf: 'center',
    flexDirection:'row',
    // backgroundColor: '#f9c2ff',
  },

  debtImage:{
    alignSelf:'center',
    width:80,
    height:80,
    borderRadius:80,
  },
  debtText:{
    fontSize:30,
    fontWeight:'bold',
    
    justifyContent:'center',alignSelf:'center',paddingVertical:20
  },
  title: {
    left:10,
    marginTop: 16,
    paddingVertical: 20,
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
  },
  TableText:{
    textAlign:'center'
  }
});

export default App;