import React, { Component } from 'react'
import { StyleSheet, Picker } from 'react-native'
import PropTypes from 'prop-types'

export default class SexPicker extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Picker
        selectedValue={this.props.value}
        onValueChange={this.props.onValueChange}
        style={styles.picker}
      >
        {this.props.items.map((i, index) => (
          <Picker.Item key={index} label={i.label} value={i.value} />
        ))}
      </Picker>
    )
  }
}

SexPicker.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
}

const styles = StyleSheet.create({
  picker: {
    alignSelf: 'center',
    marginLeft: 10,
    width: 130,
  },
})
