import React from "react";
import { AppLoading } from "expo";
import * as Expo from "expo";
import { Asset } from "expo-asset";
import * as Permissions from "expo-permissions";
import Navigator from "./Navigation";
import firebase from "firebase";
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
  measurementId: "G-K613V6TT4E",
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          autoHideSplash={false}
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return <Navigator />;
    }
  }
  _loadResourcesAsync = async () => {
    try {
      Expo.SplashScreen.hide();
      return Promise.all([
        await Asset.loadAsync([
          Asset.fromModule(require("./assets/Gaza3.jpg")).uri,
          Asset.fromModule(require("./assets/Gaza1.jpg")).uri,
          Asset.fromModule(require("./assets/couch-.jpg")).uri,
          Asset.fromModule(require("./assets/kitchen.jpg")).uri,
          Asset.fromModule(require("./assets/logo1.png")).uri,
        ]),
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  _handleLoadingError = (error) => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
