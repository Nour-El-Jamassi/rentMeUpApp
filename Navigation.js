import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { EstateProvider } from "./Provider/estateProvider";
import Splash from "./src/pages/splash.js";
import SignUp from "./src/pages/signUp";
import LogIn from "./src/pages/logIn";
import Add from "./src/pages/add";
import ContactUS from "./src/pages/contact";
import ImageCarousel from "./src/component/imageCarsoul";
import FeedbacksWithFlatlist from "./src/pages/FeedbacksWithFlatlist";
import MainMap from "./src/pages/mainMap";
import Filter from "./src/pages/filter";
import { TouchableWithoutFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "react-navigation-drawer";
import LogOut from "./src/pages/logOut";
export default class App extends React.Component {
  render() {
    const mainStack = createSwitchNavigator({ login: LogIn, SignIn: SignUp });
    const main = createStackNavigator({
      ImageCarousel: ImageCarousel,
      Add: Add,
      Home: MainMap,

      Filter: Filter
    });
    const AddPage = createStackNavigator(
      {
        Add: Add
      },
      {
        defaultNavigationOptions: ({ navigation }) => {
          return {
            headerStyle: {
              backgroundColor: "#0F3A5B"
            },
            headerTitle: "Add",
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
              textAlign: "center",
              flex: 1,
              marginTop: 10
            },
            headerLeft: () => (
              <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
                <Ionicons
                  name="ios-menu"
                  size={30}
                  style={{ marginLeft: 10, color: "white" }}
                />
              </TouchableWithoutFeedback>
            )
          };
        }
      }
    );
    const FilterPage = createStackNavigator(
      {
        Filter: Filter
      },
      {
        defaultNavigationOptions: ({ navigation }) => {
          return {
            headerStyle: {
              backgroundColor: "#0F3A5B"
            },
            headerTitle: "Filter",
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
              textAlign: "center",
              flex: 1,
              marginTop: 10
            },
            headerLeft: () => (
              <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
                <Ionicons
                  name="ios-menu"
                  size={30}
                  style={{ marginLeft: 10, color: "white" }}
                />
              </TouchableWithoutFeedback>
            )
          };
        }
      }
    );

    const FeedbacksPage = createStackNavigator(
      {
        FeedbacksWithFlatlist: FeedbacksWithFlatlist
      },
      {
        defaultNavigationOptions: ({ navigation }) => {
          return {
            headerStyle: {
              backgroundColor: "#0F3A5B"
            },
            headerTitle: "ContactUs",
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
              textAlign: "center",
              flex: 1,
              marginTop: 10
            },
            headerLeft: () => (
              <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
                <Ionicons
                  name="ios-menu"
                  size={30}
                  style={{ marginLeft: 10, color: "white" }}
                />
              </TouchableWithoutFeedback>
            )
          };
        }
      }
    );
    const ContactPage = createStackNavigator(
      {
        ContactUS: ContactUS
      },
      {
        defaultNavigationOptions: ({ navigation }) => {
          return {
            headerStyle: {
              backgroundColor: "#0F3A5B"
            },
            headerTitle: "ContactUs",
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
              textAlign: "center",
              flex: 1,
              marginTop: 10
            },
            headerLeft: () => (
              <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
                <Ionicons
                  name="ios-menu"
                  size={30}
                  style={{ marginLeft: 10, color: "white" }}
                />
              </TouchableWithoutFeedback>
            )
          };
        }
      }
    );
    const HomePage = createStackNavigator(
      {
        Home: MainMap
      },
      {
        defaultNavigationOptions: ({ navigation }) => {
          return {
            headerStyle: {
              backgroundColor: "#0F3A5B"
            },
            headerTitle: "Home",
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
              textAlign: "center",
              flex: 1,
              marginTop: 10
            },
            headerLeft: (
              <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
                <Ionicons
                  name="ios-menu"
                  size={30}
                  style={{ marginLeft: 10, color: "white" }}
                />
              </TouchableWithoutFeedback>
            )
          };
        }
      }
    );

    const DrawerNavigator = createDrawerNavigator(
      {
        welcome: ImageCarousel,
        Home: HomePage,
        Add: AddPage,
        Filter: FilterPage,
        Feedbacks: FeedbacksPage,
        ContactUS: ContactPage,
        LogOut: LogOut,
        LogIn: LogIn
      },
      {
        hideStatusBar: true,
        drawerBackgroundColor: "#404040",
        contentOptions: {
          activeBackgroundColor: "#af9a7d"
        }
      }
    );
    const Log = createSwitchNavigator({
      mainStack: mainStack,
      main: DrawerNavigator
    });

    const AppNavigator = createSwitchNavigator(
      {
        Splash: Splash,
        Auth: Log
        // LogOut: LogOut
      },
      {
        initialRouteName: "Splash"
      }
    );
    const Navigator = createAppContainer(AppNavigator);
    return (
      <EstateProvider>
        <Navigator />
      </EstateProvider>
    );
  }
}
