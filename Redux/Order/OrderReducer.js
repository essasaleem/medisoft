import {
    SET_LOADING,
    SET_ERROR,
    SET_UPDATING,
    SET_ORDERS_IDS,
    SET_USER_ORDERS
} from './OrderTypes'


const initialState = {
    data: {},
    loading: false,
    updating: false,
    error: null,
    ordersId : [],
    userOrders : []
};


const orderReducer = (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case SET_LOADING:
            return {
                ...state,
                loading: payload,
                error: null,
            };
        case SET_USER_ORDERS:
            return{
                ...state,
                userOrders: payload
            }
        case SET_ORDERS_IDS:
            return{
                ...state,
                ordersId : payload
            }
        case SET_ERROR:
            return {
                ...state,
                error: payload,
            };
        case SET_UPDATING:
            return {
                ...state,
                error: payload,
            };
        default:
            return state;
    }
};

export default orderReducer;