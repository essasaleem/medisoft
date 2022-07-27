import React, {useEffect} from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import styling from '../../styling';

const Splash = ({navigation}) => {
  setTimeout(() => {
    navigation.navigate('Login');
  }, 3000);

  return (
    <>
      <StatusBar backgroundColor={'#005dff'} />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.logText}>Medi</Text>
          <Text style={styles.subText}>Soft</Text>
        </View>
        <Text style={styles.sloganStyle}>Best Medicine, Best Rate</Text>
      </View>
    </>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#005dff',
  },
  logoContainer: {
    flexDirection: 'row',
  },
  logText: {
    fontSize: 50,
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
