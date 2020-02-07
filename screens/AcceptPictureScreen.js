import React, { Component } from 'react'
import { StyleSheet, View, ImageBackground } from 'react-native'
import { Button } from 'react-native-elements'
import PropTypes from 'prop-types'

export default class AcceptPictureScreen extends Component {
  constructor(props) {
    super(props)
    this.repeatPicture = this.repeatPicture.bind(this)
    this.selectPicture = this.selectPicture.bind(this)
  }
  repeatPicture() {
    this.props.navigation.navigate('Picture')
  }
  selectPicture(selectUri) {
    // LostDog for debug, should be FoundDog
    this.props.navigation.navigate('LostDog', {
      uri: selectUri,
    })
  }
  render() {
    const { navigation } = this.props
    return (
      <ImageBackground
        source={{ uri: navigation.getParam('uri', 'NO-uri') }}
        style={styles.image}
      >
        <View style={styles.buttonView}>
          <Button
            title="Repetir foto"
            type="outline"
            buttonStyle={styles.buttonStyle}
            onPress={this.repeatPicture}
          />
          <Button
            title="Usar foto"
            type="outline"
            buttonStyle={styles.buttonStyle}
            onPress={() => {
              this.selectPicture(navigation.getParam('uri', 'NO-uri'))
            }}
          />
        </View>
      </ImageBackground>
    )
  }
}

AcceptPictureScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}
const styles = StyleSheet.create({
  buttonStyle: { backgroundColor: 'white' },
  buttonView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    alignItems: 'flex-end',
  },
  image: { flex: 1, height: '100%', width: '100%' },
})
