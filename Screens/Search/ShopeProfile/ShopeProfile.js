import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { logoutUser, getVendors } from '../../../Redux/Users/UserAction';

import {
  getShopProducts,
  setShopProducts,
} from '../../../Redux/Products/ProductAction';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  TextInput,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { mixArray } from '../../../Utils';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Card from '../../../Components/Card';

const ShopeProfile = ({
  navigation,
  route,
  getShopProducts,
  shopProducts,
  setShopProducts,
}) => {
  const { id ,vendorName,image} = route.params;

  useEffect(() => {
    getShopProducts(id);

    return () => {
      setShopProducts([]);
    };
  }, []);

  

  return (
    <View style={styles.container}>
      {/* headerStart=========> */}

      <View style={styles.header}>
        <TouchableOpacity
          style={{ backgroundColor: 'lightgray', borderRadius: 20, padding: 5 }}
          onPress={() => navigation.goBack()}>
          <Icon size={20} color="white" name="left" backgroundColor="#3b5998" />
        </TouchableOpacity>
        <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>
          MY SHOPE
        </Text>
        <Icon />
      </View>
      {/* header End */}
      {/* PROFILE NAME AND PHOTO=============> */}
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#a5be00',
          // padding: 30,s
          paddingVertical: 30,
          borderRadius: 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,

            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4.84,

          elevation: 5,
        }}>
        <Image
          resizeMode="contain"
          style={{ height: 100, width: 100, borderRadius: 50 }}
          source={{uri:image}}
        />
        <Text
          style={{ fontWeight: 'bold', fontSize: 23, top: 10, color: 'white' }}>
          {vendorName}
        </Text>
        {/* RATING START============> */}
        
        {/* RATING END============> */}
      </View>
      {/* PROFILE NAME AND PHOTO END=============> */}

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ backgroundColor: 'white', marginTop: 30 }}>
          <Text style={{ fontSize: 25, color: 'black', fontWeight: 'bold' }}>
            My Product
          </Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {shopProducts.map((val, indx) => {
              return (
                <TouchableOpacity key={indx}
                  onPress={() => {
                    navigation.navigate('ProductDetails', {
                      id: val.vendorProductId,
                    });
                  }}
                >
                  <Card
                    name={val.name}
                    medicane={val.medicne}
                    vendor={false}
                    home={false}
                    image={val.image}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const NewCard = ({ name, medicane, image, vendor }) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,

          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.84,

        elevation: 5,
      }}>
      <Image
        // resizeMode="contain"
        style={{ height: 100, width: 100, borderRadius: 80 }}
        source={
          vendor
            ? require('../../../Assets/Images/user.png')
            : require('../../../Assets/Images/product.jpg')
        }
      />
      <Text
        style={{
          color: 'black',
          fontSize: 27,
          fontWeight: 'bold',
          marginTop: 10,
        }}>
        {name}
      </Text>
      <Text style={{ color: 'black', fontSize: 13 }}>{medicane}</Text>
      {/* <Text>4.3</Text> */}
      <AirbnbRating
        ratingContainerStyle={{
          // backgroundColor: 'white',
          // padding: -10,
          height: 8,
          // top: 10,
          bottom: 10,
          right: 20,
          // left: 5,
        }}
        count={4.3}
        defaultRating={11}
        size={10}
        isDisabled
      />
    </View>
  );
};

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
});

//getting vendors from Redux
const mapStateToProps = store => ({
  vendors: store.user.vendors,
  shopProducts: store.product.currentShopProducts,
});

//calling redux Action
const mapDispatchToProps = dispatch => ({
  getShopProducts: id => dispatch(getShopProducts(id)),
  setShopProducts: product => dispatch(setShopProducts(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopeProfile);
