import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { StyleSheet, SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as ImagePicker from 'expo-image-picker'
import LostDogForm from '../components/LostDogForm/LostDogForm'
import { postLostDog } from '../redux/actions/lostDog'
import { getSignedUrl } from '../redux/actions/images'

const LostDogScreen = ({ navigation, getSignedUrl, postLostDog }) => {
  const [imagePath, setImagePath] = useState(undefined)

  const uploadImage = async filePath => {
    const { payload } = await getSignedUrl(1234)
    const { url, imageLink } = payload.data // signed url, simple link
    const file = await fetch(filePath) // Necesary to convert path to blob type
    const blob = await file.blob()
    await fetch(url, {
      method: 'PUT',
      body: blob,
      headers: new Headers({
        'Content-Type': 'image/jpeg',
        'Content-Disposition': 'inline',
      }),
    })
    return imageLink
  }
  const onSubmitHandler = async (token, data) => {
    if (imagePath) {
      const imageLink = await uploadImage(imagePath)
      data.imageLinks = imageLink
    }
    postLostDog(token, data)
    navigation.navigate('LostDog')
  }
  const pressPicture = async () => {
    const picture = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    })
    if (picture.cancelled === false) {
      setImagePath(picture.uri)
    }
  }
  return (
    <SafeAreaView styles={styles.container}>
      <KeyboardAwareScrollView>
        <LostDogForm
          onSubmitHandler={onSubmitHandler}
          imagePath={imagePath}
          pressPicture={pressPicture}
        ></LostDogForm>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

LostDogScreen.propTypes = {
  postLostDog: PropTypes.func.isRequired,
  getSignedUrl: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const mapStateToProps = state => ({})

const mapDispatchToProps = {
  postLostDog,
  getSignedUrl,
}

export default connect(mapStateToProps, mapDispatchToProps)(LostDogScreen)
