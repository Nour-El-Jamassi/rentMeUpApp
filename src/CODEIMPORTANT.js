
  // cleanupImages() {
  //   ImagePicker.clean().then(() => {
  //     console.log('removed tmp images from tmp directory');
  //   }).catch(e => {
  //     alert(e);
  //   });
  // }
//pickmultiplePhotos
// pickMultiple() {
//   ImagePicker.openPicker({
//     multiple: true,
//     waitAnimationEnd: false,
//     sortOrder: 'desc',
//     includeExif: true,
//     forceJpg: true,
//   }).then(images => {
//     this.setState({
//       image: null,
//       images: images.map(i => {
//         console.log('received image', i);
//         return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
//       })
//     });
//   }).catch(e => alert(e));
// }
// renderHours(id) {
//     const { hours } = this.state;
//     const availableHours = [1, 2, 3, 4, 5, 6];

//     return (
//       <Dropdown
//         defaultIndex={0}
//         options={availableHours}
//         style={styles.hoursDropdown}
//         defaultValue={`0${hours[id]}:00` || "01:00"}
//         dropdownStyle={styles.hoursDropdownStyle}
//         onSelect={(index, value) => this.handleHours(index, value)}
//         renderRow={option => (
//           <Text style={styles.hoursDropdownOption}>{`0${option}:00`}</Text>
//         )}
//         renderButtonText={option => `0${option}:00`}
//       />
//     );
//   }
{
  /* <View style={styles.modalHours}>
<Text style={{ textAlign: "center", fontWeight: "500" }}>
  Choose your Booking Period:
</Text>
<View style={styles.modalHoursDropdown}>
  {this.renderHours(activeModal.id)}
  <Text style={{ color: theme.COLORS.gray }}>months</Text>
</View>
</View> */
}

// .card{
//   width: 20%;
//   display: inline-block;
//   box-shadow: 2px 2px 20px black;
//   border-radius: 5px;
//   margin: 2%;
//  }

// .image img{
// width: 100%;
// border-top-right-radius: 5px;
// border-top-left-radius: 5px;

// }

// .title{

// text-align: center;
// padding: 10px;

// }

// h1{
// font-size: 20px;
// }

// .des{
// padding: 3px;
// text-align: center;

// padding-top: 10px;
//      border-bottom-right-radius: 5px;
// border-bottom-left-radius: 5px;
// }
// button{
// margin-top: 40px;
// margin-bottom: 10px;
// background-color: white;
// border: 1px solid black;
// border-radius: 5px;
// padding:10px;
// }
// button:hover{
// background-color: black;
// color: white;
// transition: .5s;
// cursor: pointer;
// }
// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   Dimensions,
//   PermissionsAndroid,
//   AppRegistry,
//   TouchableOpacity,
//   TouchableWithoutFeedback
// } from "react-native";
// import MapView, { PROVIDER_GOOGLE, Callout } from "react-native-maps";
// import Modal from "react-native-modal";
// const { height, width } = Dimensions.get("screen");
// import { FontAwesome, Ionicons } from "@expo/vector-icons";
// import Carousel from "react-native-snap-carousel";
// import * as theme from "../../theme";
// const { Marker } = MapView;
// export default class MainMap extends React.Component {
//   state = {
//     markers: [],
//     latitude: null,
//     longitude: null,
//     active: null,
//     activeModal: null
//   };

