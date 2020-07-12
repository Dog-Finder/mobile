import React, { Component } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'

export default class AuthLoadingScreen extends Component {
  componentDidMount() {
    this.makeAsyncStuff()
  }
  async makeAsyncStuff() {
    await new Promise(resolve => {
      setTimeout(resolve, 1000)
    })
    this.props.navigation.navigate('Auth')
  }
  render() {
    return (
      <View style={styles.container}>
        <Text> Auth Loading </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
  },
})
