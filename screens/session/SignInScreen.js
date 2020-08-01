import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const SignInScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Sign In</Text>
    </View>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
})
