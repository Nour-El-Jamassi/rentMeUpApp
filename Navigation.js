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
import FeedbacksWithFlatlist from "./src/pages/FeedbacksWithFlatlist";
import Feedbacks from "./src/pages/feedbacks";
import Home from "./src/pages/home";
import Filter from "./src/pages/filter";

export default class App extends React.Component {
  render() {
    const mainStack = createSwitchNavigator({ login: LogIn, SignIn: SignUp });
    const main = createStackNavigator({
      ImageCarousel: ImageCarousel,
      Add: Add,
      Home: Home,
      Filter: Filter
    });
    const Log = createSwitchNavigator({ mainStack: mainStack, main: main });

    const AppNavigator = createSwitchNavigator(
      {
        Splash: Splash,
        Auth: Log,
        FeedbacksWithFlatlist: FeedbacksWithFlatlist,
        Feedbacks: Feedbacks,

        contactUS: contactUS
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
