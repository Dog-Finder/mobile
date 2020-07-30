import React from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'

const AuthScreen = ({ navigation }) => {
  const advance = () => {
    navigation.navigate('InitApp')
  }
  return (
    <View style={styles.container}>
      <Text> Auth </Text>
      <Button title="Advance" onPress={advance} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
  },
})

export default AuthScreen
