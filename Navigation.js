import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Splash from "./src/pages/splash.js";
import SignUp from "./src/pages/signUp";
import LogIn from "./src/pages/logIn";
import Add from "./src/pages/add";
import contactUS from "./src/pages/contact";

const mainStack = createSwitchNavigator({ login: LogIn, SignIn: SignUp });

const AppNavigator = createSwitchNavigator(
  {
    Splash: Splash,
    Auth: mainStack,
    Add: Add,
    contactUS: contactUS
  },
  {
    initialRouteName: "contactUS"
  }
);

const Navigator = createAppContainer(mainStack);

export default Navigator;
