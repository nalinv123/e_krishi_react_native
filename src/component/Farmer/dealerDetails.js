import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "native-base";

class DealerDetails extends Component {

    constructor(props) {
         super(props)
    }

    render() {
        console.log(this.props.navigation.getParam('dealer'))
        let dealerDetail = this.props.navigation.getParam('dealer');
        return (
            <View style={styles.header}>
            <View style={styles.headerContent}>
                <Text style={styles.name}>Dealer Detail</Text>
                <Text style={styles.userInfo}>Email : { dealerDetail.dealer.email }</Text>
                <Text style={styles.userInfo}>Mobile No : { dealerDetail.dealer.mobile }</Text>
                <Text style={styles.userInfo}>Vegetable Name : { dealerDetail.vegetables.name }</Text>
                <Text style={styles.userInfo}>Vegetable Price : { dealerDetail.price }</Text>
            </View>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: "#DCDCDC",
      },
      headerContent:{
        padding:30,
        alignItems: 'center',
      },
      avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
      },
      name:{
        fontSize:22,
        color:"#000000",
        fontWeight:'600',
      },
      userInfo:{
        fontSize:16,
        color:"#778899",
        fontWeight:'600',
      },
      body:{
        backgroundColor: "#778899",
        height:500,
        alignItems:'center',
      },
      item:{
        flexDirection : 'row',
      },
      infoContent:{
        flex:1,
        alignItems:'flex-start',
        paddingLeft:5
      },
      iconContent:{
        flex:1,
        alignItems:'flex-end',
        paddingRight:5,
      },
      icon:{
        width:30,
        height:30,
        marginTop:20,
      },
      info:{
        fontSize:18,
        marginTop:20,
        color: "#FFFFFF",
      }
})

export default DealerDetails;