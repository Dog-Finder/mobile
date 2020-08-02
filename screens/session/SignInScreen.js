import React, { useState, useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { logIn } from '@api'
import Context from '@context/context'

const SignInScreen = ({ navigation }) => {
  const context = useContext(Context)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const submit = async () => {
    const userData = {
      email,
      password,
    }
    try {
      const { data } = await logIn(userData)
      const token = data.resource
      context.setToken(token)
      navigation.navigate('Home')
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <Input label="Email" onChangeText={setEmail}></Input>
        <Input
          label="Password"
          secureTextEntry
          onChangeText={setPassword}
        ></Input>
        <Button
          title="Continuar"
          style={styles.button}
          onPress={submit}
        ></Button>
      </View>
    </View>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  inputs: {
    width: '60%',
  },
})
