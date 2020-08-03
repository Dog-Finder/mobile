import React from 'react'
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native'

const AuthLoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('@assets/images/logo002.jpg')}
        style={styles.image}
      />
      <ActivityIndicator size="large"></ActivityIndicator>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
  },
  image: { height: 110, marginTop: '60%', width: 254 },
})

export default AuthLoadingScreen
