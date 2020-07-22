import React, { Component } from 'react'
import {
  View,
  Text,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Constants from 'expo-constants'

import { getLostDogList } from '../redux/actions/lostDog'
import FoundDogItem from '../components/FoundDog/FoundDogItem'

class LostDogListScreen extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    getLostDogList: PropTypes.func.isRequired,
    lostDogList: PropTypes.array.isRequired,
  }
  componentDidMount() {
    this.props.getLostDogList(1234)
  }

  render() {
    const foundDogList = this.props.lostDogList.map((lostDog, i) => {
      return <FoundDogItem key={i} dog={lostDog}></FoundDogItem>
    })

    return (
      <SafeAreaView styles={styles.container}>
        <ScrollView styles={styles.scrollView}>{foundDogList}</ScrollView>
      </SafeAreaView>
    )
  }
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
