import React from 'react'
import { StyleSheet, View, Image } from 'react-native'

const AuthLoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo002.jpg')}
        style={styles.image}
      />
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
  image: { height: 110, width: 254 },
})

export default AuthLoadingScreen
