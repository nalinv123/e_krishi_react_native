import React, { Component } from "react";
import { View, Form, Item, Label, Input, Text, Button } from "native-base";
import { StyleSheet } from "react-native";
import { validateField } from "../../validator/validationService";
import ValidationError from "../ValidationError";
import AsyncStorage from "@react-native-community/async-storage";
import { dealerAction } from "../../actions/action";
import { connect } from "react-redux";

class DealerAddNewVegetable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            price: "",
            nameError: "",
            priceError: "",
            dealer: {},
            token: ""
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('dealer', (error, result) => {
          if (result)
          {
            //console.log("In will mount : ", JSON.parse(result));
            const dealer = JSON.parse(result);
            if (dealer && dealer.token) {
              let email = (dealer.dealer || {}).email;
              this.setState({
                dealer: dealer.dealer,
                token: dealer.token
              })
            }
          } else {
            this.props.navigation.navigate('DealerLogin');
          }
        });
      }

    _handleNameChange = name => {
        this.setState({
            name
        })
    }

    _handlePriceChange = price => {
        this.setState({
            price
        })
    }

    _onSubmit() {
        let nameError = validateField('name', this.state.name);
        let priceError = validateField('price', this.state.price);
        
        this.setState({
            nameError: nameError
        });

        this.setState({
            priceError: priceError
        })

        if (!nameError && !priceError) {
            // console.log("no error", this.state.dealer);
            const addVegetable = {
                dealerEmail: this.state.dealer.email,
                vegetableName: this.state.name,
                vegetablePrice: this.state.price
            }

            // console.log(this.state.token)
            this.props.addNewVegetable(addVegetable, this.state.token)
        }
    }
    
    render() {

        let nameValidationError;
        let priceValidationError;

        if (this.state.nameError) {
            nameValidationError = <ValidationError Error = { this.state.nameError} />
        }

        if (this.state.priceError) {
            priceValidationError = <ValidationError Error = {this.state.priceError} />
        }
        return (
            <View style = { styles.container }>
                <Text style = { styles.heading }>Add New Vegetable</Text>
                <Form>
                    <Item floatingLabel>
                        <Label>Name</Label>
                        <Input
                            onChangeText = { this._handleNameChange }
                            value = { this.state.name }
                            autoCapitalize = "none"
                        />
                    </Item>
                    <View>{ nameValidationError }</View>
                    <Item floatingLabel>
                        <Label>Price</Label>
                        <Input
                            onChangeText = { this._handlePriceChange }
                            value = { this.state.price }
                            keyboardType = "decimal-pad"
                        />
                    </Item>
                    <View>{ priceValidationError }</View>
                    <Button style = { styles.addButton } onPress = { this._onSubmit.bind(this) }>
                        <Text>Add</Text>
                    </Button>
                </Form>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    addNewVegetable: (addVegetable, token) => dispatch(dealerAction.updateDealerVegetable(addVegetable, token))
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        marginTop: 20
    },
    heading: {
        fontSize: 25,
        alignSelf: "center"
    },
    addButton: {
        margin: 20
    }
})

export default connect(null, mapDispatchToProps) (DealerAddNewVegetable);