import React, { Component } from "react";
import { View, Text, Form, Item, Label, Input, Container, Content, Button } from "native-base";
import { StyleSheet } from "react-native";
import { validateField } from "../../validator/validationService";
import ValidationError from "../ValidationError";
import { farmerAction } from "../../actions/action";
import { connect } from "react-redux";

class SearchComponet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            nameError: "",
            city: "",
            cityError: ""
        }
    }

    UNSAFE_componentWillReceiveProps(props) {
        //console.log("props", props.farmerState)
        this.props.navigation.navigate('CropSearchResults')
    }

    _handleNameChange = name => {
        this.setState({
            name
        })
    }

    _handleCityChange = city => {
        this.setState({
            city
        })
    }

    _onSubmit() {
        let name = validateField('name', this.state.name);
        let city = validateField('city', this.state.city);

        this.setState({
            nameError: name,
            cityError: city
        })

        if (!name && !city) {
            // console.log("correct")
            let searchVegetable = {
                name: this.state.name,
                city: this.state.city
            }

            this.props.doSearchVegetable(searchVegetable)
        }
    }

    render() {

        let nameValidationError;
        let cityValidationError;

        if (this.state.nameError) {
            nameValidationError = <ValidationError Error = { this.state.nameError } />
        }

        if (this.state.cityError) {
            cityValidationError = <ValidationError Error = { this.state.cityError } />
        }
        return (
            <View style = { styles.container }>
                <View style = { styles.headerView }>
                    <Text style = { styles.heading }>
                        Search Crop
                    </Text>
                </View>
                <Form>
                    <Item floatingLabel>
                        <Label>Crop</Label>
                        <Input
                            onChangeText = { this._handleNameChange }
                            value = { this.state.name }
                            autoCapitalize = "none"
                        />
                    </Item>
                    <View>{ nameValidationError }</View>
                    <Item floatingLabel last>
                        <Label>City</Label>
                        <Input
                            onChangeText = { this._handleCityChange }
                            value = { this.state.city }
                            autoCapitalize = "none"
                        />
                    </Item>
                    <View>{ cityValidationError }</View>
                    <Button style = { styles.searchButton } onPress = { this._onSubmit.bind(this) }>
                        <Text>Search</Text>
                    </Button>
                </Form>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    headerView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        fontSize: 20,
    },
    searchButton: {
        margin: 20
    }
})

const mapStateToProps = state => {
    return {
        farmerState: state.farmerState
    }
}

const mapDispatchToProps = dispatch => ({
    doSearchVegetable: searchVegetable => dispatch(farmerAction.searchVegetables(searchVegetable))
})

export default connect(mapStateToProps, mapDispatchToProps) (SearchComponet);