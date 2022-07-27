import {
    GET_MAIN_PRODUCTS,
    SET_LOADING,
    SET_ERROR,
    GET_ALL_PRODUCTS,
    GET_CURRENT_PRODUCT,
    GET_SHOP_PRODUCT,
    SET_VENDOR_ADD_PRODUCT,
    GET_VENDOR_PRODUCT,
    GET_SEARCH_PRODUCT
} from "./ProductTypes"
import { Alert } from "react-native";
import { auth, db } from '../../Firebase/Firebase'


export const setProducts = (products) => {
    return {
        type: GET_MAIN_PRODUCTS,
        payload: products,
    };
};

export const setVendorProduct = (products) => {
    return {
        type: GET_VENDOR_PRODUCT,
        payload: products
    }
}

export const setSearchProduct = (product) =>{
    return{
        type:GET_SEARCH_PRODUCT,
        payload:product
    }
}

export const setShopProducts = (products) => {
    return {
        type: GET_SHOP_PRODUCT,
        payload: products
    }
}

export const setLoading = (loading) => {
    return {
        type: SET_LOADING,
        payload: loading
    };
};

export const setErrors = (errors) => {
    return {
        type: SET_ERROR,
        payload: errors,
    };
};

export const setAllProducts = (products) => {
    return {
        type: GET_ALL_PRODUCTS,
        payload: products
    }
}

export const setCurrentProduct = (product) => {
    return {
        type: GET_CURRENT_PRODUCT,
        payload: product
    }
}

export const getMainProducts = () => async (dispatch) => {

    try {

        await dispatch(setLoading(true))
        let arr = [];

        await db.collection("Product").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let data = {
                    id: doc.id,
                    data: doc.data()
                }
                arr.push(data.data)
            });
            console.log(arr, "products");
            dispatch(setProducts(arr))
        })
            .catch((error) => {
                console.log("Error getting documents: ", error);

            });
    }
    catch (err) {
        console.log(err, "getMainProducts")
    }
}

export const getAllProducts = () => async (dispatch) => {
    try {

        await dispatch(setLoading(true))
        let arr = [];

        await db.collection("vendor").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let data = {
                    id: doc.id,
                    data: doc.data()
                }
                // arr.push(data.data.products)
                data.data?.products.map((val, i) => arr.push(val))
            });
            // console.log(arr,"data",arr.length)
            dispatch(setAllProducts(arr))
            dispatch(setLoading(false))
        })
            .catch((error) => {
                console.log("Error getting documents: ", error);
                dispatch(setLoading(false))
            });
    }
    catch (err) {
        console.log(err, "getAllProducts")
    }
}

export const getCurrentProduct = (id) => async (dispatch) => {
    try {

        await dispatch(setLoading(true))
        let arr = [];
        vendorId = id.split("///")[0]
        console.log(id, "producid")

        await db.collection("vendor").doc(vendorId).get().then((doc) => {
            let data = doc.data()
            arr = data.products.filter((val, i) => id == val.vendorProductId)
            console.log({ ...arr[0], rating: data.rating }, "doc data")
            dispatch(setCurrentProduct({ ...arr[0], rating: data.rating }))
            dispatch(setLoading(false))
        })
            .catch((error) => {
                console.log("Error getting doc data: ", error);
                dispatch(setLoading(false))
            });
    }
    catch (err) {
        console.log(err, "getCurrentProduct")
    }
}


export const getShopProducts = (id) => async (dispatch) => {
    try {
        await dispatch(setLoading(true))
        let arr = [];

        await db.collection("vendor").doc(id).get().then((doc) => {
            // querySnapshot.forEach((doc) => {
            let data = {
                id: doc.id,
                data: doc.data()
            }
            // arr.push(data.data.products)
            data.data?.products.map((val, i) => arr.push(val))
            // });
            // console.log(arr,"data getShopProducts",arr.length)
            dispatch(setShopProducts(arr))
            dispatch(setLoading(false))
        })
            .catch((error) => {
                console.log("Error getting documents: ", error);
                dispatch(setLoading(false))
            });
    }
    catch (err) {
        console.log(err, "getShopProduct")
    }
}


export const addVendorProducts = (id, products, navigation) => async (dispatch) => {
    // console.log(id,products,"vendorProducts")
    try {
        await db.collection('vendor').doc(id).update({
            products: products
        }).then(() => {
            console.log("vendor product Document successfully written!");
            Alert.alert('Sucess', "Product added Sucessfully")
            dispatch(getVendorProduct(id))
            dispatch(getAllProducts())
            navigation.navigate('BottomTab')
        })
            .catch((error) => {
                console.error("Error writing vendor product Document: ", error);
            });
    }
    catch (err) { console.log(err, "addVendorProducts") }
}

export const getVendorProduct = (id) => async (dispatch) => {
    try {
        await db.collection('vendor').doc(id).get().then((doc) => {
            let data = doc.data()
            let vendorProducts = data.products;
            dispatch(setVendorProduct(vendorProducts));
            // console.log(vendorProducts,"vendorProducts")
        })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    }
    catch (err) {
        console.log(err, "getVendorProduct")
    }
}


export const getSearchProducts = (query,searchType) => async (dispatch) => {
    try {
        console.log(query,searchType,"search")
        await dispatch(setLoading(true))
        let arr = [];
        await db.collection("vendor").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let data = {
                    id: doc.id,
                    data: doc.data()
                }
                // arr.push(data.data.products)
                if(searchType == "name")
                {
                    data.data?.products.filter((val, i) => {
                        if(val.name.toLowerCase().includes(query.toLowerCase()))
                        {
                            arr.push(val)
                        }
                    }  )
                }
                else if( searchType == "Manufacturer")
                {
                    data.data?.products.filter((val, i) => {
                        if(val.manufacturer.toLowerCase().includes(query.toLowerCase()))
                        {
                            arr.push(val)
                        }
                    }  )
                }
                else if(searchType == "Formula")
                {
                    data.data?.products.filter((val, i) => {
                        if(val.formula.toLowerCase().includes(query.toLowerCase())){
                            arr.push(val)
                        }
                    }  )
                }
                else{
                    data.data?.products.map((val, i) => arr.push(val))
                }
            });
            console.log(arr,"data",arr.length)
            
            dispatch(setSearchProduct(arr))
            dispatch(setLoading(false))
        })
            .catch((error) => {
                console.log("Error getting documents: ", error);
                dispatch(setLoading(false))
            });
    }
    catch (err) {
        console.log(err, "getAllProducts")
    }
}