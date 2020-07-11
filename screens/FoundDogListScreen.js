import React, { Component } from 'react'
import {
  View,
  Text,
  Button,
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
    // const foundDogList = this.props.foundDogList.map((foundDog, i) => {
    //   return <Button key={i} title={foundDog.id} />
    // })
    const foundDogList = Array(100)
      .fill()
      .map((x, i) => {
        return <Text key={i}>Item {i}</Text>
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
  text: {
    fontSize: 42,
  },
})

const mapStateToProps = state => ({
  foundDogList: state.foundDog.foundDogList,
})

const mapDispatchToProps = { getFoundDogList }

export default connect(mapStateToProps, mapDispatchToProps)(FoundDogListScreen)
