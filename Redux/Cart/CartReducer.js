import {
    ADD_QUANTITY,
    SUB_QUANTITY,
    ADD_SHOP_TO_CART,
    REMOVE_SHOP_FROM_CART,
    SET_LOADING,
    SET_ERROR,
    SET_CART_EMPTY
} from './CartTypes'


const initialState = {
    data: {},
    loading: false,
    updating: false,
    error: null,
    userCart: {},
};



const cartReducer = (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case SET_LOADING:
            return {
                ...state,
                loading: payload,
                error: null,
            };
        case SET_CART_EMPTY:
            return{
                ...state,
                userCart: payload
            }
        case SET_ERROR:
            return {
                ...state,
                error: payload,
            };
        case ADD_SHOP_TO_CART:
            return {
                ...state,
                userCart: {
                    ...state.userCart,
                    [payload.vendor]: payload
                }
            }
        case REMOVE_SHOP_FROM_CART:
            return {
                ...state,
                userCart: Object.keys(thisIsObject).filter(key =>
                    key !== payload).reduce((obj, key) => {
                        obj[key] = state.userCart[key];
                        return obj;
                    }, {}
                    )
            }
        case ADD_QUANTITY:
            return {
                ...state,
                userCart: {
                    ...state.userCart,
                    [payload.vendor]: {
                        ...state.userCart[payload.vendor],
                        products: state.userCart[payload.vendor].products.map(val => (val.productId != payload.productId) ? val : { ...val, retailerQuantity: val.retailerQuantity + 1 })
                    }
                }
            }
        case SUB_QUANTITY:
            return {
                ...state,
                userCart: {
                    ...state.userCart,
                    [payload.vendor]: {
                        ...state.userCart[payload.vendor],
                        products: state.userCart[payload.vendor].products.map(val => (val.productId != payload.productId) ? val : { ...val, retailerQuantity: val.retailerQuantity - 1 })
                    }
                }
            }
        default:
            return state;
    }
};

export default cartReducer;