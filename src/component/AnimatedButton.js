import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
export default class AnimatedButton extends Component {
  animation = new Animated.Value(0.01);
  toggleMenue = () => {
    const toValue = this.open ? 0 : 1;
    Animated.spring(this.animation, {
      toValue,
      friction: 5
    }).start();
    this.open = !this.open;
  };
  render() {
    const pinStyle = {
      transform: [
        { scale: this.animation },
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -80]
          })
        }
      ]
    };
    const thumbsStyle = {
      transform: [
        { scale: this.animation },
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -140]
          })
        }
      ]
    };
    const heartStyle = {
      transform: [
        { scale: this.animation },
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -200]
          })
        }
      ]
    };
    const rotation = {
      transform: [
        {
          rotate: this.animation.interpolate({
            inputRange: [0, 360],
            outputRange: ["0deg", "360deg"]
          })
        }
      ]
    };

    const Opacity = this.animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 1]
    });
    return (
      <View style={(styles.container, this.props.style)}>
        <TouchableWithoutFeedback>
          <Animated.View
            style={(styles.Button, styles.secondary, heartStyle, Opacity)}
          >
            <AntDesign name="hearto" size={15} color={"#f02A48"} />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Animated.View
            style={(styles.Button, styles.secondary, thumbsStyle, Opacity)}
          >
            <AntDesign name="filter" size={15} color={"#f02A48"} />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Animated.View
            style={(styles.Button, styles.secondary, pinStyle, Opacity)}
          >
            <Entypo name="location-pin" size={15} color={"#f02A48"} />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.toggleMenue}>
          <Animated.View
            style={(styles.Button, styles.menu, rotation, Opacity)}
          >
            <AntDesign name="plus" size={20} color={"#af9a7d"} />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    position: "absolute"
  },
  Button: {
    position: "absolute",
    right: 0,
    left: 0,
    top: 0,
    paddingTop: 12 * 2,
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#f02A48",
    shadowOpacity: 0.3,
    shadowOffset: { height: 10 }
  },
  menu: {
    backgroundColor: "#f02A48"
  },
  secondary: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: "#fff"
  }
});
