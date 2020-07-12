import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform
} from "react-native";
import Constants from "expo-constants";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Carousel, {
  Pagination,
  ParallaxImage
} from "react-native-snap-carousel";
const image1 = require("../../assets/Gaza3.jpg");
const image3 = require("../../assets/Gaza1.jpg");
const image2 = require("../../assets/couch-.jpg");
const image4 = require("../../assets/kitchen.jpg");

const { width: screenWidth } = Dimensions.get("window");
console.disableYellowBox = true;
export default class ImageCarousel extends React.Component {
  static navigationOptions = {
    header: null,
    drawerIcon: (
      <Image
        source={require("../assets/logo1.png")}
        style={{ height: 50, width: 50 }}
      />
    )
  };
  state = {
    images: [
      image1,
      image2,
      image3,
      image4
      // "https://i.ytimg.com/vi/piFtNmi4iDA/maxresdefault.jpg",
      // "https://pbs.twimg.com/media/BNgJ-T3CYAIA3AK.jpg",
      // "https://2.bp.blogspot.com/-HEHHQXMY_GM/U6yfkEYoysI/AAAAAAAASU0/7xAUx25ymkg/s1600/beauty+of+gaza+(9).jpg",
      // "https://scontent.fgza9-1.fna.fbcdn.net/v/t31.0-0/p640x640/23674841_2194137887295286_7135516817051193639_o.jpg?_nc_cat=108&_nc_sid=730e14&_nc_ohc=54NJBQp2cOkAX8Ahs7D&_nc_ht=scontent.fgza9-1.fna&_nc_tp=6&oh=56e0642b525da34c9bae67ba5d8aa912&oe=5ECFD9E0"
    ],
    activeSlide: 0,
    viewport: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height
    }
  };
  _renderItem = ({ item, index }, parallaxProps) => {
    console.log("item", item, "index", index);
    return (
      <View>
        <Image
          source={item}
          style={{ height: "100%", width: "206%", alignSelf: "center" }}
        />
      </View>
    );
  };
  get pagination() {
    const { activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={this.state.images.length}
        activeDotIndex={activeSlide}
        containerStyle={{
          backgroundColor: "transparent",
          marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
          color: "#fff"
        }}
        dotStyle={{
          width: 12,
          height: 12,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: "#af9a7d"
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }
  render() {
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
          style={{ marginTop: Constants.statusBarHeight, flex: 1 }}
          onLayout={() => {
            this.setState({
              viewport: {
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height
              }
            });
          }}
        >
          <Text
            style={{
              marginTop: 40,
              color: "#0F3A5B",
              fontSize: 40,
              alignSelf: "center",
              fontFamily: "Podkova"
            }}
          >
            Welocme
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: "#af9a7d",
              fontWeight: "bold",
              alignSelf: "center",
              letterSpacing: 3,
              fontFamily: "Tajawal",
              marginTop: 30,
              fontFamily: "Podkova"
            }}
          >
            Find Your Next Best Home!
          </Text>
          <Carousel
            autoplay={true}
            layout={"tinder"}
            layoutCardOffset={4}
            ref={c => {
              this._carousel = c;
            }}
            data={this.state.images}
            renderItem={this._renderItem}
            sliderWidth={this.state.viewport.width}
            itemWidth={200}
            // itemHeight={100}
            // sliderHeight={screenWidth}
            onSnapToItem={index => this.setState({ activeSlide: index })}
            hasParallaxImages={true}
            containerCustomStyle={{
              flex: 1,
              alignSelf: "center",
              marginTop: 40
              // height:100
            }}
          />
          {this.pagination}

          <View style={styles.fixToText}>
            <TouchableOpacity
              style={styles.buttonRight}
              onPress={() => this.props.navigation.navigate("Map")}
            >
              <Text style={styles.buttonText2}>Map</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonLeft}
              onPress={() => this.props.navigation.navigate("Add")}
            >
              <Text style={styles.buttonText}> Add Property</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  fixToText: {
    marginTop: 30,
    // flexDirection: "row",
    justifyContent: "space-between"
  },
  buttonLeft: {
    height: 50,

    borderStyle: "solid",
    borderRadius: 50,
    paddingBottom: 4,
    borderWidth: 2,
    borderColor: "#0F3A5B85",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 20,
    shadowOffset: {
      width: 1,
      height: 5
    },
    width: "80%",

    elevation: 7
  },
  buttonRight: {
    height: 50,
    width: "80%",
    borderStyle: "solid",
    borderRadius: 50,
    paddingBottom: 4,
    backgroundColor: "#0F3A5B",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    alignSelf: "center",
    shadowOffset: {
      width: 1,
      height: 5
    },

    elevation: 7
  },
  buttonText: {
    //fontFamily: "monospace",
    color: "#0F3A5B",
    fontSize: 20,
    alignSelf: "center"
  },
  buttonText2: {
    //fontFamily: "monospace",
    color: "#fff",
    fontSize: 20,
    alignSelf: "center"
  }
});
