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
      return (
        <View key={i}>
          <Text>Un texto base</Text>
          <Image style={styles.image} source={{ uri: foundDog.imageLinks }} />
        </View>
      )
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
  image: {
    flex: 1,
    height: 300,
    width: null,
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
