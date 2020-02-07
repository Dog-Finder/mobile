import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import LostDogForm from '../components/LostDogForm/LostDogForm'
import { postLostDog } from '../redux/actions/lostDog'
import { getSignedUrl } from '../redux/actions/images'
import { Header } from 'react-native-elements'

export class LostDogScreen extends Component {
  constructor(props) {
    super(props)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
  }
  async componentDidMount() {}

  async onSubmitHandler(token, data) {
    const filePath = await this.props.navigation.getParam('uri') // Replace with path
    const imageLink = await this.uploadImage(filePath)
    data.imageLinks = imageLink
    this.props.postLostDog(token, data)
    this.props.navigation.navigate('Home')
  }

  async uploadImage(filePath) {
    const { payload } = await this.props.getSignedUrl(1234)
    const { url, imageLink } = payload.data // signed url, simple link
    const file = await fetch(filePath) // Necesary to convert path to blob type
    const blob = await file.blob()
    await fetch(url, { method: 'PUT', body: blob }) // Actual upload to S3
    return imageLink
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{ text: 'PERRO PERDIDO', style: { color: '#fff' } }}
        ></Header>
        <View style={styles.form}>
          <LostDogForm onSubmitHandler={this.onSubmitHandler}></LostDogForm>
        </View>
      </View>
    )
  }
}

LostDogScreen.propTypes = {
  postLostDog: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  form: {
    marginTop: 10,
  },
})

const mapStateToProps = state => ({})

const mapDispatchToProps = {
  postLostDog,
  getSignedUrl,
}

export default connect(mapStateToProps, mapDispatchToProps)(LostDogScreen)
