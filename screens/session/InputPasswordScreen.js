import React, { useState } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import PropTypes from 'prop-types'
import InputPassword from '@components/session/InputPassword'
import { Card } from 'react-native-elements'

const InputPasswordScreen = ({ navigation, route }) => {
  const { user } = route.params
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const onContinue = () => {
    if (password === confirmPass) {
      user.password = password
      navigation.push('SignUpSubmit', { user })
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <InputPassword
          label="Elige una contraseña"
          onChange={setPassword}
          onChangeConfirmation={setConfirmPass}
          onContinue={onContinue}
        ></InputPassword>
      </Card>
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
