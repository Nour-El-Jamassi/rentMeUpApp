import React, { Component } from "react";
import firebase from "firebase";
import RadioGroup, { Radio } from "react-native-radio-input";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { YellowBox } from "react-native";
import { Input } from "react-native-elements";
import MapView from "react-native-maps";
const { Marker } = MapView;

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
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
export default class Add extends Component {
  static navigationOptions = {
    drawerIcon: (
      <Ionicons name="md-add-circle-outline" size={24} color="black" />
    )
  };

  constructor(props) {
    super(props);

    this.state = {
      type: "",
      address: "",
      city: "",
      area: "",
      street: "",
      price: "",
      space: "",
      roomNum: "",
      downtown: false,
      overLookingSea: false,

      downloadURLs: [],

      markerPosition: {
        lat: 31.3547,
        lng: 34.3088
      }
    };
    console.log(" ============= add ");
  }
  componentDidMount = () => {
    YellowBox.ignoreWarnings(["VirtualizedLists should never be nested"]);
  };
  getChecked = value => {
    if (value == 0) {
      this.setState({ downtown: true });
    } else {
      this.setState({
        overLookingSea: true
      });
      // alert(this.state.overLookingSea);
    }
    console.log("1" + this.state.downtown);
    console.log("2" + this.state.overLookingSea);
    // value = our checked value
  };
  onMarkerDrag = e => {
    console.log("marker moves =============== ");
    console.log("marker moves", e.nativeEvent.coordinate);
    let { markerPosition } = this.state;
    this.setState({
      markerPosition: {
        lat: e.nativeEvent.coordinate.latitude,
        lng: e.nativeEvent.coordinate.longitude
      }
    });
    console.log("markerPosition", markerPosition);
  };

  handelChoosePhoto = async () => {
    let { downloadURLs } = this.state;
    //TO OPEN CAMERA
    //let res = await ImagePicker.launchCameraAsync();
    //TO SELLECT EXIST IMAGE ON UR DEVICE:D
    let res = await ImagePicker.launchImageLibraryAsync();

    if (!res.cancelled) {
      console.log("res", res);

      this.uploadImage(res.uri, `${res.type + res.width}`)
        .then(() => {
          console.log("success");
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  uploadImage = async (uri, imageName) => {
    let { downloadURLs } = this.state;
    const response = await fetch(uri);
    console.log("respond", response);
    const blob = await response.blob();
    console.log("bolb", blob);

    var uploadTask = firebase
      .storage()
      .ref()
      .child("images/" + imageName)
      .put(blob);
    uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
      console.log("File available at", downloadURL);
      downloadURLs.push(downloadURL);
      this.setState({ downloadURLs });
    });
  };

  addPropertyToMap = () => {
    //getting user's detials
    //  const { currentUser } = this.context;

    //  let { UserDetials } = this.state;
    //  firebase
    //    .firestore()
    //    .collection("users")
    //    .doc(currentUser.uid)
    //    .get()
    //    .then(querySnapshot => {
    //      UserDetials = querySnapshot.data();
    //      this.setState({ UserDetials });
    //    });
    //  console.log(this.state.UserDetials);
    //  let user = firebase.auth().currentUser;
    //  let name, email, phone;

    //  if (user != null) {
    //    name = currentUser.name;
    //    email = UserDetials.email;
    //    phone = UserDetials.mobile;
    //  }
    let { downloadURLs } = this.state;

    var db = firebase.firestore();

    db.collection("estates")
      .add({
        type: this.state.type,
        name: "Ali",
        email: "aliAi@gmail.com",
        phone: "059943234",
        city: this.state.city,
        street: this.state.street,
        price: this.state.price,
        space: this.state.space,
        roomNum: this.state.roomNum,
        downtown: this.state.downtown,
        overLookingSea: this.state.overLookingSea,
        url: this.state.downloadURLs,
        lat: this.state.markerPosition.lat,
        lng: this.state.markerPosition.lng
      })
      .then(() => {
        navigation.navigate("Home");
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    const {
      type,
      address,
      city,
      street,
      price,
      space,
      roomNum,
      downtown,
      overLookingSea,
      downloadURLs
    } = this.state;
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
                //  flex: 1,

                alignItems: "center"
              }}
              behavior="padding"
              enabled
            >
              <MapView
                style={{
                  width: "95%",
                  height: 200,
                  alignSelf: "center",
                  marginBottom: 40,
                  marginTop: 20
                }}
                initialRegion={{
                  latitude: 31.3547,
                  longitude: 34.3088,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421
                }}
              >
                <Marker
                  draggable
                  coordinate={{
                    latitude: this.state.markerPosition.lat,
                    longitude: this.state.markerPosition.lng
                  }}
                  onPress={e => this.onMarkerDrag(e)}
                  // onDragEnd={e => this.onMarkerDrag(e)}
                />
                {/* onMarkerDrag={e => console.log("e =====", e)} */}
              </MapView>

              <Input
                onChangeText={text => {
                  this.setState({ city: text });
                }}
                returnKeyType="done"
                placeholder="City"
                defaultValue={city}
              />

              <Input
                onChangeText={text => {
                  this.setState({ street: text });
                }}
                returnKeyType="done"
                placeholder="Street"
                defaultValue={street}
              />

              <Input
                returnKeyType="done"
                onChangeText={text => {
                  this.setState({ address: text });
                }}
                placeholder="Address"
                defaultValue={address}
              />

              <Input
                onChangeText={text => {
                  this.setState({ price: text });
                }}
                returnKeyType="done"
                placeholder="Price"
                defaultValue={price}
              />

              <Input
                onChangeText={text => {
                  this.setState({ space: text });
                }}
                returnKeyType="done"
                placeholder="Space"
                defaultValue={space}
              />

              <Input
                onChangeText={text => {
                  this.setState({ type: text });
                }}
                returnKeyType="done"
                placeholder="write either buying or renting"
                defaultValue={type}
              />

              <Input
                onChangeText={text => {
                  this.setState({ roomNum: text });
                }}
                returnKeyType="done"
                placeholder="Number Of Rooms"
                defaultValue={roomNum}
              />
              <View style={{ marginLeft: 130, marginTop: 25 }}>
                <RadioGroup getChecked={() => this.getChecked}>
                  <Radio
                    iconName={"lens"}
                    label={"Over Looking Sea"}
                    value={0}
                  />
                  <Radio iconName={"lens"} label={"Downtown"} value={1} />
                </RadioGroup>
              </View>
              <TouchableOpacity
                style={{
                  marginTop: 30,
                  height: 50,
                  width: "90%",
                  borderStyle: "solid",
                  borderRadius: 50,
                  paddingBottom: 5,
                  borderColor: "#0F3A5B",
                  borderWidth: 2,
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
                onPress={() => this.handelChoosePhoto()}
              >
                <Text
                  style={{
                    color: "#0F3A5B",
                    fontSize: 20
                  }}
                >
                  chooes a pic
                </Text>
              </TouchableOpacity>
              <View></View>
              <TouchableOpacity
                onPress={this.addPropertyToMap}
                style={{
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
                  Add Property
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </LinearGradient>
    );
  }
}
