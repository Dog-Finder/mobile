import React, { Component } from 'react'
import { StyleSheet, Image, View, Text, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import PropTypes from 'prop-types'
import { Card } from 'react-native-elements'

export default class ShowFoundDogInfoScreen extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const dogInfo = this.props.navigation.getParam('dogInfo', 'NO-dog')
    return (
      <ScrollView styles={styles.scrollView}>
        <Image source={{ uri: dogInfo.imageLinks }} style={styles.image} />
      </ScrollView>
    )
  }
}

ShowFoundDogInfoScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}
const styles = StyleSheet.create({
  buttonContainer: {
    color: 'transparent',
  },
  image: {
    alignSelf: 'center',
    height: 300,
    marginTop: 10,
    resizeMode: 'contain',
    width: 300,
  },
})
