import React from 'react'
// import {View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
export const SexInput = props => {
  return (
    <RNPickerSelect
      style={pickerSelectStyles}
      onValueChange={props.onValueChange}
      placeholder={{ label: 'Sexo', value: null }}
      items={[
        { label: 'Macho', value: 'male' },
        { label: 'Hembra', value: 'female' },
        { label: 'No Sé', value: 'unknown' },
      ]}
    />
  )
}

const pickerSelectStyles = {
  inputAndroid: {
    borderColor: 'gray',
    borderBottomWidth: 1,
    color: 'black',
    fontSize: 18,
    paddingVertical: 12, // to ensure the text is never behind the icon
    marginLeft: 10,
    marginRight: 10,
  },
  inputIOS: {
    borderColor: 'gray',
    borderBottomWidth: 1,
    color: 'black',
    fontSize: 18,
    paddingVertical: 12, // to ensure the text is never behind the icon
    marginLeft: 10,
    marginRight: 10,
  },
}
