import {
    SET_LOADING,
    SET_ERROR,
    SET_UPDATING,
    SET_ORDERS_IDS,
    SET_USER_ORDERS
} from './OrderTypes'
import { Alert } from "react-native";
import { auth, db } from '../../Firebase/Firebase'
import { setCartEmpty } from '../Cart/CartAction';



export const setLoading = (loading) => {
    return {
        type: SET_LOADING,
        payload: loading
    };
};

export const setOrdersIds = (ids) => {
    return {
        type: SET_ORDERS_IDS,
        payload: ids
    }
}

export const setUserOrders = (orders) => {
    return {
        type: SET_USER_ORDERS,
        payload: orders
    }
}

export const setErrors = (errors) => {
    return {
        type: SET_ERROR,
        payload: errors,
    };
};


export const setUpdating = (update) => {
    return {
        type: SET_UPDATING,
        payload: update,
    };
};

export const confirmOrder = (orderData, navigation, id, userRole) => async (dispatch) => {
    try {
        let { vendorId, retailerId, inc } = orderData;

        await db.collection('retailer').doc(retailerId).get().then((doc) => {
            let data = doc.data()
            let lastOrder = data.retailerOrders.length
            let retailerOrders = data.retailerOrders


            console.log(retailerOrders, "retailerORders")

            let refrence = `${vendorId}|||${retailerId}|||${lastOrder}`
            console.log(refrence, "refrence")

            // writting to order collection
            db.collection("orders").doc(refrence).set({
                ...orderData,
                orderID: refrence
            })
                .then(() => {
                    console.log("Order Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });


            db.collection('vendor').doc(vendorId).get().then((doc) => {
                let vendorData = doc.data();
                let receiveOrder = vendorData.receiveOrders
                console.log(receiveOrder, "vendor data")



                //writting to retailer  retailerOrders Array
                db.collection('retailer').doc(retailerId).update({
                    retailerOrders: [...retailerOrders, refrence]
                }).then(() => {
                    console.log("retailer order Document successfully written!");
                })
                    .catch((error) => {
                        console.error("Error writing retailer order Document: ", error);
                    });



                // //writting to vendor receiveOrder ARRAY
                db.collection('vendor').doc(vendorId).update({
                    receiveOrders: [...receiveOrder, refrence]
                }).then(() => {
                    console.log("vendor order Document successfully written!");
                    //cart khali krwado
                    dispatch(setCartEmpty())
                    dispatch(getOrdersIds(id, userRole))
                    navigation.navigate('BottomTab')

                })
                    .catch((error) => {
                        console.error("Error writing vendor order Document: ", error);
                    });




            })
                .catch((error) => {
                    console.error("Error writing document: vendor wala funct ", error);
                });


        })
            .catch((err) => {
                console.log(err, "order size")
            })
    }
    catch (err) {
        console.log(err, "confirmOrder")
    }

}

export const getOrdersIds = (id, userRole) => async (dispatch) => {
    try {
        if (userRole == "vendor") {
            await db.collection('vendor').doc(id).get().then((doc) => {
                let vendorData = doc.data();
                let receiveOrder = vendorData.receiveOrders
                console.log(receiveOrder, "vendor receive orders")
                dispatch(setOrdersIds(receiveOrder))
            })
                .catch((error) => {
                    console.error("Error Reading vendor getOrdersIds ", error);
                });
        }
        else {
            await db.collection('retailer').doc(id).get().then((doc) => {
                let data = doc.data()
                let retailerOrders = data.retailerOrders
                console.log(retailerOrders, "retailer orders")
                dispatch(setOrdersIds(retailerOrders))
            })
                .catch((error) => {
                    console.error("Error Reading vendor getOrdersIds ", error);
                });
        }
    }
    catch (err) {
        console.log(err, "getOrdersIds")
    }
}

export const getUserOrders = (id, userRole) => async (dispatch) => {
    try {
        let arr = [];
        if (userRole == "vendor") {
            await db.collection("orders").where("vendorId", "==", id)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
                        let data = {
                            id: doc.id,
                            data: doc.data()
                        }
                        arr.push(data.data)
                    });
                    dispatch(setUserOrders(arr))
                    console.log(arr, "vendor orders");
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });

        }
        else {
            await db.collection("orders").where("retailerId", "==", id)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        let data = {
                            id: doc.id,
                            data: doc.data()
                        }
                        arr.push(data.data)
                    });
                    dispatch(setUserOrders(arr))
                    console.log(arr, "retailer orders");
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        }
    }
    catch (err) {
        console.log(err, "getUserOrders")
    }
}


