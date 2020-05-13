import React from "react";
import { Text, TouchableOpacity, View , Dimensions } from "react-native";
import * as firebase from "firebase";
import Modal from "react-native-modal";

export class LogOut extends React.Component {
  state = {
    modalIsup :true 
  }

  _logout = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        console.log("sign out ");
        alert("sign out successfully");
        localStorage.clear();
      })
      .catch(function(error) {
        console.log("An error happened.",error);
      });
  };

  _cancel = () =>{
    this.setState({modalIsup :!modalIsup})
    this.props.navigation.navigate("Home")
  }

  render() {
    return (
      <View
      >
       <Modal 
       //animationIn="slideInUp" animationOut="slideOutDown" 
       isVisible
       useNativeDriver
        style={{backgroundColor:'white',height:Dimensions.get('window').height / 2}}> 
         <View style={{ flex: 1,justifyContent:'center'}}>  
           <Text  style={{textAlign:'center'}}> Are You Sure? </Text> 
           </View>
           <View tyle={{ flex: 1,justifyContent:'center',position:'absolute',bottom:0}}> 
             <TouchableOpacity onPress={this._logout} style={{backgroundColor:'red',width:'50%'}}> 
                <Text style={{color:'white',textAlign:'center',padding:10}}>
                  Yes, Sign me Out
                </Text>
             </TouchableOpacity>
             <TouchableOpacity onPress={this._cancel} style={{backgroundColor:'#af9a7d',width:'50%'}}> 
               <Text style={{color:'white',textAlign:'center',padding:10}}> 
                 No, back home!
               </Text>

             </TouchableOpacity>
           </View>
       
       </Modal>
         
      </View>
    );
  }
}

export default LogOut;
