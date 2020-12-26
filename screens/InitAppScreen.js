import React, { useContext } from 'react'
import { StyleSheet, View, Button, Image } from 'react-native'
import { Avatar } from 'react-native-elements'
import Proptypes from 'prop-types'
import Context from '@context/context'
import AsyncStorage from '@react-native-async-storage/async-storage'

const InitAppScreen = ({ navigation }) => {
  const context = useContext(Context)
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar
          size="large"
          rounded
          icon={{ name: 'home', type: 'font-awesome' }}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.7}
          containerStyle={styles.avatar}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Busco un perro"
          onPress={() => navigation.navigate('LostDog')}
        />
      </View>
      <Image
        source={require('../assets/images/logo002.jpg')}
        style={styles.image}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Encontré un perro"
          onPress={() => navigation.navigate('FoundDog')}
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

const styles = StyleSheet.create({
  avatar: { flex: 1, margin: 5 },
  avatarContainer: {
    flex: 0.5,
    flexDirection: 'column',
    alignSelf: 'flex-start',
    margin: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
  },
  image: { height: 110, width: 254 },
})

export default InitAppScreen
