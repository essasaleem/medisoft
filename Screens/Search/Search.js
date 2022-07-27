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
  FlatList
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styling from '../../styling';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import DropDownPicker from 'react-native-dropdown-picker';
import { getSearchProducts } from '../../Redux/Products/ProductAction';
import Card from '../../Components/Card';


const styles = StyleSheet.create({
  ...styling,
  head1: {
    fontSize: 35,
    textAlign: 'center',
    marginBottom: 20,
    color: '#0095FF',
  },
  header: {
    margin: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const Search = ({ navigation, getSearchProducts, searchProduct }) => {


  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { id: 1, label: 'Medicine Name', value: 'name' },
    { id: 2, label: 'Manufacturer', value: 'Manufacturer' },
    { id: 3, label: 'Formula', value: 'Formula' },
  ]);

  const [query, setQuery] = useState('')
  


  useEffect(() => {
    getSearchProducts()
  }, [])


  return (
    <View style={{ backgroundColor: 'white',flex:1 }} >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            size={30}
            color="black"
            name="arrowleft"
            backgroundColor="#3b5998"
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'black' }}>
          Search Product
        </Text>
        <TouchableOpacity onPress={() => console.log(value, "value")} >
          <Icon size={30} color="black" name="find" backgroundColor="#3b5998" />
        </TouchableOpacity>
      </View>
      {/* <Text style={styles.head1}>Search</Text> */}

      {/* <InputContainer getSearchProducts={(query, searchType) => getSearchProducts(query, searchType)} value={value} /> */}
      {/* input start */}
      <View
        style={{
          margin: 10,
          flexDirection: 'row',
        }}>
        <TextInput
          placeholder="Search Product"
          placeholderTextColor={"lightgray"}
          onChangeText={e => setQuery(e)}
          style={{
            top: 5,
            height: 50,
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: 'lightgray',
            borderRadius: 5,
            shadowColor: '#000',
            color:'black',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
            padding: 15,
            width: Dimensions.get('screen').width - 90,
          }}
        />
        {/* <DropDown /> */}
        <TouchableOpacity
          onPress={() => getSearchProducts(query,value)}
        >
          <View
            style={{
              backgroundColor: 'black',
              borderWidth: 1,
              borderColor: 'lightgray',
              height: 50,
              width: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              margin: 5,
              padding: 5,
            }}
          >
            <Icon name="search1" color="white" size={30} />
          </View>
        </TouchableOpacity>
      </View>
      {/* input ends */}
      {/* DropDown product name here=========> */}
      <View style={{ width: 150, height: 80 }}>
        {/* <DropDown /> */}
        <View style={{ right: -5, top: 5 }}>
          <DropDownPicker
            key={items.id}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </View>
      </View>
      
        {searchProduct.length > 0 && <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 25,
              color: 'black',
            }}>
            {searchProduct.length} Founded Results
          </Text>
        </View>}
        <View style={{ marginTop: 20, right: 20 }}>


          <View style={{ marginVertical: 10,  marginBottom: 180 ,padding:20}}>
            {searchProduct.length == 0 ? (
              <ActivityIndicator size={30} color="green" />
            ) : (
              <FlatList
              style={{width:Dimensions.get("screen").width,height:300}}
                key={Math.random() * 1000}
                contentContainerStyle={{ alignSelf: 'flex-start' }}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                // horizontal={false}
                showsHorizontalScrollIndicator={false}
                data={searchProduct}
                renderItem={({ item, index }) => {
                  //push your code
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        navigation.navigate('ProductDetails', {
                          id: item.vendorProductId,
                        });
                      }}>
                      <Card
                        name={item.name}
                        medicane={item.medicne}
                        image={item.image}
                        vendorName={item.vendorName}
                        home={true}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            )}
          </View>
        </View>
      
    </View>
  );
};

const InputContainer = (getSearchProducts, value) => {
  const [query, setquery] = useState('')
  return (
    <>
      <View
        style={{
          margin: 10,
          flexDirection: 'row',
        }}>
        <TextInput
          placeholder="Search Product"
          style={{
            top: 5,
            height: 50,
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: 'lightgray',
            borderRadius: 5,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
            padding: 15,
            width: Dimensions.get('screen').width - 90,
          }}
        />
        {/* <DropDown /> */}
        <TouchableOpacity
          onPress={() => console.log("press", value)}
        >
          <View
            style={{
              backgroundColor: 'black',
              borderWidth: 1,
              borderColor: 'lightgray',
              height: 50,
              width: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              margin: 5,
              padding: 5,
            }}
          >
            <Icon name="search1" color="white" size={30} />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const DropDown = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Medicine Name', value: 'name' },
    { label: 'Manufacturer', value: 'Manufacturer' },
    { label: 'Formula', value: 'Formula' },
  ]);
  return (
    <View style={{ right: -5, top: 5 }}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
    </View>
  );
};


//getting vendors from Redux
const mapStateToProps = store => ({
  vendors: store.user.vendors,
  allProducts: store.product.allProducts,
  searchProduct: store.product.searchProducts
});

//calling redux Action
const mapDispatchToProps = dispatch => ({
  logoutUser: navigation => dispatch(logoutUser(navigation)),
  getSearchProducts: (query, searchType) => dispatch(getSearchProducts(query, searchType))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);