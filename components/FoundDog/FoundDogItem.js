import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { Card } from 'react-native-elements'

export default class FoundDogItem extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    dog: PropTypes.object.isRequired,
  }
  render() {
    const { imageLinks, date, comentary, address, sex, marker } = this.props.dog
    const parsedDate = new Date(date)
    const navigator = this.props.navigator
    //const existingAddress = typeof address === 'undefined' ? 'asdf' : address[0] //no funciona
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
            <Text>Distancia a ubicación actual:</Text>
          </View>
        </Card>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: 300,
    width: null,
  },
})
