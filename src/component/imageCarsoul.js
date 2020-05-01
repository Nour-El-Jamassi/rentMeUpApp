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
export default class ImageCarousel extends React.Component {
  static navigationOptions = {
    // title: "Reservation",
    header: null
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
        <Image source={item} style={{height:"100%",width:"206%",alignSelf:"center"}} />
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
          backgroundColor: 'transparent',
          marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
          color:"#fff"
        }}
        dotStyle={{
          width: 10,
          height: 10,
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
              color: "#fff",
              fontSize: 40,
              alignSelf: "center"
            }}
          >
            Welocme
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: "#af9a7d",
              fontWeight: "bold",
              marginLeft: 45,
              letterSpacing: 3,
              marginBottom: 10,
              marginTop: 10
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
              marginTop: 50,
              // height:100 
            }}
          />
          {this.pagination}

          <View style={styles.fixToText}>
            <TouchableOpacity
              style={styles.buttonLeft}
              onPress={() => this.props.navigation.navigate("Add")}
            >
              <Text style={styles.buttonText}> Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonRight}
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <Text style={styles.buttonText}>Map</Text>
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
    flexDirection: "row",
    justifyContent: "space-between"
  },
  buttonLeft: {
    marginTop: 30,
    height: 50,
    width: 130,
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
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginBottom: 40,
    marginLeft: 15
  },
  buttonRight: {
    marginTop: 30,
    height: 50,
    width: 130,
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
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginBottom: 40,
    marginRight: 15
  },
  buttonText: {
    //fontFamily: "monospace",
    color: "#ffffff",
    fontSize: 20
  }
});
