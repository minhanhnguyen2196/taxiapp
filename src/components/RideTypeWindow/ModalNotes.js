import React, { Component } from 'react';
import { Modal, Text, View, Dimensions, TextInput } from 'react-native';

const { height, width } = Dimensions.get('window'); 

export default class ModalNotes extends Component {
  
  render() {
    const { visible } = this.props;
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={visible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
        >
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View>
              <Text>Write notes for your driver</Text>
              <TextInput style={{ width, height: 50 }} />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}