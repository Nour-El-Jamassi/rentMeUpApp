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
    space: 0,
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
    let maxprice = Math.max(...this.state.estates.map(item => item.price));
    let maxspace = Math.max(...this.state.estates.map(item => item.space));
    this.setState({ maxprice, maxspace });
    console.log("estatesProvider", this.state.estates);
    console.log(
      "maxprice",
      this.state.maxprice,
      "minprice",
      this.state.minprice
    );
    console.log(
      "maxprice",
      this.state.maxspace,
      "minspace",
      this.state.minspace
    );
    //getting feedbacks
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
    });
    console.log("estatesProvider", this.state.feedbacks);
  }
  handleChange = (index, value, name) => {
    console.log("value", value, "name", name, "id", index);

    this.setState({ [name]: value });
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
      console.log("sortedEstates", sortedEstates);
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
          feedbacks: this.state.feedbacks,
          space: this.state.space,
          filterEstates: this.filterEstates
        }}
      >
        {this.props.children}
      </EstateContext.Provider>
    );
  }
}
export { EstateContext, EstateProvider };
