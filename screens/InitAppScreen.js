import React, { Component } from 'react'
import { StyleSheet, View, Button, Image } from 'react-native'
import Proptypes from 'prop-types'

export default class InitAppScreen extends Component {
  constructor(props) {
    super(props)
    this.advance = this.advance.bind(this)
    this.openCamera = this.openCamera.bind(this)
  }
  advance() {
    this.props.navigation.navigate('Home')
  }
  openCamera() {
    this.props.navigation.navigate('Picture')
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            title="Busco un perro"
            onPress={() => this.props.navigation.navigate('Home')}
          />
        </View>
        <Image
          source={require('../assets/images/logo002.jpg')}
          style={styles.image}
        />
        <View style={styles.buttonContainer}>
          <Button title="Encontré un perro" onPress={this.openCamera} />
        </View>
      </View>
    )
  }
}

InitAppScreen.propTypes = {
  navigation: Proptypes.object.isRequired,
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#fff',
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
  },
  image: { height: 110, width: 254 },
})