//   async componentDidMount() {
//     this.requestLOCATIONPermission();
//     console.log("getting permissions");
//   }
//   requestLOCATIONPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: "Rent Me Up",
//           message: "We need to access your current location to display the map",
//           buttonNeutral: "Ask Me Later",
//           buttonNegative: "Cancel",
//           buttonPositive: "OK"
//         }
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         navigator.geolocation.getCurrentPosition(
//           ({ coords: { latitude, longitude } }) =>
//             this.setState({ latitude, longitude }),
//           error => console.log("Error:", error)
//         );
//       } else {
//         console.log("location permission denied");
//       }
//     } catch (err) {
//       console.warn(err);
//     }
//   };

//   _renderItem = item => {
//     console.log("item", item);
//     return (
//       <TouchableWithoutFeedback
//         key={`estate-${item.index}`}
//         onPress={() => this.setState({ active: item.index })}
//       >
//         <View style={[styles.estate, styles.shadow]}>
//           <View style={styles.hours}>
//             <Text style={styles.hoursTitle}>
//               x {item.item.roomNum} {item.item.city}
//             </Text>
//             <View style={{ alignItems: "center" }}>
//               <Text style={{ color: theme.COLORS.gray }}>
//                 {item.item.space}
//               </Text>
//             </View>
//           </View>
//           <View style={styles.estateInfoContainer}>
//             <View style={styles.estateInfo}>
//               <View style={styles.estateIcon}>
//                 <Ionicons
//                   name="ios-pricetag"
//                   size={theme.SIZES.icon}
//                   color={theme.COLORS.gray}
//                 />
//                 <Text style={{ marginLeft: theme.SIZES.base }}>
//                   {" "}
//                   ${item.item.price}
//                 </Text>
//               </View>
//               <View style={styles.estateIcon}>
//                 <Ionicons
//                   name="ios-star"
//                   size={theme.SIZES.icon}
//                   color={theme.COLORS.gray}
//                 />
//                 <Text style={{ marginLeft: theme.SIZES.base }}>4</Text>
//               </View>
//             </View>
//             <TouchableOpacity
//               style={styles.buy}
//               onPress={() => this.setState({ activeModal: item.item })}
//             >
//               <View style={styles.buyTotal}>
//                 <View style={{ flexDirection: "row", alignItems: "center" }}>
//                   <FontAwesome
//                     name="dollar"
//                     size={theme.SIZES.icon * 1.25}
//                     color={theme.COLORS.white}
//                   />
//                   <Text style={styles.buyTotalPrice}>{item.item.price}</Text>
//                 </View>
//                 <Text style={{ color: theme.COLORS.white }}>
//                   {item.item.price}x{item.item.roomNum} hrs
//                 </Text>
//               </View>
//               <View style={styles.buyBtn}>
//                 <FontAwesome
//                   name="angle-right"
//                   size={theme.SIZES.icon * 1.75}
//                   color={theme.COLORS.white}
//                 />
//               </View>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </TouchableWithoutFeedback>
//       // <View style={styles.cards}>
//       //   <Text style={styles.cardsCity}>{item.item.city}</Text>
//       //   <Image source={{ uri: item.item.url[0] }} style={styles.cardsImage} />
//       // </View>
//     );
//   };

//   onCarouselItemChanges = (index, estate) => {
//     console.log("markers", this.state.markers);
//     let location = estate[index];
//     this._map.animateToRegion({
//       latitude: location.lat,
//       longitude: location.lng,
//       latitudeDelta: 0.09,
//       longitudeDelta: 0.035 //compute how much space it should show on the screen
//     });
//   };
//   onMarkerClick = (location, index) => {
//     console.log("onclick", estate);

//     this._map.animateToRegion({
//       latitude: location.lat,
//       longitude: location.lng,
//       latitudeDelta: 0.09,
//       longitudeDelta: 0.035
//     });
//     this._carousel.snapToItem(index);
//   };
//   renderModal() {
//     const { activeModal } = this.state;

//     if (!activeModal) return null;

//     return (
//       <Modal
//         isVisible
//         useNativeDriver
//         style={styles.modalContainer}
//         backdropColor={theme.COLORS.overlay}
//         onBackButtonPress={() => this.setState({ activeModal: null })}
//         onBackdropPress={() => this.setState({ activeModal: null })}
//         onSwipeComplete={() => this.setState({ activeModal: null })}
//       >
//         <View style={styles.modal}>
//           <View>
//             <Text style={{ fontSize: theme.SIZES.font * 1.5 }}>
//               {activeModal.city}
//             </Text>
//           </View>
//           <View style={{ paddingVertical: theme.SIZES.base }}>
//             <Text
//               style={{
//                 color: theme.COLORS.gray,
//                 fontSize: theme.SIZES.font * 1.1
//               }}
//             >
//               {activeModal.street}
//             </Text>
//           </View>
//           <View style={styles.modalInfo}>
//             <View style={[styles.estateIcon, { justifyContent: "flex-start" }]}>
//               <Ionicons
//                 name="ios-pricetag"
//                 size={theme.SIZES.icon * 1.1}
//                 color={theme.COLORS.gray}
//               />
//               <Text style={{ fontSize: theme.SIZES.icon * 1.15 }}>
//                 {" "}
//                 ${activeModal.price}
//               </Text>
//             </View>
//             <View style={[styles.estateIcon, { justifyContent: "flex-start" }]}>
//               <Ionicons
//                 name="ios-star"
//                 size={theme.SIZES.icon * 1.1}
//                 color={theme.COLORS.gray}
//               />
//               <Text style={{ fontSize: theme.SIZES.icon * 1.15 }}> 4</Text>
//             </View>
//             <View style={[styles.estateIcon, { justifyContent: "flex-start" }]}>
//               <Ionicons
//                 name="ios-pin"
//                 size={theme.SIZES.icon * 1.1}
//                 color={theme.COLORS.gray}
//               />
//               <Text style={{ fontSize: theme.SIZES.icon * 1.15 }}>
//                 {" "}
//                 {activeModal.price}km
//               </Text>
//             </View>
//             <View style={[styles.estateIcon, { justifyContent: "flex-start" }]}>
//               <Ionicons
//                 name="ios-car"
//                 size={theme.SIZES.icon * 1.3}
//                 color={theme.COLORS.gray}
//               />
//               <Text style={{ fontSize: theme.SIZES.icon * 1.15 }}>
//                 {" "}
//                 {activeModal.roomNum}/{activeModal.roomNum}
//               </Text>
//             </View>
//           </View>
//           <View>
//             <TouchableOpacity style={styles.payBtn}>
//               <Text style={styles.payText}>
//                 Proceed to pay ${activeModal.price}
//               </Text>
//               <FontAwesome
//                 name="angle-right"
//                 size={theme.SIZES.icon * 1.75}
//                 color={theme.COLORS.white}
//               />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     );
//   }
// <Image
//   source={require("../../assets/house-logo.png")}
//   onLoad={() => this.forceUpdate()}
//   style={{ width: 20, height: 20 }}
// >
//   <Text style={{ width: 0, height: 0 }}>
//     {Math.random()}
//   </Text>
// </Image> */}
// {/* <Image
//           source={require("../../assets/homeIcon.png")}
//           onLoadEnd={() => {
//             if (!this.state.iconLoaded)
//               this.setState({ iconLoaded: true });
//           }}
//         /> */}
//   {/* <ImageBackground
//           style={{ ...Styles }}
//           source={ImageSrc}
//           onLoad={() => this.forceUpdate()}
//         >
//           <Text style={{ width: 0, height: 0 }}>{Math.random()}</Text>
//         </ImageBackground>
//   render() {
//     const { latitude, longitude } = this.state;
//     const { estates } = this.props;
//     console.log("estates", estates);
//     if (latitude) {
//       return (
//         <View style={styles.container}>
//           <MapView
//             showsUserLocation
//             style={styles.Map}
//             ref={map => {
//               this._map = map;
//             }}
//             initialRegion={{
//               latitude,
//               longitude,
//               latitudeDelta: 0.0922,
//               longitudeDelta: 0.0421
//             }}
//             provider={PROVIDER_GOOGLE}
//           >
//             {estates.map((marker, index) => {
//               <Marker
//                 key={`marker-${index}`}
//                 coordinate={{ latitude: marker.lat, longitude: marker.lng }}
//                 ref={ref => (this.state.markers[index] = ref)}
//                 onPress={() => this.onMarkerClick(marker, index)}
//               >
//                 <Callout>
//                   <Text>{marker.type}</Text>
//                 </Callout>
//               </Marker>;
//             })}
//           </MapView>

//           <Carousel
//             ref={c => {
//               this._carousel = c;
//             }}
//             containerCustomStyle={styles.Estates}
//             data={this.props.estates}
//             renderItem={this._renderItem}
//             sliderWidth={Dimensions.get("window").width}
//             itemWidth={200}
//             onSnapToItem={index => this.onCarouselItemChanges(index, estate)}
//             removeClippedSubviews={false}
//           />
//           {this.renderModal()}
//         </View>
//       );
//     } else {
//       return (
//         <View>
//           <Text> Permissions Needed</Text>
//         </View>
//       );
//     }
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.COLORS.white
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "center",
//     paddingHorizontal: theme.SIZES.base * 2,
//     paddingTop: theme.SIZES.base * 2.5,
//     paddingBottom: theme.SIZES.base * 1.5
//   },
//   headerTitle: {
//     color: theme.COLORS.gray
//   },
//   headerLocation: {
//     fontSize: theme.SIZES.font,
//     fontWeight: "500",
//     paddingVertical: theme.SIZES.base / 3
//   },
//   Map: {
//     flex: 3
//   },
//   carousel: {
//     position: "absolute",
//     right: 0,
//     left: 0,
//     bottom: 0,
//     paddingBottom: 12 * 2
//   },
//   cards: {
//     backgroundColor: "black",
//     height: 200,
//     width: 200,
//     padding: 24,
//     borderRadius: 24
//   },
//   cardsImage: {
//     height: 120,
//     width: 200,
//     bottom: 0,
//     position: "absolute",
//     borderBottomLeftRadius: 24,
//     borderBottomRightRadius: 24
//   },
//   cardsCity: {
//     color: "white",
//     fontSize: 22,
//     alignSelf: "center"
//   },
//   Estates: {
//     position: "absolute",
//     right: 0,
//     left: 0,
//     bottom: 0,
//     paddingBottom: theme.SIZES.base * 2
//   },
//   estate: {
//     flexDirection: "row",
//     backgroundColor: theme.COLORS.white,
//     borderRadius: 6,
//     padding: theme.SIZES.base,
//     marginHorizontal: theme.SIZES.base * 2,
//     width: width - 24 * 2
//   },
//   buy: {
//     flex: 1,
//     flexDirection: "row",
//     paddingHorizontal: theme.SIZES.base * 1.5,
//     paddingVertical: theme.SIZES.base,
//     backgroundColor: theme.COLORS.red,
//     borderRadius: 6
//   },
//   buyTotal: {
//     flex: 1,
//     justifyContent: "space-evenly"
//   },
//   buyTotalPrice: {
//     color: theme.COLORS.white,
//     fontSize: theme.SIZES.base * 2,
//     fontWeight: "600",
//     paddingLeft: theme.SIZES.base / 4
//   },
//   buyBtn: {
//     flex: 0.5,
//     justifyContent: "center",
//     alignItems: "flex-end"
//   },
//   marker: {
//     flexDirection: "row",
//     backgroundColor: theme.COLORS.white,
//     borderRadius: theme.SIZES.base * 2,
//     paddingVertical: 12,
//     paddingHorizontal: theme.SIZES.base * 2,
//     borderWidth: 1,
//     borderColor: theme.COLORS.white
//   },
//   markerPrice: { color: theme.COLORS.red, fontWeight: "bold" },
//   markerStatus: { color: theme.COLORS.gray },
//   shadow: {
//     shadowColor: theme.COLORS.black,
//     shadowOffset: {
//       width: 0,
//       height: 6
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 4
//   },
//   active: {
//     borderColor: theme.COLORS.red
//   },
//   hours: {
//     flex: 1,
//     flexDirection: "column",
//     marginLeft: theme.SIZES.base / 2,
//     justifyContent: "space-evenly"
//   },
//   hoursTitle: {
//     fontSize: theme.SIZES.text,
//     fontWeight: "500"
//   },
//   hoursDropdown: {
//     borderRadius: theme.SIZES.base / 2,
//     borderColor: theme.COLORS.overlay,
//     borderWidth: 1,
//     padding: theme.SIZES.base,
//     marginRight: theme.SIZES.base / 2
//   },
//   hoursDropdownOption: {
//     padding: 5,
//     fontSize: theme.SIZES.font * 0.8
//   },
//   hoursDropdownStyle: {
//     marginLeft: -theme.SIZES.base,
//     paddingHorizontal: theme.SIZES.base / 2,
//     marginVertical: -(theme.SIZES.base + 1)
//   },
//   estateInfoContainer: { flex: 1.5, flexDirection: "row" },
//   estateInfo: {
//     justifyContent: "space-evenly",
//     marginHorizontal: theme.SIZES.base * 1.5
//   },
//   estateIcon: {
//     flexDirection: "row",
//     justifyContent: "space-between"
//   },
//   modalContainer: {
//     margin: 0,
//     justifyContent: "flex-end"
//   },
//   modal: {
//     flexDirection: "column",
//     height: height * 0.75,
//     padding: theme.SIZES.base * 2,
//     backgroundColor: theme.COLORS.white,
//     borderTopLeftRadius: theme.SIZES.base,
//     borderTopRightRadius: theme.SIZES.base
//   },
//   modalInfo: {
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//     paddingVertical: theme.SIZES.base,
//     borderTopWidth: 1,
//     borderBottomWidth: 1,
//     borderTopColor: theme.COLORS.overlay,
//     borderBottomColor: theme.COLORS.overlay
//   },

//   payBtn: {
//     borderRadius: 6,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: theme.SIZES.base * 1.5,
//     backgroundColor: "red"
//   },
//   payText: {
//     fontWeight: "600",
//     fontSize: theme.SIZES.base * 1.5,
//     color: "white"
//   }
// });
// AppRegistry.registerComponent("MainMap", () => MainMap);
