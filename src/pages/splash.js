import React, { Component } from "react";
import { Image, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default class Splash extends Component {
  // check() {
  //   setTimeout(() => {
  //     this.props.navigation.navigate("Auth");
  //   }, 2000);
  // }

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate("Auth");
    }, 2000);
  }

  render() {
    const splashImg = require("../../assets/logo1.png");
    return (
      <LinearGradient
        colors={["#0F3A5B", "#af9a7d"]}
        // start={[150, 0]}
        // end={[0, 50]}
        style={{
          flex: 1,

          alignContent: "center",
          justifyContent: "center"
        }}
      >
        <View>
          <Image
            style={{
              height: "50%",
              width: "60%",
              marginTop: 100,
              alignSelf: "center"
            }}
            source={splashImg}
          ></Image>
        </View>
      </LinearGradient>
    );
  }
}
