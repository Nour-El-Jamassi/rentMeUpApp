//ToDo:
//Add ratings
//improve styling
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
import { EstateContext } from "../../Provider/estateProvider";
import Constants from "expo-constants";

const { width: screenWidth } = Dimensions.get("window");
export default class Feedbacks extends React.Component {
  static contextType = EstateContext;
  state = {
    activeSlide: 0,
    viewport: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height
    }
  };
  _renderItem = ({ item, index }, parallaxProps) => {
    console.log("items", item, "index", index);
    return (
      <View
        style={{
          position: "relative",
          width: screenWidth - 60,
          height: screenWidth - 60,
          elevation: 10
        }}
      >
        <ParallaxImage
          source={require("../../assets/userPic.png")}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          showSpinner={true}
          {...parallaxProps}
        />

        <Text style={styles.name}>{item.name}</Text>
        {/* add rating  */}
        <Text style={styles.massage} numberOfLines={2}>
          {item.massage}
        </Text>
      </View>
    );
  };
  get pagination() {
    const { activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={feedbacks.length}
        activeDotIndex={activeSlide}
        containerStyle={{ backgroundColor: "white" }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: "#af9a7d"
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
    const { feedbacks } = this.context;
    console.log("Feedbacks", feedbacks);
    if (feedbacks) {
      return (
        <View
          style={{ marginTop: 100, flex: 1 }}
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
            layout={"stack"}
            layoutCardOffset={3}
            ref={c => {
              this._carousel = c;
            }}
            data={feedbacks}
            renderItem={this._renderItem}
            sliderWidth={this.state.viewport.width}
            itemWidth={this.state.viewport.width - 60}
            sliderHeight={screenWidth}
            onSnapToItem={index => this.setState({ activeSlide: index })}
            hasParallaxImages={true}
          />
          {this.pagination}
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 20,
              fontFamily: "monospace"
            }}
          >
            Waiting for data
          </Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  textContainerEven: {
    backgroundColor: "#af9a7d",
    justifyContent: "center",
    paddingTop: 12,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  name: {
    color: "black",
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 0.5
  },
  massage: {
    marginTop: 6,
    color: "gray",
    fontSize: 12,
    fontStyle: "italic"
  }
});
