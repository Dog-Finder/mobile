import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Camera } from 'expo-camera'
import { Platform } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as ImagePicker from 'expo-image-picker'
import PropTypes from 'prop-types'

export default class PictureScreen extends Component {
  constructor(props) {
    super(props)
    this.takePicture = this.takePicture.bind(this)
    this.goBack = this.goBack.bind(this)
    this.pickImage = this.pickImage.bind(this)
  }
  state = {
    hasCameraPermission: null,
    hasGalleryPermission: null,
    flash: Camera.Constants.FlashMode.off,
    flashIcon: 'flash-off',
  }

  async componentDidMount() {
    if (Platform.OS === 'ios') {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync()
      this.setState({ hasGalleryPermission: status === 'granted' })
    }
    const { status } = await ImagePicker.requestCameraPermissionsAsync()
    this.setState({ hasCameraPermission: status === 'granted' })
  }
  prepareRatio = async () => {
    if (Platform.OS === 'android' && this.cam) {
      const ratios = await this.cam.getSupportedRatiosAsync()
      const ratio = ratios.slice(-1)[0]
      this.setState({ ratio })
    }
  }
  takePicture = async () => {
    if (this.cam) {
      // const picture = await this.cam.takePictureAsync()
      // this.props.navigation.navigate('AcceptPicture', { uri: picture.uri })
      this.props.navigation.navigate('AcceptPicture', {
        uri: 'https://perro.shop/wp-content/uploads/pug.jpg',
      })
    }
  }
  goBack() {
    this.props.navigation.navigate('InitApp')
  }
  pickImage = async () => {
    const picture = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    })
    if (picture.cancelled === false) {
      this.props.navigation.navigate('AcceptPicture', { uri: picture.uri })
    }
  }

  render() {
    const { hasCameraPermission } = this.state
    const { hasGalleryPermission } = this.state
    if (
      hasCameraPermission === null ||
      (hasGalleryPermission === null && Platform.OS === 'ios')
    ) {
      return <View />
    } else if (
      hasCameraPermission === false ||
      hasGalleryPermission === false
    ) {
      return <Text>No se puede acceder a la cámara o galería.</Text>
    } else {
      return (
        <View style={styles.camera}>
          <Camera
            ref={cam => (this.cam = cam)}
            style={styles.camera}
            onCameraReady={this.prepareRatio}
            ratio={this.state.ratio}
            flashMode={this.state.flash}
          >
            <View style={styles.back}>
              <Icon
                name="arrow-left"
                color="white"
                size={40}
                containerStyle={styles.buttonContainer}
                onPress={this.goBack}
              />
            </View>

            <View style={styles.gallery}>
              <Icon
                name="image-multiple"
                color="white"
                size={40}
                style={styles.iconStyle}
                onPress={this.pickImage}
                containerStyle={styles.buttonContainer}
              />
              <Icon
                name="circle-outline"
                color="white"
                size={100}
                style={styles.iconStyle}
                containerStyle={styles.buttonContainer}
                onPress={this.takePicture}
              />

              <Icon
                name={this.state.flashIcon}
                color="white"
                size={40}
                style={styles.iconStyle}
                containerStyle={styles.buttonContainer}
                onPress={() => {
                  this.setState({
                    flash:
                      this.state.flash === Camera.Constants.FlashMode.off
                        ? Camera.Constants.FlashMode.on
                        : Camera.Constants.FlashMode.off,
                  })
                  this.setState({
                    flashIcon:
                      this.state.flashIcon === 'flash-off'
                        ? 'flash'
                        : 'flash-off',
                  })
                }}
              ></Icon>
            </View>
          </Camera>
        </View>
      )
    }
  }
}

PictureScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  back: {
    flex: 0.2,
    flexDirection: 'row',
    color: 'transparent',
    alignItems: 'flex-start',
    marginTop: 22,
    marginLeft: 3,
  },
  buttonContainer: {
    color: 'transparent',
  },
  camera: { flex: 1 },
  gallery: {
    flex: 1,
    flexDirection: 'row',
    color: 'transparent',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  iconStyle: { alignSelf: 'flex-end' },
})
