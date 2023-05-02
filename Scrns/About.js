import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, FlatList,Image,Linking } from 'react-native';
import {Logo,BottomLayer,LeftArrow,ProfileImage,User,OrderLight,CameraIcon, HomeIcon, AddButton, BottomBar,BigLogo} from '../components/Svgs';
const about = "Split is a student led Capstone Project from CSUMB’s College of Computer Science.";
const help = "For further questions, send a message to splitquestions@realemail.com";
const developers = [{firstName:"Joseph",lastName:"Arredondo", picture:"https://firebasestorage.googleapis.com/v0/b/split-cst499.appspot.com/o/a39a019a-a905-4465-8513-46b668e8f073?alt=media&token=63e7a989-f9b7-4258-aae9-ca3c7299e80b",li:"https://www.linkedin.com/in/joseph-arredondo-8a836a1b1/"},
{firstName:"Abraham",lastName:"Martinez", picture:"https://firebasestorage.googleapis.com/v0/b/split-cst499.appspot.com/o/Team18_RoblesMartinez_Abraham.jpg?alt=media&token=fa10f095-4d7c-4b6c-bb9b-307c80e737d0",li:"https://www.linkedin.com/in/joseph-arredondo-8a836a1b1/"},
{firstName:"Vighnesh",lastName:"Prahbu", picture:"https://firebasestorage.googleapis.com/v0/b/split-cst499.appspot.com/o/18_Prabhu_Vighnesh.JPG?alt=media&token=392b8140-0165-4f40-84b3-46c739249b55",li:"https://www.linkedin.com/in/joseph-arredondo-8a836a1b1/"},
{firstName:"William",lastName:"Villantay", picture:"https://firebasestorage.googleapis.com/v0/b/split-cst499.appspot.com/o/18_Villantay_William.jpg?alt=media&token=67bca94f-0f69-46c5-bef4-0909220808af",li:"https://www.linkedin.com/in/joseph-arredondo-8a836a1b1/"},
{firstName:"Joshua",lastName:"Gonong", picture:"https://firebasestorage.googleapis.com/v0/b/split-cst499.appspot.com/o/Team18_Gonong_Joshua.jpg?alt=media&token=b4383ad9-2979-4252-955f-3f80ba458b19",li:"https://www.linkedin.com/in/joseph-arredondo-8a836a1b1/"},
]
const shuffled = developers
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
const mentor = {firstName:"Young-Joon",lastName:"Byun", picture:"https://csumb.edu/media/csumb/section-editors/college-of-science/school-of-computing-and-design/byun.PNG"}
shuffled.push(mentor)
export default function About() {
    const Member = ({member,index}) => (
        <View style={{flexDirection:'row',marginVertical:10}}>
            <View>
            <Image source ={{uri:member.picture}} style={styles.image}></Image>
            </View>
            <View style={{justifyContent:'center',left:30}}>
            <Text style={styles.firstName}>{member.firstName}</Text>
            <Text style={styles.lastName}>{member.lastName}</Text>
            {index !=5 &&
            <Text style={{color: 'blue'}}
                onPress={() => Linking.openURL(member.li)}>
                LinkedIn
            </Text>
            }
            </View>
        </View>
    );

  return (
    <SafeAreaView>
        <Logo/>
        <View><LeftArrow/></View>
        
    <View style={styles.container}>



    <View style={{height:650,width:350,bottom:130}}>

    <FlatList
        data = {shuffled}
        renderItem={({item,index}) => 
        <View>
            
        {index  == 0 &&
        
        
        <View>
            <BigLogo/>
            <View style={{top:40,bottom:40}}>
            
            <Text style={styles.subheading}>About</Text>
            <Text>{about}</Text>
        
            <Text style={styles.subheading}>Help</Text>
            <Text>{help}</Text>
            <Text style={styles.subheading}>Developers</Text>
            </View>
            </View>
        }
         {index  == 5 &&
           <View style={{top:40,bottom:40}}>
            <Text style={styles.subheading}>Mentor</Text>
           </View>
         }
        <View style={{paddingTop:50,bottom:0,marginVertical:-10}}>
        <Member member ={item} index={index}/>
        </View>


        
        
    </View>
        }
        contentContainerStyle={{

    }}
    />
    </View>


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
  },
  image:{
    height:150,
    width:150,
    borderRadius:150,
    shadowColor: "#000",
    shadowOffset: { height: 3, width: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 0.5    
  },
  firstName:{
    fontSize:20,
    fontWeight:'bold',
  },
  lastName:{
    fontSize:15,
    color:'#4F555A'
  }
});