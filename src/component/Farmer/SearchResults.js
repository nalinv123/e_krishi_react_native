import React, { Component } from "react";
import { List, Body, Right, Button, View, Text, Left, ListItem } from "native-base";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import ValidationError from "../ValidationError";

class SearchResultsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            noVegetables: false,
            dealerList: []
        }
    }

    UNSAFE_componentWillMount() {
        // console.log("In serach vegetable results : ", this.props.farmerState.farmer.dealerVegetables)
        let dealerVegetables = ( this.props.farmerState.farmer || {}).dealerVegetables;
        if (dealerVegetables.length === 0) {
            this.setState({
                noVegetables: true
            })
        } else {
            this.setState({
                dealerList: this._addKeysToDealerList(dealerVegetables)
            })
        }
    }

    _addKeysToDealerList = dealersList => {
        return dealersList.map(dealer => {
            return Object.assign(dealer, { key: dealer.dealer.email})
        })
    }

    render() {
        let noVegetablesView;

        if (this.state.noVegetables) {
            noVegetablesView = <ValidationError Error = "No dealer found." />
        }
        
        return (
            <View style = { styles.container }>
                <View>{ noVegetablesView }</View>
                <List dataArray = { this.state.dealerList } renderRow = { (item) => 
                    <ListItem thumbnail>
                        <Left></Left>
                        <Body>
                            <Text>Name : { item.dealer.email }</Text>
                            <Text note numberOfLines = { 1 }>Price : { item.price }</Text>
                        </Body>
                        <Right>
                            <Button transparent onPress = { () => { this.props.navigation.navigate('DealerDetails', {
                                dealer: item
                            }) } }>
                                <Text>
                                    View
                                </Text>
                            </Button>
                        </Right>
                    </ListItem>}></List>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

const mapStateToProps = state => {
    return {
        farmerState: state.farmerState
    }
}

export default connect (mapStateToProps) (SearchResultsComponent);