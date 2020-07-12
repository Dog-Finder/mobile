import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import PropTypes from 'prop-types'

export default class FoundDogItem extends Component {
  static propTypes = {
    dog: PropTypes.object.isRequired,
  }
  render() {
    const { imageLinks, date, comentary } = this.props.dog
    const parsedDate = new Date(date)
    return (
      <View>
        <Image style={styles.image} source={{ uri: imageLinks }} />
        <Text>Fecha Aviso: {parsedDate.toDateString()}</Text>
        <Text>Comentario: {comentary}</Text>
      </View>
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
