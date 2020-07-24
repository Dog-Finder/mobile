import React from 'react'
import { StyleSheet, View, ImageBackground } from 'react-native'
import { Button } from 'react-native-elements'
import PropTypes from 'prop-types'

const AcceptPictureScreen = ({ navigation }) => {
  const repeatPicture = () => {
    navigation.navigate('Picture')
  }
  const selectPicture = selectUri => {
    navigation.navigate('FoundDog', {
      uri: selectUri,
    })
  }
  return (
    <ImageBackground
      source={{ uri: navigation.getParam('uri', 'NO-uri') }}
      style={styles.image}
    >
      <View style={styles.buttonView}>
        <Button
          title="Repetir foto"
          type="outline"
          buttonStyle={styles.buttonStyle}
          onPress={repeatPicture}
        />
        <Button
          title="Usar foto"
          type="outline"
          buttonStyle={styles.buttonStyle}
          onPress={() => {
            selectPicture(navigation.getParam('uri', 'NO-uri'))
          }}
        />
      </View>
    </ImageBackground>
  )
}

AcceptPictureScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}
const styles = StyleSheet.create({
  buttonStyle: { backgroundColor: 'white' },
  buttonView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    alignItems: 'flex-end',
  },
  image: { flex: 1, height: '100%', width: '100%' },
})

export default AcceptPictureScreen
