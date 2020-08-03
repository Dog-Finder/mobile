import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'
import VerticalContainer from '@components/layout/VerticalContainer'
import { Input, Button } from 'react-native-elements'

const InputPassword = ({
  label,
  onChange,
  onChangeConfirmation,
  onContinue,
}) => {
  return (
    <VerticalContainer>
      <Text>{label}</Text>
      <Input
        containerStyle={styles.inputContainer}
        onChangeText={onChange}
        inputStyle={styles.input}
        placeholder="Contraseña"
        secureTextEntry
      ></Input>
      <Input
        containerStyle={styles.inputContainer}
        onChangeText={onChangeConfirmation}
        inputStyle={styles.input}
        placeholder="Confirmar contraseña"
        secureTextEntry
      ></Input>
      <Button title="Continuar" onPress={onContinue}></Button>
    </VerticalContainer>
  )
}

InputPassword.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeConfirmation: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  input: {
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 10,
    width: '70%',
  },
})

export default InputPassword
