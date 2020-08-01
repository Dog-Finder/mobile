import React from 'react'
import { StyleSheet, View, Image, Button } from 'react-native'

const AuthScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('@assets/images/logo002.jpg')}
        style={styles.image}
      />
      <Button
        title="Iniciar Sesión"
        onPress={() => navigation.push('SignIn')}
      />
      <Button title="Registrarse" onPress={() => navigation.push('SignUp')} />
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

export default AuthScreen
