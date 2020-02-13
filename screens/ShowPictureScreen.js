import React, { Component } from 'react'
import { StyleSheet, ImageBackground } from 'react-native'
import { Button } from 'react-native-elements'
import PropTypes from 'prop-types'

export default class AcceptPictureScreen extends Component {
  constructor(props) {
    super(props)
    this.repeatPicture = this.repeatPicture.bind(this)
  }
  repeatPicture() {
    this.props.navigation.navigate('Picture')
  }

  render() {
    const { navigation } = this.props
    return (
      <ImageBackground
        source={{ uri: navigation.getParam('uri', 'NO-uri') }}
        style={styles.image}
      ></ImageBackground>
    )
  }
}

AcceptPictureScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}
const styles = StyleSheet.create({
  image: { flex: 1, height: '100%', width: '100%' },
})