export const cancelledOrder = (id, userRole, orderId) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        await db.collection('orders').doc(orderId).update({
            status: "Cancelled"
        }).then(() => {
            console.log(" order cancelled successfully!");
            dispatch(getUserOrders(id, userRole))
        })
            .catch((error) => {
                console.error("Error cancelledOrder: ", error);
            });
        dispatch(setLoading(false))
    }
    catch (err) {

    }
}

export const completeOrder = (id, userRole, orderId, products) => async (dispatch) => {
    // console.log(products,"completeOrder")
    try {
        dispatch(setLoading(true))
        await db.collection('orders').doc(orderId).update({
            status: "Completed"
        }).then(() => {
            db.collection("vendor").doc(id).get().then((doc) => {
                let dbArr = doc.data().products
                // console.log(dbArr,"dbArr")
                let arr = []
                let orderArr = []
                for (let i = 0; i < dbArr.length; i++) {
                    let obj = { ...dbArr[i] }
                    for (let j = 0; j < products.length; j++) {
                        // console.log(products[j],"product",j)
                        if (dbArr[i].vendorProductId == products[j].vendorProductId) {
                            obj = {
                                ...obj,
                                quantity: dbArr[i].quantity - products[j].retailerQuantity
                            }
                            orderArr.push({ ...obj, retailerQuantity: products[j].retailerQuantity })
                        }
                    }
                    arr.push(obj)
                }
                // console.log(arr,"after")

                // subtractiong orderQuantity from vendor From Quantity of vendorCollection
                db.collection('vendor').doc(id).update({
                    products: arr
                })
                    .then(() => {
                        console.log(" quantity in vendor collection updated successfully!");
                        dispatch(getUserOrders(id, userRole))
                        // dispatch(setLoading(false))
                    })
                    .catch((error) => {
                        console.error("Error quantity in order collection:  ", error);
                    });


                // subtractiong orderQuantity from vendor  Quantity of orderCollection
                db.collection('orders').doc(orderId).update({
                    products: orderArr
                })
                    .then(() => {
                        console.log(" quantity in order collection updated successfully!");
                        dispatch(setLoading(false))
                    })
                    .catch((error) => {
                        console.error("Error quantity in order collection: ", error);
                    });

                console.log(arr, "after quantity minus ")
            })
                .catch((error) => {
                    console.log("Error getting doc data: ", error);

                });
        })
            .catch((error) => {
                console.error("Error cancelledOrder: ", error);
            });
        dispatch(setLoading(false))
    }
    catch (err) {
        console.log(err, "completeOrder")
    }
}


// export const confirmOrder = (data) => async (dispatch) => {
//     let { vendor, retailerId,inc } = data;
//     // // dispatch(setaddShopToCart(shop))
//     // db.collection('orders').get().then(snap => console.log(snap,"snap") )
//     db.collection('orders').get().then(snap => {
//         let size = snap.size // will return the collection size

//         let refrence = `${vendor}|||${retailerId}|||${size+inc}`
//         console.log(refrence, "refrence")
//         db.collection("orders").doc(refrence).set({
//             ...data
//         })
//             .then(() => {
//                 console.log("Order Document successfully written!");
//             })
//             .catch((error) => {
//                 console.error("Error writing document: ", error);
//             });

//     })
//         .catch((err) => {
//             console.log(err, "order size")
//         })

// }




