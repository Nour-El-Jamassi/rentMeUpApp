import React from "react";
import { Text, TouchableOpacity, View, Dimensions } from "react-native";
import * as firebase from "firebase";
import Modal from "react-native-modal";

export class LogOut extends React.Component {
  state = {
    modalIsup: true
  };

  _logout = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        console.log("sign out ");
        alert("sign out successfully");
      })
      .then(() => {
        const { modalIsup } = this.state;
        this.setState({ modalIsup: !modalIsup });
        this.props.navigation.navigate("LogIn");
      })
      .catch(function(error) {
        console.log("An error happened.", error);
      });
  };
  _cancel = () => {
    const { modalIsup } = this.state;
    this.setState({ modalIsup: !modalIsup });
    this.props.navigation.navigate("Home");
  };

  render() {
    return (
      <View>
        <Modal
          isVisible={this.state.modalIsup}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          style={{
            backgroundColor: "#ffffff",
            alignItems: "center",
            // width: 99,            // width: 99,

            height: 99,
            marginTop: 30,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3
            },
            shadowOpacity: 0.49,
            shadowRadius: 4.65,

            elevation: 7,
            backgroundColor: "#ffffff",
            borderRadius: 60,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              color: "#000",
              fontSize: 25
            }}
          >
            Are You Sure?
          </Text>

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={this._logout}
              style={{
                marginTop: 30,
                height: 50,
                width: "45%",
                borderStyle: "solid",
                borderRadius: 25,
                paddingBottom: 5,
                backgroundColor: "#0F3A5B",
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                alignSelf: "center",
                shadowOffset: {
                  width: 0,
                  height: 3
                },
                shadowOpacity: 0.29,
                shadowRadius: 4.65,
                elevation: 7,
                marginBottom: 20,
                marginRight: 25
              }}
            >
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 15
                }}
              >
                Yes,Sign Out
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this._cancel}
              style={{
                marginTop: 30,
                height: 50,
                width: "45%",
                borderStyle: "solid",
                borderRadius: 25,
                paddingBottom: 5,
                backgroundColor: "#0F3A5B",
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                alignSelf: "center",
                shadowOffset: {
                  width: 0,
                  height: 3
                },
                shadowOpacity: 0.29,
                shadowRadius: 4.65,
                elevation: 7,
                marginBottom: 20
              }}
            >
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 15
                }}
              >
                No,Back home
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

export default LogOut;
