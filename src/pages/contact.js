import React, { Component } from "react";
import firebase from "firebase";
import { LinearGradient } from "expo-linear-gradient";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  CheckBox,
} from "react-native";
import { Rating, AirbnbRating } from "react-native-ratings";

export default class contactUs extends Component {
  state = {
    Name: "",
    Email: "",
    lastIndex: -1,
    Massage: "",
    rating: 0,
  };
  async componentDidMount() {
    let { lastIndex } = this.state;
    const snapshot = await firebase
      .firestore()
      .collection("FeedBacks")
      .get();
    const collection = {};
    snapshot.forEach((doc) => {
      collection[doc.id] = doc.data();
      let newIndex = collection[doc.id].index;
      if (newIndex > this.state.lastIndex) {
        this.setState({ lastIndex: newIndex });
      }
      console.log("if", this.state.lastIndex);
    });
  }
  addFeedback = () => {
    const { Name, Email, Massage, rating, lastIndex } = this.state;
    const db = firebase.firestore();

    console.log(Name, Email, Massage, rating);

    db.collection("FeedBacks")
      .add({
        name: Name,
        email: Email,
        index: lastIndex + 1,
        massage: Massage,
        rating: rating,
      })

      .then(function(docRef) {
        alert("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        alert("Error adding document: ", error);
      });
  };

  render() {
    const { Name, Email, Massage, rating } = this.state;
    return (
      <LinearGradient
        colors={["#0F3A5B", "#af9a7d"]}
        // start={[50, 0]}
        // end={[0, 50]}
        style={{
          flex: 1,

          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              marginTop: 40,
              color: "#fff",
              fontSize: 40,
            }}
          >
            Contact Us
          </Text>
          <ScrollView
            style={{ width: "100%", padding: 5 }}
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
          >
            <KeyboardAvoidingView
              styles={{
                flex: 1,

                alignItems: "center",
              }}
              behavior="padding"
              enabled
            >
              <TextInput
                style={{
                  marginTop: 30,
                  borderColor: "#af9a7d",
                  borderStyle: "solid",
                  borderRadius: 50,
                  borderWidth: 2,
                  height: 50,
                  width: "90%",
                  margin: 10,
                  padding: 10,
                  fontSize: 20,
                  alignSelf: "center",
                }}
                onChangeText={(text) => {
                  this.setState({ Name: text });
                }}
                returnKeyType="done"
                placeholder="Name"
                placeholderTextColor="#fff"
                defaultValue={Name}
              />
              <TextInput
                style={{
                  marginTop: 30,
                  borderColor: "#af9a7d",
                  borderStyle: "solid",
                  borderRadius: 50,
                  borderWidth: 2,
                  height: 50,
                  width: "90%",
                  margin: 10,
                  padding: 10,
                  fontSize: 20,
                  alignSelf: "center",
                }}
                onChangeText={(text) => {
                  this.setState({ Email: text });
                }}
                returnKeyType="done"
                placeholder="Email"
                placeholderTextColor="#fff"
                defaultValue={Email}
              />

              <TextInput
                style={{
                  marginTop: 30,
                  borderColor: "#af9a7d",
                  borderStyle: "solid",
                  borderRadius: 50,
                  borderWidth: 2,
                  height: 50,
                  width: "90%",
                  margin: 10,
                  padding: 10,
                  fontSize: 20,
                  alignSelf: "center",
                }}
                onChangeText={(text) => {
                  this.setState({ Massage: text });
                }}
                returnKeyType="done"
                placeholder="Massage"
                placeholderTextColor="#fff"
                defaultValue={Massage}
              />
              <AirbnbRating
                count={5}
                defaultRating={0}
                size={20}
                onFinishRating={(value) => this.setState({ rating: value })}
              />

              <TouchableOpacity
                style={{
                  marginTop: 40,
                  marginBottom: 20,
                  width: "100%",
                  alignItems: "center",
                }}
                onPress={this.addFeedback}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    fontSize: 20,
                    color: "white",
                    borderColor: "#fff",
                    borderStyle: "solid",
                    borderRadius: 25,
                    borderWidth: 2,
                    width: 220,
                    padding: 18,
                  }}
                >
                  send your FeedBack
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </LinearGradient>
    );
  }
}
