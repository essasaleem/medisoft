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


const initialState = {
    mainProducts: [],
    loading: false,
    error: null,
    allProducts:[],
    currentProduct:{},
    currentShopProducts:[],
    currentVendorProducts:[],
    searchProducts:[]
};

const productReducer = (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case GET_MAIN_PRODUCTS:
            return {
                ...state,
                mainProducts: payload,
                updating: false,
                loading: false,
            };
        case GET_SEARCH_PRODUCT:
            return{
                ...state,
                searchProducts:payload,
            }
        case GET_VENDOR_PRODUCT:
            return{
                ...state,
                currentVendorProducts:payload
            }
        case GET_SHOP_PRODUCT:
            return{
                ...state,
                currentShopProducts:payload
            }
        case GET_ALL_PRODUCTS:
            return{
                ...state,
                allProducts:payload,
                updating:false,
                loading:false
            }
        case GET_CURRENT_PRODUCT:
            return{
                ...state,
                currentProduct:payload,
                updating:false,
                loading:false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: payload,
                error: null,
            };
        case SET_ERROR:
            return {
                ...state,
                error: payload,
            };
        default:
            return state;
    }
};

export default productReducer;