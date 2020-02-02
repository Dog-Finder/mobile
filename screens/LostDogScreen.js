import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import LostDogForm from '../components/LostDogForm/LostDogForm'
import { postLostDog } from '../redux/actions/lostDog'
import { Header } from 'react-native-elements'

export class LostDogScreen extends Component {
  constructor(props) {
    super(props)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }
  onSubmitHandler(token, data) {
    this.props.postLostDog(token, data)
    this.props.navigation.navigate('Home')
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{ text: 'PERRO PERDIDO', style: { color: '#fff' } }}
        ></Header>
        <View style={styles.form}>
          <LostDogForm onSubmitHandler={this.onSubmitHandler}></LostDogForm>
        </View>
      </View>
    )
  }
}

LostDogScreen.propTypes = {
  postLostDog: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  form: {
    marginTop: 10,
  },
})

const mapStateToProps = state => ({})

const mapDispatchToProps = {
  postLostDog,
}

export default connect(mapStateToProps, mapDispatchToProps)(LostDogScreen)
