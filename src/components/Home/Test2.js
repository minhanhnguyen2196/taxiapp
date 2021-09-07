import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';
import React, { Component } from 'react';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    componentDidMount() {
        const x  = x + y;
        
    }
    render() {
        return (
            <View>
                <Text>
                    Hello World
                </Text>
                <View>
                    <TouchableOpacity>
                        <View>
                            <KeyboardAvoidingView>
                                <Text>
                                    Call World

                                </Text>
                            </KeyboardAvoidingView>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Main;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        margin: 10,
        paddingRight: 10,
        

    }
});