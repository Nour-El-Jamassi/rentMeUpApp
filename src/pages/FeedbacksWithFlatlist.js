import React from "react";
import {
  View,
  FlatList,
  Text,
  Dimensions,
  StyleSheet,
  Image
} from "react-native";
import { EstateContext } from "../../Provider/estateProvider";
import { Rating, AirbnbRating } from "react-native-ratings";
import { Pagination } from "react-native-snap-carousel";

import Constants from "expo-constants";
const { width: screenWidth } = Dimensions.get("window");
export default class FeedbacksWithFlatlist extends React.Component {
  static contextType = EstateContext;
  state = {
    activeSlide: 0
  };
  _renderItem = (item, index) => {
    return (
      <View
        style={{
          width: screenWidth - 60,
          height: 700,
          elevation: 10,
          borderWidth: 6,
          borderColor: "#af9a7d",
          alignContent: "center",
          justifyContent: "center",
          marginLeft: 20,
          marginRight: 20,
          marginTop: 10
        }}
      >
        <Image
          source={require("../../assets/userPic.png")}
          style={styles.Image}
        />
        <View style={styles.textContainerEven}>
          <Text style={styles.name}>{item.item.name}</Text>

          <Text style={styles.massage} numberOfLines={2}>
            {item.item.massage}
          </Text>
        </View>

        {/* <Rating
          type="custom"
          ratingImage={require("../../assets/star-empty.png")}
          ratingColor="#d4af37"
          ratingBackgroundColor="white"
          ratingCount={5}
          defaultRating={item.item.rating}
          imageSize={30}
          style={{ paddingVertical: 10 }}
        /> */}

        <AirbnbRating count={5} defaultRating={item.item.rating} size={20} />
      </View>
    );
  };


  render() {
    const index = 0;
    const { feedbacks } = this.context;
    console.log("feed", feedbacks);
    const { activeSlide } = this.state;
    if (feedbacks) {
      return (
        <View
          style={{
            marginTop: Constants.statusBarHeight,
            flex: 1,
            alignContent: "center",
            justifyContent: "center"
          }}
        >
          <FlatList
            horizontal
            pagingEnabled
            scrollEnabled
            getItemLayout={(data, index) => ({
              length: Dimensions.get("window").width,
              offset: Dimensions.get("window").width * index,
              index
            })}
            initialScrollIndex={activeSlide}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            snapToAlignment="center"
            style={{
              backgroundColor: "white",
              opacity: 0.5,
              alignContent: "center"
            }}
            data={feedbacks}
            extraData={this.state}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 50
            }}
            keyExtractor={(item, index) => `${index}`}
            renderItem={(item, index) => this._renderItem(item, index)}
            onViewableItemsChanged={this.onViewableItemsChanged}
          />
         
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  Image: {
    width: "100%",
    height: 350,
    resizeMode: "cover"
  },
  textContainerEven: {
    backgroundColor: "white",
    justifyContent: "center",

    paddingBottom: 15,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  name: {
    marginTop: 6,
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5
  },
  massage: {
    marginTop: 6,
    color: "gray",
    fontSize: 15,
    fontStyle: "italic"
  }
});
