import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Picker,
  Dimensions,
  Modal,
} from 'react-native'
import { Input, colors } from 'react-native-elements'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { Appearance } from 'react-native-appearance'
import { Button } from 'react-native-elements'
import MapView from 'react-native-maps'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export class FoundDogForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      sex: 'X',
      //For sex: X is for unknown sex, M is for male, F for female
      description: '',
      isDatePickerVisible: false,
      isMapVisible: false,
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
    this.updateSex = this.updateSex.bind(this)
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
  updateSex = sex => {
    this.setState({ sex: sex })
  }
  setMapVisible(visible) {
    this.setState({ isMapVisible: visible })
  }

  getCurrentLocation = async () => {
    navigator.geolocation.getCurrentPosition(async position => {
      const region = {
        latitude: parseFloat(position.coords.latitude),
        longitude: parseFloat(position.coords.longitude),
        latitudeDelta: 0.004,
        longitudeDelta: 0.004,
      }
      await this.setState({
        initialRegion: region,
      })
    })
  }
  componentDidMount() {
    this.getCurrentLocation()
  }

  validate() {
    const { name, date, description } = this.state.validate
    return name && date && description
  }

  render() {
    const colorScheme = Appearance.getColorScheme()
    return (
      <View style={styles.container}>
        <View style={styles.containerTop}>
          {/* Inputs Top are the things next to the picture on the left side */}
          <View style={styles.InputsTop}>
            <Text
              style={{
                fontWeight: 'bold',
                marginTop: 10,
                marginLeft: 10,
                backgroundColor: 'steelblue',
                color: 'white',
                textAlign: 'center',
                fontSize: 16,
              }}
            >
              Sexo
            </Text>
            <Picker
              selectedValue={this.state.sex}
              onValueChange={this.updateSex}
              style={{
                marginLeft: 10,
                width: 130,
                alignSelf: 'center',
              }}
            >
              <Picker.Item label="No sé" value="X" />
              <Picker.Item label="Macho" value="M" />
              <Picker.Item label="Hembra" value="F" />
            </Picker>
            <Button
              title="¿Cuándo lo encontraste?"
              onPress={this.onChangeDate}
              buttonStyle={{
                backgroundColor: 'steelblue',
                marginTop: 15,
                marginLeft: 10,
              }}
            />
            <Text
              style={{
                textAlign: 'center',
                marginTop: 5,
                marginLeft: 10,
                fontSize: 15,
              }}
              onPress={this.onChangeDate}
            >
              {this.state.date.toString().slice(4, 15)}
            </Text>
            <DateTimePickerModal
              isVisible={this.state.isDatePickerVisible}
              onConfirm={this.onConfirmDatePicker}
              onCancel={this.onCancelDatePicker}
              isDarkModeEnabled={colorScheme === 'dark'}
            />
          </View>
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
        </View>
        <View style={styles.form}>
          <Button
            title="¿Dónde lo encontraste?"
            onPress={() => {
              this.setMapVisible(true)
            }}
            buttonStyle={{
              backgroundColor: 'steelblue',
              marginTop: 15,
              marginLeft: 10,
            }}
          />
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.isMapVisible}
            onRequestClose={() => {
              alert('Modal has been closed.')
              this.setMapVisible(false)
            }}
          >
            <View style={{ flex: 1 }}>
              <MapView
                style={styles.mapStyle}
                initialRegion={this.state.initialRegion}
              ></MapView>
              <View style={styles.back}>
                <Icon
                  name="arrow-left"
                  color="black"
                  size={40}
                  containerStyle={styles.buttonContainer}
                  backgroundColor={'transparent'}
                  onPress={() => this.setMapVisible(false)}
                />
              </View>
            </View>
          </Modal>
          <Input
            onChangeText={this.onChangeDescription}
            containerStyle={styles.input}
            label="Comentarios"
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
  back: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    color: 'transparent',
    flex: 0.2,
    flexDirection: 'row',
    marginLeft: 3,
    marginTop: 8,
    position: 'absolute',
  },
  button: {
    flex: 0.7,
    marginTop: 10,
  },
  buttonContainer: {
    color: 'transparent',
  },
  container: {
    flex: 1,
  },
  containerTop: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  form: {
    flex: 1,
  },
  imageStyle: {
    flex: 0.95,
  },
  input: {
    paddingBottom: 10,
  },
  mapStyle: {
    flex: 1,
  },
})

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(FoundDogForm)
