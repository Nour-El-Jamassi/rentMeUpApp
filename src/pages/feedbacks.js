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
    console.log(item.item);
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={require("../../assets/userPic.png")}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <Text>{item.name}</Text>
        {/* add rating  */}
        <Text>{item.massage}</Text>
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
    const { feedbacks } = this.context;
    console.log("Feedbacks", feedbacks);
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
  }
});
