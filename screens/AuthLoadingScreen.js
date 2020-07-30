import React from 'react'
import { Text, StyleSheet, View } from 'react-native'

const AuthLoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Text> Auth Loading </Text>
    </View>
  )
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

export default AuthLoadingScreen
