import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { Appearance } from 'react-native-appearance'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { Input } from 'react-native-elements'

const DateTimeInput = ({ onConfirm, placeholder }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [value, setValue] = useState('')
  const colorScheme = Appearance.getColorScheme()
  const onConfirmHandler = date => {
    setIsModalVisible(false)
    setValue(date.toDateString())
    onConfirm(date)
  }
  return (
    <View>
      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <View pointerEvents="none">
          <Input disabled placeholder={placeholder} value={value}></Input>
        </View>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isModalVisible}
        onConfirm={onConfirmHandler}
        onCancel={() => setIsModalVisible(false)}
        isDarkModeEnabled={colorScheme === 'dark'}
      />
    </View>
  )
}

DateTimeInput.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
}

export default DateTimeInput
