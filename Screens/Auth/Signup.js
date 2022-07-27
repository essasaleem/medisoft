import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import styling from '../../styling';
import {connect} from 'react-redux';
import {registerUser} from '../../Redux/Users/UserAction';
import {RadioButton} from 'react-native-paper';
import { useToast } from "react-native-toast-notifications";

const styles = StyleSheet.create({
  ...styling,
  head1: {
    fontSize: 35,
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  linkText: {
    color: 'white',
    textAlign: 'center',
  },
});

const Signup = ({navigation, registerUser, addUser}) => {
  const [checked, setChecked] = React.useState('first');
  const [signupCredentials, setSignupCredentials] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    userRole: 'retailer',
  });
  const toast = useToast();

  const movetToLogin = () => {
    navigation.navigate('Login');
  };

  const signupUser = () => {
    if(signupCredentials.email.trim().length > 0 && signupCredentials.name.trim().length > 0 && signupCredentials.password.trim().length > 0 && signupCredentials.phone.trim().length > 0 )
    {
      registerUser({...signupCredentials, navigation});
    }
    else
    {
      toast.show("Empty Input Fields", {
        type: "warning",
        placement: "top",
        duration: 4000,
        offset: 30,
        animationType: "slide-in",
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={[
        styles.dflex,
        styles.justifyContentCenter,
        styles.alignItemsCenter,
      ]}>
      <Text style={styles.head1}>Signup</Text>
      <View style={styles.inputBox}>
        <TextInput
          placeholderTextColor={'lightgray'}
          onChangeText={text =>
            setSignupCredentials({...signupCredentials, name: text})
          }
          value={signupCredentials.name}
          placeholder="Name"
          style={styles.input}
        />
      </View>
      <View style={styles.inputBox}>
        <TextInput
          placeholderTextColor={'lightgray'}
          onChangeText={text =>
            setSignupCredentials({...signupCredentials, phone: text})
          }
          value={signupCredentials.phone}
          keyboardType="phone-pad"
          placeholder="Phone"
          style={styles.input}
        />
      </View>
      <View style={styles.inputBox}>
        <TextInput
          placeholderTextColor={'lightgray'}
          onChangeText={text =>
            setSignupCredentials({...signupCredentials, email: text})
          }
          value={signupCredentials.email}
          keyboardType="email-address"
          placeholder="Email"
          style={styles.input}
        />
      </View>
      <View style={styles.inputBox}>
        <TextInput
          placeholderTextColor={'lightgray'}
          onChangeText={text =>
            setSignupCredentials({...signupCredentials, password: text})
          }
          value={signupCredentials.password}
          secureTextEntry={true}
          placeholder="Password"
          style={styles.input}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{top: 5, color: 'white', fontSize: 17, fontWeight: 'bold'}}>
          Retailer
        </Text>
        <RadioButton
          uncheckedColor="white"
          value="first"
          status={checked === 'first' ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked('first');
            setSignupCredentials({
              ...signupCredentials,
              userRole: 'retailer',
            });
          }}
        />
        <Text
          style={{top: 5, color: 'white', fontSize: 17, fontWeight: 'bold'}}>
          Vendor
        </Text>
        <RadioButton
          uncheckedColor="white"
          value="second"
          status={checked === 'second' ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked('second');
            setSignupCredentials({
              ...signupCredentials,
              userRole: 'vendor',
            });
          }}
        />
      </View>
      <View style={styles.py2}>
        <TouchableOpacity style={styles.btn} onPress={signupUser}>
          <Text style={styles.txtWhite}>Signup</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={{...styles.textCenter,color:'white'}} >Already Have an Account ?</Text>
        <TouchableOpacity onPress={movetToLogin}>
          <Text style={styles.linkText}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = store => ({});

const mapDispatchToProps = dispatch => ({
  registerUser: data => dispatch(registerUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
