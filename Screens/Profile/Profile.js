import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions,
  ScrollView,
  TextInput,
  PermissionsAndroid,
} from 'react-native';
import React, { useEffect } from 'react';
import styling from '../../styling';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import ImagePicker, {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import { connect } from 'react-redux';
import { getMainProducts } from '../../Redux/Products/ProductAction';
import { getUserDetails } from '../../Redux/Users/UserAction';
import { getOrdersIds } from '../../Redux/Order/OrderAction';



const styles = StyleSheet.create({
  ...styling,
  head1: {
    fontSize: 35,
    textAlign: 'center',
    marginBottom: 20,
    color: '#0095FF',
  },
  linkText: {
    color: 'black',
    textAlign: 'center',
  },
  headerContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  mainContainer: {
    backgroundColor: '#005dff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  aboutContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  tittle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    left: 10,
  },
  valueStyle: {
    // fontWeight: 'bold',
    top: 5,
    fontSize: 15,
    color: 'gray',
  },
});

const Profile = ({ navigation, userDetails, getMainProducts, getUserDetails, currrentUser,getOrdersIds }) => {
  const [Img, setimg] = React.useState(null);
  const dummyImg = require('../../Assets/Images/profile-dummy.png');

  // console.log(userDetails,"userDetails")

  useEffect(() => {
    getMainProducts();
    getUserDetails(currrentUser.uid);
    getOrdersIds(currrentUser.uid, userDetails.userRole);
  }, [])


  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        launchImageLibrary(options, response => {
          // console.log('Response = ', response);

          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            const source = { uri: response.uri };
            console.log('response', JSON.stringify(response.uri));
            console.log('IMG URI=====>', response.assets[0].uri);
            setimg(response.assets[0].uri);
            // this.setState({
            //   filePath: response,
            //   fileData: response.data,
            //   fileUri: response.uri
            // });

            //upload image to firestorage
          }
        });
      } else {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        launchImageLibrary(options, response => {
          // console.log('Response = ', response);

          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            const source = {uri: response.uri};
            console.log('response', JSON.stringify(response.uri));
            console.log('IMG URI=====>', response.assets[0].uri);
            setimg(response.assets[0].uri);
            // this.setState({
            //   filePath: response,
            //   fileData: response.data,
            //   fileUri: response.uri
            // });

            //upload image to firestorage
          }
        });
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <>
      <StatusBar backgroundColor={'#005dff'} />
      <View
        style={{
          backgroundColor: 'white',
          height: Dimensions.get('screen').height,
          marginBottom: 50,
          // marginBottom: 30,
        }}>
        <View style={styles.mainContainer}>
          <View>
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon
                  size={20}
                  color="white"
                  name="left"
                  backgroundColor="white"
                />
              </TouchableOpacity>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>
                Profile
              </Text>
              <TouchableOpacity>
                <Text
                  style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: 'blue',
              // borderRadius: 230,
            }}>
            {Img ? (
              <Image
                resizeMode="contain"
                source={{ uri: Img }}
                style={{
                  height: 120,
                  width: 120,

                  backgroundColor: 'lightgray',
                  borderRadius: 60,
                }}
              />
            ) : (
              <Image
                resizeMode="contain"
                source={dummyImg}
                style={{
                  height: 120,
                  width: 120,

                  backgroundColor: 'lightgray',
                  borderRadius: 60,
                }}
              />
            )}
            <TouchableOpacity onPress={requestCameraPermission}>
              <View
                style={{
                  backgroundColor: 'white',
                  width: 50,
                  height: 50,
                  borderRadius: 60,
                  bottom: 40,
                  right: 40,
                  alignItems: 'center',
                }}>
                <Icon
                  size={40}
                  color="darkorange"
                  name="camera"
                  backgroundColor="#3b5998"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {Object.keys(userDetails)?.length == 0 ? <Text> Loading...</Text> : <ScrollView>
          <View style={{ height: Dimensions.get('screen').height }}>
            <AboutData tittle="Username" value={userDetails?.name} icoName="user" />
            <AboutData
              tittle="Email"
              value={userDetails?.email}
              icoName="mail"
            />
            <AboutData tittle="Phone" value={userDetails?.phone} icoName="phone" />
            {/* {userDetails.userRole == "retailer" && <AboutData
              onpress={() => navigation.navigate('OrderDetails')}
              tittle="Order Details"
              icoName="profile"
              value={userDetails?.name}
            />} */}
            <AboutData
              onpress={() => navigation.navigate('OrderDetails')}
              tittle="Orders Details"
              icoName="profile"
              value={userDetails?.name}
            />
            {userDetails.userRole == "vendor" && <AboutData
              onpress={() => navigation.navigate('AddProduct')}
              tittle="Add Products"
              value={userDetails?.name}
              icoName="plussquare"
            />}

          </View>
        </ScrollView>}
      </View>
    </>
  );
};

const AboutData = ({ tittle, value, icoName, onpress }) => {
  return (
    <>
      <TouchableOpacity onPress={onpress}>
        <View style={styles.aboutContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Icon name={icoName} size={24} color="black" />
            <Text style={styles.tittle}>{tittle}</Text>
          </View>
          <Text style={styles.valueStyle}>{value}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const mapStateToProps = store => ({
  vendors: store.user.vendors,
  currrentUser: store.user.currentUser,
  userDetails: store.user.userDetails,
  defaultProducts: store.product.mainProducts
});

//calling redux Action
const mapDispatchToProps = dispatch => ({
  getMainProducts: () => dispatch(getMainProducts()),
  getUserDetails: (id) => dispatch(getUserDetails(id)),
  getOrdersIds: (id, userRole) => dispatch(getOrdersIds(id, userRole))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);