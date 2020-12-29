import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Card } from 'react-native-elements'
import PropTypes from 'prop-types'

const MyPostedDogItem = props => {
  const { imageLinks, date, sex } = props.dog //props: imageLinks, date, commentary, address, sex, marker
  const parsedDate = new Date(date)
  const navigator = props.navigator

  return (
    <TouchableOpacity
      delayPressIn={30}
      onPress={() =>
        navigator.push('ShowMyPostedDogInfo', {
          dogInfo: props.dog,
        })
      }
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
  userCoordinates: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: 300,
    width: null,
  },
})
