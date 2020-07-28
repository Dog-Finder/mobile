import React, { useEffect } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'

const AuthLoadingScreen = ({ navigation }) => {
  const makeAsyncStuff = async () => {
    await new Promise(resolve => {
      setTimeout(resolve, 1000)
    })
    navigation.navigate('Auth')
  }
  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    (async () => {
      makeAsyncStuff()
    })()
  })
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
