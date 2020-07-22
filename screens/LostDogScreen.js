import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { StyleSheet, SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as ImagePicker from 'expo-image-picker'
import LostDogForm from '../components/LostDogForm/LostDogForm'
import { postLostDog } from '../redux/actions/lostDog'
import { getSignedUrl } from '../redux/actions/images'

class LostDogScreen extends Component {
  constructor(props) {
    super(props)
    this.state = { imagePath: undefined }
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
    this.pressPicture = this.pressPicture.bind(this)
  }

  async onSubmitHandler(token, data) {
    if (this.state.imagePath) {
      const imageLink = await this.uploadImage(this.state.imagePath)
      data.imageLinks = imageLink
    }
    this.props.postLostDog(token, data)
    this.props.navigation.navigate('LostDog')
  }

  async uploadImage(filePath) {
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
  async pressPicture() {
    const picture = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    })
    if (picture.cancelled === false) {
      this.setState({ imagePath: picture.uri })
    }
  }

  static navigationOptions = {
    title: 'Perro Encontrado',
    headerStyle: {
      backgroundColor: 'steelblue',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
    },
  }

  render() {
    return (
      <SafeAreaView styles={styles.container}>
        <KeyboardAwareScrollView>
          <LostDogForm
            onSubmitHandler={this.onSubmitHandler}
            imagePath={this.state.imagePath}
            pressPicture={this.pressPicture}
          ></LostDogForm>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    )
  }
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
