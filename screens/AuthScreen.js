import React, { Component } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'

export default class AuthScreen extends Component {
  constructor(props) {
    super(props)
    this.advance = this.advance.bind(this)
  }
  advance() {
    this.props.navigation.navigate('InitApp')
  }
  render() {
    return (
      <View style={styles.container}>
        <Text> Auth </Text>
        <Button title="Advance" onPress={this.advance} />
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
