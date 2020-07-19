import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import * as Location from 'expo-location'
import { Input, Card, Image } from 'react-native-elements'
import MapView, { Marker, Callout } from 'react-native-maps'
import DateTimeInput from 'components/inputs/DateTimeInput'
import { SexInput } from 'components/inputs/SexInput'
import MapInput from 'components/inputs/MapInput'

export default class FoundDogForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      marker: {},
      address: {
        street: '',
        city: '',
        country: '',
      },
    }
    this.onDragEnd = this.onDragEnd.bind(this)
  }

  async onDragEnd(event) {
    const coordinate = event.nativeEvent.coordinate
    this.setState({ marker: coordinate })
    const address = await Location.reverseGeocodeAsync(coordinate)
    this.setState({
      address: {
        street: address[0].street,
        city: address[0].city,
        country: address[0].country,
      },
    })
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
          <Input placeholder="Nombre" />
          <DateTimeInput
            placeholder="¿Cuándo lo encontraste?"
            isVisible={false}
            onConfirm={() => {}}
            onCancel={() => {}}
          />
          <SexInput onValueChange={() => {}} />
          <Input placeholder="Descripción"></Input>
        </Card>
        <Card title="Ubicación">
          <MapInput
            onDragEnd={this.onDragEnd}
            street={this.state.address.street}
            city={this.state.address.city}
            country={this.state.address.country}
          />
        </Card>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: 300,
    width: null,
  },
})
