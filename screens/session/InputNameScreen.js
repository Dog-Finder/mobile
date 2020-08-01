import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, SafeAreaView } from 'react-native'
import InputText from '@components/session/InputText'

const InputNameScreen = ({ navigation }) => {
  const [name, setName] = useState('')
  const onContinue = () => {
    navigation.push('InputEmail', { user: { name } })
  }
  return (
    <SafeAreaView style={styles.container}>
      <InputText
        label="¿Cuál es tu nombre?"
        onChange={setName}
        onContinue={onContinue}
      ></InputText>
    </SafeAreaView>
  )
}

export default InputNameScreen

InputNameScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
})
