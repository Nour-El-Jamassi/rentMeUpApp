import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Splash from "./src/pages/splash.js";
import SignUp from "./src/pages/signUp";
import LogIn from "./src/pages/logIn";
import Add from "./src/pages/add";
import contactUS from "./src/pages/contact";
import ImageCarousel from "./src/component/imageCarsoul";

import Home from "./src/pages/home";

const mainStack = createSwitchNavigator({ login: LogIn, SignIn: SignUp });
const main = createStackNavigator({
  ImageCarousel: ImageCarousel,
  Add: Add,
  Home: Home
});
const log = createSwitchNavigator({ mainStack: mainStack, main: main });

const AppNavigator = createSwitchNavigator(
  {
    Splash: Splash,
    Auth: mainStack,

    contactUS: contactUS
  },
  {
    initialRouteName: "contactUS"
  }
);

const Navigator = createAppContainer(log);

export default Navigator;
