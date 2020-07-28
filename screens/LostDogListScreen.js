import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Constants from 'expo-constants'

import LostDogItem from '../components/LostDog/LostDogItem'
import { getLostDogList } from '../api'

class LostDogListScreen extends Component {
  constructor(props) {
    super(props)
    this.state = { lostDogList: [] }
  }
  getCurrentLocation = async () => {
    navigator.geolocation.getCurrentPosition(async position => {
      this.setState({
        latitude: parseFloat(position.coords.latitude),
        longitude: parseFloat(position.coords.longitude),
      })
    })
  }
  async componentDidMount() {
    const { data } = await getLostDogList(1234)
    this.setState({ lostDogList: data.resource })
    this.getCurrentLocation()
  }

  render() {
    const lostDogList = this.state.lostDogList.map((lostDog, i) => {
      return (
        <LostDogItem
          key={i}
          dog={lostDog}
          navigator={this.props.navigation}
          userCoordinates={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
          }}
        ></LostDogItem>
      )
    })

    return (
      <SafeAreaView styles={styles.container}>
        <ScrollView styles={styles.scrollView}>{lostDogList}</ScrollView>
      </SafeAreaView>
    )
  }
}

LostDogListScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },

  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
})

export default LostDogListScreen
