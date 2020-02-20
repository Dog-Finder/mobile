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
  Modal,
  TextInput,
} from 'react-native'
import { Input, Button } from 'react-native-elements'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { Appearance } from 'react-native-appearance'
import MapView, { Marker, Callout } from 'react-native-maps'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as Location from 'expo-location'

export class FoundDogForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      sex: 'X',
      address: [{ city: '', country: '', name: '', street: '', region: '' }],
      //For sex: X is for unknown sex, M is for male, F for female
      comentary: '',
      isDatePickerVisible: false,
      isMapVisible: false,
      imagePath: this.imagePath,
      region: {
        latitude: -33.4376,
        longitude: 70.6332,
        //plaza baquedano coordinate, this coordinates are only needed before the app gets current user location
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      },
      marker: {
        latitude: -33.4376,
        longitude: 70.6332,
        //plaza baquedano coordinate
      },
      validate: {
        sex: false,
        date: false,
        comentary: false,
      },
    }
    this.onChangeDate = this.onChangeDate.bind(this)
    this.onChangeComentary = this.onChangeComentary.bind(this)
    this.onConfirmDatePicker = this.onConfirmDatePicker.bind(this)
    this.onCancelDatePicker = this.onCancelDatePicker.bind(this)
    this.onPressHandler = this.onPressHandler.bind(this)
    this.updateSex = this.updateSex.bind(this)
    this.handleRegionChange = this.handleRegionChange.bind(this)
    this.onMarkerChange = this.onMarkerChange.bind(this)
    // this.onSearchAddress = this.onSearchAddress.bind(this)
  }

  onChangeDate() {
    this.setState({ isDatePickerVisible: true })
  }
  onChangeComentary(comentary) {
    this.setState(currentState => {
      return {
        comentary,
        validate: { ...currentState, comentary: comentary !== '' },
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

  handleRegionChange(mapData) {
    this.setState({
      region: mapData,
    })
  }

  async onMarkerChange(coordinate) {
    this.setState({ marker: coordinate })
    const address = await Location.reverseGeocodeAsync(coordinate)
    this.setState({ address: address })
  }

  /*   async onSearchAddress(address) {
    const coords = await Location.geocodeAsync(address)
    const mapData = {
      latitude: coords[0].latitude,
      longitude: coords[0].longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    }
    this.handleRegionChange(mapData)
    this.onMarkerChange({
      latidude: coords[0].latitude,
      longitude: coords[0].longitude,
    })
  } */

  getCurrentLocation = async () => {
    navigator.geolocation.getCurrentPosition(async position => {
      const region = {
        latitude: parseFloat(position.coords.latitude),
        longitude: parseFloat(position.coords.longitude),
        latitudeDelta: 0.004,
        longitudeDelta: 0.004,
      }
      await this.setState({
        region: region,
      })
      await this.onMarkerChange({
        latitude: region.latitude,
        longitude: region.longitude,
      })
    })
  }

  componentDidMount() {
    this.getCurrentLocation()
  }

  validate() {
    const { name, date, comentary } = this.state.validate
    return name && date && comentary
  }

  render() {
    const colorScheme = Appearance.getColorScheme()
    return (
      <View style={styles.container} behavior="padding">
        <View style={styles.containerTop}>
          {/* Inputs Top are the things next to the picture on the left side */}
          <View style={styles.InputsTop}>
            <Text
              style={{
                fontWeight: 'bold',
                marginTop: 10,
                backgroundColor: 'steelblue',
                color: 'white',
                textAlign: 'center',
                fontSize: 16,
                borderRadius: 3,
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
              marginTop: 10,
              marginLeft: 10,
              marginRight: 10,
            }}
          />
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.isMapVisible}
            onRequestClose={() => {
              // alert('Modal has been closed.')
              this.setMapVisible(false)
            }}
          >
            <View style={{ flex: 1 }}>
              <MapView
                style={styles.mapStyle}
                initialRegion={this.state.region}
                onRegionChangeComplete={this.handleRegionChange}
                showsBuildings={false}
                loadingEnabled={true}
                onPress={event =>
                  this.onMarkerChange(event.nativeEvent.coordinate)
                }
                ref={map => {
                  this.map = map
                }}
              >
                <Marker
                  draggable
                  coordinate={{
                    latitude: this.state.marker.latitude,
                    longitude: this.state.marker.longitude,
                  }}
                  title={'Mover el pin al punto donde encontraste al perro.'}
                />
              </MapView>
              <Callout>
                <View style={styles.calloutView}>
                  <TextInput
                    style={styles.calloutSearch}
                    /*                     onSubmitEditing={event =>
                      this.onSearchAddress(event.nativeEvent.text)
                    } */
                    editable={false}
                    returnKeyType={'search'}
                  >
                    {this.state.address[0].street} {this.state.address[0].name}
                  </TextInput>
                </View>
              </Callout>
              <View style={styles.back}>
                <Icon
                  name="close"
                  color="black"
                  size={40}
                  containerStyle={styles.buttonContainer}
                  backgroundColor={'transparent'}
                  onPress={() => this.setMapVisible(false)}
                />
              </View>
            </View>
          </Modal>
          {/* <Text>{JSON.stringify(this.state.address)}</Text> */}
          <Text
            style={styles.formAdress}
            onPress={() => {
              this.setMapVisible(true)
            }}
          >
            Región: {this.state.address[0].region} {'\n'}
            Comuna: {this.state.address[0].city} {'\n'}
            Dirección: {this.state.address[0].street}{' '}
            {this.state.address[0].name}
          </Text>
          <Input
            onChangeText={this.onChangeComentary}
            containerStyle={styles.input}
            multiline={true}
            label="Comentarios adicionales"
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
    alignSelf: 'flex-end',
    color: 'transparent',
    flex: 0.2,
    flexDirection: 'row',
    marginLeft: 3,
    marginTop: 3,
    position: 'absolute',
  },
  button: {
    flex: 0.7,
    marginTop: 10,
  },
  buttonContainer: {
    alignSelf: 'flex-start',
    color: 'transparent',
  },
  calloutSearch: {
    alignSelf: 'center',
    borderColor: 'transparent',
    borderWidth: 0.0,
    height: 40,
    marginLeft: 3,
    marginRight: 5,
    width: '99%',
  },
  calloutView: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: '6%',
    marginTop: 5,
    width: '89%',
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
  formAdress: {
    lineHeight: 25,
    marginBottom: '5%',
    marginLeft: 10,
    marginTop: 5,
  },
  imageStyle: {
    flex: 0.95,
  },
  input: {
    alignSelf: 'center',
    height: '30%',
    marginTop: 5,
    paddingBottom: 10,
  },
  mapStyle: {
    flex: 1,
  },
})

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(FoundDogForm)
