import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import Modal from 'react-native-modal';

export default class PreviewModal extends React.Component {
  render() {
    return (
       <View>
         <Modal isVisible={this.props.isVisible}>
          <Text></Text>
         </Modal>
       </View>
    );
  }
}