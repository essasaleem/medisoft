import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
  Image,
} from 'react-native';
import {auth} from '../../Firebase/Firebase';
import styling from '../../styling';
import loadingImg from '../../Assets/loading.jpeg';
import {
  setCurrentUser,
  loginUser,
  getUserDetails,
} from '../../Redux/Users/UserAction';
import {connect} from 'react-redux';
import { useToast } from "react-native-toast-notifications";


const styles = StyleSheet.create({
  ...styling,
  head1: {
    fontSize: 35,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  linkText: {
    color: 'white',
    textAlign: 'center',
  },
  forgotText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },
  allHeight: {
    height: '100%',
  },
});

const Login = ({navigation, setCurrentUser, loginUser, getUserDetails}) => {
  const [loading, setLoading] = useState(true);
  const [credential, setCredential] = useState({
    email: '',
    password: '',
  });

  const toast = useToast();
  


  const signIn = () => {
    // navigation.replace('BottomTab')
    if(credential.email.trim().length > 0 && credential.password.trim().length > 0 )
    {
      loginUser(credential.email, credential.password);
    }
    else{
      toast.show("Empty Input Fields", {
        type: "warning",
        placement: "top",
        duration: 4000,
        offset: 30,
        animationType: "slide-in",
      });
    }
  };


  const register = () => {
    navigation.navigate('Signup');  
  };
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        toast.show("Login successfully", {
          type: "success",
          placement: "top",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
        });
        // console.log(authUser, 'authUser');
        setCurrentUser(auth.currentUser);
        getUserDetails(auth.currentUser.uid);
        navigation.replace('BottomTab');
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View
        style={[
          styles.allHeight,
          styles.dflex,
          styles._flexDirectionColumn,
          styles.justifyContentCenter,
          styles.alignItemsCenter,
        ]}>
        <ActivityIndicator color={"white"} size={30} />
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      style={[
        styles.dflex,
        styles.justifyContentCenter,
        styles.alignItemsCenter,
      ]}>
      <Text style={styles.head1}>Login</Text>
      <View style={styles.inputBox}>
        <TextInput
          placeholderTextColor={'lightgray'}
          onChangeText={text => setCredential({...credential, email: text})}
          value={credential.email}
          keyboardType="email-address"
          placeholder="Email"
          style={styles.input}
        />
      </View>
      <View style={styles.inputBox}>
        <TextInput
          placeholderTextColor={'lightgray'}
          onChangeText={text => setCredential({...credential, password: text})}
          value={credential.password}
          secureTextEntry={true}
          placeholder="Password"
          style={styles.input}
        />
      </View>
      <View style={styles.py2}>
        <TouchableOpacity style={styles.btn} onPress={signIn}>
          <Text style={styles.txtWhite}>Login</Text>
        </TouchableOpacity>
      </View>
      
      <View>
        <Text style={styles.textCenter}>Dont Have an Account ?</Text>
        <TouchableOpacity onPress={register}>
          <Text style={styles.linkText}>Signup</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
const mapStateToProps = store => ({});
const mapDispatchToProps = dispatch => ({
  setCurrentUser: data => dispatch(setCurrentUser(data)),
  loginUser: (email, password) => dispatch(loginUser(email, password)),
  getUserDetails: id => dispatch(getUserDetails(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
