import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { Card } from 'react-native-elements'
import getDistance from 'geolib/es/getDistance'

export default class FoundDogItem extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    dog: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
    userCoordinates: PropTypes.object.isRequired,
  }

  render() {
    const { imageLinks, date, sex, marker } = this.props.dog //props: imageLinks, date, commentary, address, sex, marker
    const parsedDate = new Date(date)
    const navigator = this.props.navigator
    let distance
    try {
      distance = getDistance(marker, this.props.userCoordinates) / 1000
    } catch (error) {
      distance = 'error'
    }
    return (
      <TouchableOpacity
        delayPressIn={30}
        onPress={() =>
          navigator.push('ShowFoundDogInfo', {
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
              {Math.round((distance + Number.EPSILON) * 10) / 10} km.
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
