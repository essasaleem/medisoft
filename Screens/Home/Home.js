import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styling from '../../styling';
import {
  logoutUser,
  getVendors,
  getUserDetails,
} from '../../Redux/Users/UserAction';
import {
  getMainProducts,
  getAllProducts,
} from '../../Redux/Products/ProductAction';
import { mixArray } from '../../Utils';
import Card from '../../Components/Card';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
  FlatList,
  ActivityIndicator
} from 'react-native';
import Header from '../../Components/Header';
import { useToast } from "react-native-toast-notifications";


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
  heading: {
    fontSize: 25,
    left: 20,
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: 'white',
  },
});



const Home = ({
  navigation,
  logoutUser,
  getMainProducts,
  getVendors,
  vendors,
  getAllProducts,
  allProducts,
  currentUser
}) => {
  useEffect(() => {
    getMainProducts();
    getVendors();
    getAllProducts();
    getUserDetails(currentUser.uid)
  }, []);

  const toast = useToast();

  const logout = () => {
    toast.show("Logout successfully", {
      type: "danger",
      placement: "top",
      duration: 5000,
      offset: 30,
      animationType: "slide-in",
    });
    logoutUser(navigation);
  };

console.log(vendors,"vendors",vendors.length)
  return (
    <>
      <FlatList
        data={mixArray(allProducts)}
        style={{ backgroundColor: 'white' }}
        ListHeaderComponent={
          <>
            <Header logout={logout} />

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ marginTop: 30 }}>
                <Text style={styles.heading}>Top Rated Seller</Text>
                {vendors.length == 0 ? (
                  <ActivityIndicator color={"gray"} size={30} />
                ) : (
                  <ScrollView
                    horizontal={true}
                  
                    showsHorizontalScrollIndicator={false}
                    >
                    <View style={{ flexDirection: 'row' }}>
                      {vendors.map((val, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() =>
                              navigation.navigate('ShopeProfile', { id: val.id, vendorName: val.data.name, image: val.data.image })
                            }>
                            <Card
                              name={val?.data?.name}
                              medicane={val?.data?.rating}
                              image={val?.data?.image}
                              vendor={true}
                            />
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </ScrollView>
                )}
              </View>
            </ScrollView>
          </>
        }
        ListFooterComponent={
          <>
            <View style={{ marginVertical: 20, marginBottom: 130 }}>
              <Text style={styles.heading}>All Products</Text>
              {allProducts.length == 0 ? (
                <ActivityIndicator color={"gray"} size={18} />
              ) : (
                <FlatList
                  key={Math.random() * 1000}
                  contentContainerStyle={{ alignSelf: 'flex-start' }}
                  numColumns={2}
                  // horizontal={false}
                  showsHorizontalScrollIndicator={false}
                  data={mixArray(allProducts)}
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
          </>
        }
      />
    </>
  );
};

//getting vendors from Redux
const mapStateToProps = store => ({
  vendors: store.user.vendors,
  allProducts: store.product.allProducts,
  currentUser: store.user.currentUser
});

//calling redux Action
const mapDispatchToProps = dispatch => ({
  logoutUser: navigation => dispatch(logoutUser(navigation)),
  getMainProducts: () => dispatch(getMainProducts()),
  getVendors: () => dispatch(getVendors()),
  getAllProducts: () => dispatch(getAllProducts()),
  getUserDetails: (id) => dispatch(getUserDetails(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
