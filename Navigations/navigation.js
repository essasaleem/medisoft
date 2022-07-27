import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import {useDispatch} from 'react-redux';
import {auth} from '../Firebase/Firebase';
import {setCurrentUser} from '../Redux/Users/UserAction';

import Login from '../Screens/Auth/Login';
import Signup from '../Screens/Auth/Signup';
import Home from '../Screens/Home/Home';
import Profile from '../Screens/Profile/Profile';
import Cart from '../Screens/Cart/Cart';
import Search from '../Screens/Search/Search';
import Splash from '../Screens/Splash/Splash';
import DetailsProduct from '../Screens/ProductDetail/DetailsProduct';
import ProductDetails from '../Components/ProductDetails';
import CheckOut from '../Screens/CheckOut/CheckOut';
import AddProduct from '../Screens/AddProduct/AddProduct';
import OrderDetails from '../Screens/OrderDetails/OrderDetails';
import ShopeProfile from '../Screens/Search/ShopeProfile/ShopeProfile';
import { connect } from 'react-redux';

const Stack = createNativeStackNavigator();

const Navigation = ({retailerCart}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="DetailsProduct"
          component={DetailsProduct}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CheckOut"
          component={CheckOut}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddProduct"
          component={AddProduct}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OrderDetails"
          component={OrderDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ShopeProfile"
          component={ShopeProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BottomTab"
          // component={TabNavigation}
          options={{headerShown: false }}
        >
          {() => <TabNavigation myPropsName={Object.keys(retailerCart).length}/>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Tab = createBottomTabNavigator();
const TabNavigation = ({myPropsName}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        // tabBarLabelStyle: {color: 'white'},
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#38A3A5',

        // tabBarActiveBackgroundColor: 'green',
        tabBarLabelStyle: {fontSize: 13, fontWeight: 'bold'},

        tabBarStyle: {
          backgroundColor: '#005dff',
          height: 70,
          borderTopLeftRadius: 10,
          borderTopLeftRadius: 10,
          borderTopColor: '#005dff',
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Icon
              size={30}
              color="white"
              name="home"
              backgroundColor="#3b5998"
            />
          ),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Icon
              size={30}
              color="white"
              name="search1"
              backgroundColor="#3b5998"
              shoppingcart
            />
          ),
        }}
        name="Search"
        component={Search}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Icon
              size={30}
              color="white"
              name="shoppingcart"
              backgroundColor="#3b5998"
            />
          ),
          tabBarBadge: myPropsName,
        }}
        name="Cart"
        component={Cart}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Icon
              size={30}
              color="white"
              name="user"
              backgroundColor="#3b5998"
            />
          ),
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

//getting vendors from Redux
const mapStateToProps = store => ({
  vendors: store.user.vendors,
  allProducts: store.product.allProducts,
  currentUser: store.user.currentUser,
  retailerCart: store.cart.userCart
});

//calling redux Action
const mapDispatchToProps = dispatch => ({
  logoutUser: navigation => dispatch(logoutUser(navigation)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
