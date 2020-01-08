import React, { Component } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'

export default class InitAppScreen extends Component {
  constructor(props) {
    super(props)
    this.advance = this.advance.bind(this)
  }
  advance() {
    this.props.navigation.navigate('MainApp')
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button title="Busco un perro" onPress={this.advance} />
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.titleText}> Logo PerdiDog </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Encontré un perro" onPress={this.advance} />
        </View>
      </View>
    )
  }
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
