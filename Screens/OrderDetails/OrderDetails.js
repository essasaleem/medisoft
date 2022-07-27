import React, { useEffect } from 'react';
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
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import { connect } from 'react-redux';
import { getOrdersIds, getUserOrders,cancelledOrder,completeOrder } from '../../Redux/Order/OrderAction';

const OrderDetails = ({ navigation, getOrdersIds, currrentUser, userDetails, ordersId, getUserOrders, orders,cancelledOrder,orderLoading,completeOrder }) => {
  

  useEffect(() => {

    getUserOrders(currrentUser.uid, userDetails.userRole);

    // return () => {
    //   second
    // }
  }, [])
  // console.log(ordersId,"orderDetails")

  let orderStatus = {
    Pending: 'orange',
    Cancelled: 'red',
    Completed: 'green',
  }

  return (
    <View style={styles.container}>
      {/* headerStart=========> */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon size={30} color="black" name="left" backgroundColor="#3b5998" />
        </TouchableOpacity>
        <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'black' }}>
          OrderDetails
        </Text>
        <Icon size={30} color="black" name="copy1" backgroundColor="#3b5998" />
      </View>
      {/* header End */}

      <View>
        <Text
          style={{
            fontWeight: 'bold',
            padding: 10,
            fontSize: 19,
            color: 'black',
          }}>
          ALL ORDER DETAILS:
        </Text>
      </View>
      {/* ALl ORDERED DETAILS ARE HERE===========> */}
      { (orderLoading && orders.length == 0) ?  <Text> Loading... </Text>  : <ScrollView showsHorizontalScrollIndicator={false}  >
        {orders.map((val, index) => {
          return (
            <View key={index} style={{ padding: 10, borderColor: 'gray', borderWidth: 1, margin: 10, borderRadius: 10 }} >
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
                <Text style={{ color: 'black', fontSize: 17, fontWeight: "700" }} >Order {index + 1}</Text>
                <Text style={{ color: orderStatus[`${val?.status}`], fontSize: 17, fontWeight: "700" }} >{val?.status}</Text>
              </View>
              {val?.products?.length > 0 && val?.products?.map((data, i) => {
                return (
                  <ProductContainer
                    key={i}
                    name={data?.name}
                    price={data?.price}
                    retailerQuantity={data?.retailerQuantity}
                    quantity={data?.quantity}
                    image={data?.image}
                    userRole={userDetails.userRole}
                    userDetails={userDetails}
                    
                  />
                )
              })}
              {(userDetails.userRole == "vendor" && val.status == 'Pending')  &&<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 10 }} >
                <TouchableOpacity style={{ borderRadius: 10,backgroundColor: 'green' }}
                onPress={() => completeOrder(currrentUser.uid, userDetails.userRole,val.orderID,val.products)}
                 >
                  <Text
                    style={{ color: 'white', fontWeight: 'bold', fontSize: 18,padding:10 }}>
                    Complete
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ borderRadius: 10,backgroundColor: 'red' }}
                onPress={() => cancelledOrder(currrentUser.uid, userDetails.userRole,val.orderID) }
                 >
                  <Text
                    style={{ color: 'white', fontWeight: 'bold', fontSize: 18,padding:10 }}>
                    Cancelled
                  </Text>
                </TouchableOpacity>
              </View>}
            </View>
          );
        })}
      </ScrollView>}
    </View>
  );
};

const ProductContainer = ({ name, price, retailerQuantity, image,quantity,userDetails }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'white ',
        borderWidth: 0.5,
        borderColor: 'lightgray',
        padding: 10,
        // borderRadius: 20,
        margin: 10,

        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.84,

        elevation: 2,
      }}>
      {/* SHOPE NAME START */}

      {/* END SHOPE ADDRESS */}

      <View style={{ flexDirection: 'row' }}>
        <Image
          style={{ height: 90, width: 90 }}
          source={{ uri: image }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontWeight: 'bold', color: 'black' }}>
            Name :  {name}
          </Text>
          <Text style={{ top: 5, color: 'black', fontWeight: 'bold' }}>
            RS: {price}
          </Text>
          <Text style={{ top: 10, color: 'black', fontWeight: 'bold' }}>
           Order QTY : {retailerQuantity}
          </Text>
          {userDetails.userRole == "vendor" && <Text style={{ top: 10, color: 'black', fontWeight: 'bold' }} >
            Available QTY : {quantity}
          </Text>}
        </View>
      </View>



      {/* <CounterQty /> */}
      {/* {status === 'Complete' ? (
        <Text
          style={{
            top: 40,
            right: 10,
            color: 'green',
            fontWeight: 'bold',
          }}>
          {status}
        </Text>
      ) : (
        <Text style={{ top: 40, right: 10, color: 'red', fontWeight: 'bold' }}>
          {status}
        </Text>
      )} */}
    </View>
  );
};

const mapStateToProps = store => ({
  vendors: store.user.vendors,
  currrentUser: store.user.currentUser,
  userDetails: store.user.userDetails,
  defaultProducts: store.product.mainProducts,
  ordersId: store.order.ordersId,
  orders: store.order.userOrders,
  orderLoading : store.order.loading
});

//calling redux Action
const mapDispatchToProps = dispatch => ({
  getMainProducts: () => dispatch(getMainProducts()),
  getUserDetails: (id) => dispatch(getUserDetails(id)),
  getOrdersIds: (id, userRole) => dispatch(getOrdersIds(id, userRole)),
  getUserOrders: (id, userRole) => dispatch(getUserOrders(id, userRole)),
  cancelledOrder: (id, userRole, orderId) => dispatch(cancelledOrder(id, userRole, orderId)),
  completeOrder: (id, userRole, orderId,products) => dispatch(completeOrder(id, userRole, orderId,products))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);

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
