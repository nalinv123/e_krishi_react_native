import React, { Component } from "react";
import { View, Text, Content } from "native-base";
import { StyleSheet, Image } from "react-native";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";

class DealerProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dealer: {}
    }
  }

  UNSAFE_componentWillMount() {
    AsyncStorage.getItem('dealer', (error, result) => {
      if (result)
      {
          //console.log("In will mount : ", JSON.parse(result));
          const dealer = JSON.parse(result);
          if (dealer && dealer.token) {
              // this.props.navigation.navigate('DealerHome');
              this.setState({
                dealer: dealer
              })
          }
      } else {
        this.props.navigation.navigate('DealerLogin');
      }
  });
  }

    render() {
      //console.log("props dealer profile : ", this.state.dealer.dealer /* this.props.dealerState.dealer.dealer */);
      const name = (this.state.dealer.dealer || {}).name;
      const email = (this.state.dealer.dealer || {}).email;
      const mobile = (this.state.dealer.dealer || {}).mobile;
        return (
            <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar}
                  source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
                <Text style={styles.name}>{ name }</Text>
                <Text style={styles.userInfo}>{ email }</Text>
                <Text style={styles.userInfo}>{ mobile }</Text>
            </View>
          </View>
        );
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

const mapStateToProps = (state) => {
  return {
    dealerState: state.dealerState
  };
}

export default connect(mapStateToProps) (DealerProfile);