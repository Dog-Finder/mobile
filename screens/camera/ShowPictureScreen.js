import React, { Component } from 'react'
import { StyleSheet, ImageBackground, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import PropTypes from 'prop-types'

export default class ShowPictureScreen extends Component {
  constructor(props) {
    super(props)
    this.goBack = this.goBack.bind(this)
  }
  goBack() {
    this.props.navigation.navigate('FoundDog')
  }

  render() {
    const { uri } = this.props.route.params
    return (
      <ImageBackground source={{ uri }} style={styles.imageStyle}>
        <View style={styles.back}>
          <Icon
            name="arrow-left"
            color="white"
            size={50}
            containerStyle={styles.buttonContainer}
            onPress={this.goBack}
          />
        </View>
      </ImageBackground>
    )
  }
}

ShowPictureScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}
const styles = StyleSheet.create({
  back: {
    flex: 0.2,
    flexDirection: 'row',
    color: 'transparent',
    alignItems: 'flex-start',
    marginTop: 22,
    marginLeft: 3,
  },
  buttonContainer: {
    color: 'transparent',
  },
  imageStyle: { flex: 1, height: '100%', width: '100%' },
})
