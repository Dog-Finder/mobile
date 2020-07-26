import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import * as Location from 'expo-location'
import { Input, Card, Image, Button } from 'react-native-elements'
import DateTimeInput from 'components/inputs/DateTimeInput'
import { SexInput } from 'components/inputs/SexInput'
import MapInput from 'components/inputs/MapInput'

export default class LostDogForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      sex: '',
      comentary: '',
      date: new Date(),
      marker: { latitude: 51.5078788, longitude: -0.0877321 },
      street: '',
      city: '',
      country: '',
      loading: false,
    }
    this.onDragEnd = this.onDragEnd.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  async componentDidMount() {
    const { status } = await Location.requestPermissionsAsync()
    if (status === 'granted') {
      const address = await Location.reverseGeocodeAsync(this.state.marker)
      this.setState({
        street: address[0].street,
        city: address[0].city,
        country: address[0].country,
      })
    }
  }

  async onDragEnd(event) {
    const coordinate = event.nativeEvent.coordinate
    this.setState({ marker: coordinate })
    const address = await Location.reverseGeocodeAsync(coordinate)
    this.setState({
      street: address[0].street,
      city: address[0].city,
      country: address[0].country,
    })
  }

  async onSubmit() {
    this.setState({ loading: true })
    const {
      name,
      sex,
      comentary,
      date,
      marker,
      street,
      city,
      country,
    } = this.state
    const data = {
      name,
      sex,
      comentary,
      date,
      marker,
      address: { street, city, country },
    }

    await this.props.onSubmitHandler(1234, data)
    this.setState({ loading: false })
  }

  render() {
    return (
      <View>
        <Card title="Información General">
          <TouchableOpacity onPress={this.props.pressPicture}>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{ uri: this.props.imagePath }}
            />
          </TouchableOpacity>
          <Input
            placeholder="Nombre"
            onChangeText={name => {
              this.setState({ name })
            }}
            value={this.state.name}
          />
          <DateTimeInput
            placeholder="¿Cuándo lo encontraste?"
            isVisible={false}
            onConfirm={date => {
              this.setState({ date })
            }}
            onCancel={() => {}}
          />
          <SexInput
            onValueChange={sex => {
              this.setState({ sex })
            }}
          />
          <Input
            placeholder="Descripción"
            onChangeText={comentary => {
              this.setState({ comentary })
            }}
            value={this.state.comentary}
          ></Input>
        </Card>
        <Card title="Ubicación">
          <MapInput
            marker={this.state.marker}
            street={this.state.street}
            city={this.state.city}
            country={this.state.country}
            onDragEnd={this.onDragEnd}
            onChangeStreet={street => this.setState({ street })}
            onChangeCity={city => this.setState({ city })}
            onChangeCountry={country => this.setState({ country })}
          />
        </Card>
        <Card>
          <Button
            title="Submit"
            onPress={this.onSubmit}
            loading={this.state.loading}
          ></Button>
        </Card>
      </View>
    )
  }
}

LostDogForm.propTypes = {
  onSubmitHandler: PropTypes.func.isRequired,
  pressPicture: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: 300,
    width: null,
  },
})
