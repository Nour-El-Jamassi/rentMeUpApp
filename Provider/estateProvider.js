import React, { Component } from "react";
import * as firebase from "firebase";
import { View, Text, ActivityIndicator, AsyncStorage } from "react-native";
const EstateContext = React.createContext();
class EstateProvider extends Component {
  state = {
    estates: [],
    sortedEstates: [],
    type: "all",
    city: "",
    street: "",
    price: 100,
    minprice: 0,
    maxprice: 0,
    space: 0,
    minspace: 0,
    maxspace: 0,
    roomNum: 1,
    downtown: false,
    overLookingSea: false,
    newEstates: [],
    query: firebase.firestore().collection("estates"),
    feedbacks: []
  };
  // componentWillMount() {
  //   AsyncStorage.getItem("estates") &&
  //     this.setState({
  //       estates: JSON.parse(AsyncStorage.getItem("estates")),
  //       sortedE  states: JSON.parse(AsyncStorage.getItem("estates"))
  //     });
  // }
  // componentWillUpdate(nextProps, nextState) {
  //   AsyncStorage.setItem(
  //     "sortedEstates",
  //     JSON.stringify(nextState.sortedEstates)
  //   );
  //   AsyncStorage.setItem("estates", JSON.stringify(nextState.estates));
  // }
  async componentDidMount() {
    //getting estates
    const { estates } = this.state;
    const snapshot = await firebase
      .firestore()
      .collection("estates")
      .get();

    snapshot.forEach(doc => {
      let data = doc.data();

      data.id = doc.id;

      estates.push(data);
      this.setState({ estates });
      this.setState({ sortedEstates: this.state.estates });
    });
    let maxprice = Math.max(...this.state.estates.map(item => item.price));
    let maxspace = Math.max(...this.state.estates.map(item => item.space));
    this.setState({ maxprice, maxspace });
    console.log("estatesProvider", this.state.estates); //getting feedbacks

    const { feedbacks } = this.state;
    const snapshotFeedbacks = await firebase
      .firestore()
      .collection("FeedBacks")
      .get();
    const collectionFeedbacks = {};
    snapshotFeedbacks.forEach(doc => {
      collectionFeedbacks[doc.id] = doc.data();
      feedbacks.push(collectionFeedbacks[doc.id]);
      this.setState({ feedbacks });
    }); // alert("estatesProvider", this.state.feedbacks);
  }
  handleChange = (index, value, name) => {
    console.log("value", value, "name", name, "id", index);

    this.setState({ [name]: value });
  };
  filterEstates = navigation => {
    // const { navigation } = this.props;
    let {
      type,
      city,
      street,
      price,
      roomNum,
      overLookingSea,
      downtown,
      sortedEstates,
      newEstates,
      query
    } = this.state; //all estates
    console.log(this.state.estates);
    // convert to integer

    roomNum = parseInt(roomNum);
    price = parseInt(price);
    console.log("state", type, city, street);

    if (city !== "all" && type !== "all") {
      query = query
        .where("city", "==", city)
        .where("type", "==", type)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            let data = doc.data();

            data.id = doc.id;
            newEstates.push(data);
            this.setState({ newEstates });
            this.setState({ sortedEstates: newEstates });
            this.setState({ newEstates: [] });
          });
        })
        .then(() => {
          this.props.navigation.navigate("Home");
        });
      this.setState({ query });

      console.log("sortedEstates", this.state.query);

      console.log("sortedEstates", this.state.sortedEstates);
    } // if (type !== "all") { //   query = query //     .where("type", "==", type) //     .get() //     .then(querySnapshot => { //       querySnapshot.forEach(doc => { //         let data = doc.data(); //         data.id = doc.id; //         newEstates.push(data); //         this.setState({ newEstates }); //         this.setState({ sortedEstates: newEstates }); //         this.setState({ newEstates: [] }); //       }); //       console.log("sorted", this.state.newEstates); //     }); // }
  };
  render() {
    if (this.state.estates.length != 0) {
      return (
        <EstateContext.Provider
          value={{
            estates: this.state.estates,
            sortedEstates: this.state.sortedEstates,
            type: this.state.type,
            city: this.state.city,
            street: this.state.street,
            price: this.state.price,
            minprice: this.state.minprice,
            maxprice: this.state.maxprice,
            minspace: this.state.minspace,
            maxspace: this.state.maxspace,
            roomNum: this.state.roomNum,
            downtown: this.state.downtown,
            overLookingSea: this.state.overLookingSea, //images: this.state.images,
            handleChange: this.handleChange,
            feedbacks: this.state.feedbacks,
            space: this.state.space,
            filterEstates: this.filterEstates
          }}
        >
          {this.props.children}
        </EstateContext.Provider>
      );
    } else {
      return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator
            size={70}
            color={"#af9a7d"}
            style={{ alignSelf: "center", marginTop: 350 }}
          />
          <Text>Loading....</Text>
        </View>
      );
    }
  }
}
export { EstateContext, EstateProvider };
