import React, { Component } from "react";
import firebase from "firebase";
import RadioGroup, { Radio } from "react-native-radio-input";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { YellowBox  } from 'react-native';
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
export default class Add extends Component {
  constructor(props) {
  super(props);

  this.state = {

            
    
                   type: "",
                   address: "",
                   city: "",
                   area: "",
                   street: "",
                   price: '100',
                   space: '0',
                   roomNum: '1',
                   downtown: false,
                   overLookingSea: false,
            
                   downloadURLs: [],
                
                   markerPosition: {
                     lat: 31.3547,
                     lng: 34.3088
                   },
                 }}
                 componentDidMount=()=>{
                   YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);
                 }
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
                 onMarkerDrag =(e) => {
                  console.log(
                    "marker moves",
                    e.nativeEvent.coordinate
                  );
                 let {markerPosition} = this.state;
                  this.setState({
                    markerPosition: {
                      lat: e.nativeEvent.coordinate.latitude,
                      lng: e.nativeEvent.coordinate.longitude
                    }
                  });
                  console.log('markerPosition', markerPosition)
                }

                 handelChoosePhoto = async () => {
                   let {downloadURLs}  = this.state;
                   //TO OPEN CAMERA
                   //let res = await ImagePicker.launchCameraAsync();
                   //TO SELLECT EXIST IMAGE ON UR DEVICE:D
                   let res = await ImagePicker.launchImageLibraryAsync();

                   if (!res.cancelled) {
                    console.log('res' , res)
                   
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
                  let { downloadURLs }  = this.state;
                  const response = await fetch(uri);
                console.log('respond' , response)
                  const blob = await response.blob();
                  console.log('bolb' , blob)
                 
                   var uploadTask = firebase
                     .storage()
                     .ref()
                     .child("images/" + imageName).put(blob)
                     uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                      alert('File available at', downloadURL);
                      downloadURLs.push(downloadURL)
                      this.setState({downloadURLs})
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
                       phone: '059943234',
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
                             <MapView
                               style={{
                                 width: "100%",
                                 height: 200,
                                 alignSelf: "center"
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
                                 onDragEnd={(e) => this.onMarkerDrag(e)}
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
                                 this.setState({ city: text });
                               }}
                               returnKeyType="done"
                               placeholder="City"
                               placeholderTextColor="#fff"
                               defaultValue={city}
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
                                 this.setState({ street: text });
                               }}
                               returnKeyType="done"
                               placeholder="Street"
                               placeholderTextColor="#fff"
                               defaultValue={street}
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
                                 //  marginBottom: 20,
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
                             <View>
                       
                    
                      </View>
                             <TouchableOpacity
                               onPress={this.addPropertyToMap}
                               style={{
                                 marginTop: 30,
                                 height: 50,
                                 width: "90%",
                                 borderStyle: "solid",
                                 borderRadius: 50,
                                 paddingBottom: 5 ,
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
