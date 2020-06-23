import React, { Component } from "react";
import firebase from "firebase";
import { LinearGradient } from "expo-linear-gradient";
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
export default class SignUp extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    name: "",
    email: "",
    password: "",
    mobile: ""
  };

  addUser = () => {
    const { name, email, password, mobile } = this.state;
    console.log(name, email, password, mobile);
    const db = firebase.firestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);

        // ...
      });

    setTimeout(() => {
      console.log("wait!");
    }, 7000);
    setTimeout(() => {
      console.log("wait!");
    }, 7000);

    // console.log("user", user.uid);
    try {
      const user = firebase.auth().currentUser;
      db.collection("users")
        .doc(user.uid)
        .set({ email: user.email, uid: user.uid, mobile: mobile, name: name })
        .then(() => {
          this.props.navigation.navigate("Map");
        });
    } catch (error) {
      alert(error);
    }
  };

  render() {
    let { name, email, password, mobile } = this.state;
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
              <Image
                style={{ marginTop: 30 }}
                source={require("../assets/logo1.png")}
              />
              <View
                style={{
                  // marginTop: "30%",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  color: "#ffffff",
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
              <View
                style={{
                  marginTop: "85%"
                }}
              >
                <Input
                  returnKeyType="done"
                  placeholder="Name"
                  defaultValue={name}
                  onChangeText={text => {
                    this.setState({ name: text });
                  }}
                />
                <Input
                  keyboardType="email-address"
                  returnKeyType="done"
                  placeholder="Email"
                  defaultValue={email}
                  onChangeText={text => {
                    this.setState({ email: text });
                  }}
                />

                <Input
                  secureTextEntry
                  returnKeyType="done"
                  placeholder="Password"
                  defaultValue={password}
                  onChangeText={text => {
                    this.setState({ password: text });
                  }}
                />
                <Input
                  placeholder="Mobile"
                  defaultValue={mobile}
                  onChangeText={text => {
                    this.setState({ mobile: text });
                  }}
                />

                <TouchableOpacity
                  onPress={this.addUser}
                  style={{
                    marginTop: "10%",
                    height: 55,
                    width: "100%",
                    borderStyle: "solid",
                    borderRadius: 50,
                    paddingTop: 10,
                    backgroundColor: "#0F3A5B",
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 1,
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
                      fontSize: 20,
                      marginBottom: 35
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
