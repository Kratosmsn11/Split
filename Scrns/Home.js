import {SafeAreaView,StyleSheet,View,Dimensions,Text,TouchableOpacity,ScrollView,Image,FlatList,Alert,} from "react-native";
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { SvgXml } from "react-native-svg";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
  const Home = () => {
    const navigation = useNavigation();
    const [isShow, setisShow] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [allGroups, setallGroups] = useState([]);
    const [image, setimage] = useState(null);
    const [TextReaded, setTextReaded] = useState("");

    const logo = `
    <svg width="80" height="46" viewBox="0 0 80 46" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_8_32)">
    <path d="M75 36.3291C75 38.3845 73.3338 40.0507 71.2785 40.0507H8.72152C6.66618 40.0507 5 38.3845 5 36.3291V20.3798H75V36.3291Z" fill="#76A5FF"/>
    </g>
    <path d="M5 3.72152C5 1.66618 6.66618 0 8.72152 0H71.2785C73.3338 0 75 1.66618 75 3.72152V19.6709H5V3.72152Z" fill="#76FFAD"/>
    <path d="M15.7903 26.2823C14.9641 26.2823 14.2236 26.1482 13.569 25.8799C12.9144 25.6116 12.3886 25.2146 11.9916 24.6887C11.6052 24.1629 11.4013 23.5298 11.3799 22.7894H14.3095C14.3524 23.2079 14.4973 23.5298 14.7441 23.7551C14.9909 23.9698 15.3128 24.0771 15.7099 24.0771C16.1176 24.0771 16.4396 23.9859 16.6757 23.8034C16.9117 23.6103 17.0298 23.3474 17.0298 23.0147C17.0298 22.7357 16.9332 22.505 16.74 22.3226C16.5576 22.1401 16.3269 21.9899 16.0479 21.8718C15.7796 21.7538 15.3933 21.6197 14.8889 21.4694C14.1592 21.2441 13.5637 21.0187 13.1022 20.7934C12.6408 20.568 12.2437 20.2354 11.9111 19.7954C11.5784 19.3554 11.4121 18.7813 11.4121 18.0731C11.4121 17.0214 11.793 16.2005 12.5549 15.6103C13.3168 15.0093 14.3095 14.7089 15.5328 14.7089C16.7776 14.7089 17.781 15.0093 18.5429 15.6103C19.3048 16.2005 19.7126 17.0268 19.7662 18.0891H16.7883C16.7669 17.7243 16.6327 17.4399 16.3859 17.236C16.1391 17.0214 15.8225 16.9141 15.4362 16.9141C15.1036 16.9141 14.8353 17.0053 14.6314 17.1877C14.4275 17.3594 14.3256 17.6116 14.3256 17.9443C14.3256 18.3091 14.4973 18.5935 14.8406 18.7974C15.184 19.0013 15.7206 19.2213 16.4503 19.4574C17.18 19.7042 17.7702 19.9403 18.2209 20.1656C18.6824 20.391 19.0794 20.7183 19.4121 21.1475C19.7447 21.5767 19.9111 22.1294 19.9111 22.8054C19.9111 23.4493 19.7447 24.0342 19.4121 24.56C19.0901 25.0858 18.618 25.5043 17.9956 25.8155C17.3732 26.1267 16.6381 26.2823 15.7903 26.2823Z" fill="white"/>
    <path d="M33.7579 18.5077C33.7579 19.1623 33.6077 19.7632 33.3072 20.3105C33.0067 20.847 32.5453 21.2816 31.9229 21.6143C31.3005 21.947 30.5279 22.1133 29.605 22.1133H27.8988V26.1696H25.1462V14.8698H29.605C30.5064 14.8698 31.2683 15.0254 31.8907 15.3366C32.5131 15.6478 32.9799 16.0771 33.2911 16.6244C33.6023 17.1716 33.7579 17.7994 33.7579 18.5077ZM29.3957 19.9242C29.9216 19.9242 30.3132 19.8008 30.5708 19.5539C30.8283 19.3071 30.9571 18.9584 30.9571 18.5077C30.9571 18.057 30.8283 17.7082 30.5708 17.4614C30.3132 17.2146 29.9216 17.0912 29.3957 17.0912H27.8988V19.9242H29.3957Z" fill="white"/>
    <path d="M41.4847 24.0449H45.0903V26.1696H38.7321V14.8698H41.4847V24.0449Z" fill="white"/>
    <path d="M52.6969 14.8698V26.1696H49.9444V14.8698H52.6969Z" fill="white"/>
    <path d="M66.3617 14.8698V17.0751H63.3677V26.1696H60.6152V17.0751H57.6212V14.8698H66.3617Z" fill="white"/>
    <defs>
    <filter id="filter0_d_8_32" x="0.746836" y="16.8355" width="78.5063" height="28.1772" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="0.708861"/>
    <feGaussianBlur stdDeviation="2.12658"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_8_32"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_8_32" result="shape"/>
    </filter>
    </defs>
    </svg>`;
  
    const colors = [
      { bg: "red", textColor: "white" },
      { bg: "green", textColor: "white" },
      { bg: "blue", textColor: "white" },
      { bg: "yellow", textColor: "black" },
      { bg: "orange", textColor: "black" },
      { bg: "purple", textColor: "black" },
    ];
    const images = [
      "https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=ejx13G9ZroRrcg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-young-user-icon-2400.png&ehk=NNF6zZUBr0n5i%2fx0Bh3AMRDRDrzslPXB0ANabkkPyv0%3d&risl=&pid=ImgRaw&r=0",
      "https://th.bing.com/th/id/R.eb6bc833d264d2e9f695d736836bb564?rik=g0KjEGcDgo30Hw&riu=http%3a%2f%2fgetdrawings.com%2ffree-icon%2fgeneric-avatar-icon-51.png&ehk=i3OIOsf6xtx%2bqaCLmwGi7hN4eDntLu%2f%2b9WxFbSVRYRo%3d&risl=&pid=ImgRaw&r=0",
      "https://th.bing.com/th/id/R.de2135625ce46525e09320ba02e86032?rik=03qOiI9B0N9KfA&pid=ImgRaw&r=0",
      "https://th.bing.com/th/id/R.8ecb8e1845f04b543161e388bef36334?rik=tXj9313wlJX5Tw&pid=ImgRaw&r=0",
    ];
  
    const groups = [
      {"GrouName":"Split4991"},
      {"GrouName":"Work "},
      {"GrouName":"Golf"},
      {"GrouName":"Split499"}
    ]
 
   
  
    useEffect(() => {
      setallGroups(groups);
    }, []);
  

   const onGroupPress=(item)=>{
        console.log(item);
        navigation.navigate("Login");
   }
  
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            height: Dimensions.get("window").height,
            width: Dimensions.get("window").width,
            backgroundColor: "#EAF0F7",
          }}
        >
          <View style={styles.Logo}>
                <SvgXml xml = {logo} width='100%' height = '100%'/>
          </View>
          <Text style={styles.myGroup}>My Groups</Text>
          <View style={styles.MyGroupSpace}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={allGroups}
              ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
              renderItem={({ item }) => {
                const randomIndex = Math.floor(Math.random() * colors.length);
                const randomColor = colors[randomIndex];
                const randomImage = images[randomIndex];
                console.log(item?.GrouName);
                return (
                  <TouchableOpacity
  
                  onPress={()=>{
                   onGroupPress(item)
                  }}
                    style={{
                      height: 160,
                      width: "90%",
                      alignSelf: "center",
                      borderRadius: 10,
                      backgroundColor: randomColor.bg,
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 60,
                        alignSelf: "center",
                        bottom: 10,
                        backgroundColor: "white",
                        padding: 5,
                      }}
                      source={{ uri: randomImage }}
                    />
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 16,
                        fontWeight: "bold",
                        color: randomColor.textColor,
                      }}
                    >
                      {item?.GrouName}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
  
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateGroup")}
            style={styles.PlusButton}>
            <FontAwesome5Icon name="plus" size={25} color={"#4461F2"} />
          </TouchableOpacity>
          <View style={styles.bottomLayerConaner}>
          </View>
        </View>
        <View
          style={{
            height: 80,
            width: "100%",
            position: "absolute",
            bottom: -1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              height: "80%",
              width: "25%",
              left: 5,
              top: 4,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: "80%",
              width: "25%",
              left: -5,
              top: 4,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
          </TouchableOpacity>
        </View>
        <View><Text>Hello</Text></View>
      
      </SafeAreaView>
    );
  };
  
  export default Home;
  
  const styles = StyleSheet.create({
    Logo: {
      position:'absolute',
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
    },
    myGroup: { color: "black", fontWeight: "bold", left: 25, fontSize: 25 },
    PlusButton: {
      height: 60,
      width: 60,
      borderWidth: 3,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      borderColor: "#4461F2",
      alignSelf: "center",
      top: 10,
      shadowColor: "#4461F2",
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.9,
      shadowRadius: 4,
    },
    MyGroupSpace: {
      height: "63%",
      // backgroundColor: "#b0c4de",
      width: "90%",
      marginTop: 15,
      borderRadius: 20,
      alignSelf: "center",
    },
    emptyContainer: {
      height: "36%",
      width: "90%",
      alignSelf: "center",
      marginTop: 20,
      borderRadius: 20,
    },
    bottomLayerConaner: {
      height: "9%",
      justifyContent: "center",
      alignItems: "center",
      bottom: 10,
    },
  });
