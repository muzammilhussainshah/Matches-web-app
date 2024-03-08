
import { _storeData, _retrieveData } from '../../services/assynsStorage';
import { getApi, postApi, putApi, deleteApi } from '../../services/api/apiFunction';

import { auth, firestoreDb } from "../../config/db";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { Timestamp, doc, setDoc, updateDoc, collection, getDocs, addDoc, query, where } from "firebase/firestore";
import toast from 'react-hot-toast';

// export const setSearchKeywords = (keyword) => async dispatch => {
//   // console.log(keyword, 'keyword')
//   dispatch({ type: "IS_SEARCH", payload: keyword });
// };

export const showError = (navigation) => async dispatch => {
  dispatch({ type: "IS_ERROR", payload: true });
  setTimeout(() => {
    dispatch({ type: "IS_ERROR", payload: false });
  }, 5000);
};

export const signIn = (credentials, navigation, isRemember) => async dispatch => {
  dispatch({ type: "IS_LOADER" });
  signInWithEmailAndPassword(auth, credentials.email, credentials.password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user, "useruseruseruser");
      dispatch({ type: "FETCH_USER", payload: user });
      _storeData('userEmail', user.email)
      _storeData('isRemember', isRemember)
      navigation("/matches")
      toast.success('Login successful')
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage)

    });
  dispatch({ type: "IS_LOADER" });
};

export const signUp = (credentials, navigation) => async dispatch => {
  dispatch({ type: "IS_LOADER" });
  createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log(user);
      dispatch({ type: "FETCH_USER", payload: user });
      navigation("/matches")
      toast.success('User register successful')
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage)
      // ..
    });
  dispatch({ type: "IS_LOADER" });
};

export const forgotPassword = (credentials, navigation) => async dispatch => {
  dispatch({ type: "IS_LOADER" });
  sendPasswordResetEmail(auth, credentials.email)
    .then(() => {
      navigation("/Signin")
      toast.success('Password reset email sent!')
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage)
      // ..
    });
  dispatch({ type: "IS_LOADER" });
};

export const logout = (navigation) => async dispatch => {
  dispatch({ type: "IS_LOADER" });
  _storeData('isRemember', false)
  _storeData('userEmail', null)
  toast.success('Successfully logged out.')
  navigation("/");
  dispatch({ type: "IS_LOADER" });
};

export const fetchMatches = (navigation) => async dispatch => {
  let matches = []
  const querySnapshot = await getDocs(collection(firestoreDb, "Matches"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    matches.push(doc.data())
  });
  dispatch({ type: "FETCH_ALL_MATCHES", payload: matches });
};

export const fetchInterest = (navigation) => async dispatch => {
  let interest = []
  const querySnapshot = await getDocs(collection(firestoreDb, "Interest"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    interest.push(doc.data())
  });
  dispatch({ type: "FETCH_ALL_INTEREST", payload: interest });
};

export const saveInterest = (data, navigate, setshowModal) => async dispatch => {
  if (data.interest != '') {
    dispatch({ type: "IS_LOADER" });
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(firestoreDb, "Interest"), {
      interest: data.interest
    });
    console.log("Document written with ID: ", docRef.id);
    setshowModal(false)
    dispatch(fetchInterest());
    dispatch({ type: "IS_LOADER" });
  }
  else {
    toast.error('Type Interest')
  }
};




