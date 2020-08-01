import React from 'react'
import { StyleSheet, View } from 'react-native'

const VerticalContainer = ({ children }) => {
  return <View style={styles.container}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
})

export default VerticalContainer
