import { createAppContainer, createSwitchNavigator } from "react-navigation";

import { createStackNavigator } from "react-navigation-stack";
var firebaseConfig = {
  apiKey: "AIzaSyD47xlalTqy3QK4fFgfD9jImnI5prteLfw",
  authDomain: "rentmeup.firebaseapp.com",
  databaseURL: "https://rentmeup.firebaseio.com",
  projectId: "rentmeup",
  storageBucket: "rentmeup.appspot.com",
  messagingSenderId: "259373225502",
  appId: "1:259373225502:web:7e04123dc2de2f3e05000f",
  measurementId: "G-K613V6TT4E"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



const Navigator = createAppContainer(switsh);
export default Navigator;
