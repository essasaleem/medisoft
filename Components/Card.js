import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';

const Card = ({ name, medicane, image, vendor, isEven, vendorName,home }) => {
  console.log(isEven, '====>');
  return (
    <View style={{ backgroundColor: 'white', marginBottom: 30 }}>
      <View style={vendor ? styles.allvendorcard : styles.allRetailercar}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={{
              width: 100,
              height: 100,
              marginTop: 30,
              borderRadius: 70,
              padding: 10,
            }}
          />
        ) : (
          <Image
            source={
              vendor
                ? require('../Assets/Images/user.png')
                : require('../Assets/Images/product.jpg')
            }
            style={{
              width: 100,
              height: 100,
              padding: 10,
              marginTop: 20,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 30,
            }}
          />
        )}
        <View>
          <Text style={styles.nameStyle}>{name}</Text>
          {!vendor && <Text style={styles.medicane}>{medicane}</Text>}
          {vendor && <Text style={styles.medicane}></Text>}
        </View>
        {home && <View>
          <Text style={{  right: 3,fontSize:17 ,color:"blue",fontWeight:"bold"}} >Name : {vendorName}</Text>
        </View>}
        {vendor && <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

          <AirbnbRating
            ratingContainerStyle={{
              // backgroundColor: 'white',
              padding: -10,
              height: 8,
            }}
            count={medicane}
            defaultRating={11}
            size={15}
            isDisabled
          />
        </View>}
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  nameStyle: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',

    // top: 10,
  },
  medicane: {
    color: 'black',
    // fontWeight: 'bold',
    fontSize: 15,
  },
  ratingStyle: {
    color: 'black',
    fontSize: 18,
  },
  allvendorcard: {
    margin: 10,
    borderRadius: 18,
    alignItems: 'center',
    // borderTopRightRadius: 30,
    // borderTopLeftRadius: 30,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgray',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,

      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,

    elevation: 5,
    height: 250,
    width: Dimensions.get('screen').width / 2 - 20,
  },
  allRetailercar: {
    margin: 10,
    borderRadius: 18,
    alignItems: 'center',
    // borderTopRightRadius: 30,
    // borderTopLeftRadius: 30,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgray',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,

      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,

    elevation: 5,
    height: 250,
    width: Dimensions.get('screen').width / 2 - 20,
  },
});
