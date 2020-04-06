import React, { Component } from "react";
import { Form, Item, Label, View, Button, Text, Input } from "native-base";
import { StyleSheet } from "react-native";
import Loader from "../loader";
import AlertComponent from "../alert";
import { connect } from "react-redux";
import { validateField } from "../../validator/validationService";
import ValidationError from "../ValidationError";
import { delearAction } from "../../actions/action";

class DealerRegisterComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            nameError: "",
            email: "",
            emailError: "",
            password: "",
            passwordError: "",
            city: "",
            cityError: "",
            mobile: "",
            mobileError: "",
        }
    }

    _handleNameChange = name => {
        this.setState(
            { name } 
        )
    }

    _handleEmailChange = email => {
        this.setState(
            { email }
        )
    }

    _handlePasswordChange = password => {
        this.setState(
            { password }
        )
    }

    _handleCityChange = city => {
        this.setState(
            { city }
        )
    }

    _handleMobileChange = mobile => {
        this.setState(
            { mobile }
        )
    }

    _onSubmit() {
        let nameError = validateField('name', this.state.name);
        let emailError = validateField('email', this.state.email);
        let passwordError = validateField('password', this.state.password);
        let cityError = validateField('city', this.state.city);
        let mobileError = validateField('mobile', this.state.mobile);
        this.setState( {
            nameError: nameError,
            emailError: emailError,
            passwordError: passwordError,
            cityError: cityError,
            mobileError: mobileError
        })

        if (nameError || emailError || passwordError || cityError || mobileError) {
            return;
        } else {
            console.log("no error");
            let dealerInfo = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                city: this.state.city,
                mobile: this.state.mobile
            };
            this.props.registerDealer(dealerInfo);
        }
    }

    render() {

        let nameValidationError;
        let emailValidationError;
        let passwordValidationError;
        let cityValidationError;
        let mobileValidationError;

        if ( this.state.nameError ) {
            nameValidationError = <ValidationError Error = { this.state.nameError } />
        }
        if ( this.state.emailError ) {
            emailValidationError = <ValidationError Error = { this.state.emailError } />
        }
        if ( this.state.passwordError ) {
            passwordValidationError = <ValidationError Error = { this.state.passwordError } />
        }
        if ( this.state.cityError ) {
            cityValidationError = <ValidationError Error = { this.state.cityError } />
        }
        if ( this.state.mobileError ) {
            mobileValidationError = <ValidationError Error = { this.state.mobileError } />
        }
        return (
            <View>
                <Loader loadingState = { this.props.loaderState } />
                <AlertComponent alertState = { this.props.alertState } />
                <Form>
                    <Item floatingLabel>
                        <Label>Name</Label>
                        <Input
                            autoCapitalize = 'none'
                            onChangeText = { this._handleNameChange }
                            value = { this.state.name }
                            // onBlur = { () => {
                            //     this.setState( {
                            //         nameError: validateField('name', this.state.name)
                            //     })
                            // }}
                        />
                    </Item>
                    <View>{ nameValidationError }</View>
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input
                            autoCapitalize = 'none'
                            onChangeText = { this._handleEmailChange }
                            value = { this.state.email }
                            // onBlur = { () => {
                            //     this.setState( {
                            //         emailError: validateField('email', this.state.email)
                            //     })
                            // }}
                        />
                    </Item>
                    <View>{ emailValidationError }</View>
                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input
                            autoCapitalize = 'none'
                            onChangeText = { this._handlePasswordChange }
                            value = { this.state.password }
                            // onBlur = { () => {
                            //     this.setState( {
                            //         passwordError: validateField('password', this.state.password)
                            //     })
                            // }}
                        />
                    </Item>
                    <View>{ passwordValidationError }</View>
                    <Item floatingLabel>
                        <Label>City</Label>
                        <Input
                            autoCapitalize = 'none'
                            onChangeText = { this._handleCityChange }
                            value = { this.state.city }
                            // onBlur = { () => {
                            //     this.setState( {
                            //         cityError: validateField('city', this.state.city)
                            //     })
                            // }}
                        />
                    </Item>
                    <View>{ cityValidationError }</View>
                    <Item floatingLabel>
                        <Label>Mobile No</Label>
                        <Input
                            keyboardType = 'decimal-pad'
                            onChangeText = { this._handleMobileChange }
                            value = { this.state.mobile }
                            // onBlur = { () => {
                            //     this.setState( {
                            //         mobileError: validateField('mobile', this.state.mobile)
                            //     })
                            // }}
                        />
                    </Item>
                    <View>{ mobileValidationError }</View>
                    <Button /* disabled = { this.state.error } */ style = { styles.registerButton } onPress = { this._onSubmit.bind(this) }>
                        <Text>
                            Register
                        </Text>
                    </Button>
                </Form>
                <View style = { styles.signInLink }>
                    <Text>
                    Already have an account? 
                    </Text>
                    <Button transparent onPress = { () => this.props.navigation.navigate('DealerLogin') }>
                        <Text>Sign In.</Text>
                    </Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    registerButton: {
        margin: 20
    },
    signInLink: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "baseline"
    }
})

const mapStateToProps = state => {
    return {
        dealerState: state.dealerState,
        loaderState: state.loaderState,
        alertState: state.alertState
    }
}

const mapDispatchToProps = dispatch => ({
    registerDealer: dealerInfo => dispatch(delearAction.register(dealerInfo))
})

export default connect(mapStateToProps, mapDispatchToProps) (DealerRegisterComponent);