import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import Proptypes from 'prop-types'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo002.jpg')}
        style={styles.image}
      />
    </View>
  )
}

HomeScreen.propTypes = {
  navigation: Proptypes.object.isRequired,
}

const styles = StyleSheet.create({
  image: { height: 110, width: 254 },
})

export default HomeScreen
