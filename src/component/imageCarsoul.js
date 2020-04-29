import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
import Constants from "expo-constants";
import React from "react";
import Carousel, {
  Pagination,
  ParallaxImage
} from "react-native-snap-carousel";
// const image1 = require("../assets/Gaza3.jpg");
// const image3 = require("../assets/Gaza1.jpg");
// const image2 = require("../assets/couch-.jpg");
// const image4 = require("../assets/kitchen.jpg");

const { width: screenWidth } = Dimensions.get("window");
export default class ImageCarousel extends React.Component {
  state = {
    images: [
      "https://i.ytimg.com/vi/piFtNmi4iDA/maxresdefault.jpg",
      "https://pbs.twimg.com/media/BNgJ-T3CYAIA3AK.jpg",
      "https://2.bp.blogspot.com/-HEHHQXMY_GM/U6yfkEYoysI/AAAAAAAASU0/7xAUx25ymkg/s1600/beauty+of+gaza+(9).jpg",
      "https://scontent.fgza9-1.fna.fbcdn.net/v/t31.0-0/p640x640/23674841_2194137887295286_7135516817051193639_o.jpg?_nc_cat=108&_nc_sid=730e14&_nc_ohc=54NJBQp2cOkAX8Ahs7D&_nc_ht=scontent.fgza9-1.fna&_nc_tp=6&oh=56e0642b525da34c9bae67ba5d8aa912&oe=5ECFD9E0"
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
      <View
        style={{
          flex: 1,
          position: "relative",
          width: screenWidth - 60,
          height: screenWidth - 60,
          elevation: 10
        }}
      >
        <ParallaxImage
          source={{ uri: item }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          showSpinner={true}
          {...parallaxProps}
        />
      </View>
    );
  };
  get pagination() {
    const { activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={this.state.images}
        activeDotIndex={activeSlide}
        containerStyle={{ backgroundColor: "white" }}
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
          itemWidth={this.state.viewport.width - 60}
          sliderHeight={screenWidth}
          // onSnapToItem={index => this.setState({ activeSlide: index })}
          hasParallaxImages={true}
          containerCustomStyle={{ flex: 1 }}
        />
        {/* {this.pagination} */}

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
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    width: screenWidth - 20,
    height: screenWidth / 3,
    backgroundColor: "black",
    margin: 10,
    borderRadius: 10,
    shadowColor: "#af9a7d",
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5
  },
  textView: {
    position: "absolute",
    bottom: 10,
    margin: 10,
    left: 5
  },
  itemTitle: {
    color: "white",
    fontSize: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
    fontWeight: "bold",
    marginBottom: 5
  },
  itemDescription: {
    color: "white",
    fontSize: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5
  },

  Image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10
  },

  fixToText: {
    marginTop: 80,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  buttonLeft: {
    backgroundColor: "#af9a7d",
    padding: 10,
    marginLeft: 8
  },
  buttonRight: {
    backgroundColor: "#af9a7d",
    padding: 10,
    marginRight: 8
  },
  buttonText: {
    // fontFamily: "monospace"
  }
});
