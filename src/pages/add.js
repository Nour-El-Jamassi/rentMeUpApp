import React, { Component } from "react";
import firebase from "firebase";
import RadioGroup, { Radio } from "react-native-radio-input";
import { LinearGradient } from "expo-linear-gradient";

import FileUploader from "react-firebase-file-uploader";
// import ImagePicker from "react-native-image-crop-picker";

// import { ImagePicker } from "expo-image-picker";
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
// import { NODATA } from "dns";

let data = new FormData();

// let ImagePicker = NativeModules.ImageCropPicker;
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
                   avatarSource: null
                 };

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
                 //  // openImagePicker = () => {
                 //  //   ImagePicker.openPicker({
                 //  //     multiple: true,
                 //  //     waitAnimationEnd: false,
                 //  //     includeExif: true,
                 //  //     forceJpg: ture,
                 //  //     maxFiles: 5,
                 //  //     compressImageQuality: 0.8,
                 //  //     madiaType: "photo"
                 //  //   })
                 //  //     .then(images => {
                 //  //       Image.map((item, index) => {
                 //  //         console.log(JSON.stringify(item));
                 //  //       });
                 //  //     })
                 //  //     .catch(e => alert(e));
                 //  // };

                 //  options = {
                 //    title: "Select Avatar",
                 //    customButtons: [
                 //      { name: "fb", title: "Choose Photo from Facebook" }
                 //    ],
                 //    storageOptions: {
                 //      skipBackup: true,
                 //      path: "images"
                 //    }
                 //  };

                 //  openImagePicker = async () => {
                 //    const result = await ImagePicker.launchImageLibraryAsync({
                 //      allowsEditing: true,
                 //      aspect: [4, 3]
                 //    });

                 //    if (!result.cancelled) {
                 //      this.onChangeText("pictureUrl", result.uri);
                 //    }
                 //  };

                 handleUploadError = error => {
                   this.setState({ isUploading: false });
                   console.error(error);
                 };
                 handleUploadSuccess = filename => {
                   firebase.storage()
                     .ref("images")
                     .child(filename)
                     .getDownloadURL()
                     .then(url => {
                       this.setState({ avatarURL: url });
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
                               flex: 1,

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
                             <FileUploader
                               className="uploader"
                               accept="image/*"
                               name="avatar"
                               placeholder="select image"
                               randomizeFilename
                               storageRef={firebase.storage().ref("images")}
                               onUploadError={this.handleUploadError}
                               onUploadSuccess={this.handleUploadSuccess}
                             />
                           </KeyboardAvoidingView>
                         </ScrollView>
                       </View>
                     </LinearGradient>
                   );
                 }
               }
