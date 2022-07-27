import { combineReducers } from 'redux';
import cartReducer from './Cart/CartReducer';
import orderReducer from './Order/OrderReducer';
import productReducer from './Products/ProductReducer';
import userReducer from './Users/UserReducer';

const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer
})

export default rootReducer;