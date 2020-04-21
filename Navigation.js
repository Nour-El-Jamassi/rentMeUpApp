import { createAppContainer, createSwitchNavigator } from "react-navigation";
import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { EstateProvider } from "./Provider/estateProvider";
import Splash from "./src/pages/splash.js";
import SignUp from "./src/pages/signUp";
import LogIn from "./src/pages/logIn";
import Add from "./src/pages/add";
import contactUS from "./src/pages/contact";
import ImageCarousel from "./src/component/imageCarsoul";

import Home from "./src/pages/home";
export default class App extends React.Component {
  render() {
    const mainStack = createSwitchNavigator({ login: LogIn, SignIn: SignUp });
    const main = createStackNavigator({
      ImageCarousel: ImageCarousel,
      Add: Add,
      Home: Home
    });
    const Log = createSwitchNavigator({ mainStack: mainStack, main: main });

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
    const Navigator = createAppContainer(Log);
    return (
      <EstateProvider>
        <Navigator />
      </EstateProvider>
    );
  }
}
