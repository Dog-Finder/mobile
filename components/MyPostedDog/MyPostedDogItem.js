import React, { useContext } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
import { Card } from 'react-native-elements'
import PropTypes from 'prop-types'
import { deleteLostDog, deleteFoundDog } from '@api'
import Context from '@context/context'

const MyPostedDogItem = props => {
  const { imageLinks, date, sex } = props.dog //props: imageLinks, date, commentary, address, sex, marker
  const parsedDate = new Date(date)
  const navigator = props.navigator
  const context = useContext(Context)
  const { token } = context

  return (
    <TouchableOpacity
      delayPressIn={30}
      onPress={() => {
        if (props.type === 'found') {
          navigator.navigate('ShowMyPostedFoundDogInfo', {
            dogInfo: props.dog,
          })
        } else {
          navigator.navigate('ShowMyPostedLostDogInfo', {
            dogInfo: props.dog,
          })
        }
      }}
      onLongPress={() => {
        Alert.alert(
          props.dog.name,
          '¿Desea eliminar esta publicación?',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'Eliminar',
              onPress: async () => {
                if (props.type === 'found') {
                  await deleteFoundDog(token, props.dog.id)
                  navigator.push('PersonalPublications')
                } else {
                  await deleteLostDog(token, props.dog.id)
                  navigator.push('PersonalPublications')
                }
              },
            },
          ],
          { cancelable: true }
        )
      }}
    >
      <Card image={{ uri: imageLinks }} imageStyle={styles.image}>
        <View>
          <Text>Fecha Aviso: {parsedDate.toDateString()}</Text>
          <Text>Sexo: {sex}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  )
}

export default MyPostedDogItem

MyPostedDogItem.propTypes = {
  dog: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: 300,
    width: null,
  },
})
