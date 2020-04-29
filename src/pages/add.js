import React, { Component } from "react";
import firebase from "firebase";
import RadioGroup, { Radio } from "react-native-radio-input";
import { LinearGradient } from "expo-linear-gradient";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as ImagePicker from "expo-image-picker";
import { YellowBox } from 'react-native';
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
  CheckBox
} from "react-native";
export default class Add extends Component {
                 state = {
                   type: "",
                   address: "",
                   city: "",
                   area: "",
                   street: "",
                   price: 100,
                   space: 0,
                   roomNum: 1,
                   downtown: false,
                   overLookingSea: false,
                   selectedFile: null,
                   downloadURLs: [],
                   avatarSource: null,
                   markerPosition: {
                     lat: 31.3547,
                     lng: 34.3088
                   },
                 };
                 componentDidMount=()=>{
                   YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);
                 }
                 getChecked = value => {
                   if (value == 0) {
                     this.setState({ downtown: !this.state.downtown });
                   } else {
                     this.setState({
                       overLookingSea: !this.state.overLookingSea
                     });
                     // alert(this.state.overLookingSea);
                   }
                   console.log("1" + this.state.downtown);
                   console.log("2" + this.state.overLookingSea);
                   // value = our checked value
                 };

                 handelChoosePhoto = async () => {
                   //TO OPEN CAMERA
                   //let res = await ImagePicker.launchCameraAsync();
                   //TO SELLECT EXIST IMAGE ON UR DEVICE:D
                   let res = await ImagePicker.launchImageLibraryAsync();

                   if (!res.cancelled) {
                     this.uploadImage(res.uri,"test")
                       .then(() => {
                         alert("success");
                       })
                       .catch(error => {
                         alert(error);
                       });
                   }
                 };

                 uploadImage = async (uri, imageName) => {
                   const response = await fetch(uri);
                   const blob = await response.blob();
                   var ref = firebase
                     .storage()
                     .ref()
                     .child("images/" + imageName);
                   return ref.put(blob);
                 };

                 addPropertyToMap = () => {
                   //getting user's detials
                   const { currentUser } = this.context;

                   let { UserDetials } = this.state;
                   firebase
                     .firestore()
                     .collection("users")
                     .doc(currentUser.uid)
                     .get()
                     .then(querySnapshot => {
                       UserDetials = querySnapshot.data();
                       this.setState({ UserDetials });
                     });
                   console.log(this.state.UserDetials);
                   let user = firebase.auth().currentUser;
                   let name, email, phone;

                   if (user != null) {
                     name = user.name;
                     email = user.email;
                     phone = user.mobile;
                   }
                   let { downloadURLs } = this.state;

                   var db = firebase.firestore();

                   db.collection("estates")
                     .add({
                       type: this.state.type,
                       name: name,
                       email: email,
                       phone: phone,
                       city: this.state.city,
                       street: this.state.street,
                       price: this.state.price,
                       space: this.state.space,
                       roomNum: this.state.roomNum,
                       downtown: this.state.downtown,
                       overLookingSea: this.state.overLookingSea,
                       url: downloadURLs,
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
                     area,
                     street,
                     price,
                     space,
                     roomNum,
                     downtown,
                     overLookingSea,
                     selectedFile,
                     downloadURLs
                   } = this.state;
                   return (
                     <LinearGradient
                       colors={["#0F3A5B", "#af9a7d"]}
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
                         <Text
                           style={{
                             marginTop: 40,
                             color: "#fff",
                             fontSize: 40
                           }}
                         >
                           Add Property
                         </Text>
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
                                 alignSelf: "center"
                               }}
                               onChangeText={text => {
                                 this.setState({ city: text });
                               }}
                               returnKeyType="done"
                               placeholder="City"
                               placeholderTextColor="#fff"
                               defaultValue={city}
                             />
                             <MapView
                               style={{ width: 100, height: 100 }}
                               initialRegion={{
                                 latitude: 31.3547,
                                 longitude: 34.3088,
                                 latitudeDelta: 0.0922,
                                 longitudeDelta: 0.0421

                               }}>
                               <Marker draggable
                                 coordinate={this.state.markerPosition}

                                 onDragEnd={(e) => {
                                   console.log('marker moves', e.nativeEvent.coordinate)
                                   this.setState({ markerPosition: { lat: e.nativeEvent.coordinate.lat, lng: e.nativeEvent.coordinate.lng } })
                                 }
                                 }
                               />
                             </MapView>
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
                                 alignSelf: "center"
                               }}
                               onChangeText={text => {
                                 this.setState({ area: text });
                               }}
                               returnKeyType="done"
                               placeholder="Area"
                               placeholderTextColor="#fff"
                               defaultValue={area}
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
                                 alignSelf: "center"
                               }}
                               onChangeText={text => {
                                 this.setState({ address: text });
                               }}
                               returnKeyType="done"
                               placeholder="Address"
                               placeholderTextColor="#fff"
                               defaultValue={address}
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
                                 alignSelf: "center"
                               }}
                               onChangeText={text => {
                                 this.setState({ price: text });
                               }}
                               returnKeyType="done"
                               placeholder="Price"
                               placeholderTextColor="#fff"
                               defaultValue={price}
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
                                 alignSelf: "center"
                               }}
                               onChangeText={text => {
                                 this.setState({ space: text });
                               }}
                               returnKeyType="done"
                               placeholder="Space"
                               placeholderTextColor="#fff"
                               defaultValue={space}
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
                                 alignSelf: "center"
                               }}
                               onChangeText={text => {
                                 this.setState({ type: text });
                               }}
                               returnKeyType="done"
                               placeholder="write either buying or renting"
                               placeholderTextColor="#fff"
                               defaultValue={type}
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
                                 alignSelf: "center"
                               }}
                               onChangeText={text => {
                                 this.setState({ roomNum: text });
                               }}
                               returnKeyType="done"
                               placeholder="Number Of Rooms"
                               placeholderTextColor="#fff"
                               defaultValue={roomNum}
                             />
                             <View style={{ marginLeft: 130, marginTop: 25 }}>
                               <RadioGroup getChecked={() => this.getChecked}>
                                 <Radio
                                   iconName={"lens"}
                                   label={"Over Looking Sea"}
                                   value={0}
                                 />
                                 <Radio
                                   iconName={"lens"}
                                   label={"Downtown"}
                                   value={1}
                                 />
                               </RadioGroup>
                             </View>
                             <TouchableOpacity
                               style={{
                                 marginTop: 20,
                                 marginBottom: 20,
                                 width: "100%",
                                 alignItems: "center"
                               }}
                               onPress={() => this.handelChoosePhoto()}
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
                                   width: 150,
                                   padding: 18
                                 }}
                               >
                                 chooes a pic
                               </Text>
                            </TouchableOpacity>

                             <GooglePlacesAutocomplete
                               placeholder="Search"
                               minLength={2} // minimum length of text to search
                               autoFocus={false}
                               returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                               keyboardAppearance={"light"} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                               listViewDisplayed="auto" // true/false/undefined
                               fetchDetails={true}
                               renderDescription={row => row.description} // custom description render
                               onPress={(data, details = null) => {
                                 // 'details' is provided when fetchDetails = true
                                 console.log(data, details);
                               }}
                               getDefaultValue={() => ""}
                               query={{
                                 // available options: https://developers.google.com/places/web-service/autocomplete
                                 key: "AIzaSyA2loHLnnXg7c8A9LzTpkJ_N-kKvYlmO4s",
                                 language: "en", // language of the results
                                 types: "(cities)" // default: 'geocode'
                               }}
                               styles={{
                                 textInputContainer: {
                                   width: "100%",
                                   height:"100%"
                                 },
                                 description: {
                                   fontWeight: "bold"
                                 },
                                 predefinedPlacesDescription: {
                                   color: "#1faadb"
                                 }
                               }}
                               currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                               currentLocationLabel="Current location"
                               nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                               GoogleReverseGeocodingQuery={
                                 {
                                   // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                                 }
                               }
                               GooglePlacesSearchQuery={{
                                 // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                                 rankby: "distance",
                                 type: "cafe"
                               }}
                               GooglePlacesDetailsQuery={{
                                 // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                                 fields: "formatted_address"
                               }}
                               filterReverseGeocodingByTypes={[
                                 "locality",
                                 "administrative_area_level_3"
                               ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                               //    predefinedPlaces={[homePlace, workPlace]}
                               debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                             />
                           </KeyboardAvoidingView>
                         </ScrollView>
                       </View>
                     </LinearGradient>
                   );
                 }
               }
