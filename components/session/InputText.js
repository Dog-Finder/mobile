import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'
import VerticalContainer from '@components/layout/VerticalContainer'
import { Input, Button } from 'react-native-elements'

const InputText = ({ label, onChange, onContinue }) => {
  return (
    <VerticalContainer>
      <Text>{label}</Text>
      <Input
        containerStyle={styles.inputContainer}
        onChangeText={onChange}
        inputStyle={styles.input}
      ></Input>
      <Button title="Continuar" onPress={onContinue}></Button>
    </VerticalContainer>
  )
}

InputText.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  input: {
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 10,
    width: '60%',
  },
})

export default InputText
