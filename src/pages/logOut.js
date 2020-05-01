import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { DrawerItems, SafeAreaView } from "react-navigation";
import PropTypes from "prop-types";
import * as firebase from "firebase";

export class LogOut extends React.Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        console.log("sign out ");
        alert("sign out successfully");
        localStorage.clear();
      })
      .catch(function(error) {
        console.log("An error happened.");
      });
  };

  render() {
    const { logout, ...strippedProps } = this.props; // eslint-disable-line no-unused-vars
    return (
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: "always", horizontal: "never" }}
      >
        <ScrollView>
          <DrawerItems {...strippedProps} />
        </ScrollView>
        <TouchableOpacity onPress={this.logout}>
          <Text style={styles.text}>Log out</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default LogOut;
