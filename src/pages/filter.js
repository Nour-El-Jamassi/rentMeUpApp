import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  AppRegistry,
  Slider,
  TouchableOpacity
} from "react-native";
import Dropdown from "react-native-modal-dropdown";
import { EstateContext } from "../../Provider/estateProvider";
// import RangeSlider from "react-native-range-slider";
import * as theme from "../../theme";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

// get all unique values
const getUnique = (items, value) => {
  return [...new Set(items.map(item => item[value]))];
};

const Filter = ({ estates }) => {
  console.log(estates);
  //get cities
  let cities = getUnique(estates, "city");
  //add all
  cities = ["all", ...cities]; //add all and whatever you have in types

  //get streets
  let streets = getUnique(estates, "street");
  //add all
  streets = ["all", ...streets]; //add all and whatever you have in types

  //get types
  let types = getUnique(estates, "type");
  //add all
  types = ["all", ...types]; //add all and whatever you have in types
  //get RoomsNumber
  let roomsNumber = getUnique(estates, "roomNum");
  roomsNumber = ["all", ...roomsNumber]; //add all and whatever you have in types
  console.log(cities, streets, types, roomsNumber);

  return (
    <EstateContext.Consumer>
      {estate => (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          {/* renderCities */}
          <View style={styles.container}>
            <Text style={styles.label}>City</Text>
            <Dropdown
              name="city"
              defaultValue={"all"}
              options={cities}
              style={styles.DropdownMenu}
              dropdownStyle={styles.DropdownStyle}
              onSelect={value => estate.handleChange(value)}
              renderRow={option => (
                <Text style={styles.DropdownOption}>{{ option }}</Text>
              )}
              renderButtonText={option => {
                option;
              }}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.label}>Type</Text>
            <Dropdown
              name="type"
              defaultValue={"all"}
              options={types}
              style={styles.DropdownMenu}
              dropdownStyle={styles.DropdownStyle}
              onSelect={value => estate.handleChange(value)}
              renderRow={option => (
                <Text style={styles.DropdownOption}>{{ option }}</Text>
              )}
              renderButtonText={option => {
                option;
              }}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.label}>Street</Text>
            <Dropdown
              name="street"
              defaultValue={"all"}
              options={streets}
              style={styles.DropdownMenu}
              dropdownStyle={styles.DropdownStyle}
              onSelect={value => estate.handleChange(value)}
              renderRow={option => (
                <Text style={styles.DropdownOption}>{{ option }}</Text>
              )}
              renderButtonText={option => {
                option;
              }}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.label}>Rooms Number</Text>
            <Dropdown
              name="roomsNum"
              defaultValue={1}
              options={roomsNumber}
              style={styles.DropdownMenu}
              dropdownStyle={styles.DropdownStyle}
              onSelect={value => estate.handleChange(value)}
              renderRow={option => (
                <Text style={styles.DropdownOption}>{{ option }}</Text>
              )}
              renderButtonText={option => {
                option;
              }}
            />
          </View>
          {/* <View style={{ flex: 1, flexDirection: "row" }}>
            <RangeSlider
              minValue={estate.minprice}
              maxValue={estate.maxprice}
              tintColor={"#da0f22"}
              handleBorderWidth={1}
              handleBorderColor="#454d55"
              selectedMinimum={20}
              selectedMaximum={40}
              style={{
                flex: 1,
                height: 70,
                padding: 10,
                backgroundColor: "#ddd"
              }}
              onChange={estate.handleChange}
            />
          </View> */}
          <View style={styles.container}>
            <Text style={styles.label}>Price</Text>
            <Slider
              step={1}
              minimumValue={estate.minprice}
              maximumValue={estate.maxprice}
              value={value}
              onValueChange={slideValue => estate.handleChange(slideValue)}
              minimumTrackTintColor="#1fb28a"
              maximumTrackTintColor="#d3d3d3"
              thumbTintColor="#b9e4c9"
              style={{ flex: 1 / 2 }}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.label}>Space</Text>
            <Slider
              step={1}
              minimumValue={estate.minspac}
              maximumValue={estate.maxspace}
              value={value}
              onValueChange={slideValue => estate.handleChange(slideValue)}
              minimumTrackTintColor="#1fb28a"
              maximumTrackTintColor="#d3d3d3"
              thumbTintColor="#b9e4c9"
              style={{ flex: 1 / 2 }}
            />
          </View>
          <View>
            <TouchableOpacity
              style={styles.filterBtn}
              onPress={

                  //navigates to the main map
                  // (onPress = () => {
                  // 	this.props.navigation.navigate("Home");
                  // })

              }
            >
              <Text style={styles.filterText}>Filter</Text>
              <FontAwesome
                name="filter"
                size={theme.SIZES.icon * 1.75}
                color={theme.COLORS.white}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </EstateContext.Consumer>
  );
};

export default Filter;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  label: {
    flex: 1 / 2,
    fontSize: theme.SIZES.text,
    fontWeight: "500",
    fontFamily: "monospace"
  },
  DropdownMenu: {
    flex: 1 / 2,
    borderRadius: theme.SIZES.base / 2,
    borderColor: theme.COLORS.overlay,
    borderWidth: 1,
    padding: theme.SIZES.base,
    marginRight: theme.SIZES.base / 2
  },
  DropdownOption: {
    padding: 5,
    fontSize: theme.SIZES.font * 0.8
  },
  DropdownStyle: {
    marginLeft: -theme.SIZES.base,
    paddingHorizontal: theme.SIZES.base / 2,
    marginVertical: -(theme.SIZES.base + 1)
  },
  filterBtn: {
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.SIZES.base * 1,
    backgroundColor: "#af9a7d"
  },
  filterText: {
    fontWeight: "600",
    fontSize: theme.SIZES.base * 1,
    color: "white",
    fontFamily: "monospace"
  }
});
