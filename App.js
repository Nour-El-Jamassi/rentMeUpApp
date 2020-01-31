
import React from "react";
import { AppLoading } from "expo";
import * as Expo from "expo";
import { Asset } from "expo-asset";
import * as Permissions from "expo-permissions";
import Navigator from "./Navigation.js/index.js";

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
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
          // Asset.fromModule(require("./assets/saleem.jpg")).uri,
   
        ])
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
