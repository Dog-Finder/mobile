import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { Card } from 'react-native-elements'

export default class FoundDogItem extends Component {
  static propTypes = {
    dog: PropTypes.object.isRequired,
  }
  render() {
    const { imageLinks, date, comentary } = this.props.dog
    const parsedDate = new Date(date)
    return (
      <Card title="Card" image={{ uri: imageLinks }} imageStyle={styles.image}>
        <View>
          <Text>Fecha Aviso: {parsedDate.toDateString()}</Text>
          <Text>Comentario: {comentary}</Text>
        </View>
      </Card>
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
