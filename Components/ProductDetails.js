import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import {
  getCurrentProduct,
  setCurrentProduct,
} from '../Redux/Products/ProductAction';
import { connect } from 'react-redux';
import { addShopToCart } from '../Redux/Cart/CartAction';
import { getUserDetails } from '../Redux/Users/UserAction';
// import { checkAlreadyInCart } from '../Utils';

const ProductDetails = ({
  route,
  navigation,
  getCurrentProduct,
  setCurrentProduct,
  product,
  cart,
  currentUser,
  addShopToCart,
  getUserDetails,
  userDetails

}) => {
  const { id } = route.params;

  const [quantity, setquantity] = useState(1);

  useEffect(() => {
    getCurrentProduct(id);

    return () => {
      setCurrentProduct({});
    };
  }, []);

  const addQuantity = limit => {
    if (quantity < limit) {
      setquantity(quantity + 1);
    }
  };

  const subQuantity = () => {
    if (quantity > 1) {
      setquantity(quantity - 1);
    }
  };

  const addToCart = vendorId => {
    if (userDetails.userRole == "vendor") {
      Alert.alert('Warning', "You can't buy product from vendor account sign In from retailer account")
    }
    else {
      let shop = {
        products:
          Object.keys(cart).indexOf(vendorId) == -1
            ? [{ ...product, retailerQuantity: quantity }]
            : [
              ...cart[vendorId].products,
              { ...product, retailerQuantity: quantity },
            ],

        vendor: vendorId,
        retailerId: currentUser.uid,
        retailerName: currentUser.displayName,
      };
      console.log(shop, 'shop');
      addShopToCart(shop);
    }
  };

  // console.log(product,"product")

  const checkAlreadyInCart = (cart, vendorId, productId) => {
    if (Object.keys(cart).indexOf(vendorId) == -1) {
      return false;
    } else {
      //vendor milgya
      // console.log(cart[vendorId].products,"check avalable",productId)
      let array = cart[vendorId].products;
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (element.productId == productId) {
          return true;
        }
      }
      return false;
    }
  };

  return (
    <>
      <StatusBar backgroundColor={'#005dff'} />
      {Object.keys(product).length == 0 ? (
        <View style={{flex:1}} >
          <ActivityIndicator size={30} color="green" />
        </View>
      ) : (
        <View>
          <ScrollView>
            {/* PRODUCT Image */}
            <View style={{ margin: 2 }}>
              <Image
                resizeMode="cover"
                style={{ height: 170, width: Dimensions.get('screen').width - 5 }}
                source={{ uri: product?.image }}
              />
            </View>
            {/* PRODUCT Image END */}
            <View style={styles.descriptionContainer}>
              {/* Name and Price */}
              <View style={{ justifyContent: 'space-between' }}>
                <Text
                  style={{ fontWeight: 'bold', fontSize: 25, color: 'white' }}>
                  {product?.name}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 20,
                      color: '#80ED99',
                    }}>
                    Rs: {product?.price}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: 'white',
                      padding: 5,
                      borderRadius: 10,
                    }}>
                    <TouchableOpacity
                      style={styles.addQuantity}
                      onPress={() => addQuantity(product?.quantity)}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontWeight: 'bold',
                          color: 'white',
                        }}>
                        +
                      </Text>
                    </TouchableOpacity>
                    <Text style={{ padding: 5, color: 'black' }}>{quantity}</Text>
                    <TouchableOpacity
                      style={styles.subQuantity}
                      onPress={() => subQuantity()}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontWeight: 'bold',
                          color: 'white',
                        }}>
                        -
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {/* Ratting Area */}
                <View style={{ flexDirection: 'row', bottom: 10 }}>
                  <Text
                    style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}>
                    {product?.vendorName}
                  </Text>
                  <AirbnbRating
                    ratingContainerStyle={{
                      // backgroundColor: 'white',
                      padding: -10,
                      height: 8,
                      left: 5,
                    }}
                    count={5}
                    defaultRating={product?.rating}
                    size={15}
                    isDisabled
                  />
                </View>
              </View>
              {/* ------------------ */}
              {/* Description */}
              <View>
                <Text style={{ color: 'white', marginTop: 20, fontSize: 15 }}>
                  {product?.details}
                </Text>
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              position: 'absolute',
              top: Dimensions.get('screen').height - 210,
              // marginTop: 450,
              flexDirection: 'row',
              justifyContent: 'center',
              borderRadius: 30,
              width: Dimensions.get('screen').width - 10,
              backgroundColor: 'white',
              padding: 15,
            }}>
            {!checkAlreadyInCart(cart, product.vendorId, product.productId) ? (
              <TouchableOpacity
                style={{ flexDirection: 'row' }}
                onPress={() => addToCart(product.vendorId)}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'black',
                  }}>
                  Add to Cart
                </Text>
                <Icon
                  name="shoppingcart"
                  size={25}
                  style={{ left: 10 }}
                  color="black"
                />
              </TouchableOpacity>
            ) : (
              <Text style={{ color: 'black' }} >Already Exist in cart</Text>
            )}
          </View>
        </View>
      )}
    </>
  );
};

const mapStateToProps = store => ({
  product: store.product.currentProduct,
  cart: store.cart.userCart,
  // retailerCart : store.cart.userCart,
  currentUser: store.user.currentUser,
  userDetails: store.user.userDetails,
});

//calling redux Action
const mapDispatchToProps = dispatch => ({
  getCurrentProduct: id => dispatch(getCurrentProduct(id)),
  setCurrentProduct: product => dispatch(setCurrentProduct(product)),
  addShopToCart: shop => dispatch(addShopToCart(shop)),
  getUserDetails: (id) => dispatch(getUserDetails(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);

const styles = StyleSheet.create({
  header: {
    margin: 10,
  },
  descriptionContainer: {
    marginTop: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#2e7afe',
    padding: 10,
    height: Dimensions.get('screen').height,
  },
  addQuantity: {
    backgroundColor: '#38A3A5',
    padding: 5,
    borderRadius: 10,
    height: 25,
    width: 25,
  },
  subQuantity: {
    backgroundColor: '#80ED99',
    padding: 5,
    borderRadius: 10,
    height: 25,
    width: 25,
  },
});
