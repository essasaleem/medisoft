import {
    ADD_QUANTITY,
    SUB_QUANTITY,
    ADD_SHOP_TO_CART,
    REMOVE_SHOP_FROM_CART,
    SET_LOADING,
    SET_ERROR,
    SET_CART_EMPTY
} from './CartTypes'

export const setLoading = (loading) => {
    return {
        type: SET_LOADING,
        payload: loading
    };
};

export const setAddQuantity = (address) => {
    return{
        type: ADD_QUANTITY,
        payload : address
    }
}

export const setSubQuantity = (address) => {
    return{
        type: SUB_QUANTITY,
        payload : address
    }
}

export const setCartEmpty = () =>{
    return{
        type: SET_CART_EMPTY,
        payload: {}
    }
}

export const setErrors = (errors) => {
    return {
        type: SET_ERROR,
        payload: errors,
    };
};

//vendor ID is must
export const setaddShopToCart = (shop) => {
    return {
        type: ADD_SHOP_TO_CART,
        payload: shop,
    };
};

//vendor ID is must
export const removeShopFromCArt = (vendorId) =>{
    // return{
    //     type: REMOVE_SHOP_FROM_CART,
    //     payload:vendorId
    // }
}

// export const addShopToCart = (shop) =>{

// }

export const addShopToCart = (shop) => async (dispatch) => {
        dispatch(setaddShopToCart(shop))
        console.log(shop,"shop")
}


export const addQuantity = (address) => async (dispatch) => {
    dispatch(setAddQuantity(address))
    // console.log(address,"addQuantity address")
}

export const subQuantity = (address) => async (dispatch) => {
    dispatch(setSubQuantity(address))
    // console.log(address,"subQuantity address")
}

// export const emptyCart = () => async (dispatch) => {
//     dispatch(setCartEmpty())
// }