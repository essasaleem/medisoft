import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/dist/AntDesign';

const Header = ({logout}) => {
  return (
    <>
      <StatusBar backgroundColor={'#005dff'} />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.logText}>Medi</Text>
          <Text style={styles.subText}>Soft</Text>
        </View>
        <View>
          <Image
            style={{
              height: 100,
              width: 100,
              // left: 55,
              bottom: 10,
              position: 'absolute',
            }}
            source={require('../Assets/Images/capsule.png')}
          />
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            top: 30,
            backgroundColor: 'white',
            borderRadius: 40,
            padding: 10,
            alignItems: 'center',
          }}
          onPress={logout}>
          <Text
            style={{
              textAlign: 'center',
              // top: 10,
              fontWeight: 'bold',
              fontSize: 18,
              color: '#005dff',
            }}>
            Logout
          </Text>
          {/* <Icon
            style={{top: 10, right: 15}}
            size={20}
            color="white"
            name="logout"
            backgroundColor="#3b5998"
          /> */}
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#005dff',
    padding: 40,
    borderBottomEndRadius: 30,
    borderBottomLeftRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logoContainer: {
    // left: 10,
    flexDirection: 'row',
  },
  logText: {
    fontSize: 40,
    top: 5,
    fontWeight: 'bold',
    color: 'white',
  },
  subText: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#4CC9F0',
  },
  sloganStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
});
