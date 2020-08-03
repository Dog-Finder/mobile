import React, { useState, useContext } from 'react'
import { StyleSheet, SafeAreaView, AsyncStorage } from 'react-native'
import { Input, Button, Card } from 'react-native-elements'
import VerticalContainer from '@components/layout/VerticalContainer'
import { logIn } from '@api'
import Context from '@context/context'

const SignInScreen = ({ navigation }) => {
  const context = useContext(Context)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const submit = async () => {
    const userData = {
      email,
      password,
    }
    setLoading(true)
    try {
      const { data } = await logIn(userData)
      const token = data.resource
      context.setToken(token)
      AsyncStorage.setItem('token', token)
      setLoading(false)
    } catch (error) {
      navigation.navigate('Auth')
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <VerticalContainer>
          <Input
            containerStyle={styles.inputs}
            label="Email"
            onChangeText={setEmail}
          ></Input>
          <Input
            containerStyle={styles.inputs}
            label="Password"
            secureTextEntry
            onChangeText={setPassword}
          ></Input>
          <Button
            title="Continuar"
            style={styles.button}
            onPress={submit}
            loading={loading}
          ></Button>
        </VerticalContainer>
      </Card>
    </SafeAreaView>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  inputs: {
    width: '70%',
  },
})
