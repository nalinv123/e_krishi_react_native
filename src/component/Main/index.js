import React, { Component } from "react";
import { Button, Text, View } from 'native-base';
import { ImageBackground, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

class MainComponent extends Component {

    // UNSAFE_componentWillMount() {
    //     AsyncStorage.getItem('dealer', (error, result) => {
    //         if (result)
    //         {
    //           //console.log("In will mount : ", JSON.parse(result));
    //           const dealer = JSON.parse(result);
    //           if (dealer && dealer.token) {
    //             this.props.navigation.navigate('DealerHome')
    //           }
    //         }
    //       });
    // }

    render() {
        return (
            <ImageBackground source={require("../../assets/images/backhome.jpg")} style =  {styles.backgroundImage} >
                 <Text style = { styles.Header }>E-Krishi</Text>
                 <View style = { styles.ButtonView }>
                     <Button transparent style = { styles.ButtonStyle } onPress = { () => this.props.navigation.navigate('CropSearch') }>
                         <Text>Farmer</Text>
                     </Button>
                    <Button transparent style = { styles.ButtonStyle } onPress = { () => this.props.navigation.navigate('DealerLogin') }>
                        <Text>Dealer</Text>
                    </Button>
                 </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage:{
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.7
    },
    Header: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    ButtonView: {
        flexDirection: 'row',
    },
    ButtonStyle: {
        margin: 20
    }
})

export default MainComponent;