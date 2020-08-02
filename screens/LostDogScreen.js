import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as ImagePicker from 'expo-image-picker'
import LostDogForm from '../components/LostDogForm/LostDogForm'
import Context from '@context/context'
import { postLostDog, getSignedUrl } from '../api'

const LostDogScreen = ({ navigation }) => {
  const context = useContext(Context)
  const [imagePath, setImagePath] = useState(undefined)

  const uploadImage = async filePath => {
    const { token } = context
    const { data } = await getSignedUrl(token)
    const { url, imageLink } = data // signed url, simple link
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
  const onSubmitHandler = async data => {
    const { token } = context
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
  navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default LostDogScreen
