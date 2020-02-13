import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import FoundDogForm from '../components/FoundDogForm/FoundDogForm'
import { postFoundDog } from '../redux/actions/foundDog'
import { getSignedUrl } from '../redux/actions/images'
import { Header } from 'react-native-elements'

export class FoundDogScreen extends Component {
  constructor(props) {
    super(props)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
    this.imagePath = this.props.navigation.getParam('uri')
    this.pressPicture = this.pressPicture.bind(this)
  }
  async componentDidMount() {}

  async onSubmitHandler(token, data) {
    const imageLink = await this.uploadImage(this.imagePath)
    data.imageLinks = imageLink
    this.props.postFoundDog(token, data)
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
  pressPicture(selectUri) {
    this.props.navigation.navigate('ShowPicture', {
      uri: selectUri,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{
            text: 'PERRO ENCONTRADO',
            style: { color: '#fff', fontWeight: 'bold' },
          }}
        ></Header>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              this.pressPicture(this.imagePath)
            }}
            style={styles.buttonStyle}
          >
            <Image
              source={{ uri: this.imagePath }}
              style={styles.imageStyle}
              resizeMode="center"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.form}>
          <FoundDogForm
            onSubmitHandler={this.onSubmitHandler}
            imagePath={this.imagePath}
          ></FoundDogForm>
        </View>
      </View>
    )
  }
}

FoundDogScreen.propTypes = {
  postFoundDog: PropTypes.func.isRequired,
  getSignedUrl: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  buttonContainer: {
    color: 'transparent',
    flex: 0.6,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
  buttonStyle: {
    alignSelf: 'center',
    flex: 0.3,
  },
  container: {
    color: 'transparent',
    flex: 1,
    justifyContent: 'flex-start',
  },
  form: {
    marginTop: 10,
  },
  imageStyle: {
    flex: 1,
  },
})

const mapStateToProps = state => ({})

const mapDispatchToProps = {
  postFoundDog,
  getSignedUrl,
}

export default connect(mapStateToProps, mapDispatchToProps)(FoundDogScreen)
