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
export default class SignUp extends Component {
  state = {
    name: "testtt",
    email: "tes144@gmail.com",
    password: "123456789",
    mopile: "98754321"
  };

  signUp = () => {
    let { name, email, password, mopile } = this.state;
    const db = firebase.firestore();
    console.log(this.state.email);
    const { navigation } = this.props;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)

      .then(function() {
        db.collection("users")

          .add({
            name: name,
            mopile: mopile
          })
          .then(function() {
            navigation.navigate("login");
            // Update successful.
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            alert(errorMessage);
          });
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        alert(errorMessage);
      });
  };
  render() {
    let { name, email, password, mopile } = this.state;
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
                  marginTop: "30%",
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
                  Sign Up
                </Text>
              </View>
            </View>

            <View
              style={{
                // marginTop: "20%",
                flex: 1,
                padding: 30
              }}
            >
              <View>
                <TextInput
                  style={{
                    borderColor: "#af9a7d",
                    borderStyle: "solid",
                    borderRadius: 50,
                    borderWidth: 2,
                    height: "8%",
                    width: "100%",
                    marginTop: "80%",
                    padding: 10
                  }}
                  returnKeyType="done"
                  placeholder="Name"
                  defaultValue={name}
                  onChangeText={text => {
                    this.setState({ name: text });
                  }}
                ></TextInput>
                <TextInput
                  style={{
                    marginTop: "6%",
                    height: "8%",
                    width: "100%",
                    borderColor: "#af9a7d",
                    borderStyle: "solid",
                    borderRadius: 50,
                    borderWidth: 2,
                    padding: 10
                  }}
                  keyboardType="email-address"
                  returnKeyType="done"
                  placeholder="Email"
                  defaultValue={email}
                  onChangeText={text => {
                    this.setState({ email: text });
                  }}
                ></TextInput>
                <TextInput
                  style={{
                    marginTop: "6%",
                    height: "8%",
                    width: "100%",
                    borderColor: "#af9a7d",
                    borderStyle: "solid",
                    borderRadius: 50,
                    borderWidth: 2,
                    padding: 10
                  }}
                  secureTextEntry
                  returnKeyType="done"
                  placeholder="Password"
                  defaultValue={password}
                  onChangeText={text => {
                    this.setState({ password: text });
                  }}
                ></TextInput>

                <TextInput
                  style={{
                    marginTop: "6%",
                    height: "8%",
                    width: "100%",
                    borderColor: "#af9a7d",
                    borderStyle: "solid",
                    borderRadius: 50,
                    borderWidth: 2,
                    padding: 10
                    // placeholderColor:"#fff"
                  }}
                  placeholder="Mobile"
                  defaultValue={mopile}
                  onChangeText={text => {
                    this.setState({ mopile: text });
                  }}
                ></TextInput>

                <TouchableOpacity
                  onPress={this.signUp}
                  style={{
                    marginTop: "6%",
                    height: "8%",
                    width: "100%",
                    //borderColor: "#dd80d4",
                    borderStyle: "solid",
                    borderRadius: 50,
                    // borderWidth: 2,
                    // padding: 2,
                    paddingTop: 10,
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
                    Sign Up
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
