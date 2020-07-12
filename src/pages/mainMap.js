//ToDo:
// flatlist does npt autscroll to index 3 saying it's out of index while it does exist
import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
  PermissionsAndroid,
  Dimensions,
  TouchableOpacity,
  AppRegistry,
  ScrollView,
  ImageBackground,
  TouchableWithoutFeedback
} from "react-native";

import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Modal from "react-native-modal";
// import Dropdown from "react-native-modal-dropdown";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  AntDesign
} from "@expo/vector-icons";

import { EstateContext } from "../../Provider/estateProvider";

import * as theme from "../../theme";

const { Marker } = MapView;
const { Callout } = MapView;
const { height, width } = Dimensions.get("screen");

class EstateMap extends Component {
  // static navigationOptions = {
  //   drawerIcon: ({ tintColor }) => (
  //     <AntDesign name="home" size={24} color="black" />
  //   )
  // };
  static contextType = EstateContext;
  state = {
    active: null,
    activeModal: null,
    latitude: null,
    longitude: null,
    isMapReady: false,
    iconLoaded: false
  };

  onMapLayout = () => {
    this.setState({ isMapReady: true });
  };

  renderestate = item => {
    // console.log("item", item);

    return (
      <TouchableWithoutFeedback
        key={`estate-${item.index}`}
        onPress={() => this.setState({ active: item.index })}
      >
        <View style={[styles.estate, styles.shadow]}>
          <View style={styles.hours}>
            {/* <Text style={styles.hoursTitle}>
              x {item.roomNum} {item.type}
            </Text> */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={{ uri: item.url[0] }}
                style={{ width: 70, height: 70 }}
              />
              <Text style={{ color: theme.COLORS.gray }}>
                {" "}
                x {item.roomNum} {item.type}
              </Text>
            </View>
          </View>
          <View style={styles.estateInfoContainer}>
            <View style={styles.estateInfo}>
              <View style={styles.estateIcon}>
                <Ionicons
                  name="ios-pricetag"
                  size={theme.SIZES.icon}
                  color={theme.COLORS.gray}
                />
                <Text style={{ marginLeft: theme.SIZES.base }}>
                  {" "}
                  ${item.price}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.buy}
              onPress={() => this.setState({ activeModal: item })}
            >
              <Text
                style={{
                  color: "white",
                  marginTop: 15,
                  fontWeight: "bold"
                }}
              >
                See more
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  renderEstates = () => {
    const { sortedEstates: estates } = this.context;

    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        getItemLayout={(data, index) => {
          return { length: 70, index, offset: 400 * index };
        }}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        style={styles.Estates}
        data={estates}
        extraData={this.state}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item }) => this.renderestate(item)}
        ref={flatlist => {
          this._flatlist = flatlist;
        }}
      />
    );
  };

  renderImages(item, index) {
    return (
      <Image
        key={`Image ${index}`}
        source={{ uri: item }}
        style={{
          flex: 1,
          flexDirection: "row",
          backgroundColor: "silver",
          padding: 5,
          borderRadius: 5,
          height: 200,
          width: 200,
          margin: 3,
          resizeMode: "cover"
        }}
      />
    );
  }

  renderModal() {
    const { activeModal } = this.state;
    // console.log(activeModal);
    if (!activeModal) return null;

    return (
      <Modal
        isVisible
        useNativeDriver
        style={styles.modalContainer}
        backdropColor={theme.COLORS.overlay}
        onBackButtonPress={() => this.setState({ activeModal: null })}
        onBackdropPress={() => this.setState({ activeModal: null })}
        onSwipeComplete={() => this.setState({ activeModal: null })}
      >
        <View style={styles.modal}>
          <View>
            <Text style={{ fontSize: theme.SIZES.font * 1.5 }}>
              {activeModal.type}
            </Text>
          </View>
          <View style={{ paddingVertical: theme.SIZES.base }}>
            <Text
              style={{
                color: theme.COLORS.gray,
                fontSize: theme.SIZES.font * 1.1,
                marginBottom: "5%",
                marginTop: 10
              }}
            >
              {activeModal.phone}
            </Text>
          </View>

          <View style={styles.modalInfo}>
            <View style={[styles.estateIcon, { justifyContent: "flex-start" }]}>
              <FontAwesome
                name="dollar"
                size={theme.SIZES.icon * 1.1}
                color="black"
              />
              <Text style={{ fontSize: theme.SIZES.icon * 1.15 }}>
                {activeModal.price}
              </Text>
            </View>
            <View style={[styles.estateIcon, { justifyContent: "flex-start" }]}>
              <Ionicons
                name="ios-star"
                size={theme.SIZES.icon * 1.1}
                color={"gold"}
              />
              <Text style={{ fontSize: theme.SIZES.icon * 1.15 }}>
                {" "}
                {activeModal.roomNum}
              </Text>
            </View>
            <View style={[styles.estateIcon, { justifyContent: "flex-start" }]}>
              <MaterialCommunityIcons
                name="ruler-square"
                size={24}
                color="black"
              />

              <Text style={{ fontSize: theme.SIZES.icon * 1.15 }}>
                {" "}
                {activeModal.space}m
              </Text>
            </View>
            <View style={[styles.estateIcon, { justifyContent: "flex-start" }]}>
              <Ionicons
                name="ios-bed"
                size={theme.SIZES.icon * 1.3}
                color="black"
              />
              <Text style={{ fontSize: theme.SIZES.icon * 1.15 }}>
                {" "}
                {activeModal.roomNum}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: "5%" }}>
            <Text>More Images</Text>

            <FlatList
              horizontal
              pagingEnabled
              scrollEnabled
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              snapToAlignment="center"
              style={styles.modalImages}
              data={activeModal.url}
              keyExtractor={(item, index) => `${index}`}
              renderItem={({ item, index }) => this.renderImages(item, index)}
            />
          </View>

          <View>
            <TouchableOpacity style={styles.payBtn}>
              <Text style={styles.payText}>Message: {activeModal.phone}</Text>
              <FontAwesome
                name="angle-right"
                size={theme.SIZES.icon * 1.75}
                color={theme.COLORS.white}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
  onMarkerClick = estate => {
    // console.log("onclick", estate.index);

    this._map.animateToRegion({
      latitude: estate.lat,
      longitude: estate.lng,
      latitudeDelta: 0.09,
      longitudeDelta: 0.035
    });
    // console.log("current index", estate.index);
    this._flatlist.scrollToItem({ animated: true, item: estate });
  };
  render() {
    const { latitude, longitude } = this.state;
    const { sortedEstates: estates } = this.context;

    const ImageSrc = require("../../assets/Webp.net-resizeimage.png");
    // if (latitude) {
    return (
      <View style={styles.container}>
        <MapView
          ref={map => {
            this._map = map;
          }}
          initialRegion={{
            latitude: 31.3547,
            longitude: 34.3088,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
        >
          <View>
            <TouchableOpacity
              style={styles.buttonLeft}
              onPress={() => this.props.navigation.navigate("Filter")}
            >
              <Text style={styles.filterText}>Filter</Text>
              <FontAwesome
                name="filter"
                size={theme.SIZES.icon * 1.75}
                color={theme.COLORS.white}
              />
            </TouchableOpacity>
          </View>
          {estates.map((estate, index) => (
            <Marker
              key={`name ${index}`}
              coordinate={{ latitude: estate.lat, longitude: estate.lng }}
              image={ImageSrc}
              onPress={() => this.onMarkerClick(estate)}
            >
              <Callout>
                <TouchableWithoutFeedback
                  onPress={() => this.setState({ active: estate.index })}
                >
                  <View style={styles.marker}>
                    <Text style={styles.markerPrice}>${estate.price}</Text>
                  </View>
                </TouchableWithoutFeedback>
              </Callout>
            </Marker>
          ))}
        </MapView>
        {this.renderEstates()}
        {this.renderModal()}
      </View>
    );
  }
}
export default EstateMap;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.COLORS.white
  },

  map: {
    flex: 3
  },
  Estates: {
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    paddingBottom: theme.SIZES.base * 2
  },
  modalImages: {
    width: 400
  },
  estate: {
    flexDirection: "row",
    backgroundColor: theme.COLORS.white,
    borderRadius: 6,
    padding: theme.SIZES.base,
    marginHorizontal: theme.SIZES.base * 2,
    width: width - 24 * 2
  },
  buy: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: theme.SIZES.base * 1.5,
    paddingVertical: theme.SIZES.base,
    backgroundColor: "#af9a7d",
    borderRadius: 6
  },
  buyTotal: {
    flex: 1,
    justifyContent: "space-evenly"
  },
  buyTotalPrice: {
    color: theme.COLORS.white,
    fontSize: theme.SIZES.base * 1.5,
    fontWeight: "600",
    paddingLeft: theme.SIZES.base / 4
  },
  buyBtn: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "flex-end"
  },
  marker: {
    flexDirection: "row",
    backgroundColor: theme.COLORS.white,
    borderRadius: theme.SIZES.base * 2,
    paddingVertical: 12,
    paddingHorizontal: theme.SIZES.base * 2,
    borderWidth: 1,
    borderColor: theme.COLORS.white
  },
  markerPrice: { color: theme.COLORS.red, fontWeight: "bold" },
  markerStatus: { color: theme.COLORS.gray },
  shadow: {
    shadowColor: theme.COLORS.black,
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  active: {
    borderColor: theme.COLORS.red
  },
  hours: {
    flex: 1,
    flexDirection: "column",
    marginLeft: theme.SIZES.base / 2,
    justifyContent: "space-evenly"
  },
  hoursTitle: {
    fontSize: theme.SIZES.text,
    fontWeight: "500"
  },
  hoursDropdown: {
    borderRadius: theme.SIZES.base / 2,
    borderColor: theme.COLORS.overlay,
    borderWidth: 1,
    padding: theme.SIZES.base,
    marginRight: theme.SIZES.base / 2
  },
  hoursDropdownOption: {
    padding: 5,
    fontSize: theme.SIZES.font * 0.8
  },
  hoursDropdownStyle: {
    marginLeft: -theme.SIZES.base,
    paddingHorizontal: theme.SIZES.base / 2,
    marginVertical: -(theme.SIZES.base + 1)
  },
  estateInfoContainer: { flex: 1.5, flexDirection: "row" },
  estateInfo: {
    justifyContent: "space-evenly",
    marginHorizontal: theme.SIZES.base * 1.5
  },
  estateIcon: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  modalContainer: {
    margin: 0,
    justifyContent: "flex-end"
  },
  modal: {
    flexDirection: "column",
    height: height * 0.75,
    padding: theme.SIZES.base * 2,
    backgroundColor: theme.COLORS.white,
    borderTopLeftRadius: theme.SIZES.base,
    borderTopRightRadius: theme.SIZES.base
  },
  modalInfo: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: theme.SIZES.base,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: theme.COLORS.overlay,
    borderBottomColor: theme.COLORS.overlay
  },

  modalHours: {
    paddingVertical: height * 0.011
  },
  modalHoursDropdown: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: theme.SIZES.base
  },
  payBtn: {
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.SIZES.base * 1,
    backgroundColor: "#af9a7d",
    marginTop: theme.SIZES.base * 2
  },
  payText: {
    fontWeight: "600",
    fontSize: theme.SIZES.base * 1,
    color: "white"
  },

  buttonLeft: {
    backgroundColor: "#af9a7d99",
    padding: 10,
    marginLeft: 8,
    // position: "absolute",
    // right: 50,
    // top: 80,
    borderRadius: 10,
    marginTop: 20,
    marginRight: 10,
    // position: "absolute", //use absolute position to show button on top of the map
    top: "20%", //for center align
    alignSelf: "flex-end",
    alignItems: "center"
  },

  filterText: {
    fontWeight: "bold",
    fontSize: theme.SIZES.base * 1,
    color: "white",
    //fontFamily: "monospace",
    letterSpacing: 1.5
  }
});
AppRegistry.registerComponent("MainMap", () => MainMap);
