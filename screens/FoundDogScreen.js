import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { StyleSheet, SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FoundDogForm from '../components/FoundDogForm/FoundDogForm'
import { postFoundDog } from '../redux/actions/foundDog'
import { getSignedUrl } from '../redux/actions/images'

const FoundDogScreen = ({ navigation, postFoundDog }) => {
  const imagePath = navigation.getParam('uri')

  const uploadImage = async filePath => {
    const { payload } = await this.props.getSignedUrl(1234)
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
    const imageLink = await uploadImage(imagePath)
    data.imageLinks = imageLink
    postFoundDog(token, data)
    navigation.navigate('Home')
  }

  const pressPicture = () => {
    navigation.navigate('ShowPicture', {
      uri: imagePath,
    })
  }

  return (
    <SafeAreaView styles={styles.container}>
      <KeyboardAwareScrollView>
        <FoundDogForm
          onSubmitHandler={onSubmitHandler}
          imagePath={imagePath}
          pressPicture={pressPicture}
        ></FoundDogForm>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

FoundDogScreen.propTypes = {
  postFoundDog: PropTypes.func.isRequired,
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
  postFoundDog,
  getSignedUrl,
}

export default connect(mapStateToProps, mapDispatchToProps)(FoundDogScreen)
