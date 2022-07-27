import {
    SET_USER,
    SET_LOADING,
    SET_ERROR,
    SET_LOGOUT,
    SET_CURRENT_USER,
    GET_VENDORS,
    SET_USER_DETAILS
} from "./UserTypes"
import { Alert } from "react-native";
import { auth, db } from '../../Firebase/Firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

export const setUserDetails = (details) => {
    return {
        type: SET_USER_DETAILS,
        payload: details
    }
}

export const setCurrentUser = (currentUser) => {
    return {
        type: SET_CURRENT_USER,
        payload: currentUser,
    };
};

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

export const setLogout = () => {
    return {
        type: SET_LOGOUT,
    };
};

export const setVendors = (vendors) => {
    return {
        type: GET_VENDORS,
        payload: vendors
    }
}

export const registerUser = (user) => async (dispatch) => {
    try{
    let { email, password, name, phone, userRole } = user
    await auth.createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            // Signed in 
            const userCredentials = authUser.user;
            let { email, uid } = userCredentials

            //update Profile
            const updateUser = auth.currentUser
            updateUser.updateProfile({
                displayName: name,
                photoURL: "https://firebasestorage.googleapis.com/v0/b/medisoft0338.appspot.com/o/User-Profile-PNG-High-Quality-Image.png?alt=media&token=9b0f212e-a238-4c96-a02b-bb493717c8a8"
            })
                .then((res) => {
                    // Update successful
                    // console.log(res, "profile updated")
                }).catch((error) => {
                    // An error occurred
                    // console.log(error, "error update profile")
                });

            //adding vendor/retailer to user collections
            db.collection("users").doc(uid).set({
                uid,
                email,
                name,
                phone,
                userRole
            })
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
            //adding vendor to vendor collection
            if (userRole == "vendor") {
                db.collection("vendor").doc(uid).set({
                    uid,
                    email,
                    name,
                    phone,
                    userRole,
                    products: [],
                    receiveOrders: [],
                    rating: 3,
                    image:'https://firebasestorage.googleapis.com/v0/b/medisoft0338.appspot.com/o/User-Profile-PNG-High-Quality-Image.png?alt=media&token=9b0f212e-a238-4c96-a02b-bb493717c8a8'
                })
                    .then(() => {
                        Alert.alert('Success', 'Register as Vendor');
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);

                    });
            }//adding retailer to retailer collection
            else {
                db.collection("retailer").doc(uid).set({
                    uid,
                    email,
                    name,
                    phone,
                    userRole,
                    retailerOrders: []
                })
                    .then(() => {
                        Alert.alert('Success', 'Register as Retailer');

                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);

                    });
            }

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // console.log(errorMessage, "error")
            Alert.alert(errorCode, errorMessage);
        });
    }
    catch(err)
    {
        console.log(err,"regiter error")
    }
}




export const loginUser = (email, password) => async (dispatch) => {
    try{
        await auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // ...
            // console.log(user, "login user");
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            Alert.alert(errorCode, errorMessage);
            // console.log(error, "login user")
        });
    }
    catch(err)
    {
        console.log(err,"LoginErr")
    }
}


//logout
export const logoutUser = (navigation) => async (dispatch) => {
    auth.signOut().then(() => {
        dispatch(setCurrentUser({}))
        navigation.replace('Login');
    })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            Alert.alert(errorCode, errorMessage);
            // console.log(error, "login user")
        });
}



//geting vendors
export const getVendors = () => async (dispatch) => {
    try {

        dispatch(setLoading(true))
        await dispatch(setLoading(true))
        let arr = [];
        //getting vendors by highest rating
        await db.collection("vendor").orderBy("rating", "desc").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let data = {
                    id: doc.id,
                    data: doc.data()
                }
                arr.push(data)
                // console.log(data.data.products,"data")
            });
            dispatch(setVendors(arr))
            dispatch(setLoading(false))
        })
            .catch((error) => {
                console.log("Error getting documents: ", error);
                dispatch(setLoading(false))
            });
    }
    catch (err) {
        console.log(err, "getVendors")
    }

}

export const getUserDetails = (id) => async (dispatch) => {
    try {
        await db.collection("users").doc(id).get().then((doc) => {
            let data = doc.data()
            dispatch(setUserDetails(data))
            console.log(data,"getUserDetails collection")
        })
            .catch((error) => {
                console.log("Error getting doc data: ", error);
                dispatch(setLoading(false))
            });
    }
    catch (err) {
        console.log(err, "getUserDetails")
    }

}