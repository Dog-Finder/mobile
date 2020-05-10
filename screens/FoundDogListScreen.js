import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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
      return <Button key={i} title={foundDog.name} />
    })

    return <View>{foundDogList}</View>
  }
}

const mapStateToProps = state => ({
  foundDogList: state.foundDog.foundDogList,
})

const mapDispatchToProps = { getFoundDogList }

export default connect(mapStateToProps, mapDispatchToProps)(FoundDogListScreen)
