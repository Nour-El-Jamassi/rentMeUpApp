import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Splash from "./src/pages/splash.js";
import SignUp from "./src/pages/signUp";
import LogIn from "./src/pages/logIn";
import Add from "./src/pages/add"

const mainStack = createSwitchNavigator({ SignIn: SignUp, login: LogIn });

const AppNavigator = createSwitchNavigator(
  {
    Splash: Splash,
    Auth: mainStack,
    Add:Add
  },
  {
    initialRouteName: "Add"
  }
);

const Navigator = createAppContainer(AppNavigator);

export default Navigator;
