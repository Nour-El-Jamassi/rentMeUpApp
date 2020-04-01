import React, { Component } from "react";
import * as firebase from "firebase";
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
    minspace: 0,
    maxspace: 0,
    roomNum: 1,
    downtown: false,
    overLookingSea: false,
    images: [
      { url: require("../assets/Gaza1.jpg") },
      { url: require("../assets/Gaza3.jpg") },
      { url: require("../assets/couch-.jpg") }
    ],
    feedbacks: []
  };
  async componentDidMount() {
    //getting estates
    const { estates } = this.state;
    const snapshot = await firebase
      .firestore()
      .collection("estates")
      .get();
    const collection = {};
    snapshot.forEach(doc => {
      collection[doc.id] = doc.data();
      estates.push(collection[doc.id]);
      this.setState({ estates });
      this.setState({ sortedEstates: this.state.estates });
    });
    console.log("estatesProvider", this.state.estates);
    //getting feedbacks
    const { feedbacks } = this.state;
    const snapshot = await firebase
      .firestore()
      .collection("FeedBacks")
      .get();
    const collection = {};
    snapshot.forEach(doc => {
      collection[doc.id] = doc.data();
      feedbacks.push(collection[doc.id]);
      this.setState({ feedbacks });
    });
  }
  handleChange = (event, data) => {
    const target = event.target;
    const value = target.type === "radio" ? target.checked : data.value;
    const name = event.target.name;
    this.setState({ [name]: value }, () => {
      this.filterEstates();
    });
  };
  filterEstates = () => {
    let {
      type,
      city,
      street,
      // minprice,
      // maxspace,
      price,
      // minspace,
      // maxprice,
      roomNum,
      overLookingSea,
      downtown,
      // tempEstates,
      sortedEstates
    } = this.state;
    //all estates
    console.log(this.state.estates);
    // convert to integer
    console.log(
      "type",
      type,
      "city",
      city,
      "rooms",
      roomNum,
      "street",
      street,
      overLookingSea,
      "down",
      downtown
    );
    roomNum = parseInt(roomNum);
    price = parseInt(price);
    console.log("state", type, city, street);
    const db = firebase.firestore();

    if (
      (city !== "all") &
      (type !== "all")
      //  &
      // (roomNum !== 3) &
      // (street !== "") &
      // (price !== minprice)
    ) {
      db.collection("estates")
        .where("type", "==", type)
        .where("city", "==", city)
        // .where("roomNum", "==", roomNum)
        .where("street", "==", street)
        // .where("downtown", "==", downtown)
        // .where("overLookingSea", "==", overLookingSea)
        // .where("price", "==", price)
        // .where("space", "in", [minspace, maxspace])
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            let item = doc.data();
            item.id = doc.id;

            this.state.sortedEstates.push(item);
          });
        });
      this.setState({ sortedEstates });
      console.log(sortedEstates);
      // this.setState({ sortedEstates: this.state.tempEstates });
    }
    //filtering by type
  };
  render() {
    return (
      <EstateContext.Provider
        value={{
          estates: this.state.estates,
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
          overLookingSea: this.state.overLookingSea,
          images: this.state.images,
          handleChange: this.handleChange,
          feedbacks: this.state.feedbacks
        }}
      >
        {this.props.children}
      </EstateContext.Provider>
    );
  }
}
export { EstateContext, EstateProvider };
