import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
    SafeAreaView,
  } from 'react-native';
  import React from 'react';
  import { Logo } from '../components/Svgs';
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;
  
  const Profile = () => {
    return (
      <SafeAreaView>
        <Logo/>
        <BottomLayer/>
        <BottomBar/>
        <View style={{height: height, width: width}}>

          <Image
            source={{
              uri: 'https://us04web.zoom.us/postattendee?mn=8mhNTNE2T1gQ7W_iLoVcSpj8WWFlFEwCKupt.RzXJh3FAs_idJXvK',
            }}
            style={{
              width: '40%',
              height: '50%',
              opacity: 1,
              resizeMode: 'center',
            }}
          />
  
          <Text style={styles.textView}>Waheed</Text>
  
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
            }}
            style={{}}>
            <Image
              source={{
                uri: 'https://us04web.zoom.us/postattendee?mn=8mhNTNE2T1gQ7W_iLoVcSpj8WWFlFEwCKupt.RzXJh3FAs_idJXvK',
              }}
              style={styles.ImageView}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
  
  export default Profile;
  
  const styles = StyleSheet.create({
    textView: {color: '', fontSize: 112, letterSpacing: 1, fontWeight: ''},
    ImageView: {width: '40%', height: '50%', opacity: 1, resizeMode: 'center'},
  });
  