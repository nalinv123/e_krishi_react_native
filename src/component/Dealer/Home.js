import React, { Component } from "react";
import { Text, Container, Footer, FooterTab, Button, Content, Header, Tabs, Tab, TabHeading, View } from "native-base";
import { StyleSheet } from "react-native";
import DealerVegetables from "./Vegetables";
import DealerProfile from "./Profile";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSignOutAlt, faSeedling, faUser } from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux";
import { dealerAction } from "../../actions/action";
import AsyncStorage from "@react-native-community/async-storage";

class DealerHome extends Component {

    static navigationOptions = ({ navigation }) => {

        return {
        headerLeft: () => null,
        headerRight: () => (
            <Button transparent onPress = { navigation.getParam('logout') }>
                <FontAwesomeIcon icon = { faSignOutAlt } size = { 20 }></FontAwesomeIcon>
                <Text>Logout</Text>
            </Button>
        ),
        };
    };

    componentDidMount() {
        this.props.navigation.setParams( { logout: this._logout } );
    }
    
    UNSAFE_componentWillReceiveProps(props) {
        //console.log("In dealer home component will receive props : ", props.dealerState);
        const dealer = (props.dealerState || {}).dealer;
        // console.log("dealer : ", dealer)
        if (!dealer) {
            props.navigation.navigate('DealerLogin');
        }
    }

    _logout = () => {
        //console.log("In _logout()", this.props);
        this.props.logout();
    }

    render() {
        return (
            <Container>
                <Header style = { styles.tabHeader } hasTabs />
                <Tabs>
                    <Tab heading = { <TabHeading><FontAwesomeIcon icon={ faSeedling } size = { 25 } /><Text>Vegetables</Text></TabHeading>}>
                        <DealerVegetables navigation = { this.props.navigation } />
                    </Tab>
                    <Tab heading = { <TabHeading><FontAwesomeIcon icon = { faUser } size = { 25 }/><Text>Profile</Text></TabHeading> }>
                        <DealerProfile />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    tabHeader: {
        flex: 1,
        marginTop: 0
    }
});

const mapStateToProps = (state) => {
    return {
        dealerState: state.dealerState
    }
}

const mapDispatchToProps = dispatch => ({
    logout : () => dispatch(dealerAction.logout())
})

export default connect(mapStateToProps, mapDispatchToProps) (DealerHome);