import React from 'react'
import { StyleSheet, View } from 'react-native'

const HorizontalContainer = ({ children }) => {
  return <View style={styles.container}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
})
export default HorizontalContainer
