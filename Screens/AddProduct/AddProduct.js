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
  Alert,
} from 'react-native';

import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import DropDownPicker from 'react-native-dropdown-picker';
import {connect} from 'react-redux';
import {
  getMainProducts,
  getVendorProduct,
  addVendorProducts,
} from '../../Redux/Products/ProductAction';

const AddProduct = ({
  navigation,
  currrenUser,
  userDetails,
  getMainProducts,
  defaultProducts,
  getVendorProduct,
  vendorProducts,
  addVendorProducts,
}) => {
  const [quantity, setquantity] = React.useState(1);
  const [price, setPrice] = React.useState(0);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    // { id: 1, label: "PAnadol", value: 'apple', adad: "" },
    // { id: 2, label: 'Pracetamol', value: 'banana' },
  ]);

  useEffect(() => {
    getMainProducts();
    getVendorProduct(currrenUser.uid);
    // return () => {
    //   second
    // }
  }, []);

  useEffect(() => {
    if (defaultProducts.length > 0) {
      setItems([]);
      defaultProducts.map((val, i) => {
        let {name, value} = val;
        console.log(val, 'val');
        setItems(prvs => [
          ...prvs,
          {id: value, label: name, value: value, ...val},
        ]);
      });
    }
  }, []);

  const AddProductDB = () => {
    if (quantity >= 1 && price >= 0 && value) {
      console.log(value, 'value');
      let isCheck = false;
      vendorProducts.map(val => {
        if (val.vendorProductId.split('///')[1] == value) {
          isCheck = true;
        }
      });

      if (isCheck) {
        Alert.alert('Warning', 'You are Already selling it');
      } else {
        console.log('you can sell it', value);
        let obj = {
          image: defaultProducts[value - 1].image,
          name: defaultProducts[value - 1].name,
          manufacturer: defaultProducts[value - 1].manufacturer,
          formula: defaultProducts[value - 1].formula,
          price: price,
          productId: String(vendorProducts.length + 1),
          quantity: Number(quantity),
          vendorId: currrenUser.uid,
          vendorName: userDetails.name,
          vendorProductId: `${currrenUser.uid}///${value}`,
        };

        addVendorProducts(
          currrenUser.uid,
          [...vendorProducts, obj],
          navigation,
        );
      }
      // console.log(vendorProducts,"vendorProducts")
      // console.log(value,"value")
      // alert('Sucessfully place the Order');
      // console.log('Phone Number=====>', quantity);
      // console.log('address=====>', price);
      // navigation.navigate('BottomTab');
    } else {
      Alert.alert('Warning', 'Input not Correct');
    }
  };

  // console.log(currrenUser,"currrenUser")

  return (
    <View style={styles.container}>
      {/* headerStart=========> */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon size={30} color="black" name="left" backgroundColor="#3b5998" />
        </TouchableOpacity>
        <Text style={{fontSize: 17, fontWeight: 'bold', color: 'black'}}>
          Add Product
        </Text>
        <Icon size={30} color="black" name="plus" backgroundColor="#3b5998" />
      </View>
      {/* header End */}
      <View>
        <DropDownPicker
          key={items.id}
          style={{
            borderRadius: 3,
            borderColor: 'lightgray',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
          }}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>
      {/* Input Fileds Start===========> */}
      <ScrollView>
        <View>
          {/* DropDown product name here=========> */}

          {/* <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              theme="DARK"
              multiple={true}
              mode="BADGE"
              badgeDotColors={[
                '#e76f51',
                '#00b4d8',
                '#e9c46a',
                '#e76f51',
                '#8ac926',
                '#00b4d8',
                '#e9c46a',
              ]}
            /> */}

          <View>
            <Text style={{color: 'black', fontWeight: 'bold'}}>Quantity</Text>
            <TextInput
              keyboardType="numeric"
              onChangeText={e => setquantity(e)}
              style={styles.inputContainer}
              placeholder="1,2....."
              placeholderTextColor={"gray"}
            />
          </View>
          <View>
            <Text style={{color: 'black', fontWeight: 'bold'}}>Price</Text>
            <TextInput
              keyboardType="numeric"
              onChangeText={e => setPrice(e)}
              style={styles.inputContainer}
              placeholder="Rs 200,Rs 340..."
              placeholderTextColor={"gray"}

            />
          </View>
          {/* Input Fileds End===========> */}
        </View>
        <TouchableOpacity
          onPress={AddProductDB}
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
              Add Product
            </Text>
            <View style={{backgroundColor: 'white', borderRadius: 5, left: 30}}>
              <Icon
                size={20}
                color="black"
                name="plus"
                backgroundColor="#3b5998"
              />
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = store => ({
  vendors: store.user.vendors,
  allProducts: store.product.allProducts,
  currrenUser: store.user.currentUser,
  userDetails: store.user.userDetails,
  defaultProducts: store.product.mainProducts,
  vendorProducts: store.product.currentVendorProducts,
});

//calling redux Action
const mapDispatchToProps = dispatch => ({
  getMainProducts: () => dispatch(getMainProducts()),
  getVendors: () => dispatch(getVendors()),
  getVendorProduct: id => dispatch(getVendorProduct(id)),
  addVendorProducts: (id, products, navigation) =>
    dispatch(addVendorProducts(id, products, navigation)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);

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
    color:"black",
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