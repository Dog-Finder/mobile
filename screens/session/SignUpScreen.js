import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Sign Up</Text>
    </View>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
})
