import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { signUp } from '@api'
import Context from '@context/context'

const SignUpSubmitScreen = ({ navigation, route }) => {
  const context = useContext(Context)
  const { user } = route.params
  useEffect(() => {
    const sendData = async () => {
      try {
        const { data } = await signUp(user)
        const token = data.resource
        AsyncStorage.setItem('token', token)
        context.setToken(token)
      } catch (error) {
        navigation.navigate('Auth')
      }
    }
    sendData()
  }, [])
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large"></ActivityIndicator>
    </View>
  )
}

export default SignUpSubmitScreen

SignUpSubmitScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})
