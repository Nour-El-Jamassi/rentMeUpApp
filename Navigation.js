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
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  AntDesign
} from "@expo/vector-icons";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import LogOut from "./src/pages/logOut";
import { Container, Content, Header, Body, Icon } from "native-base";
import { Image, Text } from "react-native";
import firebase from "firebase";
// import App from "./App";

export default class App extends React.Component {
  state = {
    name: "Nour Mohammed"
  };
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User logged in already or has just logged in.
        console.log(user.uid);
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then(doc => {
            console.log(doc.data().name);
            this.setState({ name: doc.data().name });
          })
          .catch(function(error) {
            console.log("Error getting documents: ", error);
          });
      } else {
        console.log("not logged in ");
        // User not logged in or has just logged out.
      }
      // let uid = firebase.auth().currentUser.uid;
      // if ((uid = null)) {
      //   console.log("hi");
      // } else {
      //   firebase
      //     .firestore()
      //     .collection("users")
      //     .doc(uid)
      //     .get()
      //     .then(doc => {
      //       alert(doc.date().name);
      //       let name;
      //       this.setState({
      //         name: doc.date().name
      //       });
      //     });
    });
  }

  render() {
    const mainStack = createStackNavigator({ login: LogIn, SignIn: SignUp });

    const AddPage = createStackNavigator(
      {
        Add: Add
      },
      {
        defaultNavigationOptions: ({ navigation }) => {
          return {
            headerStyle: {
              backgroundColor: "#0F3A5B",

              height: 70
            },
            headerTitle: "Add Property",
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
              textAlign: "center",
              flex: 1,
              marginTop: 15
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
              backgroundColor: "#0F3A5B",
              height: 70
            },
            headerTitle: "Filter",
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
              textAlign: "center",
              flex: 1,
              marginTop: 15
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
              backgroundColor: "#0F3A5B",
              height: 70
            },
            headerTitle: "ContactUs",
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
              textAlign: "center",
              flex: 1,
              marginTop: 15
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
              backgroundColor: "#0F3A5B",
              height: 70
            },
            headerTitle: "ContactUs",
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
              textAlign: "center",
              flex: 1,
              marginTop: 15
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
        Map: MainMap
      },
      {
        defaultNavigationOptions: ({ navigation }) => {
          return {
            drawerIcon: <Feather name="home" />,
            headerStyle: {
              backgroundColor: "#0F3A5B",
              height: 70
            },
            headerTitle: "Map",
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
              textAlign: "center",
              flex: 1,
              marginTop: 15
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

    const Drawer = props => (
      <Container>
        <Header
          style={{
            height: 160,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Body>
            <Image
              style={{ height: 100, width: 100, alignSelf: "center" }}
              source={require("./assets/userPic.png")}
            />
            <Text style={{ marginTop: 10 }}>{this.state.name}</Text>
          </Body>
        </Header>
        <Content>
          <DrawerItems {...props} />
        </Content>
      </Container>
    );
    const DrawerNavigator = createDrawerNavigator(
      {
        welcome: ImageCarousel,
        Map: HomePage,
        Add: AddPage,
        Filter: FilterPage,
        Feedbacks: FeedbacksPage,
        ContactUS: ContactPage,
        LogOut: LogOut
      },
      {
        contentComponent: Drawer,
        drawerOpenRoute: "DrawerOpen",
        drawerCloseRoute: "DrawerClose"
      },
      {
        initialRouteName: "Add"
      }
    );
    const Log = createSwitchNavigator(
      {
        Splash: Splash,
        Auth: mainStack,
        main: DrawerNavigator
      },
      {
        initialRouteName: "main"
      }
    );

    const Navigator = createAppContainer(Log);
    return (
      <EstateProvider>
        <Navigator />
      </EstateProvider>
    );
  }
}
