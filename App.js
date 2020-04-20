//ToDo:
// all navigation to after mereging the whole app (stack, Drawer, appContainer)
import React from "react";
// import { createStackNavigator } from "react-navigation-stack";
// import { createAppContainer } from "react-navigation";
//pages import
import HomeScreen from "./src/pages/home";
import Filter from "./src/pages/filter";
// import Feedbacks from "./src/pages/feedbacks";
// import Carsouel from "./src/component/imageCarsoul";
// import FeedbacksWithFlatlist from "./src/pages/FeedbacksWithFlatlist";
//setting firebase
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
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
import { EstateProvider } from "./Provider/estateProvider";
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const StackPages = createStackNavigator({
//     Home: HomeScreen,
//    {
//     defaultNavigationOptions: ({nativgation}) => {
//       return{
//         headerStyle:{ backgroundColor: "#6b52ae"},
//         headerTitle:"App",

//       }

//     }
//   }
// })
// const DrawerNavigation = createDrawerNavigator(
//   {
//     Profile: Logout,
//     Feedbacks: Logout,
//     LogOut: Logout
//   },
//   {
//     hideStatusBar: true,
//     drawerBackgroundColor: "rgba(255,255,255,0)",
//     overLayColor: "#6b52ae",
//     contentOptions: {
//       activeTintColor: "#fff",
//       activeBackgroundColor: "#6b52ae"
//     }
//   }
// );
// export default createAppContainer(DrawerNavigation);

// const App = props => <HomeScreen />;
// export default App;

// const AppStack = createStackNavigator({
//   FirstComponent: {
//     screen: Home,
//     navigationOptions: () => ({
//       title: "Home"
//     })
//   }
//   // SecondComponent: {
//   //   screen: Filter,
//   //   navigationOptions: () => ({
//   //     title: "Filter"
//   //   })
//   // }
// });

// const AppContainer = createAppContainer(AppStack);

const App = () => {
  return (
    <EstateProvider>
      <Filter />
    </EstateProvider>
  );
};

export default App;
