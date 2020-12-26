import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import Proptypes from 'prop-types'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import Constants from 'expo-constants'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <Button
          title="Mi Perfil"
          buttonStyle={styles.profileButton}
          titleStyle={styles.buttonTitle}
          icon={<Icon name="user" size={25} color="white" />}
          iconRight
        />
        <Button
          title="Mis publicaciones"
          titleStyle={styles.buttonTitle}
          icon={<Icon name="bars" size={25} color="white" />}
          iconRight
        />
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/logo002.jpg')}
          style={styles.image}
        />
      </View>
      <Button
        title="Quiero adoptar"
        titleStyle={styles.buttonTitle}
        icon={<Icon name="paw" size={25} color="white" />}
        iconRight
      />
    </View>
  )
}

HomeScreen.propTypes = {
  navigation: Proptypes.object.isRequired,
}

const styles = StyleSheet.create({
  buttonTitle: { marginRight: 10 },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'space-around',
    top: Constants.statusBarHeight,
  },
  image: { height: 110, width: 254 },
  imageContainer: { alignItems: 'center', justifyContent: 'center' },
  profileButton: { marginBottom: 10 },
})

export default HomeScreen
