import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Constants from 'expo-constants'

import { getFoundDogList } from '../redux/actions/foundDog'
import FoundDogItem from '../components/FoundDog/FoundDogItem'

class FoundDogListScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {}
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
  componentDidMount() {
    this.props.getFoundDogList(1234)
    this.getCurrentLocation()
  }
  render() {
    const foundDogList = this.props.foundDogList.map((foundDog, i) => {
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

const mapStateToProps = state => ({
  foundDogList: state.foundDog.foundDogList,
})

const mapDispatchToProps = { getFoundDogList }

export default connect(mapStateToProps, mapDispatchToProps)(FoundDogListScreen)
