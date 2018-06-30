/**
 * Camera Component
 */
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Toast } from 'native-base';
import { Camera, Permissions, Icon } from 'expo';

import Colors from '../constants/Colors';

export default class CameraComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null, // カメラ機能の許可
      type: Camera.Constants.Type.back, // 背面カメラを利用
    };

    this.takePicture = this.takePicture.bind(this);
  }

  // 初期起動時、カメラの使用の権限を取得する。
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  }

  // 撮影
  async takePicture() {
    const pictureData = await this.camera.takePictureAsync();
    Toast.show({
      text: 'Success',
      buttonText: 'Okay',
      duration: 2000,
    });
    console.log(pictureData.uri);
  }

  render() {
    const {
      hasCameraPermission,
    } = this.state;

    if (hasCameraPermission === null || hasCameraPermission === false) {
      return (
        <View>
          <Text>
            カメラの使用が許可されていません。
          </Text>
        </View>
      );
    }
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <Camera
          style={{
            flex: 1,
          }}
          type={this.state.type}
          ref={(ref) => {
            this.camera = ref;
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={() => {
                this.takePicture();
              }}
            >
              <Icon.MaterialIcons
                name="camera"
                size={70}
                style={{ marginBottom: 20 }}
                color={Colors.tabIconDefault}
              />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
}
