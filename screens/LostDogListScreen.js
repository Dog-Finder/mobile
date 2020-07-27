import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Constants from 'expo-constants'

import { getLostDogList } from '../redux/actions/lostDog'
import LostDogItem from '../components/LostDog/LostDogItem'

class LostDogListScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  static propTypes = {
    getLostDogList: PropTypes.func.isRequired,
    lostDogList: PropTypes.array.isRequired,
  }
  getCurrentLocation = async () => {
    navigator.geolocation.getCurrentPosition(async position => {
      this.setState({
        latitude: parseFloat(position.coords.latitude),
        longitude: parseFloat(position.coords.longitude),
      })
    })
  }
  componentDidMount() {
    this.props.getLostDogList(1234)
    this.getCurrentLocation()
  }

  render() {
    const lostDogList = this.props.lostDogList.map((lostDog, i) => {
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

const mapStateToProps = state => ({
  lostDogList: state.lostDog.lostDogList,
})

const mapDispatchToProps = { getLostDogList }

export default connect(mapStateToProps, mapDispatchToProps)(LostDogListScreen)
