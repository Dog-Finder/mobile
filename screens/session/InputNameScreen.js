import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, SafeAreaView } from 'react-native'
import { Card } from 'react-native-elements'

import InputText from '@components/session/InputText'

const InputNameScreen = ({ navigation }) => {
  const [name, setName] = useState('')
  const onContinue = () => {
    navigation.push('InputEmail', { user: { name } })
  }
  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <InputText
          label="¿Cuál es tu nombre?"
          onChange={setName}
          onContinue={onContinue}
        ></InputText>
      </Card>
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
