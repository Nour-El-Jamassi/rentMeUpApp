//ToDo:

//improve styling
import React from "react";

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

const { width: screenWidth } = Dimensions.get("window");
export default class ImageCarousel extends React.Component {
  state = {
    images: [
      {
        // title: "Save Your Money",
        // info: "Find the best estate with the lowest and most suitable price",
        uri: require("../../assets/Gaza3.jpg")
      },
      {
        // title: "Save Your Time",
        // info: "We made the process easier, just with some clicks!",
        uri: require("../../assets/Gaza1.jpg")
      },
      {
        // title: "Best Estates",
        // info: "Our estates match your needs",
        uri: require("../../assets/couch-.jpg")
      }
    ],
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
          source={item.uri}
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
        {/* <FlatList
          horizontal
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          snapToAlignment="center"
          data={this.state.images}
          extraData={this.state}
          keyExtractor={(item, index) => `${index}`}
          renderItem={item => this._renderItem(item)}
          ref={flatlist => {
            this._flatlist = flatlist;
          }}
          onScroll={index => this.setState({ activeSlide: index })}
        /> */}
        <Carousel
          autoplay={true}
          layout={"stack"}
          layoutCardOffset={3}
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
    fontFamily: "monospace"
  }
});
