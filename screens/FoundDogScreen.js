import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class FoundDogScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> FoundDogScreen </Text>
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
