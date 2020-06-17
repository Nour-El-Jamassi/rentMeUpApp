import React from "react";
import { Text, TouchableOpacity, View, Dimensions } from "react-native";
import * as firebase from "firebase";
import Modal from "react-native-modal";
import { LinearGradient } from "expo-linear-gradient";

const LogOut = ({ navigation }) => {
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        console.log("sign out ");
        alert("sign out successfully");
      })
      .then(() => {
        navigation.navigate("Auth");
      })
      .catch(function(error) {
        console.log("An error happened.", error);
      });
  };
  const cancel = () => {
    navigation.navigate("Home");
  };
  return (
    <LinearGradient
      colors={["#0F3A5B", "#fff"]}
      // start={[50, 0]}
      // end={[0, 50]}
      style={{
        flex: 1,

        alignContent: "center",
        justifyContent: "center"
      }}
    >
      <Text
        style={{
          color: "#000",
          fontSize: 25,
          marginBottom: 50,
          alignSelf:"center"
        }}
      >
        Are You Sure?
      </Text>

      <View style={{ flexDirection: "row", alignSelf:"center" }}>
        <TouchableOpacity
          onPress={logout}
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
          onPress={cancel}
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
    </LinearGradient>
  );
};

export default LogOut;
