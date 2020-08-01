import React, { useState } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import PropTypes from 'prop-types'
import InputPassword from '@components/session/InputPassword'

const InputPasswordScreen = ({ navigation, route }) => {
  const { user } = route.params
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const onContinue = () => {
    user.password = password
    user.confirm = confirmPass
    navigation.push('SignUpSubmit', { user })
  }
  return (
    <SafeAreaView style={styles.container}>
      <InputPassword
        label="Elige una contraseña"
        onChange={setPassword}
        onChangeConfirmation={setConfirmPass}
        onContinue={onContinue}
      ></InputPassword>
    </SafeAreaView>
  )
}

export default InputPasswordScreen

InputPasswordScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
})
