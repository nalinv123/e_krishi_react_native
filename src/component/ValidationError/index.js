import React, { Component } from "react";
import { View, Item, Text } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { StyleSheet } from "react-native";

class ValidationError extends Component {
    render() {
        return (
            <View style = { styles.container }>
                <Item error>
                    <Text> { this.props.Error } </Text>
                    <FontAwesomeIcon icon = { faTimesCircle } ></FontAwesomeIcon>
                </Item>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 20
    }
})

export default ValidationError;