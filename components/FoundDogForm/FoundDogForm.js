import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { View, StyleSheet, Button, Image, TouchableOpacity } from 'react-native'
import { Input } from 'react-native-elements'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { Appearance } from 'react-native-appearance'

export class FoundDogForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: '',
      description: '',
      isDatePickerVisible: false,
      imagePath: this.imagePath,
      validate: {
        name: false,
        date: false,
        description: false,
      },
    }
    this.onChangeDate = this.onChangeDate.bind(this)
    this.onChangeDescription = this.onChangeDescription.bind(this)
    this.onConfirmDatePicker = this.onConfirmDatePicker.bind(this)
    this.onCancelDatePicker = this.onCancelDatePicker.bind(this)
    this.onPressHandler = this.onPressHandler.bind(this)
  }

  onChangeDate() {
    this.setState({ isDatePickerVisible: true })
  }
  onChangeDescription(description) {
    this.setState(currentState => {
      return {
        description,
        validate: { ...currentState, description: description !== '' },
      }
    })
  }
  onConfirmDatePicker(date) {
    this.setState(currentState => {
      return {
        date,
        isDatePickerVisible: false,
        validate: { ...currentState, date: date !== '' },
      }
    })
  }
  onCancelDatePicker() {
    this.setState({ isDatePickerVisible: false })
  }
  onPressHandler() {
    const { name, date, photo, description } = this.state
    const data = { name, date, photo, description }
    this.props.onSubmitHandler('12345', data)
  }

  validate() {
    const { name, date, description } = this.state.validate
    return name && date && description
  }

  render() {
    const colorScheme = Appearance.getColorScheme()
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.props.pressPicture}
          style={styles.button}
        >
          <Image
            style={styles.imageStyle}
            source={{
              uri: this.props.imagePath,
            }}
            resizeMode="stretch"
          />
        </TouchableOpacity>
        <View style={styles.form}>
          <Button title="Show Date Picker" onPress={this.onChangeDate} />
          <DateTimePickerModal
            isVisible={this.state.isDatePickerVisible}
            onConfirm={this.onConfirmDatePicker}
            onCancel={this.onCancelDatePicker}
            isDarkModeEnabled={colorScheme === 'dark'}
          />
          <Input
            onChangeText={this.onChangeDescription}
            containerStyle={styles.input}
            label="Descripción"
          ></Input>
          <Button
            disabled={!this.validate()}
            onPress={this.onPressHandler}
            title="Publicar perro"
          ></Button>
        </View>
      </View>
    )
  }
}

FoundDogForm.propTypes = {
  onSubmitHandler: PropTypes.func.isRequired,
  imagePath: PropTypes.string.isRequired,
  pressPicture: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  form: {
    flex: 1,
  },
  imageStyle: {
    flex: 1,
  },
  input: {
    paddingBottom: 10,
  },
})

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(FoundDogForm)
