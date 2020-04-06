import React, { Component } from "react";
import { View, Text, Form, Item, Label, Input, Container, Content, Button } from "native-base";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

class SearchComponet extends Component {
    render() {
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
                        <Input />
                    </Item>
                    <Item floatingLabel last>
                        <Label>City</Label>
                        <Input />
                    </Item>
                    <Button style = { styles.searchButton } onPress = { () => this.props.navigation.navigate('CropSearchResults') }>
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

export default SearchComponet;