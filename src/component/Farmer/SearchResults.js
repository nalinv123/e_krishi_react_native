import React, { Component } from "react";
import { List, Body, Right, Button, View, Text, Left, ListItem } from "native-base";
import { StyleSheet } from "react-native";

class SearchResultsComponent extends Component {
    render() {
        return (
            <View style = { styles.container }>
                <List>
                    <ListItem thumbnail>
                    <Left></Left>
                    <Body>
                        <Text>Hello</Text>
                        <Text note numberOfLines={ 1 }>Bye</Text>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Text>
                                View
                            </Text>
                        </Button>
                    </Right>
                    </ListItem>
                </List>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default SearchResultsComponent;