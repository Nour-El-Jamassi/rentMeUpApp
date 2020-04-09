//ToDo:
//check if filtering acually works & map updates
//price and space range slider
import React from "react";
import { View, Text, StyleSheet, Slider, TouchableOpacity } from "react-native";
import Dropdown from "react-native-modal-dropdown";
import { EstateContext } from "../../Provider/estateProvider";

import * as theme from "../../theme";
import { FontAwesome } from "@expo/vector-icons";
import { EstateContext } from "../../Provider/estateProvider";
// get all unique values
const getUnique = (items, value) => {
  return [...new Set(items.map(item => item[value]))];
};

const Filter = () => {
  const { estates } = useContext(EstateContext);
  console.log("filter", estates);
  //get cities
  let cities = getUnique(estates, "city");
  console.log("cities", cities);
  //add all
  cities = ["all", ...cities]; //add all and whatever you have in types

  //get streets
  let streets = getUnique(estates, "street");
  console.log("streets", streets);
  //add all
  streets = ["all", ...streets]; //add all and whatever you have in types

  //get types
  let types = getUnique(estates, "type");
  console.log("types", types);
  //add all
  types = ["all", ...types]; //add all and whatever you have in types
  //get RoomsNumber
  let roomsNumber = getUnique(estates, "roomNum");
  console.log("roomsNumber", roomsNumber);
  roomsNumber = ["all", ...roomsNumber]; //add all and whatever you have in types
  console.log(cities, streets, types, roomsNumber);

  return (
    <EstateContext.Consumer>
      {estate => (
        <View style={{ flex: 1, marginTop: 100 }}>
          <View>
            {/* <Image
              source={require("../../assets/logo1.png")}
              style={{ width: 170, height: 100 }}
            /> */}
          </View>
          {/* renderCities */}
          <View style={styles.container}>
            <Text style={styles.label}>City:</Text>
            <Dropdown
              name="city"
              defaultValue={"all"}
              options={cities}
              style={styles.DropdownMenu}
              dropdownStyle={styles.DropdownStyle}
              onSelect={(index, value) =>
                estate.handleChange(index, value, "city")
              }
              renderRow={option => (
                <Text style={styles.DropdownOption}>{option}</Text>
              )}
              renderButtonText={option => {
                option;
              }}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.label}>Type:</Text>
            <Dropdown
              name="type"
              defaultValue={"all"}
              options={types}
              style={styles.DropdownMenu}
              dropdownStyle={styles.DropdownStyle}
              onSelect={(index, value) =>
                estate.handleChange(index, value, "type")
              }
              renderRow={option => (
                <Text style={styles.DropdownOption}>{option}</Text>
              )}
              renderButtonText={option => {
                option;
              }}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.label}>Street:</Text>
            <Dropdown
              name="street"
              defaultValue={"all"}
              options={streets}
              style={styles.DropdownMenu}
              dropdownStyle={styles.DropdownStyle}
              onSelect={(index, value) =>
                estate.handleChange(index, value, "street")
              }
              renderRow={option => (
                <Text style={styles.DropdownOption}>{option}</Text>
              )}
              renderButtonText={option => {
                option;
              }}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.label}>Rooms Number:</Text>
            <Dropdown
              name="roomsNum"
              defaultValue={"1"}
              options={roomsNumber}
              style={styles.DropdownMenu}
              dropdownStyle={styles.DropdownStyle}
              onSelect={(index, value) =>
                estate.handleChange(index, value, "roomsNum")
              }
              renderRow={option => (
                <Text style={styles.DropdownOption}>{option}</Text>
              )}
              renderButtonText={option => {
                option;
              }}
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.label}>Price: {estate.price}</Text>
            <Slider
              step={1}
              minimumValue={estate.minprice}
              maximumValue={estate.maxprice}
              value={20}
              onValueChange={slideValue =>
                estate.handleChange(3, slideValue, "price")
              }
              minimumTrackTintColor="#af9a7d"
              maximumTrackTintColor="#af9a7d"
              thumbTintColor="#af9a7d"
              style={{ flex: 1, marginLeft: theme.SIZES.base * 4 }}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.label}>Space: {estate.space}</Text>
            <Slider
              step={10}
              minimumValue={estate.minspac}
              maximumValue={estate.maxspace}
              value={500}
              onValueChange={slideValue =>
                estate.handleChange(1, slideValue, "space")
              }
              minimumTrackTintColor="#af9a7d"
              maximumTrackTintColor="#af9a7d"
              thumbTintColor="#af9a7d"
              style={{ flex: 1, marginLeft: theme.SIZES.base * 4 }}
            />
          </View>
          <View>
            <TouchableOpacity
              style={styles.filterBtn}
              onPress={
                estate.filterEstates()

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
    flex: 0.0999
  },
  label: {
    flex: 1,
    fontSize: theme.SIZES.text,
    fontWeight: "bold",
    fontFamily: "monospace",
    paddingLeft: 10,
    marginLeft: theme.SIZES.base
  },
  DropdownMenu: {
    flex: 1,
    borderRadius: theme.SIZES.base / 2,
    borderColor: theme.COLORS.overlay,
    borderWidth: 1,
    padding: theme.SIZES.base * 1.03,
    marginRight: theme.SIZES.base * 4,
    marginLeft: theme.SIZES.base * 4
  },
  DropdownOption: {
    padding: 5,
    fontSize: theme.SIZES.font * 0.8
  },
  DropdownStyle: {
    marginLeft: theme.SIZES.base,
    paddingHorizontal: theme.SIZES.base / 2,
    marginVertical: -(theme.SIZES.base + 1)
  },
  filterBtn: {
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.SIZES.base * 0.8,
    backgroundColor: "#af9a7d",
    marginRight: theme.SIZES.base * 8,
    marginLeft: theme.SIZES.base * 8,
    marginTop: 25
  },
  filterText: {
    fontWeight: "bold",
    fontSize: theme.SIZES.base * 1,
    color: "white",
    fontFamily: "monospace"
  }
});
