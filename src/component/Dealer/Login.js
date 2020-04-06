import React, { Component } from "react";
import { View, Form, Item, Label, Text, Button, Input } from "native-base";
import { StyleSheet } from "react-native";
import { validateField } from "../../validator/validationService";
import ValidationError from "../ValidationError";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { delearAction } from "../../actions/action";
import { userService } from "../../services";
import Loader from "../loader";
import AlertComponent from "../alert";
import AsyncStorage from '@react-native-community/async-storage';


class DealerLoginComponet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            emailError: "",
            password: "",
            passwordError: "",
        }
    }

    UNSAFE_componentWillMount() {
        AsyncStorage.getItem('dealer', (error, result) => {
            if (result)
            {
                //console.log("In will mount : ", JSON.parse(result));
                const dealer = JSON.parse(result);
                if (dealer && dealer.token) {
                    this.props.navigation.navigate('DealerHome');
                }
            }
        });
        
        // if (dealer && dealer.token) {
        //     this.props.navigation.navigate('DealerHome');
        // }
    }

    _onSubmit() {
        //this.props.navigation.navigate('DealerHome')
        //navigate.navigate('DealerHome');
        const email = validateField('email', this.state.email);
        const password = validateField('password', this.state.password);

        this.setState({
            emailError: email,
            passwordError: password
        })

        if(!email && !password) {
            const user_info = {
                email: this.state.email,
                password: this.state.password
            };
            this.props.login(
                user_info
            );
        }
    }

    UNSAFE_componentWillReceiveProps(props){
        // if(prop.)
        // this.props.navigate('DealerHome')
        let data = props.dealerState
        //console.log("data : ", (data.dealer || {}).token);
        const token = (data.dealer || {}).token
        if (token) {
            AsyncStorage.setItem('dealer', JSON.stringify(data.dealer));
            this.props.navigation.navigate('DealerHome');
        } 
    }

    _handleEmailChange = email => {
        this.setState( {email } )
    }

    _handlePasswordChange = password => {
        this.setState( {password} )
    }

    render() {
        const { navigate } = this.props.navigation;
        let emailValidationError;
        let passwordValidationError
        if ( this.state.emailError ) {
            emailValidationError = <ValidationError Error = { this.state.emailError } />
        }
        if ( this.state.passwordError ) {
            passwordValidationError = <ValidationError Error = { this.state.passwordError } />
        }
        return (
            <View style = { styles.container }>
                <Loader loadingState = { this.props.loaderState } />
                <AlertComponent alertState = { this.props.alertState } />
                <View style = { styles.headerView }>
                    <Text style = { styles.headerText }>Login</Text>
                </View>
                <Form>
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input
                            onChangeText = { this._handleEmailChange }
                            value = { this.state.email }
                            autoCapitalize = 'none'
                            onBlur = { () => {
                                this.setState( {
                                    emailError: validateField('email', this.state.email)
                                })
                            }}
                        />
                    </Item>
                    <View>{ emailValidationError }</View>
                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input 
                            secureTextEntry = { true }
                            onChangeText = { this._handlePasswordChange }
                            onBlur = { () => {
                                this.setState( {
                                    passwordError: validateField('password', this.state.password)
                                })
                            }}
                            autoCapitalize = 'none'
                        />
                    </Item>
                    <View>{ passwordValidationError }</View>
                    <Button style = { styles.loginButton } onPress = { this._onSubmit.bind(this) }>
                        <Text>Login</Text>
                    </Button>
                </Form>
                <View style = { styles.signUpNowLink }>
                    <Text>
                        Does not have account?
                    </Text>
                    <Button transparent onPress = { () => this.props.navigation.navigate('DealerRegister') }>
                        <Text>
                            Sign up now.
                        </Text>
                    </Button>
                </View>
            </View>
        )
    }
}

// This function maps the state to the components prop.
const mapStateToProps = (state) => {
    //console.log("state",state);
    return { 
        dealerState:state.dealerState,
        loaderState:state.loaderState,
        alertState:state.alertState
    };
};

const mapDispatchToProps = dispatch => ({
    login: user_info => dispatch(delearAction.login(user_info.email, user_info.password))
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    headerView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 20
    },
    loginButton: {
        margin: 20
    },
    signUpNowLink: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "baseline"
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(DealerLoginComponet);