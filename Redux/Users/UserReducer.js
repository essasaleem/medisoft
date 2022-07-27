import {
    SET_USER,
    SET_LOADING,
    SET_ERROR,
    SET_LOGOUT,
    SET_CURRENT_USER,
    GET_VENDORS,
    SET_USER_DETAILS
} from "./UserTypes"

const initialState = {
    data: {},
    loading: false,
    updating: false,
    logged: false,
    error: null,
    users: {},
    currentUser:{},
    vendors: [],
    userDetails:{}
};


const userReducer = (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case SET_USER:
            return {
                ...state,
                data: payload,
                updating: false,
                loading: false,
            };
        case SET_USER_DETAILS:
            return{
                ...state,
                userDetails: payload
            }
        case SET_CURRENT_USER:
            return{
                ...state,
                currentUser:payload,
                logged:true
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
        case SET_LOGOUT:
            return {
                ...state,
                data: {},
                updating: false,
                logged: false,
                loading: false,
            };
        case GET_VENDORS:
            return{
                ...state,
                vendors: payload,
                error:null
            }
        default:
            return state;
    }
};

export default userReducer;