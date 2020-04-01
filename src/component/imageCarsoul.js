import React from "react";
import Carousel, {
  Pagination,
  ParallaxImage
} from "react-native-snap-carousel";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity
} from "react-native";
import Constants from "expo-constants";

const { width: screenWidth } = Dimensions.get("window");
export default class ImageCarousel extends React.Component {
  state = {
    images: [
      { url: require("../assets/Gaza1.jpg") },
      { url: require("../assets/Gaza3.jpg") },
      { url: require("../assets/couch-.jpg") }
    ],
    activeSlide: 0,
    viewport: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height
    }
  };
  _renderItem = ({ item, index }, parallaxProps) => {
    console.log(item.item);
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={item.url}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
      </View>
    );
  };
  get pagination() {
    const { activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={3}
        activeDotIndex={activeSlide}
        containerStyle={{ backgroundColor: "white" }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: "black"
        }}
        // inactiveDotStyle={
        //   {
        //     // Define styles for inactive dots here
        //   }
        // }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }
  render() {
    return (
      <View
        style={{ marginTop: 100 }}
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
          layoutCardOffset={`3`}
          ref={c => {
            this._carousel = c;
          }}
          data={this.state.images}
          renderItem={this._renderItem}
          sliderWidth={this.state.viewport.width}
          itemWidth={this.state.viewport.width - 60}
          sliderHeight={screenWidth}
          onSnapToItem={index => this.setState({ activeSlide: index })}
          hasParallaxImages={true}
        />
        {this.pagination}
        <View style={styles.fixToText}>
          <TouchableOpacity style={styles.buttonLeft} onPress={this.onPress}>
            <Text style={styles.buttonText}> Sign Up </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRight} onPress={this.onPress}>
            <Text style={styles.buttonText}> Log In </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
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
    fontFamily: "monospace"
  }
});
