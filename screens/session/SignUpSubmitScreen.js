import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { signUp } from '@api'

const SignUpSubmitScreen = ({ navigation, route }) => {
  const { user } = route.params
  useEffect(() => {
    const sendData = async () => {
      const { data } = await signUp(user)
      console.log(data)
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
