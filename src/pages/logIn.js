import React, { Component } from "react";
import firebase from "firebase";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView
} from "react-native";
// const signImg = require("../../assets/images/SignBack.png");
export default class LogIn extends Component {
  state = { email: "tes144@gmail.com", password: "123456789" };

  Login = () => {
    const { navigation } = this.props;
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        navigation.navigate("welcome");
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        alert(errorCode, errorMessage);
      });
  };

  handelChangeEmail = e => {
    this.setState({
      email: e.target.value
    });
  };
  handelChangePassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  render() {
    let { email, password } = this.state;
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
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            flex: 1
          }}
          enabled
        >
          <ScrollView
            style={{
              display: "flex"
              //   flex: 1
            }}
          >
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                zIndex: 20
                // flex: 1
              }}
            >
              <View
                style={{
                  marginTop: "40%",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  //   width: 154,
                  //   height: 36,
                  color: "#ffffff",
                  //   fontFamily: "Tajawal",
                  fontSize: 30
                }}
              >
                <Text
                  style={{
                    color: "#ffffff",
                    //   fontFamily: "Tajawal",
                    fontSize: 30,
                    zIndex: 200
                  }}
                >
                  Log In
                </Text>
              </View>
            </View>

            <View
              style={{
                marginTop: "80%",
                flex: 1,
                padding: 30
              }}
            >
              <View>
                <TextInput
                  style={{
                    // marginTop: "15%",
                    height: "38%",
                    width: "100%",
                    borderColor: "#af9a7d",
                    borderStyle: "solid",
                    borderRadius: 50,
                    borderWidth: 2,
                    padding: 10
                  }}
                  placeholder="Email"
                  defaultValue={email}
                  onChange={this.handelChangeEmail}
                ></TextInput>
                <TextInput
                  style={{
                    marginTop: "6%",
                    height: "38%",
                    width: "100%",
                    borderColor: "#af9a7d",
                    borderStyle: "solid",
                    borderRadius: 50,
                    borderWidth: 2,
                    padding: 10
                  }}
                  placeholder="Password"
                  defaultValue={password}
                  onChange={this.handelChangePassword}
                ></TextInput>

                <TouchableOpacity
                  onPress={this.Login}
                  style={{
                    marginTop: "6%",
                    height: "38%",
                    width: "100%",
                    //borderColor: "#dd80d4",
                    borderStyle: "solid",
                    borderRadius: 50,
                    // borderWidth: 2,
                    paddingBottom: 10,
                    // /paddingTop: 5,
                    backgroundColor: "#0F3A5B",
                    // flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 3
                    },
                    shadowOpacity: 0.29,
                    shadowRadius: 4.65,

                    elevation: 7
                  }}
                >
                  <Text
                    style={{
                      color: "#ffffff",
                      //   fontFamily: "Tajawal",
                      fontSize: 20
                    }}
                  >
                    Log In
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("SignIn")}
                  style={{
                    marginTop: "1%",
                    height: "38%",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      color: "#ffffff",
                      //   fontFamily: "Tajawal",
                      fontSize: 20
                    }}
                  >
                    Don't Have An Account?
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    );
  }
}
