import React, { useState } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import PropTypes from 'prop-types'
import InputText from '@components/session/InputText'
import { Card } from 'react-native-elements'

const InputEmailScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState('')
  const { user } = route.params
  const onContinue = () => {
    user.email = email
    navigation.push('InputPassword', { user })
  }
  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <InputText
          label="¿Cuál es tu email?"
          onChange={setEmail}
          onContinue={onContinue}
        ></InputText>
      </Card>
    </SafeAreaView>
  )
}

export default InputEmailScreen

InputEmailScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
})
