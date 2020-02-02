import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { View, StyleSheet, Button } from 'react-native'
import { Input } from 'react-native-elements'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

export class LostDogForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      date: '',
      photo: '',
      description: '',
      isDatePickerVisible: false,
    }
    this.onChangeName = this.onChangeName.bind(this)
    this.onChangeDate = this.onChangeDate.bind(this)
    this.onChangePhoto = this.onChangePhoto.bind(this)
    this.onChangeDescription = this.onChangeDescription.bind(this)
    this.onConfirmDatePicker = this.onConfirmDatePicker.bind(this)
    this.onCancelDatePicker = this.onCancelDatePicker.bind(this)
    this.onPressHandler = this.onPressHandler.bind(this)
  }

  onChangeName(name) {
    this.setState({ name })
  }
  onChangeDate() {
    this.setState({ isDatePickerVisible: true })
  }
  onChangePhoto(photo) {
    this.setState({ photo })
  }
  onChangeDescription(description) {
    this.setState({ description })
  }
  onConfirmDatePicker(date) {
    this.setState({ date, isDatePickerVisible: false })
  }
  onCancelDatePicker() {
    this.setState({ isDatePickerVisible: false })
  }
  onPressHandler() {
    const { name, date, photo, description } = this.state
    const data = { name, date, photo, description }
    this.props.onSubmitHandler('12345', data)
  }

  render() {
    return (
      <View>
        <Input
          onChangeText={this.onChangeName}
          containerStyle={styles.input}
          label="Nombre"
        ></Input>
        <Input
          onTouchEnd={this.onChangeDate}
          containerStyle={styles.input}
          label="Fecha"
          disabled={true}
          placeholder="Ingresar Fecha"
          value={this.state.date.toString()}
        ></Input>
        <DateTimePickerModal
          isVisible={this.state.isDatePickerVisible}
          onConfirm={this.onConfirmDatePicker}
          onCancel={this.onCancelDatePicker}
        />
        <Input
          onChangeText={this.onChangePhoto}
          containerStyle={styles.input}
          label="Foto"
        ></Input>
        <Input
          onChangeText={this.onChangeDescription}
          containerStyle={styles.input}
          label="Descripción"
        ></Input>
        <Button onPress={this.onPressHandler} title="Submit"></Button>
      </View>
    )
  }
}

LostDogForm.propTypes = {
  onSubmitHandler: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  input: {
    paddingBottom: 10,
  },
})

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(LostDogForm)
