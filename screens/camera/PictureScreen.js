import React, { Component, useState, useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Camera } from 'expo-camera'
import { Platform } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as ImagePicker from 'expo-image-picker'
import PropTypes from 'prop-types'

const PictureScreen = ({ navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null)
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null)
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)
  const [flashIcon, setFlashIcon] = useState('flash-off')
  const [cameraRef, setCameraRef] = useState(null)
  const [ratio, setRatio] = useState(null)

  useEffect(() => {
    async function permissions() {
      if (Platform.OS === 'ios') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync()
        setHasGalleryPermission(status === 'granted')
      }
      const { status } = await ImagePicker.requestCameraPermissionsAsync()
      setHasCameraPermission(status === 'granted')
    }
    permissions()
  }, [])

  const prepareRatio = async () => {
    if (Platform.OS === 'android' && cameraRef) {
      const ratios = await cameraRef.getSupportedRatiosAsync()
      const ratio = ratios.slice(-1)[0]
      setRatio(ratio)
    }
  }

  const takePicture = async () => {
    if (cameraRef) {
      const picture = await cameraRef.takePictureAsync()
      navigation.navigate('AcceptPicture', { uri: picture.uri })
      // this.props.navigation.navigate('AcceptPicture', {
      //   uri: 'https://perro.shop/wp-content/uploads/pug.jpg',
      // })
    }
  }

  const goBack = () => {
    navigation.navigate('InitApp')
  }
  const pickImage = async () => {
    const picture = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    })
    if (picture.cancelled === false) {
      navigation.navigate('AcceptPicture', { uri: picture.uri })
    }
  }
  const nullPermission =
    hasCameraPermission === null ||
    (hasGalleryPermission === null && Platform.OS === 'ios')
  const noPermission =
    hasCameraPermission === false || hasGalleryPermission === false
  if (nullPermission) {
    return <View />
  } else if (noPermission) {
    return <Text>No se puede acceder a la cámara o galería.</Text>
  }
  return (
    <View style={styles.camera}>
      <Camera
        ref={ref => setCameraRef(ref)}
        style={styles.camera}
        onCameraReady={prepareRatio}
        ratio={ratio}
        flashMode={flash}
      >
        <View style={styles.back}>
          <Icon
            name="arrow-left"
            color="white"
            size={40}
            containerStyle={styles.buttonContainer}
            onPress={goBack}
          />
        </View>

        <View style={styles.gallery}>
          <Icon
            name="image-multiple"
            color="white"
            size={40}
            style={styles.iconStyle}
            onPress={pickImage}
            containerStyle={styles.buttonContainer}
          />
          <Icon
            name="circle-outline"
            color="white"
            size={100}
            style={styles.iconStyle}
            containerStyle={styles.buttonContainer}
            onPress={takePicture}
          />

          <Icon
            name={flashIcon}
            color="white"
            size={40}
            style={styles.iconStyle}
            containerStyle={styles.buttonContainer}
            onPress={() => {
              setFlash(
                flash === Camera.Constants.FlashMode.off
                  ? Camera.Constants.FlashMode.on
                  : Camera.Constants.FlashMode.off
              )
              setFlashIcon(flashIcon === 'flash-off' ? 'flash' : 'flash-off')
            }}
          ></Icon>
        </View>
      </Camera>
    </View>
  )
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

export default PictureScreen
