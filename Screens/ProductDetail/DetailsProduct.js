import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import ProductDetails from '../../Components/ProductDetails';
import Icon from 'react-native-vector-icons/dist/AntDesign';

const DetailsProduct = ({navigation}) => {
  return (
    <>
      <View>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              size={30}
              color="black"
              name="arrowleft"
              backgroundColor="#3b5998"
            />
          </TouchableOpacity>
        </View>
        <ProductDetails />
      </View>
    </>
  );
};

export default DetailsProduct;

const styles = StyleSheet.create({
  header: {
    margin: 10,
  },
});
