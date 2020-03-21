import React, { Component } from 'react'
import { View, StyleSheet, Button, Picker } from 'react-native'
import PropTypes from 'prop-types'

export class SexPicker extends Component {
  constructor(props) {
    super(props)
  }
}

SexPicker.propTypes = {
  onSubmitHandler: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  input: {
    paddingBottom: 10,
  },
})
