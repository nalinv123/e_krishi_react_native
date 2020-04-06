import React, { Component } from "react";
import AwesomeAlert from 'react-native-awesome-alerts';
import { View, Text } from "native-base";
import { StyleSheet, Modal } from "react-native";
import { connect } from "react-redux";
import { hideAlert } from "../../actions/action";

class AlertComponent extends Component {

    constructor(props) {
        super(props);
    }

    _hideAlert() {
        this.props.hide_alert();
    }
    
    render() {
        //console.log("alert props : ", this.props);
        return (
            <Modal
                transparent = { true }
                animationType = { 'none' }
                visible = { this.props.alertState.isAlert }
                onRequestClose = { () => { console.log("close modal") } }>
                    <AwesomeAlert
                        show = { this.props.alertState.isAlert }
                        showProgress = { false }
                        title = { this.props.alertState.title }
                        message = { this.props.alertState.message }
                        closeOnTouchOutside = { false }
                        closeOnHardwareBackPress = { false }
                        showConfirmButton = { true }
                        confirmText = { this.props.alertState.confirmText }
                        confirmButtonColor = 'blue'
                        onConfirmPressed = { () => {
                            this._hideAlert();
                        }}
                />
            </Modal>
        );
    }
}

// const styles = StyleSheet.create(
//     {
//         container: {
//             flex: 1,
//             alignItems: 'center',
//             justifyContent: 'center',
//             backgroundColor: '#fff'
//         }
//     }
// )

const mapDispatchToProps = dispatch => ({
    hide_alert: () => dispatch(hideAlert())
});

export default connect(null, mapDispatchToProps) (AlertComponent);