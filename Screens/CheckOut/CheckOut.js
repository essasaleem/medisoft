import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import {connect} from 'react-redux';
import {confirmOrder} from '../../Redux/Order/OrderAction';
import {db} from '../../Firebase/Firebase';
import {RadioButton} from 'react-native-paper';
import { useToast } from "react-native-toast-notifications";

const CheckOut = ({navigation, confirmOrder, retailerCart, currentUser,userDetails}) => {
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [checked, setChecked] = React.useState('checked');
  const toast = useToast();

  const placeOrder = () => {
    if(phoneNumber.trim().length >3 && address.trim().length >1 )
    {

      let noOfOrders = Object.keys(retailerCart);
      if (noOfOrders.length >= 1) {
        noOfOrders.forEach((val, i) => {
          let orderData = {
            status: 'Pending',
            shippingAddress: address,
            shippingPhoneNo: phoneNumber,
            ...retailerCart[val],
            inc: i,
            vendorId: val.trim(),
          };
          
          confirmOrder(orderData, navigation,currentUser.uid,userDetails.userRole);
        });
      }
    }
    else{
     
      toast.show("empty input fields", {
        type: "warning",
        placement: "bottom",
        duration: 4000,
        offset: 30,
        animationType: "slide-in ",
      });
    }
  };

  // console.log(currentUser.uid,"currentUser")
  // console.log(retailerCart[val],"retaile", i)

  return (
    <View style={styles.container}>
      {/* headerStart=========> */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            size={30}
            color="black"
            name="arrowleft"
            backgroundColor="#3b5998"
          />
        </TouchableOpacity>
        <Text style={{fontSize: 17, fontWeight: 'bold', color: 'black'}}>
          Check Out
        </Text>
        <Icon size={30} color="black" name="info" backgroundColor="#3b5998" />
      </View>
      {/* header End */}

      {/* Input Fileds Start===========> */}
      <ScrollView>
        <View>
          <View>
            <Text style={{color: 'black', fontWeight: 'bold'}}>
              Phone NUmber
            </Text>
            <TextInput
              keyboardType="numeric"
              placeholderTextColor={"lightgray"}
              onChangeText={e => setPhoneNumber(e)}
              style={{...styles.inputContainer,color:'black'}}
              placeholder="+92 xxxxxxxxx"
            />
          </View>
          <View>
            <Text style={{color: 'black', fontWeight: 'bold'}}>Address</Text>
            <TextInput
            placeholderTextColor={"lightgray"}
              onChangeText={e => setAddress(e)}
              style={{...styles.inputContainer,color:'black'}}
              placeholder="street no,city,pakistan"
            />
          </View>
          {/* Input Fileds End===========> */}
          {/* //Radion Button =============> */}
        </View>
        <View style={{flexDirection: 'row'}}>
          <RadioButton
            value="first"
            status={checked}
            onPress={() => setChecked('first')}
          />
          <Text
            style={{top: 7, color: 'black', fontSize: 16, fontWeight: 'bold'}}>
            Cash On Delivery
          </Text>
        </View>
        <View>{/* //Radion Button END =============> */}</View>
        <TouchableOpacity
          onPress={placeOrder}
          style={{
            backgroundColor: 'black',

            justifyContent: 'flex-start',
            marginTop: Dimensions.get('screen').height / 3,
            borderRadius: 10,
            //   margin: 50,
            padding: 20,
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              Place Order
            </Text>
            <Icon
              size={20}
              color="white"
              name="shoppingcart"
              backgroundColor="#3b5998"
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = store => ({
  retailerCart: store.cart.userCart,
  currentUser: store.user.currentUser,
  userDetails: store.user.userDetails,
});

//calling redux Action
const mapDispatchToProps = dispatch => ({
  confirmOrder: (orderData, navigation,id,userRole) => dispatch(confirmOrder(orderData, navigation,id,userRole)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  header: {
    margin: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  inputContainer: {
    margin: 5,
    borderRadius: 3,
    // borderWidth: 0.2,
    borderColor: 'black',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
