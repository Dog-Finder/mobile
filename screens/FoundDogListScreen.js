import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Constants from 'expo-constants'

import { getFoundDogList } from '../api'
import FoundDogItem from '../components/FoundDog/FoundDogItem'

class FoundDogListScreen extends Component {
  constructor(props) {
    super(props)
    this.state = { foundDogList: [] }
  }
  static propTypes = {
    getFoundDogList: PropTypes.func.isRequired,
    foundDogList: PropTypes.array.isRequired,
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
    const { data } = await getFoundDogList(1234)
    this.setState({ foundDogList: data.resource })
    this.getCurrentLocation()
  }
  render() {
    const foundDogList = this.state.foundDogList.map((foundDog, i) => {
      return (
        <FoundDogItem
          key={i}
          dog={foundDog}
          navigator={this.props.navigation}
          userCoordinates={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
          }}
        ></FoundDogItem>
      )
    })
    return (
      <SafeAreaView styles={styles.container}>
        <ScrollView styles={styles.scrollView}>{foundDogList}</ScrollView>
      </SafeAreaView>
    )
  }
}

FoundDogListScreen.propTypes = {
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

export default FoundDogListScreen
