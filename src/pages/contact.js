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
  KeyboardAvoidingView,
  CheckBox
} from "react-native";
import { Rating, AirbnbRating } from "react-native-ratings";

export default class contactUs extends Component {
  state = {
    Name: "",
    Email: "",
    lastIndex: -1,
    Massage: "",
    rating: 0
  };
  async componentDidMount() {
    let { lastIndex } = this.state;
    const snapshot = await firebase
      .firestore()
      .collection("FeedBacks")
      .get();
    const collection = {};
    snapshot.forEach(doc => {
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
        rating: rating
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
        colors={["#fff", "#fff"]}
        // start={[50, 0]}
        // end={[0, 50]}
        style={{
          flex: 1,

          alignContent: "center",
          justifyContent: "center"
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center"
          }}
        >
          <ScrollView
            style={{ width: "100%", padding: 5 }}
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
          >
            <KeyboardAvoidingView
              styles={{
                flex: 1,

                alignItems: "center"
              }}
              behavior="padding"
              enabled
            >
              <View style={{ marginTop: "20%" }}>
                <Input
                  onChangeText={text => {
                    this.setState({ Name: text });
                  }}
                  returnKeyType="done"
                  placeholder="Name"
                  defaultValue={Name}
                />

                <Input
                  onChangeText={text => {
                    this.setState({ Email: text });
                  }}
                  returnKeyType="done"
                  placeholder="Email"
                  defaultValue={Email}
                  marginTop={20}
                />

                <Input
                  onChangeText={text => {
                    this.setState({ Massage: text });
                  }}
                  returnKeyType="done"
                  placeholder="Massage"
                  defaultValue={Massage}
                  marginTop={20}
                />
                <AirbnbRating
                  style={{ marginTop: 50 }}
                  count={5}
                  defaultRating={0}
                  size={20}
                  onFinishRating={value => this.setState({ rating: value })}
                />
                <TouchableOpacity
                  onPress={this.addFeedback}
                  style={{
                    marginTop: 80,
                    height: 50,
                    width: "90%",
                    borderStyle: "solid",
                    borderRadius: 50,
                    paddingBottom: 5,
                    backgroundColor: "#0F3A5B",
                    justifyContent: "center",
                    alignItems: "center",

                    alignSelf: "center",

                    marginBottom: 20
                  }}
                >
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 20
                    }}
                  >
                    Send Your FeedBack{" "}
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </LinearGradient>
    );
  }
}
