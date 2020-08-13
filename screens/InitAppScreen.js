import React, { useContext } from 'react'
import { StyleSheet, View, Button, Image, AsyncStorage } from 'react-native'
import Proptypes from 'prop-types'
import Context from '@context/context'

const InitAppScreen = ({ navigation }) => {
  const context = useContext(Context)
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Busco un perro"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
      <Image
        source={require('../assets/images/logo002.jpg')}
        style={styles.image}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Encontré un perro"
          onPress={() => navigation.push('FoundDog')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Logout"
          onPress={async () => {
            await AsyncStorage.removeItem('token')
            context.setToken('')
          }}
        />
      </View>
    </View>
  )
}

InitAppScreen.propTypes = {
  navigation: Proptypes.object.isRequired,
}

InitAppScreen.propTypes = {
  navigation: Proptypes.object.isRequired,
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#fff',
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
  },
  image: { height: 110, width: 254 },
})

export default InitAppScreen
