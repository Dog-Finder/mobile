import React, { Component } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'
import Proptypes from 'prop-types'

export default class InitAppScreen extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            title="Busco un perro"
            onPress={() => this.props.navigation.navigate('LostDog')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.titleText}> Logo PerdiDog </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Encontré un perro"
            onPress={() => this.props.navigation.navigate('MainApp')}
          />
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
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})
