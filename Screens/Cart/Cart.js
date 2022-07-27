import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import React from 'react';
import styling from '../../styling';
import {connect} from 'react-redux';
import Header from '../../Components/Header';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import {addQuantity, subQuantity} from '../../Redux/Cart/CartAction';

const styles = StyleSheet.create({
  ...styling,
  head1: {
    fontSize: 35,
    textAlign: 'center',
    marginBottom: 20,
    color: '#0095FF',
  },
  linkText: {
    color: 'black',
    textAlign: 'center',
  },
  header: {
    margin: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
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

const Cart = ({navigation, retailerCart, addQuantity, subQuantity}) => {
  console.log(retailerCart, 'cart');

 
  return (
    <>
      <View style={{backgroundColor: 'white', flex: 1}}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              size={30}
              color="black"
              name="left"
              backgroundColor="#3b5998"
            />
          </TouchableOpacity>
          <Text style={{fontSize: 17, fontWeight: 'bold', color: 'black'}}>
            Cart
          </Text>
          <Icon
            size={30}
            color="black"
            name="shoppingcart"
            backgroundColor="#3b5998"
          />
        </View>
        {Object.keys(retailerCart).length == 0 ? (
          <View style={{alignItems: 'center', marginVertical: '40%'}}>
            <Image
              style={{
                // alignSelf: 'center',
                // marginVertical: '50%',
                height: 180,
                width: 180,
              }}
              source={require('../../Assets/Images/emptyCart.jpg')}
            />
            <Text style={{color: '#ff0344', fontWeight: 'bold', fontSize: 22}}>
              Your Cart is empty
            </Text>
            <Text style={{color: 'lightgray', fontSize: 15}}>
              Add something to make me happy :)
            </Text>
          </View>
        ) : (
          <>
            <View
              style={{
                // backgroundColor: 'blue',
                backgroundColor: 'white',
              }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{marginBottom: 300, marginTop: 20}}>
                  {Object.keys(retailerCart).map((val, index) => {
                    return (
                      <ProductBar
                        key={val.id}
                        vendorId={retailerCart[val].vendor}
                        products={retailerCart[val].products}
                        addQuantity={address => addQuantity(address)}
                        subQuantity={address => subQuantity(address)}
                      />
                    );
                  })}
                </View>
              </ScrollView>
            </View>
            <View
              style={{
                backgroundColor: '#1b568d',
                position: 'absolute',
                borderRadius: 10,
                flexDirection: 'row',
                padding: 30,

                width: Dimensions.get('screen').width - 40,
                margin: 10,
                top: Dimensions.get('screen').height - 260,
                height: 100,
                left: 15,

                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('CheckOut')}
                style={{
                  backgroundColor: 'white',
                  padding: 10,
                  borderRadius: 10,
                }}>
                <Text style={{color: '#1b568d', fontWeight: 'bold'}}>
                  CheckOUt
                </Text>
              </TouchableOpacity>
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                Total QTY
              </Text>
            </View>
          </>
        )}
      </View>
    </>
  );
};

const ProductBar = ({vendorId, price, products, addQuantity, subQuantity}) => {
  const calSubTotal = productArr => {
    let Total = 0;
    productArr.map(val => (Total += val.price * val.retailerQuantity));
    return Total;
  };

  return (
    <>
      <View
        style={{
          borderWidth: 0.5,
          borderColor: 'white',
          padding: 15,
          // borderRadius: 20,
          margin: 5,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
        }}>
        {/* JOB TITLE START=======================> */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent:'space-between',
              marginBottom:15
            }}>
            <View>
              <Text
                style={{
                  top: 20,
                  left: 10,
                  fontWeight: 'bold',
                  fontSize: 19,
                  color: 'black',
                }}>
                {products[0].vendorName}
              </Text>
              <Text
                style={{
                  top: 20,
                  left: 10,
                  color: 'gray',
                  fontSize: 15,
                }}>
                {products.length} items
              </Text>
            </View>
          </View>
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 19, color: 'black'}}>
              Rs {calSubTotal(products)}
            </Text>
            <Text style={{fontSize: 15, left: 10}}>subtotal</Text>
          </View>
        </View>
        {/* JOB TITLE END */}
        {/* ALL PRODUCT LIST======================> */}
        {/* <View>
          <Image
            resizeMode="contain"
            style={{height: 100, width: 100}}
            source={require('../../assets/Images/pandol.jpg')}
          />
        </View> */}
        <View
          style={{
            flexDirection: 'column',
            backgroundColor: 'white',
            borderWidth: 0.5,
            borderColor: 'lightgray',
            padding: 10,
            // borderRadius: 20,
            margin: 10,

            // justifyContent: 'space-between',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4.84,

            elevation: 5,
          }}>
          {/* SHOPE NAME START */}

          {/* END SHOPE ADDRESS */}
          {products.map((val, i) => {
            return (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  margin: 10,
                }}>
                <Image
                  style={{height: 70, width: 70}}
                  source={{uri: val?.image}}
                />
                <View style={{}}>
                  <Text
                    style={{fontWeight: 'bold', fontSize: 15,left:10, color: 'black'}}>
                    {val?.name}
                  </Text>
                  <Text style={{color: 'black'}}>{price}</Text>
                </View>
                <CounterQty
                  maximumQuantity={val?.quantity}
                  retailerQuantity={val?.retailerQuantity}
                  addQuantity={address => addQuantity(address)}
                  subQuantity={address => subQuantity(address)}
                  productId={val?.productId}
                  vendorId={vendorId}
                />
              </View>
            );
          })}
        </View>
        {/* ALL PRODUCT LIST END=======================> */}
      </View>
    </>
  );
};

const CounterQty = ({
  maximumQuantity,
  retailerQuantity,
  addQuantity,
  subQuantity,
  vendorId,
  productId,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 7,
        height: 40,
        top: 30,
        borderRadius: 10,
      }}>
      <TouchableOpacity
        style={styles.addQuantity}
        onPress={() => {
          if (retailerQuantity < maximumQuantity) {
            addQuantity({vendor: vendorId, productId: productId});
          }
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'white',
          }}>
          +
        </Text>
      </TouchableOpacity>
      <Text style={{padding: 5, color: 'black', fontWeight: 'bold'}}>
        {retailerQuantity}
      </Text>
      <TouchableOpacity
        style={styles.subQuantity}
        onPress={() => {
          if (retailerQuantity > 1) {
            subQuantity({vendor: vendorId, productId: productId});
          }
        }}>
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
  );
};

const mapStateToProps = store => ({
  product: store.product.currentProduct,
  retailerCart: store.cart.userCart,
  currentUser: store.user.currentUser,
});

//calling redux Action
const mapDispatchToProps = dispatch => ({
  addQuantity: address => dispatch(addQuantity(address)),
  subQuantity: address => dispatch(subQuantity(address)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
