import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { Card } from 'react-native-elements'

export default class LostDogItem extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    dog: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
  }

  render() {
    const { imageLinks, date, sex, distance } = this.props.dog //props: imageLinks, date, commentary, address, sex, marker, name
    const parsedDate = new Date(date)
    const navigator = this.props.navigator
    return (
      <TouchableOpacity
        delayPressIn={30}
        onPress={() =>
          navigator.push('ShowLostDogInfo', {
            dogInfo: this.props.dog,
          })
        }
      >
        <Card image={{ uri: imageLinks }} imageStyle={styles.image}>
          <View>
            <Text>Fecha Aviso: {parsedDate.toDateString()}</Text>
            <Text>Sexo: {sex}</Text>
            <Text>
              Distancia a ubicación actual:{' '}
              {Math.round((distance / 1000 + Number.EPSILON) * 10) / 10} km.
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
    )
  }
}
//{Math.round((distance + Number.EPSILON) * 10) / 10} is for keeping only one decimal place for distance

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: 300,
    width: null,
  },
})
