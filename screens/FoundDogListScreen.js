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

import { getFoundDogList } from '../redux/actions/foundDog'
import FoundDogItem from '../components/FoundDog/FoundDogItem'

class FoundDogListScreen extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    getFoundDogList: PropTypes.func.isRequired,
    foundDogList: PropTypes.array.isRequired,
  }
  componentDidMount() {
    this.props.getFoundDogList(1234)
  }

  render() {
    const foundDogList = this.props.foundDogList.map((foundDog, i) => {
      return <FoundDogItem key={i} dog={foundDog}></FoundDogItem>
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
  foundDogList: state.foundDog.foundDogList,
})

const mapDispatchToProps = { getFoundDogList }

export default connect(mapStateToProps, mapDispatchToProps)(FoundDogListScreen)
