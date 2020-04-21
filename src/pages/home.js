import React, { Component } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Map from "./mainMap";
import * as theme from "../../theme";
import { EstateContext } from "../../Provider/estateProvider";

export default class Home extends Component {
  static contextType = EstateContext;

  renderHeader() {
    return (
      <View style={styles.header}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-start"
          }}
        >
          <TouchableWithoutFeedback
          // onPress={this.props.navgation.openDrawer}
          >
            <Ionicons name="ios-menu" size={theme.SIZES.icon * 1.5} />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }

  render() {
    const { sortedEstates } = this.context;
    console.log("estatesHome", sortedEstates);
    if (sortedEstates) {
      return (
        <View style={styles.container}>
          <Map estates={sortedEstates} />
        </View>
      );
    } else {
      return <View></View>;
    }
  }
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.COLORS.white
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: theme.SIZES.base * 2,
    paddingTop: theme.SIZES.base * 2.5,
    paddingBottom: theme.SIZES.base * 1.5
  }
});
