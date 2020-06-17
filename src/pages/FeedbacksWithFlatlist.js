import React from "react";
import {
  View,
  FlatList,
  Text,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";
import { EstateContext } from "../../Provider/estateProvider";
import { Rating, AirbnbRating } from "react-native-ratings";
import { Pagination } from "react-native-snap-carousel";
import { LinearGradient } from "expo-linear-gradient";

import Constants from "expo-constants";
const { width: screenWidth } = Dimensions.get("window");
export default class FeedbacksWithFlatlist extends React.Component {
  static contextType = EstateContext;
  state = {
    activeSlide: 0,
  };
  _renderItem = (item, index) => {
    return (
      <View
        style={{    // alert("WEEE")    // alert("WEEE")
          width: screenWidth - 60,
          height: "95%",    // alert("WEEE")
          elevation: 10,
          borderWidth: 6,
          borderColor: "#af9a7d",

          alignSelf: "center",
          // justifyContent: "center",
          marginLeft: 30,
          marginRight: 30,
          // marginTop: 10

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

        <AirbnbRating
          count={5}
          defaultRating={item.item.rating}
          size={20}
          isDisabled={true}
        />
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
        <LinearGradient
          colors={["#fff", "#fff"]}
          // start={[0, 0]}
          // end={[0, 50]}
          style={{
            flex: 1,
            alignContent: "center",
            justifyContent: "center",
          }}
        >

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
        </LinearGradient>

      );
    }
  }
}
const styles = StyleSheet.create({
  Image: {

    width: "80%",
    height: 300,
    // resizeMode: "cover",
    alignSelf:"center"

  },
  textContainerEven: {
    backgroundColor: "white",
    justifyContent: "center",
    marginTop:35,
    marginBottom: 70,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  name: {
    // marginTop: 6,
    color: "#0F3A5B",
    fontSize: 25,
    fontWeight: "bold",
    letterSpacing: 0.5,
    alignSelf:"center", 
    marginBottom:20
  },
  massage: {
    marginTop: 6,
    color: "#000",
    // color: "gray",
    fontSize: 20,
    fontWeight:"bold",
    fontStyle: "italic",
    alignSelf:"center"
  }

});
