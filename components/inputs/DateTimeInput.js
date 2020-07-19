import React, { Component } from 'react'
import { View, Keyboard } from 'react-native'
import { Appearance } from 'react-native-appearance'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { Input } from 'react-native-elements'

export default class DateTimeInput extends Component {
  constructor(props) {
    super(props)
    this.state = { isModalVisible: false, value: '' }
    this.onConfirm = this.onConfirm.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onPress = this.onPress.bind(this)
  }
  onConfirm(date) {
    this.setState({ isModalVisible: false, value: date.toDateString() })
  }
  onCancel() {
    this.setState({ isModalVisible: false })
  }

  onPress() {
    this.setState({ isModalVisible: true })
  }

  render() {
    const colorScheme = Appearance.getColorScheme()
    Keyboard.dismiss()
    return (
      <View>
        <Input
          onFocus={this.onPress}
          placeholder={this.props.placeholder}
          value={this.state.value}
        ></Input>
        <DateTimePickerModal
          isVisible={this.state.isModalVisible}
          onConfirm={this.onConfirm}
          onCancel={this.onCancel}
          isDarkModeEnabled={colorScheme === 'dark'}
        />
      </View>
    )
  }
}
