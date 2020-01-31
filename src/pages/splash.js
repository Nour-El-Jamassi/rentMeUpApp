import React, { Component } from "react";
import { Image, View } from "react-native";

export default class Splash extends Component {
  // check() {
  //   setTimeout(() => {
  //     this.props.navigation.navigate("Auth");
  //   }, 2000);
  // }

  componentWillMount() {
    setTimeout(() => {
      this.props.navigation.navigate("Auth");
    }, 2000);
  }

  render() {
    const splashImg = require("../../assets/logo1.png");
    return (
      <LinearGradient
        colors={["#7f3db6", "#ea4fc7"]}
        // start={[150, 0]}
        // end={[0, 50]}
        style={{ flex: 1 }}
      >
        <View>
          <Image
            style={{ height: "30%", width: "30%" }}
            source={splashImg}
          ></Image>
        </View>
      </LinearGradient>
    );
  }
}
