import React, { Component } from "react";
import firebase from "firebase";
import { LinearGradient } from "expo-linear-gradient";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input } from "react-native-elements";
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
  static navigationOptions = {
    header: null
  };
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
        colors={["#fff", "#fff"]}
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
          <ScrollView>
           
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
              <Image style={{marginTop:30}} source={require("../assets/logo1.png")} />
              <View
                style={{
                  marginTop: "10%",
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
                    color: "#0F3A5B",
                    fontFamily: "Podkova",
                    fontSize: 40,
                    zIndex: 200
                  }}
                >
                  Login
                </Text>
              </View>
            </View>

            <View
              style={{
                marginTop: "90%",
                flex: 1,
                padding: 30
              }}
            >
              <View>
                <Input
                  placeholder="Email"
                  defaultValue={email}
                  onChange={this.handelChangeEmail}
                />
                <Input
                  placeholder="Password"
       
                  defaultValue={password}
                  onChange={this.handelChangePassword}
                />
               

                <TouchableOpacity
                  onPress={this.Login}
                  style={{
                    marginTop: "6%",
                    height: 55,
                    width: "100%",
                    borderStyle: "solid",
                    borderRadius: 50,
                    paddingBottom: 10,
                    backgroundColor: "#0F3A5B",
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
                    login
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("SignIn")}
                  style={{
                    marginTop: 80,
                    // height: 30,
                    width: "100%",
                    justifyContent: "center",

                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      color: "#0F3A5B",
                      //   fontFamily: "Tajawal",

                      fontSize: 17
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
